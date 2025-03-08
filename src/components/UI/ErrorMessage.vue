<script setup lang="ts">
defineProps<{ error: string }>();
</script>

<template>
  <p class="error">{{ error }}</p>
</template>

<style lang="scss">
@use '~/colors' as colors;
@use '~/text' as text;
@use 'sass:color' as mixer;

.error {
  min-height: 44px;
  width: 100%;
  color: colors.$error;
  background-color: mixer.adjust($color: colors.$error, $alpha: -0.9);
  font-weight: 400;
  font-size: text.$small;
  line-height: 28px;
  padding: 8px 20px;
  border-radius: 24px;
}
</style>
