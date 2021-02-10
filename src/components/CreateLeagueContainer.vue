<template>
  <div id="container">
    <!-- Email input -->
    <ion-item-group>
      <ion-item>
        <ion-label>League title</ion-label>
        <ion-input v-model="leagueDetails.name" type="text"></ion-input>
      </ion-item>
      <ion-item v-if="errors.title">
        <ion-text color="danger">Title invalid</ion-text>
      </ion-item>

      <ion-item>
        <ion-label>Length</ion-label>
        <ion-select v-model="leagueDetails.length" placeholder="Select One">
          <ion-select-option value="Weekly">Weekly</ion-select-option>
          <ion-select-option value="Monthly">Monthly</ion-select-option>
          <ion-select-option value="Yearly">Yearly</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item v-if="errors.length">
        <ion-text color="danger">Length is invalid</ion-text>
      </ion-item>

    </ion-item-group>

    <!-- Create League button -->
    <ion-button @click="CreateLeague" expand="block">Create League</ion-button>
  </div>
</template>

<script lang="ts">
import { IonItem, IonItemGroup, IonLabel, IonInput, IonText, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';

import { defineComponent } from 'vue';

import * as api from '../plugins/api'

export default defineComponent({
  name: 'CreateLeagueContainer',
  components: { IonItem, IonItemGroup, IonLabel, IonText, IonInput, IonButton, IonSelect, IonSelectOption },
  props: {
    name: String
  },
  data () {
    return {
      leagueDetails: {
        name: '',
        length: ''
      },
      errors: {}
    }
  },
  methods: {
    async CreateLeague () {
      this.errors = {}
      console.log(this.leagueDetails)
      await api.call(`leagues?ti=${this.leagueDetails.name}&l=${this.leagueDetails.length}`, {}, 'POST', true)
      .then((data) => {
        if (data.success) {
          this.$router.push('/')
        } else {
          this.errors = data.errors
          console.log(this.errors)
        }
      })
      .catch((e) => {
        console.log(e)
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