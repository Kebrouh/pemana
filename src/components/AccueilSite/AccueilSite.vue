<script setup>
  import VignetteCategorie from '@/components/AccueilSite/VignetteCategorie.vue';

  import categorieData from '@/assets/json/categories.json'

  const imagePaths = import.meta.glob('@/assets/img/*.jpg', { eager: true, as: 'url' });

  console.log(imagePaths);
  
  // for (const categorie of categorieData) {
  //   categorie.img = imagePaths['.' + categorie.img];
  //   console.log(categorie.img)
  // } //img gets undefined
  

</script>


<template>
    <div class="accueil-site">
      <div class="accueil-top">
        <div class="wrapImg">
          <img src="/pemana_accueil_site.jpg" alt="img-accueil">
        </div>
        <div class="wrapInfo">
          <div class="info-container">
            <h1>Pemana Inc.</h1>
            <h3>Location de logement et de quai</h3>
            <div class="wrapImg">
              <img src="@/assets/img/logo_pemana_light.svg" alt="logo-light-full">
            </div>
          </div>
        </div>
        <div class="wrapGoop1">
          <img src="@/assets/img/goop4.svg" alt="goop4">
        </div>
        <div class="wrapGoop2">
          <img src="@/assets/img/goop4.svg" alt="goop4">
        </div>
      </div>
  
      <div class="listeVignetteCat" v-if="categorieData">
        <h2>Explorer nos locations</h2>
        <VignetteCategorie v-for="categorie in categorieData" :key="categorie.id" :objCat="categorie"/>
      </div>
    </div>
  </template>

<style scoped>

</style>
