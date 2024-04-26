<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <LogoSvg alt="Binance logo" class="default-layout__logo" />
        <RouterLink to="/">
          <v-btn>Settings</v-btn>
        </RouterLink>
        <RouterLink to="/order-book">
          <v-btn>order-book</v-btn>
        </RouterLink>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app'
import LogoSvg from '@/components/svg/LogoSvg.vue';

const appStore = useAppStore()
const { openWs } = appStore

onMounted(() => {
  openWs()
})
</script>

<style scoped lang="scss">
.default-layout__logo {
  display: block;
  margin-right: 2rem;
  width: 200px;
  color: var(--color-primary);
}
</style>
