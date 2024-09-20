<script setup>
import useSessionStore from '@/plugins/store/session';
import avatar1 from '@images/avatars/avatar-1.png';
import { computed } from 'vue';

const sessionStore = useSessionStore();

const props = defineProps({
  players: {
    type: Array,
    default: undefined,
  },
})

const headers = [
  {
    title: 'Joueur',
    key: 'username',
  },
  {
    title: 'Points',
    key: 'elo_score',
  },
  {
    title: 'Rang',
    key: 'rank',
  },
]

const loading = computed(() => !props.players.length);

const orderedPlayers = computed(() => {
  return props.players?.sort((a, b) => b.elo_score - a.elo_score).map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
});

const resolveUserRank = (player) => {
  if (player.rank === 1) {
    return '1er';
  } else if (player.rank === 2) {
    return '2ème';
  } else if (player.rank === 3) {
    return '3ème';
  } else {
    return `${player.rank}ème`;
  }
}
const resolveUserRankColor = (player) => {
  if (player.rank === 1) {
    return 'amber-lighten-1';
  } else if (player.rank === 2) {
    return 'blue-grey-lighten-2';
  } else if (player.rank === 3) {
    return 'brown-lighten-1';
  } else {
    return 'grey-darken-3';
  }
}
const resolveUserRankVariant = (player) => {
  if ([1, 2, 3].includes(player.rank)) {
    return 'flat';
  } else {
    return 'text';
  }
}
const resolveRowClass = (player) => {
  if (player.item.user_id === sessionStore.user.id) {
    return { class: 'current-user-row' };
  }
  return undefined;
}

</script>

<template>
  <VCard elevation="1">
    <VDataTable
      :headers="headers"
      :items="orderedPlayers"
      item-value="id"
      :loading="loading"
      :row-props="resolveRowClass"
      class="text-no-wrap"
    >
      <!-- User -->
      <template #item.username="{ item }">
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

          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.username }}
            </h6>

            <span class="text-sm text-medium-emphasis">@{{ item.username }}</span>
          </div>
        </div>
      </template>
      <!-- Status -->
      <template #item.rank="{ item }">
        <VChip
          :color="resolveUserRankColor(item)"
          size="small"
          class="text-capitalize"
          :variant="resolveUserRankVariant(item)"
        >
          {{ resolveUserRank(item) }}
        </VChip>
      </template>

      <template #bottom />
    </VDataTable>
  </VCard>
</template>

<style lang="scss">
.current-user-row {
  background-color: #DCEDC8  !important;
}
</style>
