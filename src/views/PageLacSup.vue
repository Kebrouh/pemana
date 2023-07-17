<script setup>
    import AffichageLacSup from '@/components/AffichageData/AffichageLacSup.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        window.scrollTo({top:0});
    })
</script>

<template>
    
    <div class="accueil-lacSup">

        <AffichageLacSup />

        <FooterApp />

    </div>

</template>

<style scoped>

</style>
