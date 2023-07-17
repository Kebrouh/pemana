<script setup>
    import AccueilSite from '@/components/AccueilSite/AccueilSite.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        window.scrollTo({top:0});
    })
</script>

<template>
    
    <div class="accueil">

        <AccueilSite />

        <FooterApp />

    </div>

</template>

<style scoped>

</style>
