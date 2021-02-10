<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>League</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll="true" :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">League</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="NavigateToCreate">
          <ion-icon size="large" :icon="personAddOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <LeagueContainer :id="id" name="Tab Leagues page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { personAddOutline } from 'ionicons/icons'

import LeagueContainer from '@/components/LeagueContainer.vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'TabLeagues',
  components: { LeagueContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonFab, IonFabButton, IonIcon },
  props: {
    id: String
  },
  setup () {
    return {
      personAddOutline
    }
  }
})
</script>