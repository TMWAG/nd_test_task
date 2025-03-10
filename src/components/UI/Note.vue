<script setup lang="ts">
import Close from '../icons/Close.vue'
import Heading from './Heading.vue'
import TheButton from './TheButton.vue'

const props = defineProps<{ note: INote }>()

const emit = defineEmits<{
  (e: 'delete-note', id: number): void
}>()

function deleteNote() {
  emit('delete-note', props.note.id)
}
</script>

<template>
  <section class="note">
    <div class="note__cut" aria-hidden></div>
    <div class="note__corner" aria-hidden></div>
    <div class="note__header">
      <Heading size="4" :text="note.title" />
    </div>
    <div class="note__content">{{ note.content }}</div>
    <div class="note__footer">
      <TheButton @click="deleteNote" title="Нажмите, чтобы удалить заметку">
        <template v-slot:icon>
          <Close />
        </template>
        <template v-slot:text><span>Удалить</span></template>
      </TheButton>
    </div>
  </section>
</template>

<style lang="scss">
@use '~/colors' as colors;
@use '~/text' as text;

.note {
  background-color: colors.$green-light;
  border-radius: 5px;
  // min-width: 480px;
  height: fit-content;
  box-shadow: 0 15px 15px -10px black;
  position: relative;
  @media (max-width: 1366px) {
  }
  &__header {
    padding: 20px 28px;
    border-bottom: 1px solid colors.$green-middle;
  }
  &__cut {
    height: 42px;
    width: 42px;
    background-color: colors.$dark;
    position: absolute;
    top: -1px;
    right: -1px;
    clip-path: polygon(/* tl */ 0% 0%, /* tr */ 0% 0%, /* br */ 100% 0%, /* bl */ 100% 100%);
  }
  &__corner {
    height: 40px;
    width: 40px;
    border-bottom-left-radius: 5px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: colors.$green;
    clip-path: polygon(100% 100%, 0% 100%, 0% 0%, 0% 0%);
  }
  &__content {
    padding: 28px 28px 20px 28px;
    color: colors.$white;
    font-size: text.$normal;
    @media (max-width: 360px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
  &__footer {
    display: flex;
    justify-content: end;
    padding: 8px;
  }
}
</style>
