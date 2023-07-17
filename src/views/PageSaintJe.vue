<script setup>
    import AffichageSaintJe from '@/components/AffichageData/AffichageSaintJe.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        window.scrollTo({top:0});
    })
</script>

<template>
    
    <div class="accueil-saintJe">

        <AffichageSaintJe />

        <FooterApp />

    </div>

</template>

<style scoped>

</style>
