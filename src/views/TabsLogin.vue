<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Log in</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Log in</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <LoginContainer name="Tab Log in page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginContainer from '@/components/LoginContainer.vue';

export default  {
  name: 'TabLogin',
  components: { LoginContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>