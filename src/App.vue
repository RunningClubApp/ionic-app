<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

import { getUserToken } from './plugins/userstore'

export default defineComponent({
  name: 'App',
  setup () {
    const userToken = '';
    return {
      userToken
    }
  },
  components: {
    IonApp,
    IonRouterOutlet
  },
  async mounted () {
    const tkn = await getUserToken()
    if (tkn === undefined || tkn === '') {
      this.$router.push('/account')
    }
  }
});
</script>