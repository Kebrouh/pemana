<script setup>
  import VignetteCategorie from '@/components/AccueilSite/VignetteCategorie.vue';
  import categorieData from '@/assets/json/categories.json';

  const imagePaths = import.meta.glob('@/assets/img/*.jpg', { eager: true, as: 'url' });

  const modifiedCategories = categorieData.map(categorie => {
    const imageName = categorie.img.substring(categorie.img.lastIndexOf('/') + 1);
    const imagePath = imagePaths['./' + imageName];
    return {
      ...categorie,
      img: imagePath
    };
  });
</script>


<template>
    <div class="accueil-site">
      <div class="accueil-top">
        <div class="wrapImg">
          <img src="@/assets/img/69-71_00.jpg" alt="lac-sup-principal">
        </div>
        <div class="wrapInfo">
          <div class="info-container">
            <h1>Pemana Inc.</h1>
            <h3>Location de quai et de logement</h3>
            <div class="wrapImg">
              <img src="@/assets/img/logo_pemana_light.svg" alt="logo-light-full">
            </div>
          </div>
        </div>
      </div>
  
      <div class="listeVignetteCat" v-if="modifiedCategories">
        <h2>Explorer nos locations</h2>
        <VignetteCategorie v-for="categorie in modifiedCategories" :key="categorie.id" :objCat="categorie" />
      </div>
    </div>
  </template>

<style scoped>

</style>
