<script setup>
import useSessionStore from '@/plugins/store/session';
import { supabase } from '@/plugins/supabase/client';
import logo from '@images/logo.svg?raw';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const sessionStore = useSessionStore();
const router = useRouter();

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const state = ref({
  loading: false,
  error: null,
})

const submit = async () => {
  state.value.loading = true;

  const response = await supabase.auth.signUp({
    email: form.value.email,
    password: form.value.password,
    options: {
      data: {
        username: form.value.username,
      },
    },
  });

  if (response.error) {
    state.value.error = response.error.message;
    state.value.loading = false;
  }
  else {
    sessionStore.setSession(response.data.session, response.data.user)
    router.push('/leaderboard');
  }

  state.value.loading = false;
}

const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="d-flex"
            v-html="logo"
          />
          <h2 class="font-weight-medium text-2xl text-uppercase">
            myelo
          </h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
          Créer votre compte 🚀
        </h4>
        <p class="mb-0">
          Commencer à vous comparer à vos amis.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submit">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Nom d'utilisateur"
                placeholder="Johndoe"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <VBtn
                class="mt-6"
                block
                type="submit"
                :loading="state.loading"
              >
                Créer un compte
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Vous avez déjà un compte ?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Se connecter
              </RouterLink>
            </VCol>

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol> -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
