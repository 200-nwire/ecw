import { defineStore } from 'pinia'
import { ref } from 'vue'

const useGlobalStore = defineStore('global', () => {
  const loading = ref<boolean>(false)
  const progress = ref<number | null>(null)
  /** SnackBar */
  const message = ref<string>('')
  const status = ref<string>('')

  /**
   * Show loading Overlay
   *
   * @param display - visibility
   */
  function setLoading(display: boolean): void {
    loading.value = display
    console.log('display :>> ', display)
    if (!display) {
      // Reset Progress value
      progress.value = null
    }
  }

  /**
   * Update progress value
   *
   * @param v - progress value
   */
  function setProgress(v: number | null = null): void {
    // update progress value
    progress.value = v
    // display loading overlay
    loading.value = true
  }

  /**
   * Show snackbar message
   *
   * @param msg - snackbar message
   * @param sts - snackbar status
   */
  function setSnackbar(msg: string = '', sts: string = ''): void {
    message.value = msg
    status.value = sts
  }

  return {
    loading,
    progress,
    message,
    status,
    setLoading,
    setProgress,
    setSnackbar,
  }
})

export default useGlobalStore
