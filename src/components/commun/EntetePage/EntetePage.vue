<script setup>

    defineProps({
        surtitre : { type: String, default: '' },
        titre : { type: String, required: true },
    })

</script>

<template>

    <header class="entete-page">

        <div class="entete-page__titres">
            <p class="entete-page__surtitre" v-if="surtitre" v-text="surtitre"></p>
            <h1 class="entete-page__titre" v-text="titre"></h1>
        </div>

        <div class="entete-page__actions" v-if="$slots.actions">
            <slot name="actions" />
        </div>

    </header>

</template>

<style scoped>

</style>
