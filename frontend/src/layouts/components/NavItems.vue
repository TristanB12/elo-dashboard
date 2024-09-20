<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
  <!-- 👉 Apps & Pages -->
  <VerticalNavLink
    :item="{
      title: 'Classement',
      icon: 'ri-trophy-line',
      to: '/leaderboard',
    }"
  />
  <!-- <VerticalNavLink
    :item="{
      title: 'Joueurs',
      icon: 'ri-user-3-line',
      to: '/players',
    }"
  /> -->
  <VerticalNavLink
    :item="{
      title: 'Matchs',
      icon: 'ri-list-radio',
      to: '/games',
    }"
  />
</template>
