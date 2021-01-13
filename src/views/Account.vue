<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row style="text-align: center;">
          <ion-col>Sign up</ion-col>
          <ion-col><ion-toggle></ion-toggle></ion-col>
          <ion-col>Log in</ion-col>
        </ion-row>
      </ion-grid>
      <SignupContainer name="Sign up page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/vue';
import SignupContainer from '@/components/SignupContainer.vue';

export default  {
  name: 'TabFeed',
  components: { SignupContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonGrid, IonCol, IonRow }
}
</script>