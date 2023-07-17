<script setup>
  import { RouterView } from 'vue-router'
  import HeaderApp from '@/components/commun/HeaderApp/HeaderApp.vue'
</script>

<template>
  <div class="interface">

    <HeaderApp />
    <RouterView class="contenu"/>

    <RouterView class="contenu">
      <Transition 
        enter-active-class="animate_animated animate__fadeInDown"
        leave-active-class="animate_animated animate__fadeOutDown"
        mode="out-in"
      />
    </RouterView>

  </div>
</template>

<style scoped>

</style>
