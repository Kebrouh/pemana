<script setup>

    const props = defineProps({
        objCat : null
    })

    console.log(props.objCat)

</script>

<template>

    <RouterLink class="vignetteCategorie" :to="props.objCat.link">
        <div class="wrapImg">
            <img v-if="props.objCat.img" :src="props.objCat.img" :alt="props.objCat.name">
            <img v-else src="@/assets/img/no-img.png" :alt="props.objCat.name">
            
            <!-- <img src="@/assets/img/no-img.png" :alt="props.objCat.name"> -->
        </div>
    
        <div class="wrapInfo">
            <span class="material-symbols-outlined" v-text="props.objCat.icon"></span>
            <p v-text="props.objCat.name"></p>
        </div>
    </RouterLink>
    
</template>



<style scoped>

</style>
