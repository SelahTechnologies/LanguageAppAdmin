<template>
  <v-container class="pa-15">
    <base-material-card class="mx-15">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Login
        </div>
      </template>

      <v-form class="pa-10">
        <v-text-field
          v-model="loginData.phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          class="mb-0"
          outlined
        />

        <v-text-field
          v-model="loginData.password"
          label="Password"
          placeholder="Password"
          class="mb-0"
          outlined
          type="password"
        />

        <v-alert
          v-if="status.type != null"
          dense
          :type="status.type"
        >
          {{ status.message }}
        </v-alert>

        <v-btn
          color="success"
          class="mr-0"
          block
          @click="login()"
        >
          Login
        </v-btn>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { store } from '@/store/index'
  export default {
    name: 'Login',
    data () {
      return {
        loginData: {
          phoneNumber: null,
          password: null,
        },
        status: {
          type: null,
          message: null,
        },
      }
    },
    methods: {
      login () {
        if (this.loginData.phoneNumber === null || this.loginData.phoneNumber === '' || this.loginData.password === null || this.loginData.password === '') {
          this.status.type = 'error'
          this.status.message = 'Phone Number and Password are required.'
          return
        }
        axios.post(`${process.env.VUE_APP_BASE_API_URL}auth/login`, this.loginData).then(
          response => {
            console.log(response)
            store.dispatch('setUser', response.data.user)
            store.dispatch('setToken', response.data.access_token)
            localStorage.setItem('token', JSON.stringify(response.data.access_token))
            this.$router.push({ name: 'Dashboard' })
          },
          error => {
            console.log(error.response)
            if (error.response.status === 401) {
              this.status.type = 'error'
              this.status.message = 'Wrong Phone Number or Password.'
            } else {
              this.status.type = 'error'
              this.status.message = 'Something went wrong.'
            }
          },
        )
      },
    },
  }
</script>
