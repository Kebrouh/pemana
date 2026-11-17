<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'

    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    import GalerieLogement from '@/components/AffichageData/GalerieLogement.vue'
    import VignetteLogement from '@/components/AffichageData/VignetteLogement.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import location from '@/assets/json/location.json'
    import { contacts, lienTel } from '@/data/contact.js'
    import { LIEUX, prixNumerique, formaterPrix, libelleChambres, libelleSdb, decouperDescription } from '@/lib/logement.js'

    const route = useRoute();

    //logement demandé par l'adresse, undefined si l'emplacement ou l'id n'existe pas
    const logement = computed(() => location[route.params.emplacement]?.[route.params.id])
    const lieu = computed(() => LIEUX[route.params.emplacement])
    const description = computed(() => decouperDescription(logement.value?.description))

    //les autres logements du même endroit, pour continuer la visite
    const autres = computed(() => {
        const liste = location[route.params.emplacement] || []
        const i = liste.findIndex((l) => l.id === logement.value?.id)
        return [1, 2, 3].map((pas) => liste[(i + pas) % liste.length]).filter((l, k, tab) => l && l.id !== logement.value?.id && tab.indexOf(l) === k)
    })

</script>

<template>

    <div class="details">

        <div class="page-contenu page-logement" v-if="logement">

            <RouterLink class="lien-retour" :to="lieu.route">
                <IconeSvg nom="arrow_back" />
                Tous les logements, {{ lieu.nom }}
            </RouterLink>

            <div class="logement">

                <GalerieLogement class="logement__galerie"
                    :images="logement.images"
                    :alt="`${logement.name}, ${logement.adresse}`"
                />

                <aside class="logement__resume carte">
                    <span class="etiquette" v-text="lieu.nom"></span>
                    <h1 v-text="logement.name"></h1>
                    <p class="logement__adresse">
                        <IconeSvg nom="location_on" />
                        <span>{{ logement.adresse }}</span>
                    </p>

                    <ul class="specs">
                        <li><IconeSvg nom="bed" />{{ libelleChambres(logement.room) }}</li>
                        <li><IconeSvg nom="bathtub" />{{ libelleSdb(logement.bathroom) }}</li>
                    </ul>

                    <p class="logement__prix" v-if="prixNumerique(logement.prix)">
                        <strong v-text="formaterPrix(logement.prix)"></strong>
                        <span>par mois</span>
                    </p>
                    <p class="logement__prix logement__prix--demande" v-else>
                        <strong>Prix sur demande</strong>
                    </p>

                    <div class="logement__actions">
                        <a class="bouton bouton--vert bouton--large" :href="lienTel(contacts.principal.tel)">
                            <IconeSvg nom="call" />
                            {{ contacts.principal.tel }}
                        </a>
                        <RouterLink class="bouton bouton--contour bouton--large" to="/service">
                            Appel de service
                            <IconeSvg nom="person" />
                        </RouterLink>
                    </div>
                </aside>

                <section class="logement__description">
                    <h2 class="titre-section">À propos de ce <span>logement</span></h2>
                    <p class="logement__accroche" v-if="description.accroche" v-text="description.accroche"></p>
                    <p v-text="description.corps"></p>
                </section>

            </div>

            <section class="logement__autres" v-if="autres.length">
                <h2 class="titre-section">Autres logements, <span>{{ lieu.nom }}</span></h2>
                <div class="grille-logements">
                    <VignetteLogement v-for="autre in autres" :key="autre.emplacement + autre.id"
                        :objLogement="autre"
                    />
                </div>
            </section>

        </div>

        <div class="page-contenu logement-introuvable" v-else>
            <h2 class="titre-section">Ce logement n'est plus disponible</h2>
            <RouterLink class="bouton bouton--vert" to="/">Retour à l'accueil</RouterLink>
        </div>

        <!-- sur téléphone, l'appel reste à portée du pouce pendant tout le défilement -->
        <div class="barre-appel" v-if="logement">
            <a class="bouton bouton--vert bouton--large" :href="lienTel(contacts.principal.tel)">
                <IconeSvg nom="call" />
                Appeler le {{ contacts.principal.tel }}
            </a>
        </div>

        <FooterApp />

    </div>


</template>

<style scoped>

</style>
