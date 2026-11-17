<script setup>

    import { bandeauOuvert, accepter, refuser } from '@/lib/consentement.js'

</script>

<template>

    <!-- bande en bas de l'écran, pas une fenêtre qui bloque : on peut continuer à lire sans répondre -->
    <section class="bandeau-consentement" v-if="bandeauOuvert" aria-labelledby="consentement-titre">

        <div class="bandeau-consentement__texte">
            <h2 id="consentement-titre">Mesure de la fréquentation du site</h2>
            <p>
                Avec votre accord, nous utilisons Google Analytics pour savoir quelles pages sont consultées.
                Rien n'est envoyé à Google tant que vous n'avez pas accepté.
                <RouterLink to="/confidentialite">En savoir plus</RouterLink>
            </p>
        </div>

        <div class="bandeau-consentement__boutons">
            <button class="bouton bouton--contour" type="button" @click="refuser">Refuser</button>
            <button class="bouton bouton--contour" type="button" @click="accepter">Accepter</button>
        </div>

    </section>

</template>

<style scoped>

</style>
