<script setup>
    import ListeLogements from '@/components/AffichageData/ListeLogements.vue'
</script>

<template>

    <ListeLogements
        emplacement="lacSup"
        surtitre="Logements au"
        titre="Lac-Supérieur"
        meteoUrl="https://www.meteomedia.com/fr/chalet/ca/quebec/lac-superieur/actuelle"
    >
        <template #complement>
            <div class="video-cadre">
                <iframe
                    class="vid"
                    src="https://drive.google.com/file/d/160SYng5KIrqu0jjVuswfTNgzy-v_0qob/preview"
                    title="Vidéo de présentation des logements au Lac-Supérieur"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                    loading="lazy">
                </iframe>
            </div>
        </template>
    </ListeLogements>

</template>

<style scoped>

</style>
