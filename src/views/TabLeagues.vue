<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Leagues</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Leagues</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="NavigateToCreate">
          <ion-icon size="large" :icon="addCircleOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ExploreContainer name="Tab Leagues page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons'
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabLeagues',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonFab, IonFabButton, IonIcon },
  setup () {
    return {
      addCircleOutline
    }
  },
  methods: {
    NavigateToCreate () {
      this.$router.push('/tabs/tabCreateLeague')
    }
  }
})
</script>