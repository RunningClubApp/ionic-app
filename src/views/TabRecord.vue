<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Record</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll="false" :fullscreen="false">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Record</ion-title>
        </ion-toolbar>
      </ion-header> -->
      
      <RecExContainer name="Tab Record page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import RecExContainer from '@/components/RecExContainer.vue';

export default  {
  name: 'TabRecord',
  components: { RecExContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>