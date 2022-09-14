import { watch } from 'vue'
import { useStore } from '@/store'

const useSubscription = (callback: Function) => {
  const store = useStore()

  watch(
    () => store.state.subscriptionMqttInfo,
    (value) => {
      callback(value)
    },
  )
}

export default useSubscription
