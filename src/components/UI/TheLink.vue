<script setup lang="ts">
defineProps<{
  text: string;
}>();
defineEmits<{
  (e: 'click'): void,
}>();
</script>

<template>
  <a class="link" @click="$emit('click')">{{ text }}</a>
</template>

<style lang="scss">
@use '~/colors' as colors;
.link {
  text-decoration: none;
  font-weight: 700;
  color: colors.$green-light;
  cursor: pointer;
  transition: color .5s;
  &:hover {
    color: colors.$white;
  }
}
</style>
