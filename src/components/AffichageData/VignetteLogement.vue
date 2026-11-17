<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'

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
                <IconeSvg nom="location_on" />
                <span v-text="props.objLogement.adresse"></span>
            </p>

            <ul class="specs">
                <li><IconeSvg nom="bed" />{{ libelleChambres(props.objLogement.room) }}</li>
                <li><IconeSvg nom="bathtub" />{{ libelleSdb(props.objLogement.bathroom) }}</li>
            </ul>

            <p class="carte-logement__accroche" v-if="description.accroche" v-text="description.accroche"></p>
            <p class="carte-logement__description" v-text="description.corps"></p>

            <span class="carte-logement__lien">
                Voir le logement
                <IconeSvg nom="arrow_forward" />
            </span>
        </div>

    </RouterLink>

</template>

<style scoped>

</style>
