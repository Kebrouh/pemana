<script setup>

    import VignetteLogement from '@/components/AffichageData/VignetteLogement.vue'
    import EntetePage from '@/components/commun/EntetePage/EntetePage.vue'

    import location from '@/assets/json/location.json'

    defineProps({
        emplacement : { type: String, required: true },     //clé dans location.json
        surtitre : { type: String, required: true },
        titre : { type: String, required: true },
        meteoUrl : { type: String, required: true },
    })

</script>

<template>

    <div class="page-contenu page-liste">

        <EntetePage :surtitre="surtitre" :titre="titre">
            <template #actions>
                <a class="bouton" :href="meteoUrl" target="_blank" rel="noopener noreferrer">
                    Météo <span class="material-symbols-outlined" aria-hidden="true">cloud</span>
                </a>
                <RouterLink class="bouton" to="/service">
                    Appel de service <span class="material-symbols-outlined" aria-hidden="true">person</span>
                </RouterLink>
            </template>
        </EntetePage>

        <div class="page-liste__complement" v-if="$slots.complement">
            <slot name="complement" />
        </div>

        <div class="grille-logements" v-if="location[emplacement]">
            <VignetteLogement v-for="logement in location[emplacement]" :key="logement.id"
                :objLogement="logement"
            />
        </div>

    </div>

</template>

<style scoped>

</style>
