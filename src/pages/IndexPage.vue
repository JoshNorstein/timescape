<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Última partida</div>
      <q-btn flat label="Ver más" color="primary" />
    </div>

    <q-card v-if="loading" style="min-width: 320px; max-width: 640px">
      <q-card-media>
        <q-skeleton height="200px" />
      </q-card-media>
      <q-card-section>
        <q-skeleton type="text" width="200px" />
        <q-skeleton type="text" width="150px" class="q-mt-xs" />
        <div class="row items-center q-mt-sm">
          <q-skeleton type="rect" width="100px" height="20px" />
          <q-space />
          <q-skeleton type="rect" width="50px" height="20px" />
        </div>
      </q-card-section>
    </q-card>

    <q-card v-else-if="lastGame" style="min-width: 320px; max-width: 640px">
      <q-img src="https://placehold.co/300x300" fit="cover" style="width: 100%; height: 200px" />
      <q-card-section>
        <div class="text-h6">Partida de Escape Room</div>
        <div class="text-caption q-mt-xs">Sala: {{ lastGame.room_name || 'Desconocida' }}</div>
        <div class="text-caption q-mt-xs">Jugado: {{ formatDate(lastGame.played_at) }}</div>
        <div class="row items-center q-mt-sm">
          <q-rating :value="lastGame.rating || 0" readonly size="sm" />
          <q-space />
          <q-icon name="people" size="sm" />
          <span class="text-caption q-ml-xs">{{
            lastGame.players ? lastGame.players.length : 0
          }}</span>
        </div>
      </q-card-section>
    </q-card>

    <div v-else-if="errorMessage" class="text-body2 text-negative q-mt-md">
      {{ errorMessage }}
    </div>

    <div v-else class="text-subtitle2">No hay partidas disponibles.</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const loading = ref(true)
const lastGame = ref(null)
const errorMessage = ref('')

function formatDate(d) {
  if (!d) return '—'
  const dt = new Date(d)
  return dt.toLocaleString()
}

onMounted(async () => {
  try {
    // Expecting backend endpoint at: GET /api/games/latest
    const res = await api.get('/api/games/latest')
    lastGame.value = res.data
  } catch (err) {
    console.error('Error fetching latest game', err)
    lastGame.value = null
    errorMessage.value =
      'Error al cargar la última partida. Verifica que el servidor backend esté corriendo.'
  } finally {
    loading.value = false
  }
})
</script>
