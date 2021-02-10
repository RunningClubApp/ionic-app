<template>
  <div id="container">
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet'/>
    <div id="map" style="width:{{mapWidth}}px;height:{{mapHeight}}px">
    </div>
    <!-- fab placed to the bottom start -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button v-if="state===states.default" @click="StartRecord">
        <ion-icon size="large" :icon="radioButtonOnOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button v-else-if="state===states.recording" @click="StopRecord">
        <ion-icon size="large" :icon="stopOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button v-else-if="state===states.saving" @click="SaveRecording">
        <ion-icon size="large" :icon="save"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <!-- fab placed to the bottom start -->
    <ion-fab vertical="bottom" horizontal="start" slot="fixed">
      <ion-fab-button v-if="state===states.saving" @click="DeleteRecording">
        <ion-icon size="large" :icon="trash"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

import { defineComponent } from 'vue';

import { IonFab, IonFabButton, IonIcon } from '@ionic/vue'
import { radioButtonOnOutline, stopOutline, save, trash } from 'ionicons/icons';

import * as api from '../plugins/api'
import * as platform from '../plugins/platform'

import { Geolocation } from '@ionic-native/geolocation'
import { BackgroundGeolocation, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation'

export default defineComponent({
  name: 'RecExContainer',
  components: { IonFab, IonFabButton, IonIcon },
  props: {
    name: String
  },
  setup () {
    return {
      radioButtonOnOutline,
      stopOutline,
      save,
      trash
    }
  },
  data () {
    return {
      states: {
        default: 0,
        recording: 1,
        saving: 2
      },
      state: 0,
      mapWidth: 0,
      mapHeight: 0,
      map: undefined,
      recordedPath: [],
      watch: undefined,
      modalOpen: false,
      userToken: undefined,
      config: {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      }
    }
  },
  mounted () {
    this.mapWidth = screen.width
    this.mapHeight = screen.height - 5
    console.log(this.mapWidth, this.mapHeight)
    this.CreateMap()

    if (platform.isMobile()) {
      BackgroundGeolocation.configure(this.config)
        .then(() => {
          BackgroundGeolocation.on(BackgroundGeolocationEvents.location, (location) => {
            console.log(location)
            this.RecordPoint(location)
            // BackgroundGeolocation.finish()
          })
        })
    }
  },
  methods: {
    CreateMap () {
      mapboxgl.accessToken = 'pk.eyJ1IjoidGVjcm9hc2RhbGUiLCJhIjoiY2thbnVsMXFvMGs1bjJzcGZtOWl2eTRkYiJ9.aAxvfikHkPZI4d2nf_m6AA'
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 16, // starting zoom,
          pitch: 35,
          dragRotate: false,
          // dragPan: false,
          // scrollZoom: false,
          boxZoom: false,
          keyboard: false,
          doubleClickZoom: false,
          touchZoomRotate: false
      })
      
      this.map.on('load', () => {
        this.map.resize()
        this.map.addSource('path', { type: 'geojson', data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: []}
          } 
        });
        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'path',
          'paint': {
            'line-color': 'red',
            'line-opacity': 0.75,
            'line-width': 10
          }
        });
        Geolocation.getCurrentPosition()
          .then((data) => {
            this.map.panTo(new mapboxgl.LngLat(data.coords.longitude, data.coords.latitude))
          })
      })
    },
    StartRecord () {
      if (platform.isMobile()) {
        // start recording location
        BackgroundGeolocation.start()
      } else {
        this.watch = Geolocation.watchPosition()
        this.watch.subscribe(this.RecordPoint)
        console.log(this.watch)
      }
      this.state = this.states.recording
      // BackgroundMode.enable()
      // BackgroundMode.disableWebViewOptimizations()
    },
    StopRecord () {
      if (platform.isMobile()) {
        // start recording location
        BackgroundGeolocation.stop()
        BackgroundGeolocation.finish()
      } else {
        if (this.watch !== undefined) {
          // this.watch.unsubscribe()
          // BackgroundMode.disable()

          this.watch = undefined
        }
      }
      this.state = this.states.saving
      this.modalOpen = true
    },
    async SaveRecording () {
      console.log(this.recordedPath.length)
      if (this.recordedPath.length < 2) {
        console.error('recordedPath not long enough')
        this.DeleteRecording()
        return
      }
      console.log(this.recordedPath)
      // Do API Call
      this.errors = {}
      const start = this.recordedPath[0].timestamp
      const end = this.recordedPath[this.recordedPath.length - 1].timestamp
      api.call(`exercise?s=${start}&e=${end}`, { path: this.recordedPath }, 'POST', true)
        .then((data) => {
          console.log(data)
          if (data.success) {
            this.state = this.states.default
            this.recordedPath = []
            this.$router.push('/tabs/tabFeed')
          } else {
            this.errors = data.errors
            console.log(this.errors)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    DeleteRecording () {
      this.recordedPath = []
      this.state = this.states.default
    },
    RecordPoint (data) {
      if (this.state !== this.states.recording) {
        return
      }
      const p = {
        coords : {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        },
        elevation: data.coords.elevation | 0,
        timestamp: new Date(data.timestamp).toISOString()
      }
      this.map.panTo(new mapboxgl.LngLat(p.coords.lng, p.coords.lat))
      this.recordedPath.push(p)
      console.log("recorded point", p, this.recordedPath.length)
      
      const lineData = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: this.recordedPath.map(x => [x.coords.lng, x.coords.lat])
        }
      }
      this.map.getSource('path').setData(lineData)
    }
  },
  head: {
    style: {
      rel:'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css'
    }
  }
})
</script>

<style scoped>
#map {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  /* width: 100vw;
  height: 100vh;
  transform: translateY(25%); */
}

ion-icon {
  color: red;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* top: 50%; */
  /* transform: translateY(-50%); */
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>