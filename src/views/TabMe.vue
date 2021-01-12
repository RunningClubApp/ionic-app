<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>You</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">You</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ExploreContainer name="Tab Me page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'TabMe',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>