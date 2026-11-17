<script setup>

    import { icones } from '@/lib/icones.js'

    //nom : une clé de src/lib/icones.js. Les classes passées par la page (taille, pastille, couleur) restent sur le <span>.
    defineProps({
        nom : { type: String, required: true },
    })

</script>

<template>

    <span class="material-symbols-outlined" aria-hidden="true">
        <svg viewBox="0 -960 960 960" focusable="false"><path :d="icones[nom]" /></svg>
    </span>

</template>

<style scoped>

</style>
