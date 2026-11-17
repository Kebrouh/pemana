<script setup>
    import NavBar from '@/components/navBar/navBar.vue'
</script>

<template>
    
    <header class="header">

        <NavBar />
        
        <RouterLink class="wrapLogo" to="/">
            <img src="@/assets/img/logo_pemana_no_name.svg" alt="Pemana Inc., accueil">
        </RouterLink>

    </header>

</template>

<style scoped>

</style>
