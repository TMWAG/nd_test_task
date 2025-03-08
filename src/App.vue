<script setup lang="ts">
import { computed, ref } from 'vue';
import MainPage from './components/pages/MainPage.vue';
import NotesPage from './components/pages/NotesPage.vue';
import Header from './components/UI/Header.vue';
import { logout } from './api/auth';
import { unsetAuthToken } from './utils/authToken';

// начало плясок с бубном из-за ограничений на
// использование только vue, html, css и препроцессоров
const currentPage = ref<"Main" | "Notes">(
  localStorage.getItem('email') ? 'Notes' : "Main"
);

const pages = {
  "Main": MainPage,
  "Notes": NotesPage
}

function showHomePage() {
  currentPage.value = "Main";
}
function showNotesPage() {
  currentPage.value = "Notes";
}

const renderPage = computed(() => pages[currentPage.value]);
// конец плясок с бубном

const isLoginOpen = ref<boolean>(false)

const userEmail = ref<string>(localStorage.getItem('email') ?? "");
function onSuccessfulLogin(email: string) {
  userEmail.value = email
  isLoginOpen.value = false
  showNotesPage()
}
function onLogout() {
  logout()
  localStorage.removeItem('email')
  unsetAuthToken();
  userEmail.value = ""
  currentPage.value = 'Main'
}

</script>

<template>
  <Header :email="userEmail" @logout="onLogout" />
  <main class="main">
    <component
      :is="renderPage"
      :key="renderPage.toString()"
      @successful-login="onSuccessfulLogin"
    />
  </main>
</template>

<style lang="scss">
.main {
  position: relative;
  padding: 0 160px;

  @media(max-width: 1366px) {
    padding: 0 80px;
  }

  @media(max-width: 768px) {
    padding: 40px;
    padding-bottom: 0;
  }

  @media(max-width: 360px) {
    padding: 20px;
    padding-bottom: 0;
  }
}
.add_button {
  position: fixed;
  right: 40px;
  bottom: 40px;
}
</style>
