<script setup>
import LeaderboardTable from '@/components/LeaderboardTable.vue';
import api from '@/plugins/supabase/api';
import { onMounted, ref } from 'vue';

const players = ref([]);

onMounted(() => {
  fetchPlayers();
});

const fetchPlayers = async () => {
  const response = await api.profiles.getAll();

  players.value = response;

}

</script>

<template>
  <h1 class="pb-4">Classement</h1>
  <LeaderboardTable
    :players="players"
  />
</template>

<style lang="scss">

</style>
