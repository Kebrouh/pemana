<script setup>

    import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const ouvert = ref(false)
    const bouton = ref(null)
    const menu = ref(null)

    //la page du logement ou du service change toujours le contenu, le menu doit se refermer
    watch(() => route.fullPath, () => { ouvert.value = false })

    const basculer = async () => {
        ouvert.value = !ouvert.value

        //le clavier suit : premier lien à l'ouverture
        if (ouvert.value) {
            await nextTick()
            menu.value?.querySelector('a')?.focus()
        }
    }

    const fermer = () => {
        ouvert.value = false
    }

    const surEchap = (e) => {
        if (e.key === 'Escape' && ouvert.value) {
            fermer()
            bouton.value?.focus()
        }
    }

    onMounted(() => document.addEventListener('keydown', surEchap))
    onBeforeUnmount(() => document.removeEventListener('keydown', surEchap))

</script>

<template>

    <div class="navBar" :class="{ ouvert }">

        <button
            ref="bouton"
            class="menu-bouton"
            type="button"
            aria-controls="menu-principal"
            :aria-expanded="ouvert"
            :aria-label="ouvert ? 'Fermer le menu' : 'Ouvrir le menu'"
            @click="basculer"
        >
            <span class="barre"></span>
            <span class="barre"></span>
            <span class="barre"></span>
        </button>

        <div class="menu-fond" @click="fermer"></div>

        <nav id="menu-principal" class="menu" ref="menu" aria-label="Navigation principale" :inert="ouvert ? null : ''">

            <div class="menu-entete">
                <img src="@/assets/img/logo_pemana.svg" alt="Logo Pemana Inc.">
            </div>

            <ul class="menu-liste">
                <li><RouterLink class="menu-lien" to="/" @click="fermer">Accueil</RouterLink></li>
                <li><RouterLink class="menu-lien" to="/service" @click="fermer">Appel de service</RouterLink></li>
                <li><RouterLink class="menu-lien" to="/marina" @click="fermer">Quai Marina Zool</RouterLink></li>
                <li><RouterLink class="menu-lien" to="/lac-superieur" @click="fermer">Logement Lac-Supérieur</RouterLink></li>
                <li><RouterLink class="menu-lien" to="/saint-jerome" @click="fermer">Logement Saint-Jérôme</RouterLink></li>
                <li><RouterLink class="menu-lien" to="/a-venir" @click="fermer">Projet à venir</RouterLink></li>
            </ul>

        </nav>

    </div>

</template>

<style scoped>

</style>
