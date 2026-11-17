<script setup>

    import { computed } from 'vue'
    import { urlMiniature, prixNumerique, formaterPrix, libelleChambres, libelleSdb, decouperDescription } from '@/lib/logement.js'

    const props = defineProps({
        objLogement : null,
    })

    const description = computed(() => decouperDescription(props.objLogement.description))

</script>

<template>

    <RouterLink class="carte-logement" :to="{name:'details', params: {emplacement: props.objLogement.emplacement, id: props.objLogement.id}}">

        <div class="carte-logement__photo">
            <img :src="urlMiniature(props.objLogement.images[0])" :alt="`${props.objLogement.name}, ${props.objLogement.adresse}`" loading="lazy" decoding="async">

            <p class="carte-logement__prix" v-if="prixNumerique(props.objLogement.prix)">
                <strong v-text="formaterPrix(props.objLogement.prix)"></strong>
                <span>par mois</span>
            </p>
            <p class="carte-logement__prix carte-logement__prix--demande" v-else>
                Prix sur demande
            </p>
        </div>

        <div class="carte-logement__corps">
            <h2>{{ props.objLogement.name }}<span class="visuellement-cache">, {{ props.objLogement.adresse }}</span></h2>
            <p class="carte-logement__adresse">
                <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
                <span v-text="props.objLogement.adresse"></span>
            </p>

            <ul class="specs">
                <li><span class="material-symbols-outlined" aria-hidden="true">bed</span>{{ libelleChambres(props.objLogement.room) }}</li>
                <li><span class="material-symbols-outlined" aria-hidden="true">bathtub</span>{{ libelleSdb(props.objLogement.bathroom) }}</li>
            </ul>

            <p class="carte-logement__accroche" v-if="description.accroche" v-text="description.accroche"></p>
            <p class="carte-logement__description" v-text="description.corps"></p>

            <span class="carte-logement__lien">
                Voir le logement
                <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </span>
        </div>

    </RouterLink>

</template>

<style scoped>

</style>
