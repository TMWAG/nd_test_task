<script setup lang="ts">
import Modal from '../UI/Modal.vue'
import EmailInput from '../UI/Inputs/EmailInput.vue'
import { ref } from 'vue'
import PasswordInput from '../UI/Inputs/PasswordInput.vue'
import Heading from '../UI/Heading.vue'
import TheLink from '../UI/TheLink.vue'
import TheButton from '../UI/TheButton.vue'
import ErrorMessage from '../UI/ErrorMessage.vue'
import { login } from '@/api/auth'
import { setAuthToken } from '@/utils/authToken'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'login-closed'): void
  (e: 'register-open'): void
  (e: 'login-attempt', email: string): void
}>()

const email = ref<string>('')
const emailError = ref<string>('')
function updateEmailData(newEmail: string, err: string) {
  email.value = newEmail
  emailError.value = err
}

const pass = ref<string>('')
const passError = ref<string>('')
function updatePassData(newPass: string) {
  pass.value = newPass
}

const loginError = ref<string>('')

function closeModal() {
  email.value = ''
  emailError.value = ''
  pass.value = ''
  passError.value = ''
  emit('login-closed')
}
function openRegister() {
  email.value = ''
  emailError.value = ''
  pass.value = ''
  passError.value = ''
  emit('register-open')
}

async function tryLogin() {
  try {
    const logRes = await login(email.value, pass.value)
    setAuthToken(logRes.accessToken)
    emit('login-attempt', email.value)
  } catch (e) {
    if (e instanceof Error) {
      loginError.value = e.message
    }
  }
}
</script>

<template>
  <Modal :open="open" @closed="closeModal">
    <form class="form">
      <Heading size="2" text="Вход в ваш аккаунт" />
      <div class="form__inputs">
        <EmailInput :email="email" :error="emailError" @update:email-data="updateEmailData" />
        <PasswordInput
          label="Пароль"
          :error="passError"
          :pass="pass"
          @update:password="updatePassData"
        />
      </div>
      <div class="form__footer">
        <div class="form__footer-interactive">
          <TheButton @click="tryLogin"
            ><template v-slot:text><span>Войти</span></template></TheButton
          >
          <div class="form__info">
            <p>У вас нет аккаунта?</p>
            <TheLink @click="openRegister" text="Зарегистрируйтесь" />
          </div>
        </div>
        <ErrorMessage v-show="loginError" :error="loginError" />
      </div>
    </form>
  </Modal>
</template>
