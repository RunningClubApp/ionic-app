<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create League</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Leagues</ion-title>
        </ion-toolbar>
      </ion-header>

      <CreateLeagueContainer name="Tab Leagues page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons'
import CreateLeagueContainer from '@/components/CreateLeagueContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabCreateLeague',
  components: { CreateLeagueContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup () {
    return {
      addCircleOutline
    }
  }
})
</script>