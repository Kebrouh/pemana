<script setup>
    import AffichageAVenir from '@/components/AffichageData/AffichageAVenir.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        window.scrollTo({top:0});
    })
</script>

<template>
    
    <div class="a-venir">

        <AffichageAVenir />

        <FooterApp />

    </div>

</template>

<style scoped>

</style>
