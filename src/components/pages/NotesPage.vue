<script setup lang="ts">
import { onBeforeMount, onBeforeUpdate, onUpdated, ref } from 'vue'
import CreateNote from '../forms/CreateNote.vue'
import Note from '../UI/Note.vue'
import Add from '../icons/Add.vue'
import TheButton from '../UI/TheButton.vue'
import { modalStore } from '@/store/modalStore'
import { deleteNote, getNotes } from '@/api/notes'

const notes = ref<INote[]>([])

onBeforeMount(async () => {
  notes.value = (await getNotes()) ?? []
})

function showCreateNote() {
  modalStore.toggle('createNote')
}
function hideCreateNote() {
  modalStore.toggle('createNote')
}
function onNoteCreated(note: INote) {
  hideCreateNote()
  notes.value.push(note)
}
function onDeleteNote(id: number) {
  deleteNote(id)
  notes.value = notes.value.filter((note) => note.id !== id)
}
</script>

<template>
  <main class="main">
    <div class="notes">
      <Note v-for="note in notes" :note @delete-note="onDeleteNote" />
    </div>
    <TheButton @click="showCreateNote" class="add_button">
      <template v-slot:icon>
        <Add />
      </template>
    </TheButton>
    <CreateNote
      :open="modalStore.statuses.createNote"
      @create-closed="hideCreateNote"
      @created="onNoteCreated"
    />
  </main>
</template>

<style lang="scss">
.notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  @media (max-width: 1366px) {
    gap: 20px;
  }
  @media (max-width: 786px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
.add_button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  @media (max-width: 1366px) {
    right: 12px;
  }
  @media (max-width: 768px) {
    right: 8px;
  }
}
</style>
