<template>
  <div id="container">
    <!-- Email input -->
    <ion-item-group>
      <ion-item>
        <ion-label>Your E-Mail</ion-label>
        <ion-input v-model="userDetails.email" type="email"></ion-input>
      </ion-item>
      <ion-item v-if="errors.email">
        <ion-text color="danger">E-Mail invalid</ion-text>
      </ion-item>
      <ion-item v-if="errors.user">
        <ion-text color="danger">E-Mail already in use</ion-text>
      </ion-item>
      
    
      <!-- Name input -->
      <ion-item>
        <ion-label>Your Name</ion-label>
        <ion-input v-model="userDetails.name" type="text"></ion-input>
      </ion-item>
      <ion-item v-if="errors.name">
        <ion-text color="danger">Name invalid</ion-text>
      </ion-item>

      <!-- Password input -->
      <ion-item>
        <ion-label>Password</ion-label>
        <ion-input v-model="userDetails.password" type="password"></ion-input>
      </ion-item>
      <ion-item v-if="errors.password">
        <ion-text v-if="errors.password.mismatch" color="danger">Passwords do not match</ion-text>
        <ion-text v-else color="danger">Password invalid</ion-text>
      </ion-item>

      <!-- Confirm Password input -->
      <ion-item>
        <ion-label>Confirm</ion-label>
        <ion-input v-model="userDetails.confirmPassword" type="password"></ion-input>
      </ion-item>
    </ion-item-group>

    <!-- Create Account button -->
    <ion-button @click="CreateAccount" expand="block">Create account</ion-button>
  </div>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

import { defineComponent } from 'vue';

import { setUserToken } from '../plugins/userstore'

export default defineComponent({
  name: 'SignupContainer',
  components: { IonItem, IonLabel, IonInput, IonButton },
  props: {
    name: String
  },
  data () {
    return {
      userDetails: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      errors: {}
    }
  },
  methods: {
    CreateAccount: async function () {
      this.errors = {}
      await fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.userDetails)
      })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          setUserToken(data.token)
          this.$router.push('/')
        } else {
          this.errors = data.errors
          console.log(this.errors)
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