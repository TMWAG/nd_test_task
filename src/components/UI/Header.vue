<script setup lang="ts">
import { computed, ref } from 'vue';
import Login from '../icons/Login.vue';
import TheButton from './TheButton.vue';
import User from '../icons/User.vue';
import TheLink from './TheLink.vue';
import { modalStore } from '@/store/modalStore';

defineProps<{
  email: string
}>()

const emit = defineEmits<{
  (e: 'logout'): void;
}>();

function openLogin() {
  modalStore.toggle('login')
}

function logOut() {
  emit('logout')
}

</script>

<template>
  <header class="header">
    <img class="header__logo" src="@/assets/images/logo.png"
      srcset="@/assets/images/logo.png 768w, @/assets/images/logo_small.png 360w"
      sizes="(min-width: 768px) 768w, (min-width: 360px) 360w" alt="MyNotesLogo">
    <TheButton v-if="!email" @click="openLogin">
      <template v-slot:text><span>Вход</span></template>
      <template v-slot:icon>
        <Login />
      </template>
    </TheButton>
    <div v-else class="user">
      <p class="user__email">{{ email }}</p>
      <div class="user__icon">
        <User />
      </div>
      <div class="user__logout">
        <TheLink text="Выйти" @click="logOut" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use '~/colors' as colors;
@use '~/text' as text;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 160px;
  height: 136px;

  @media(max-width: 1366px) {
    padding: 20px 80px;
  }

  @media(max-width: 768px) {
    padding: 20px 40px;
  }

  @media(max-width: 360px) {
    height: 96px;
    padding: 20px;
  }

  &__logo {
    height: 50px;

    @media(max-width: 360px) {
      height: 36px;
    }
  }
}

.user {
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;

  &__email {
    color: colors.$white;
    font-size: text.$small;
    font-weight: 400;
  }

  &__icon {
    background-color: colors.$dark-middle;
    height: 56px;
    width: 56px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__logout {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    background-color: colors.$dark-middle;
    padding: 40px;
    border-radius: 12px;
    right: 0;
    top: 77px;
    box-shadow: 0px 15px 46px -10px black;
    z-index: 1;
    transition: opacity 0.2s, visibility 0.2s;
    transition-delay: 1s;

    &::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      background-color: colors.$dark-middle;
      right: 19px;
      top: -9px;
      transform: rotate(45deg);
    }
  }

  &:hover {
    &>.user__logout {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
