<template>
  <div id="container">
    <ion-item-group>
      <ion-item v-for="(item, index) in leagueTable" :key="index">
        #{{ index + 1}} - {{ item.user.name }} - {{ item.distance }}m
      </ion-item>
    </ion-item-group>
  </div>
</template>

<script lang="js">
// import { IonItem, IonItemGroup, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

import { defineComponent } from 'vue';

import { getUserToken } from '../plugins/userstore'
import * as api from '../plugins/api'


export default defineComponent({
  name: 'LeaguesContainer',
  // components: { IonItem, IonItemGroup, IonCard, IonCardHeader, IonCardTitle, IonCardContent },
  props: {
    name: String,
    id: String
  },
  data () {
    return {
      league: undefined,
      userDists: []
    }
  },
  mounted () {
    console.log(this.id)
    this.FetchLeagueData(this.id)
  },
  computed: {
    leagueTable () {
      return this.userDists
    }
  },
  methods: {
    async FetchLeagueData(id) {
      api.call(`leagues?lge=${id}`, {}, 'GET', true)
        .then((data) => {
          console.log(data)
          if (data.success) {
            this.league = data.league
            this.CompileUserDistData(this.league)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    CompileUserDistData(lge) {
      const s = new Date(lge.league_start)

      const e = new Date(s);
      const days = ({'Weekly': 7, 'Monthly': 30, 'Quarterly': 90 ,'Yearly': 365})[lge.league_length]
      e.setDate(e.getDate() + days);

      lge.participants.forEach(async (u) => {
          const dist = await this.FetchUserDist(u._id, s, e)
          this.userDists.push({user: u, distance: dist})
      })
      this.userDists.sort((a, b) => {
        return a.distance - b.distance
      })
      console.log(this.userDists)
    },
    async FetchUserDist(uid, s, e) {
      const token = await getUserToken()
      return new Promise((resolve, reject) => {
        api.call(`exercise/userdistance?uid=${uid}&s=${s.toISOString()}&e=${e.toISOString()}`, {}, 'GET', false)
          .then((data) => {
            resolve(data.success ? data.distance : 0)
          }).catch((e) => {
            resolve(0)
            console.log(e)
          })
      })
    }
  }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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