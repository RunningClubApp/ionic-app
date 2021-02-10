<template>
  <div id="">
    <ion-card v-for="league in leagues" :key="league._id" @click="() => {routeTo(league._id)}">
      <ion-card-header>
        <ion-card-title>{{ league.title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item-group>
          <ion-item v-for="(item, index) in league.participants" :key="index">
            #{{ index + 1}} - {{ item.name }} - <span v-if="userDists && userDists[item._id] !== undefined">{{ userDists[item._id] }}m</span>
          </ion-item>
        </ion-item-group>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="js">
import { IonItem, IonItemGroup, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

import { defineComponent } from 'vue';

import { getUserToken } from '../plugins/userstore'
import * as api from '../plugins/api'

export default defineComponent({
  name: 'LeaguesContainer',
  components: { IonItem, IonItemGroup, IonCard, IonCardHeader, IonCardTitle, IonCardContent },
  props: {
    name: String
  },
  data () {
    return {
      leagues: [],
      userDists: {}
    }
  },
  mounted () {
    this.FetchLeagues()
  },
  methods: {
    routeTo (id) {
      console.log(id)
      this.$router.push(`/tabs/tabLeagueView/${id}`)
    },
    async FetchLeagues () {
      api.call('leagues/foruser', {}, 'GET', true)
        .then((data) => {
          console.log(data)
          if (data.success) {
            this.leagues = data.leagues
            this.FetchAllUserDistances(this.leagues)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    FetchAllUserDistances (leagues) {
      console.log(leagues)
      leagues.forEach((league) => {
        const s = new Date(league.league_start)

        const e = new Date(s);
        const days = ({'Weekly': 7, 'Monthly': 30, 'Quarterly': 90 ,'Yearly': 365})[league.league_length]
        e.setDate(e.getDate() + days);

        league.participants.forEach(async (u) => {
          if (!this.userDists[u._id]) {
            const dist = await this.FetchUserDist(u._id, s, e)
            this.userDists[u._id] = dist
            console.log(u._id, dist)
          }
        })
      })
    },
    async FetchUserDist (uid, s, e) {
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