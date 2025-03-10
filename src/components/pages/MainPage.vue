<script setup lang="ts">
import { ref } from 'vue'
import Heading from '../UI/Heading.vue'
import { modalStore } from '@/store/modalStore'
import Login from '@/components/forms/Login.vue'
import Register from '../forms/Register.vue'

const emit = defineEmits<{
  (e: 'successful-login', email: string): void
}>()

const userEmail = ref<string>(localStorage.getItem('email') ?? '')
function openLogin() {
  modalStore.toggle('login')
}
function closeLogin() {
  modalStore.toggle('login')
}
function onSuccessfulLogin(email: string) {
  userEmail.value = email
  localStorage.setItem('email', email)
  modalStore.toggle('login')
  emit('successful-login', email)
}

function openRegistration() {
  modalStore.toggle('login')
  modalStore.toggle('register')
}
function closeRegistration() {
  modalStore.toggle('register')
}
</script>

<template>
  <main class="main">
    <div class="main-page">
      <div class="main-page__text">
        <Heading class="name" size="1" text="Мои заметки" />
        <Heading class="slogan" size="3" text="Не забывай о важном, храни его в облаке" />
      </div>
      <img
        class="main-page__illustration"
        src="@/assets/images/illustration.png"
        alt="Main page illustration"
      />
    </div>
    <Login
      :open="modalStore.statuses.login"
      @login-closed="closeLogin"
      @register-open="openRegistration"
      @login-attempt="onSuccessfulLogin"
    />
    <Register
      :open="modalStore.statuses.register"
      @register-closed="closeRegistration"
      @login-open="openLogin"
      @register-attempt="closeRegistration"
    />
  </main>
</template>

<style lang="scss">
@use '~/colors' as colors;

.main-page {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 360px) {
    gap: 17px;
  }

  &__text {
    width: 642px;

    @media (max-width: 1366px) {
      width: 579px;
    }

    @media (max-width: 768px) {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 688px;
      height: 324px;
    }

    @media (max-width: 360px) {
      width: 320px;
      height: 220px;
    }

    & > .slogan {
      color: colors.$gray;
      width: 394px;
      line-height: 48px;

      @media (max-width: 768px) {
        width: 688px;
      }

      @media (max-width: 360px) {
        line-height: 36px;
        font-size: 24px;
        width: 320px;
      }
    }

    & > .name {
      line-height: 104px;

      @media (max-width: 360px) {
        line-height: 64px;
        font-size: 60px;
      }
    }
  }

  &__illustration {
    max-height: 846px;
    aspect-ratio: 89737/86400;

    @media (max-width: 1366px) {
      height: 604px;
    }

    @media (max-width: 768px) {
      height: 540px;
    }
    @media (max-width: 360px) {
      height: 287px;
    }
  }
}
</style>
