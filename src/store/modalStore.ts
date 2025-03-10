import { reactive } from 'vue'

type ModalStatuses = keyof typeof modalStore.statuses

export const modalStore = reactive({
  statuses: {
    login: false,
    register: false,
    createNote: false,
  },
  toggle(modalName: ModalStatuses): void {
    for (const key of Object.keys(this.statuses) as ModalStatuses[]) {
      if (key == modalName) {
        if (this.statuses[modalName]) {
          this.statuses[modalName] = false
        } else {
          this.statuses[modalName] = true
        }
        continue
      }
      this.statuses[key] = false
    }
  },
})
