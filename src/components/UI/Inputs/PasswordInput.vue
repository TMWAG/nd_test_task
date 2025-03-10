<script setup lang="ts">
import { ref } from 'vue'
import InputWrapper from './InputWrapper.vue'
import OnPassword from '@/components/icons/On-Password.vue'
import OffPassword from '@/components/icons/Off-Password.vue'
withDefaults(
  defineProps<{
    label: string
    error: string
    pass: string
  }>(),
  {
    label: 'Пароль',
  },
)
const emit = defineEmits<{
  (e: 'update:password', pass: string): void
}>()

function validatePass(e: Event) {
  const input = e.target as HTMLInputElement
  emit('update:password', input.value)
}

const passType = ref<'text' | 'password'>('password')
function togglePassVisibility() {
  passType.value = passType.value === 'text' ? 'password' : 'text'
}
</script>

<template>
  <InputWrapper :label="label" :error-message="error" v-slot="s">
    <input
      placeholder="Введите пароль"
      class="input"
      required
      :type="passType"
      :id="s.id"
      :value="pass"
      @input="validatePass"
    />
    <button
      class="input__toggle-pass"
      :class="'input__toggle-pass_hidden'"
      @click.prevent="togglePassVisibility"
    >
      <OnPassword v-if="passType === 'password'" />
      <OffPassword v-else />
    </button>
  </InputWrapper>
</template>
