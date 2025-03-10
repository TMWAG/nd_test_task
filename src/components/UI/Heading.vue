<script setup lang="ts">
const props = defineProps<{
  size: '1' | '2' | '3' | '4'
  text: string
}>()
const tag = `h${props.size}`
</script>

<template>
  <tag class="heading">{{ text }}</tag>
</template>

<style lang="scss">
@use 'sass:map';
@use '~/colors' as colors;

.heading {
  color: colors.$white;
}

$headings: (
  h1: (
    weight: 900,
    size: 104px,
  ),
  h2: (
    weight: 600,
    size: 48px,
  ),
  h3: (
    weight: 400,
    size: 32px,
  ),
  h4: (
    weight: 600,
    size: 24px,
  ),
);

@each $tag, $styles in $headings {
  #{$tag}.heading {
    font-weight: map.get($styles, weight);
    font-size: map.get($styles, size);
  }
}
h2.heading {
  line-height: 72px;
  @media (max-width: 360px) {
    font-size: 32px;
    line-height: 36px;
  }
}
h4.heading {
  font-size: 20px;
  line-height: 26px;
}
</style>
