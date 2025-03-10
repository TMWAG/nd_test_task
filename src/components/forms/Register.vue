<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../UI/Modal.vue'
import Heading from '../UI/Heading.vue'
import EmailInput from '../UI/Inputs/EmailInput.vue'
import PasswordInput from '../UI/Inputs/PasswordInput.vue'
import ErrorMessage from '../UI/ErrorMessage.vue'
import TheLink from '../UI/TheLink.vue'
import TheButton from '../UI/TheButton.vue'
import { register } from '@/api/reg'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'register-closed'): void
  (e: 'login-open'): void
  (e: 'register-attempt'): void
}>()

function closeModal() {
  email.value = ''
  emailError.value = ''
  password.value = ''
  passwordError.value = ''
  passwordConfirmation.value = ''
  passwordConfirmationError.value = ''
  emit('register-closed')
}

function openLogin() {
  email.value = ''
  emailError.value = ''
  password.value = ''
  passwordError.value = ''
  passwordConfirmation.value = ''
  passwordConfirmationError.value = ''
  emit('login-open')
}

const email = ref<string>('')
const emailError = ref<string>('')
function updateEmailData(newEmail: string, err: string) {
  email.value = newEmail
  emailError.value = err
}

const password = ref<string>('')
const passwordError = ref<string>('')
const passwordConfirmation = ref<string>('')
const passwordConfirmationError = ref<string>('')

function updatePassword(pass: string) {
  if (pass.length < 8) {
    passwordError.value = 'Пароль должен содержать от восьми символов'
  } else {
    passwordError.value = ''
  }
  if (pass === passwordConfirmation.value) {
    passwordConfirmationError.value = ''
  } else {
    passwordConfirmationError.value = 'Пароли не совпадают'
  }
  password.value = pass
}

function updatePasswordConfirmation(pass: string) {
  if (pass !== password.value) {
    passwordConfirmationError.value = 'Пароли не совпадают'
  } else {
    passwordConfirmationError.value = ''
  }
  passwordConfirmation.value = pass
}

async function tryRegister() {
  try {
    await register(email.value, password.value, passwordConfirmation.value)
    emit('register-attempt')
  } catch (e) {
    if (e instanceof Error) {
      registrationError.value = e.message
    }
  }
}

const registrationError = ref<string>('')
</script>

<template>
  <Modal :open="open" @closed="closeModal" :aria-hidden="!open" x-register-modal>
    <form class="form">
      <Heading size="2" text="Регистрация" />
      <div class="form__inputs">
        <EmailInput :email="email" :error="emailError" @update:email-data="updateEmailData" />
        <PasswordInput
          label="Пароль"
          :error="passwordError"
          :pass="password"
          @update:password="updatePassword"
        />
        <PasswordInput
          label="Пароль ещё раз"
          :error="passwordConfirmationError"
          :pass="passwordConfirmation"
          @update:password="updatePasswordConfirmation"
        />
        <div class="form__footer">
          <div class="form__footer-interactive">
            <TheButton @click="tryRegister"
              ><template v-slot:text><span>Зарегистрироваться</span></template>
            </TheButton>
            <div class="form__info">
              <p>У вас есть аккаунт?</p>
              <TheLink @click="openLogin" text="Войдите" />
            </div>
          </div>
          <ErrorMessage v-show="registrationError" :error="registrationError" />
        </div>
      </div>
    </form>
  </Modal>
</template>
