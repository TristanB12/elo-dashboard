<script setup>
import useSessionStore from '@/plugins/store/session';
import { supabase } from '@/plugins/supabase/client';
import logo from '@images/logo.svg?raw';
import { useRouter } from 'vue-router';

const sessionStore = useSessionStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const state = ref({
  loading: false,
  error: null,
})

const isPasswordVisible = ref(false)

const submit = async () => {
  state.value.loading = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.value.email,
    password: form.value.password,
  })


  if (error) {
    state.value.loading = false
    state.value.error = error.message
  }
  else {
    state.value.loading = false
    sessionStore.setSession(data.session, data.user)
    router.push('/leaderboard')
    state.value.loading = false
  }
}
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
            Myelo
          </h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
          Se connecter 👋🏻
        </h4>
        <p class="mb-0">
          Connectez-vous pour accéder à votre espace.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submit">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
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

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox
                  v-model="form.remember"
                  label="Se souvenir de moi"
                />

                <a
                  class="text-primary"
                  href="javascript:void(0)"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                :loading="state.loading"
              >
                Se connecter
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Nouveau sur Myelo ?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Créer un compte
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
