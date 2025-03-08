<script setup lang="ts">
import InputWrapper from './InputWrapper.vue';

defineProps<{
  email: string;
  error: string;
}>();

const emit = defineEmits<{
  (e: 'update:emailData', email: string, error: string): void;
}>();

function validateEmail(e: Event) {
  const input = e.target as HTMLInputElement;
  emit(
    "update:emailData",
    input.value,
    input.checkValidity() ? '': input.validationMessage
  )
}
</script>

<template>
  <InputWrapper label="Email" :error-message="error" v-slot="s">
    <input
      type="email"
      placeholder="Введите email"
      class="input"
      required
      :id="s.id"
      :value="email"
      @input="validateEmail"
    />
  </InputWrapper>
</template>
