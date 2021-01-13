<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Create Account</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <SignupContainer name="Tab Sign up page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import SignupContainer from '@/components/SignupContainer.vue';

export default  {
  name: 'TabSignup',
  components: { SignupContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>