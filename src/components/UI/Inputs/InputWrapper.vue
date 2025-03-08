<script setup lang="ts">
import getInputId from '@/utils/getInputId';

defineProps<{
  label: string;
  maxChars?: number;
  charsCount?: number;
  errorMessage?: string;
}>();
const id = getInputId();
</script>

<template>
  <div class="input-wrapper">
    <label class="input-wrapper__label" :for="id">{{ label }}</label>
    <slot :id="id"/>
    <div class="input-info">
      <span v-if="errorMessage" class="input-info__error">{{ errorMessage }}</span>
      <span v-if="maxChars" class="input-info__chars-count">{{ charsCount }}/{{ maxChars }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/text' as text;
@use '~/colors' as colors;
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  min-height: 108px;
  max-height: 144px;
  &__label {
    font-size: text.$normal;
    font-weight: 400;
    color: colors.$gray;
    margin-left: 24px;
  }
  &:has(>textarea) {
    max-height: 316px;
  }
}
.input-info {
  display: flex;
  justify-content: space-between;
  color: colors.$white;
  padding: 0 24px;
  &__error {
    color: colors.$error;
  }
  &__chars-count {
    color: colors.$gray;
    font-size: text.$small;
    font-weight: 400;
  }
  &:has(> :only-child) {
    justify-content: end;
  }
}
.input {
  padding: 28px;
  border-radius: 36px;
  border: 2px solid colors.$white;
  transition: border-color .5s;
  height: 27px;
  color: colors.$dark;
  font-size: text.$small;
  line-height: 28px;
  scrollbar-width: none;
  resize: none;
  overflow: hidden;

  &:hover {
    border-color: colors.$green-light;
  }

  &:focus {
    outline: none;
    border-color: colors.$green-light;
  }

  &::placeholder {
    color: colors.$gray;
  }

  &__toggle-pass {
    background: none;
    border: none;
    position: absolute;
    right: 28px;
    cursor: pointer;
  }

  &[type="text"] {
    +.input__toggle-pass {
      top: 55px;
    }
  }

  &[type="password"] {
    +.input__toggle-pass {
      top: 56px;
    }
  }
}
textarea.input {
  height: 244px;
}
</style>
