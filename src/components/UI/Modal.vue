<script setup lang="ts">
import Close from '../icons/Close.vue'
import TheButton from './TheButton.vue'

defineProps<{
  open: boolean
}>()
defineEmits<{
  (e: 'closed'): void
}>()
</script>

<template>
  <div class="modal" :class="open ? '' : 'modal-closed'" @click.self="$emit('closed')">
    <div class="modal__window">
      <TheButton class="close" @click="$emit('closed')">
        <template v-slot:icon>
          <Close />
        </template>
      </TheButton>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '~/colors' as colors;
@use 'sass:color' as mixer;

.modal {
  position: fixed;
  top: 0%;
  left: 0%;
  border: none;
  width: 100%;
  height: 102%;
  background-color: mixer.adjust($color: colors.$dark, $alpha: -0.3);
  &[x-register-modal] {
    & > .modal__window {
      @media (max-width: 360px) {
        padding: 42px 16px;
      }
    }
    & .form__footer-interactive {
      @media (max-width: 360px) {
        gap: 20px;
      }
    }
  }

  &__window {
    width: 780px;
    height: fit-content;
    position: absolute;
    background-color: colors.$dark-middle;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 80px;
    border-radius: 40px;

    @media (max-width: 1366px) {
      width: 594px;
      padding: 56px;
    }

    @media (max-width: 768px) {
      width: 688px;
    }

    @media (max-width: 360px) {
      width: 352px;
      height: 632px;
      padding: 90px 16px;
    }

    & > .close {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }

  &-closed {
    visibility: hidden;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media (max-width: 360px) {
      gap: 28px;
    }

    &__inputs {
      display: flex;
      flex-direction: column;
      gap: 24px;

      @media (max-width: 360px) {
        gap: 16px;
      }
    }

    &__footer {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &-interactive {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;

        @media (max-width: 360px) {
          flex-direction: column;
          gap: 12px;
        }

        & > .button {
          @media (max-width: 360px) {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }

    &__info {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;

      @media (max-width: 360px) {
        font-size: 14px;
        line-height: 24px;
      }

      & > p {
        color: colors.$gray;
        font-weight: 400;
      }

      &:has(> :only-child) {
        justify-content: end;
      }
    }
  }
}
</style>
