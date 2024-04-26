<template>
  <v-container>
    <v-toolbar :title="`Order book: ${activePair}`"></v-toolbar>
    <v-row>
      <v-col>
        <v-card title="asks">
          <v-data-table-virtual :items="asks" height="400" />
        </v-card>
      </v-col>
      <v-col>
        <v-card title="bids">
          <v-data-table-virtual :items="bids" height="400" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { orders, activePair } = storeToRefs(appStore)
const { smAndUp } = useDisplay()

const asks = computed(() => {
  return getOrders('a')
})

const bids = computed(() => {
  return getOrders('b')
})

const getOrders = (str) => {
  return orders?.value?.[str]?.filter(item => !!(+item[1])).map(item => {
    const newItem = {
      price: +item[0],
      quantity: +item[1],
    }
    if (smAndUp.value) {
      newItem.total = item[0] * item[1]
    }

    return newItem
  })
}

</script>
