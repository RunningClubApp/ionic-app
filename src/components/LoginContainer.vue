<template>
  <div id="container">
    <!-- Email input -->
    <ion-item-group>
      <ion-item>
        <ion-label>Your E-Mail</ion-label>
        <ion-input v-model="userDetails.email" type="email"></ion-input>
      </ion-item>
      <ion-item v-if="errors.user || errors.email">
        <ion-text color="danger">User not found</ion-text>
      </ion-item>
      <!-- Password input -->
      <ion-item>
        <ion-label>Password</ion-label>
        <ion-input v-model="userDetails.password" type="password"></ion-input>
      </ion-item>
      <ion-item v-if="errors.password">
        <ion-text color="danger">Password Incorrect</ion-text>
      </ion-item>
    </ion-item-group>

    <!-- Create Account button -->
    <ion-button @click="LogIn" expand="block">Log in</ion-button>
  </div>
</template>

<script lang="ts">
import { IonItem, IonItemGroup, IonText, IonLabel, IonInput, IonButton } from '@ionic/vue';

import { defineComponent } from 'vue';

import { setUserToken, getUserToken } from '../plugins/userstore'
import * as api from '../plugins/api'

export default defineComponent({
  name: 'LoginContainer',
  components: { IonItem, IonItemGroup, IonText, IonLabel, IonInput, IonButton },
  props: {
    name: String
  },
  data () {
    return {
      userDetails: {
        email: '',
        password: '',
      },
      errors: { }
    }
  },
  methods: {
    LogIn: async function () {
      this.errors = {}
      api.call('auth/login', this.userDetails, 'POST', false)
        .then((data) => {
          console.log(data)
          if (data.success) {
            setUserToken(data.token)
            this.$router.push('/')
          } else {
            this.errors = data.errors
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>