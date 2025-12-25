<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent" style="display: flex; justify-content: center; align-items: center; height: 50px; padding: 10px 0;">
      <img src="logo.png" style="height: 30px;" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent" style="border-top: 1px solid rgba(255, 255, 255, 0.12)">
      <q-tabs v-model="tab" align="center">
        <q-route-tab name="/" to="/" icon="home" />
        <q-route-tab name="/partidas" to="/partidas" icon="sports_esports" />
        <q-route-tab name="/salas" to="/salas" icon="meeting_room" />
        <q-route-tab name="/jugadores" to="/jugadores" icon="people" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tab = ref(route.path)

watch(
  () => route.path,
  (p) => {
    tab.value = p
  },
)
</script>
