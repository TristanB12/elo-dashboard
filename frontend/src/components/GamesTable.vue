<script setup>
import avatar1 from '@images/avatars/avatar-1.png';
import usePlayersStore from '@/plugins/store/players';

const playersStore = usePlayersStore();

const props = defineProps({
  games: {
    type: Array,
    default: () => null,
  },
});

const loading = computed(() => !props.games);

const headers = [
  {
    title: 'Gagnant',
    key: 'winner',
  },
  {
    title: 'Perdant',
    key: 'loser',
  },
  {
    title: 'Score',
    key: 'score',
  },
  {
    title: 'Date',
    key: 'date',
    value: item => new Date(item.created_at).toLocaleDateString(),
  },
];

const resolveUsername = id => {
  const player = playersStore.players.find(player => player.user_id === id);
  return player ? player.username :
    'Inconnu';
};

</script>

<template>
  <VCard elevation="1">
    <VDataTable
      :headers="headers"
      :items="games"
      item-value="id"
      :loading="loading"
      class="text-no-wrap"
    >
      <template v-slot:item.winner="{ item }">
        <div class="d-flex align-center gap-x-4">
          <VAvatar
            size="34"
            variant="tonal"
          >
            <VImg
              v-if="avatar1"
              :src="avatar1"
            />
          </VAvatar>
          <h6 class="text-h6 font-weight-bold user-list-name">
            {{ resolveUsername(item.winner_id) }}
          </h6>

          <VChip
            size="small"
            color="green"
          >
            +{{ item.winner_elo_won }}
          </VChip>
        </div>
      </template>

      <template v-slot:item.loser="{ item }">
        <div class="d-flex align-center gap-x-4">
          <VAvatar
            size="34"
            variant="tonal"
          >
            <VImg
              v-if="avatar1"
              :src="avatar1"
            />
          </VAvatar>
          <h6 class="text-h6 font-weight-medium user-list-name">
            {{ resolveUsername(item.loser_id) }}
          </h6>

          <VChip
            size="small"
            color="red"
          >
            {{ item.loser_elo_lost }}
          </VChip>
        </div>
      </template>

    </VDataTable>
  </VCard>
</template>