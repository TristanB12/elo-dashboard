<script setup>
import useSessionStore from './plugins/store/session';

const sessionsStore = useSessionStore();

sessionsStore.loadSession()
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
