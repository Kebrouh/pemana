<script setup>
    import { resolveAsset } from 'vite'
    import { defineProps } from 'vue'

    const props = defineProps({
        objCat : null
    })

    const getImagePath = (img) => {
    if (img) {
        return resolveAsset(`./img/${img}`)
    } else {
        return resolveAsset('./img/no-img.png')
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
