<script setup>
import usePlayersStore from './plugins/store/players';
import useSessionStore from './plugins/store/session';

const sessionsStore = useSessionStore();

sessionsStore.loadSession()
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
