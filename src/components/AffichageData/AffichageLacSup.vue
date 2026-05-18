<script setup>

    import VignetteLogement from '@/components/AffichageData/VignetteLogement.vue'
    
    import location from '@/assets/json/location.json'

</script>

<template>
    
    <div class="affichage-lacSup">

        <div class="titre">
            <h2>Logements au</h2>
            <h1>Lac-Supérieur</h1>
            <div class="wrapImg">
                <img src="@/assets/img/logo_pemana_light_plein.svg" alt="">
            </div>

            <a class="wheater" href="https://www.meteomedia.com/fr/chalet/ca/quebec/lac-superieur/actuelle" target="blank">
                <p>Météo</p>
                <span class="material-symbols-outlined">cloud</span>
            </a>

            <div class="video">
                <iframe 
                    class="vid"
                    src="https://drive.google.com/file/d/160SYng5KIrqu0jjVuswfTNgzy-v_0qob/preview" 
                    muted="1"
                    autoplay="1">
                </iframe>
            </div>
        </div>

        <div class="liste-vignette-logement" v-if="location">
            <VignetteLogement v-for="logement in location.lacSup" :key="logement.id"
                :objLogement="logement"
            />
        </div>

    </div>

</template>

<style scoped>

</style>
