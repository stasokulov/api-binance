<template>
  <v-toolbar title="Settings"></v-toolbar>
  <v-select
    label="Select"
    :items="cyrencies"
    v-model="activeCurencyPair"
  />
  <v-list lines="one">
    <v-list-subheader>Logs:</v-list-subheader>
    <v-list-item
      v-for="log in logs"
      :key="log.date"
      :title="`${log.oldValue} ${log.newValue}`"
      :subtitle="`${log.date}`"
    ></v-list-item>
  </v-list>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDate } from 'vuetify'
import { useAppStore } from '@/stores/app'

const date = useDate()
const appStore = useAppStore()
const { setPair, openWs, cyrencies, activePair } = appStore

const activeCurencyPair = ref(activePair)
const logs = ref([])

const addLog = (newValue, oldValue) => {
  logs.value.push({
    newValue,
    oldValue,
    date: `${date.format(new Date, 'keyboardDate')}, ${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`
  })
  console.log(logs.value)
}

watch(activeCurencyPair, (newValue, oldValue) => {
  setPair(newValue)
  openWs()
  addLog(newValue, oldValue);
})
</script>
