<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { d$auth } from '@store/auth'
// Import Component
import BaseInput from '@comp/BaseInput.vue'

// Define Router & Auth
const router = useRouter()
const auth = d$auth()
// Default Input
const initialInput = {
  username: '',
  password: ''
}
// Ref
const input = ref({ ...initialInput })
// Function Reset
const resetForm = () => Object.assign(input.value, initialInput)
// Function Submit
const submitForm = async () => {
  try {
    await auth.login(input.value)
    auth.setUser()
    resetForm()
    router.replace({
      name: 'Authenticated',
      params: { id: auth.getUsername }
    })
  } catch (error) {
    console.log(error)
    alert(error)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <!-- conditional rendering using v-if directive -->
    <form v-if="!auth.getUsername" method="post" @submit.prevent="submitForm" @reset="resetForm">
      <BaseInput name="username" v-model="input.username" placeholder="username" required />
      <br />
      <BaseInput name="password" v-model="input.password" placeholder="password" type="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
    <!-- conditional rendering using v-else directive -->
    <h3 v-else>{{ auth.getUsername }}</h3>
  </div>
</template>