<script setup>
import GamesTable from '@/components/GamesTable.vue';
import useGamesStore from '@/plugins/store/games';
import usePlayersStore from '@/plugins/store/players';
import { onMounted, ref } from 'vue';

const playersStore = usePlayersStore();
const gamesStore = useGamesStore();

const dialog = ref(false);
const error = ref(null);

const form = ref({
  winnerId: '',
  winnerScore: '',
  loserId: '',
  loserScore: '',
});

onMounted(async () => {
  await gamesStore.fetchGames();
});


const submit = async () => {
  if (!form.value.winnerId || !form.value.loserId || !form.value.winnerScore || !form.value.loserScore) {
    error.value = 'Tous les champs sont requis.';
    return;
  }
  if (form.value.winnerId === form.value.loserId) {
    error.value = 'Le joueur gagnant et le joueur perdant ne peuvent pas être les mêmes.';
    return;
  }

  await gamesStore.createGame(
    playersStore.players.find(player => player.user_id === form.value.winnerId),
    playersStore.players.find(player => player.user_id === form.value.loserId),
    form.value.winnerScore,
    form.value.loserScore,
  );
  form.value = {
    winnerId: '',
    winnerScore: '',
    loserId: '',
    loserScore: '',
  };
  dialog.value = false;
  gamesStore.fetchGames();
};

</script>

<template>
  <div class="d-flex justify-space-between">
    <h1 class="pb-4">Matchs</h1>
    <VDialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps">Ajouter un match</VBtn>
      </template>

      <VCard
        title="Ajouter un match"
      >
        <VCardText class="my-6">
          <VRow>
            <VCol>
              <VAutocomplete
                v-model="form.winnerId"
                :items="playersStore.players"
                item-title="username"
                item-value="user_id"
                label="Joueur gagnant 🏆"
              />
            </VCol>
            <VCol>
              <VTextField
                label="Score"
                type="number"
                v-model="form.winnerScore"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VAutocomplete
                v-model="form.loserId"
                :items="playersStore.players"
                item-title="username"
                item-value="user_id"
                label="Joueur perdant 🤢"
              />
            </VCol>
            <VCol>
              <VTextField
                label="Score"
                type="number"
                v-model="form.loserScore"
              />
            </VCol>
          </VRow>

          <VAlert
            v-if="error"
            type="error"
            class="mt-4"
          >
            {{ error }}
          </VAlert>

        </VCardText>

        <VCardActions>
          <VBtn
            variant="plain"
            @click="dialog = false"
          >
            Annuler
          </VBtn>
          <VBtn
            variant="tonal"
            @click="submit"
          >
            Ajouter
          </VBtn>
        </VCardActions>
      </VCard>

    </VDialog>
  </div>
  <GamesTable
    :games="gamesStore.games"
  />
</template>
