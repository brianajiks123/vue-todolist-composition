<script setup>
  import { useRoute,  } from 'vue-router'
  // import { d$auth } from '@store/auth'

  // Define Auth & Route
  // const auth = d$auth()
  const route = useRoute()
  // const router = useRouter()
  // Function Submit
  function logout() {
    alert("This button isn't work!")
  }
</script>

<template>
  <div>
    <!-- change nullish to logical or
      because param id is always povided in optional param -->
    <h1>{{ route.params.id }} Detail</h1>
    <br>
    <button @click="logout" style="color: red;">Logout</button>
  </div>
</template>