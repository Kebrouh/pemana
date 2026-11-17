<script setup>
    import NavBar from '@/components/navBar/navBar.vue'
</script>

<template>
    
    <div class="header">

        <NavBar />
        
        <RouterLink class="wrapLogo" to="/">
            <img src="@/assets/img/logo_pemana_no_name.svg" alt="Pemana Inc., accueil">
        </RouterLink>

    </div>

</template>

<style scoped>

</style>
