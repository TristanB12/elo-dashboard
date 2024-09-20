<script setup>
import { supabase } from '@/plugins/supabase/client';
import { onMounted } from 'vue';

onMounted(async() => {
  const { data } = await supabase.from('users').select();
  console.log(data);
});
</script>

<template>
  
</template>

<style lang="scss">

</style>
