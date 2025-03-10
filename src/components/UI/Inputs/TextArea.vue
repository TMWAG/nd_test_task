<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import InputWrapper from './InputWrapper.vue'

const props = defineProps<{
  label: string
  text: string
  placeholder: string
  limit: number
}>()

const emit = defineEmits<{
  (e: 'update:text', text: string): void
}>()

const textValue = ref<string>(props.text)
watch(
  () => props.text,
  (newText) => (textValue.value = newText),
)
const count = computed(() => textValue.value.length)

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  emit('update:text', input.value)
}
</script>

<template>
  <InputWrapper :label="label" :max-chars="limit" :chars-count="count" v-slot="s">
    <textarea
      class="input"
      required
      :placeholder="placeholder"
      :id="s.id"
      :value="text"
      @input="onInput"
    >
    </textarea>
  </InputWrapper>
</template>
