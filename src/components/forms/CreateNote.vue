<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../UI/Modal.vue'
import Heading from '../UI/Heading.vue'
import TextInput from '../UI/Inputs/TextInput.vue'
import TextArea from '../UI/Inputs/TextArea.vue'
import TheButton from '../UI/TheButton.vue'
import ErrorMessage from '../UI/ErrorMessage.vue'
import { createNote } from '@/api/notes'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'create-closed'): void
  (e: 'created', note: INote): void
}>()

const title = ref<string>('')
function onUpdateTitle(text: string) {
  title.value = text
}
const content = ref<string>('')
function onUpdateContent(text: string) {
  content.value = text
}

const creationError = ref<string>('')
async function tryCreateNote() {
  try {
    const createRes = await createNote({
      title: title.value,
      content: content.value,
    })
    title.value = ''
    content.value = ''
    emit('created', createRes)
  } catch (e) {
    if (e instanceof Error) {
      creationError.value = e.message
    }
  }
}

function closeCreateNote() {
  title.value = ''
  content.value = ''
  creationError.value = ''
  emit('create-closed')
}
</script>

<template>
  <Modal :open="open" @closed="closeCreateNote">
    <form class="form">
      <Heading size="2" text="Добавление заметки" />
      <div class="form__input">
        <TextInput
          label="Название заметки"
          placeholder="Введите название"
          :text="title"
          :limit="100"
          @update:text="onUpdateTitle"
        />
        <TextArea
          label="Текст заметки"
          placeholder="Введите текст"
          :limit="500"
          :text="content"
          @update:text="onUpdateContent"
        />
      </div>
      <div class="form__footer">
        <div class="form__footer-interactive">
          <TheButton @click="tryCreateNote">
            <template v-slot:text>
              <span>Добавить</span>
            </template>
          </TheButton>
        </div>
        <ErrorMessage v-show="creationError" :error="creationError" />
      </div>
    </form>
  </Modal>
</template>
