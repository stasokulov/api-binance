import { defineStore } from 'pinia'
import { ref } from 'vue'

const wsUrl = 'wss://stream.binance.com:443/ws/'
const queryPostfix = '@depth'
const getFullUrl = (pair) => `${wsUrl}${pair}${queryPostfix}`

const getWs = (pair) => {
  return new WebSocket(getFullUrl(pair))
}

export const useAppStore = defineStore('app', () => {
  const cyrencies = ['btcusdt', 'bnbbtc', 'ethbtc']
  const activePair = ref(cyrencies[0])
  const orders = ref([])
  let ws = null

  const setPair = (str) => {
    activePair.value = str
  }

  const openWs = () => {
    if (ws) ws.close()

    ws = getWs(activePair.value)

    // ws.onopen = (event) => {
    //   console.log("ws.onopen, event", event)
    // }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      orders.value = message
    }

    // ws.onerror = (event) => {
    //   showError(event)
    // }

    // ws.onclose = (event) => {
    // }
  }

  return {
    openWs,
    orders,
    setPair,
    activePair,
    cyrencies,
  }
})
