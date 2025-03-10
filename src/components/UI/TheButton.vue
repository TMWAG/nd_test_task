<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="button" @click.prevent="$emit('click')">
    <slot name="icon" />
    <slot name="text" />
  </button>
</template>

<style lang="scss">
@use '~/colors' as colors;
.button {
  background-color: colors.$green-light;
  color: colors.$white;
  border: none;
  font-size: 20px;
  line-height: 32px;
  border-radius: 32px;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 360px) {
  }
  &:hover {
    background-color: colors.$green-middle;
  }

  &:active {
    background-color: colors.$green-dark;
  }

  &:disabled {
    background-color: colors.$gray;
    cursor: not-allowed;
  }

  &:has(> :only-child) {
    padding: 0 20px;
  }
}
</style>
