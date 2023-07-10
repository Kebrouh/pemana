<script setup>
  import noImage from '@/assets/img/no-img.png'

  const props = defineProps({
    objCat: null
  })

  const getImagePath = (img) => {
    if (img) {
      return import(`@/assets/img/${img}`).then((module) => module.default)
    } else {
      return Promise.resolve(noImage)
    }
  }
</script>

<template>

    <RouterLink class="vignetteCategorie" :to="props.objCat.link">
        <div class="wrapImg">
        <img :src="getImagePath(props.objCat.img)" :alt="props.objCat.name">
        </div>
        <div class="wrapInfo">
        <span class="material-symbols-outlined" v-text="props.objCat.icon"></span>
        <p v-text="props.objCat.name"></p>
        </div>
    </RouterLink>
    
</template>

<style scoped>

</style>
