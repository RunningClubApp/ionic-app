<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tabMe">
          <ion-icon :icon="person" />
          <ion-label>You</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/tabFeed" :disabled="true">
          <ion-icon :icon="reader" />
          <ion-label>Feed</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tabRecord" :disabled="true">
          <ion-icon :icon="radioButtonOnOutline" />
          <ion-label>Record</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tabLeagues" :disabled="true">
          <ion-icon :icon="podium" />
          <ion-label>Leagues</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/tabs/tabOptions" :disabled="true">
          <ion-icon :icon="settings" />
          <ion-label>Options</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { person, reader, radioButtonOnOutline, podium, settings } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      person,
      reader,
      radioButtonOnOutline,
      podium,
      settings
    }
  }
}
</script>