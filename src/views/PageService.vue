<script setup>
    import AffichageService from '@/components/AffichageData/AffichageService.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        window.scrollTo({top:0});
    })
</script>

<template>
    
    <div class="service">

        <AffichageService />

        <FooterApp />

    </div>

</template>

<style scoped>

</style>
