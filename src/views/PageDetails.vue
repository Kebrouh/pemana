<script setup>

    import { useRoute } from 'vue-router'
    import { computed, watch, onBeforeMount } from 'vue'

    import AffichageDetailsImages from '@/components/AffichageData/AffichageDetailsImages.vue'
    import FooterApp from '@/components/commun/FooterApp/FooterApp.vue'

    import location from '@/assets/json/location.json'

    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { Navigation, Pagination, Virtual } from 'swiper/modules'
    import 'swiper/css'
    import 'swiper/css/bundle'

    const route = useRoute();

    //logement demandé par l'adresse, undefined si l'emplacement ou l'id n'existe pas
    const logement = computed(() => location[route.params.emplacement]?.[route.params.id])

    onBeforeMount(() => {
        window.scrollTo({top:0});
    })

    watch(() => route.fullPath, () => {
        window.scrollTo({top:0});
    })


</script>

<template>

    <div class="details">

        <div class="affichage-details" v-if="logement">

            <div class="fiche-image">

                <Swiper :slidesPerView="1" :spaceBetween="50" :modules="[Navigation, Pagination, Virtual]" navigation :pagination="{ clickable: true, dynamicBullets: true}" grab-cursor virtual>
                    <SwiperSlide v-for="image in logement.images" :key="image.id">
                        <AffichageDetailsImages
                            :objImage="image"
                            :alt="`${logement.name}, ${logement.adresse}`"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div class="wrapInfo">
                <h1 v-text="logement.name"></h1>
                <h3 v-text="logement.adresse"></h3>
                <div class="type">
                    <span class="material-symbols-outlined">bed</span>
                    <p v-text="logement.room"></p>
                    <span class="material-symbols-outlined">bathtub</span>
                    <p v-text="logement.bathroom"></p>
                </div>
                <p v-text="logement.description"></p>
                <div class="interesse">
                    <h2>Intéressé ?</h2>

                    <h2><span class="material-symbols-outlined">call</span>(514) 880-3770</h2>
                </div>

                <div class="wrapPrix">
                    <h1 v-text="logement.prix"></h1>
                    <h2>par mois</h2>
                </div>
            </div>


        </div>

        <div class="logement-introuvable" v-else>
            <h2>Ce logement n'est plus disponible</h2>
            <RouterLink to="/">Retour à l'accueil</RouterLink>
        </div>

        <FooterApp />

    </div>


</template>

<style scoped>

.logement-introuvable {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 4rem 1rem;
    text-align: center;
}

</style>
