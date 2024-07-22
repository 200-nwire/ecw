<script setup lang="ts">
import BaseInput from '@/components/Input/BaseInput.vue'
import router from '@/router'
import { ref } from 'vue'
import logo from '@/assets/logo.png'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')

const invalidPassword = ref(false)

const { login } = useAuth()

const handleSubmit = async () => {
  const loginRes = await login(email.value, password.value)
  if (loginRes) {
    router.push({ path: '/stations' })
  } else {
    invalidPassword.value = true
  }
}
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center bg-surface-main h-full">
    <Card class="px-xl py-3xl w-full md:lg:shadow-2 md:lg:border-round md:w-1/2 lg:w-1/3 bg-white">
      <template #header>
        <div class="flex flex-col justify-center items-center gap-md">
          <img
            :src="logo"
            alt="Logo"
          />
          <div class="text-headline-1 text-primary">החשבון שלי</div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-8 mt-md">
          <BaseInput
            id="email"
            :label="$t('login.email')"
            type="text"
            v-model="email"
            class="w-full"
          />
          <BaseInput
            id="password"
            :label="$t('login.password')"
            type="password"
            v-model="password"
            class="w-full"
            :invalid="invalidPassword"
            :invalidMessage="$t('login.invalid-message')"
          />
          <Button
            :label="$t('login.login')"
            class="w-full"
            @click="handleSubmit"
            @keyup.enter="handleSubmit"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
