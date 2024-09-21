<script setup>
import useSessionStore from '@/plugins/store/session';
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'

const sessionStore = useSessionStore();
</script>

<template>
  <DefaultLayoutWithVerticalNav v-if="sessionStore.isLoaded">
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
