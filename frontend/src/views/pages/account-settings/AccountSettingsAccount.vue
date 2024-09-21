<script setup>
import useSessionStore from '@/plugins/store/session';
import { supabase } from '@/plugins/supabase/client';
import avatar1 from '@images/avatars/avatar-1.png'

const sessionStore = useSessionStore()

const snackbar = ref(false)
const refInputEl = ref()
const loading = ref(false)

const accountDataLocal = ref({
  avatarImg: sessionStore.userProfile?.avatar_url,
  file: null,
})

const changeAvatar = file => {
  accountDataLocal.value.file = file.target.files[0]
  
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = null
  accountDataLocal.value.file = null
}

const submit = async () => {
  let avatarUrl = null;

  loading.value = true;

  if (accountDataLocal.value.file) {
    const result = await supabase.storage
      .from('images')
      .upload(`${sessionStore.user.id}-${Date.now()}`, accountDataLocal.value.file)

    console.log(result)
    avatarUrl = `https://gqbtjtuvysjoarbdjenk.supabase.co/storage/v1/object/public/${result.data.fullPath}`
  }

  await supabase.from('profiles').upsert({
    user_id: sessionStore.user.id,
    avatar_url: avatarUrl,
  })

  loading.value = false
  snackbar.value = true
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Informations">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg || avatar1"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="ri-upload-cloud-line"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Changer la photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="outlined"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Réinitialiser</span>
                <VIcon
                  icon="ri-refresh-line"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              JPG, GIF ou PNG. Taille max 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click.prevent="submit" :loading="loading">Sauvegarder</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VSnackbar
    v-model="snackbar"
    color="success"
    :timeout="2000"
    text="Informations sauvegardées avec succès"
  />
</template>
