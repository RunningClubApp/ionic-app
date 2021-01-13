<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/account/signup">
          <ion-icon :icon="person" />
          <ion-label>Sign up</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/account/login">
          <ion-icon :icon="logIn" />
          <ion-label>Log in</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { person, logIn } from 'ionicons/icons';

export default {
  name: 'AccountTabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      person,
      logIn
    }
  }
}
</script>