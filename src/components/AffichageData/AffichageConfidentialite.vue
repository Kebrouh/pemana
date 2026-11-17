<script setup>

    import EntetePage from '@/components/commun/EntetePage/EntetePage.vue'
    import { contacts, lienTel } from '@/data/contact.js'
    import { choix, rouvrirChoix } from '@/lib/consentement.js'

    const responsable = contacts.proprietaire

</script>

<template>

    <div class="page-contenu page-confidentialite">

        <EntetePage surtitre="Vos renseignements personnels" titre="Politique de confidentialité" />

        <div class="texte-long">

            <section>
                <h2 class="titre-section">Qui est <span>responsable</span></h2>
                <p>
                    Pemana Inc., {{ contacts.adresse }}.
                    La personne responsable de la protection des renseignements personnels est
                    {{ responsable.nom }}, {{ responsable.titre.toLowerCase() }} :
                    <a :href="`mailto:${contacts.courriel}`" v-text="contacts.courriel"></a>
                    ou <a :href="lienTel(responsable.tel)" v-text="responsable.tel"></a>.
                </p>
            </section>

            <section>
                <h2 class="titre-section">Ce que nous <span>recueillons</span> et pourquoi</h2>
                <ul class="liste-coches">
                    <li>
                        <strong>Le formulaire d'appel de service :</strong> votre nom, votre courriel, le sujet et la description
                        des problèmes que vous nous écrivez. Nous les utilisons seulement pour répondre à votre demande.
                    </li>
                    <li>
                        <strong>La mesure de la fréquentation, seulement si vous l'acceptez :</strong> les pages consultées, le type
                        d'appareil et de navigateur, et la provenance approximative des visites. Cela nous sert à savoir quelles
                        pages sont utiles. Elle se fait avec Google Analytics, qui dépose des témoins (cookies) dans votre navigateur.
                    </li>
                    <li>
                        <strong>Vos appels et vos courriels</strong> envoyés directement à notre équipe, que nous traitons comme
                        n'importe quel échange avec un client.
                    </li>
                </ul>
            </section>

            <section>
                <h2 class="titre-section">Qui y a <span>accès</span></h2>
                <p>
                    L'équipe de Pemana, et les services qui nous aident à faire fonctionner le site : EmailJS, qui transmet le
                    formulaire par courriel, Google pour notre boîte de réception et, si vous l'acceptez, pour la mesure de la
                    fréquentation. Ces services peuvent traiter les renseignements à l'extérieur du Québec, notamment aux
                    États-Unis. Nous ne vendons pas vos renseignements.
                </p>
            </section>

            <section>
                <h2 class="titre-section">Combien de <span>temps</span></h2>
                <p>
                    Les renseignements du formulaire sont gardés le temps de traiter votre demande, puis supprimés lorsqu'ils
                    ne sont plus utiles. Les données de fréquentation sont conservées selon les réglages du compte
                    Google Analytics de Pemana.
                </p>
            </section>

            <section>
                <h2 class="titre-section">Votre choix pour la <span>mesure</span></h2>
                <p>
                    Refuser n'empêche en rien d'utiliser le site.
                    <template v-if="choix === 'accepte'">Vous avez accepté la mesure de la fréquentation.</template>
                    <template v-else-if="choix === 'refuse'">Vous avez refusé la mesure de la fréquentation.</template>
                    <template v-else>Vous n'avez pas encore fait de choix.</template>
                    Vous pouvez le changer en tout temps.
                </p>
                <button class="bouton bouton--contour" type="button" @click="rouvrirChoix">Modifier mon choix</button>
            </section>

            <section>
                <h2 class="titre-section">Vos <span>droits</span></h2>
                <p>
                    Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression, et retirer votre
                    consentement, en écrivant à la personne responsable indiquée plus haut. Nous répondons dans les 30 jours.
                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez vous adresser à la
                    <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer">Commission d'accès à l'information du Québec</a>.
                </p>
            </section>

            <p class="texte-long__date">Dernière mise à jour : novembre 2026.</p>

        </div>

    </div>

</template>

<style scoped>

</style>
