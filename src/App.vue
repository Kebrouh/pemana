<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import HeaderApp from '@/components/commun/HeaderApp/HeaderApp.vue'

  const contenu = ref(null)

  //lien d'évitement : on ne passe pas par le href, car le routeur du site utilise le # pour les pages
  const allerAuContenu = () => contenu.value?.focus()
</script>

<template>
  <div class="interface">

    <a class="lien-evitement" href="#contenu" @click.prevent="allerAuContenu">Aller au contenu</a>

    <HeaderApp />

    <main id="contenu" class="zone-contenu" ref="contenu" tabindex="-1">
      <RouterView class="contenu"/>
    </main>

  </div>
</template>

<style scoped>

</style>
