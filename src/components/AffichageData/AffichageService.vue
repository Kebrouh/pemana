<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'

    import { ref, reactive, watch, nextTick } from 'vue'
    import emailjs from '@emailjs/browser'

    import EntetePage from '@/components/commun/EntetePage/EntetePage.vue'
    import { contacts } from '@/data/contact.js'
    import { verifierEnvoi, noterEnvoi, dureeLisible } from '@/lib/limiteEnvoi.js'

    emailjs.init("cZqdre7q7kdlaR_KQ");

    const champs = reactive({ nom: '', courriel: '', sujet: '', prob1: '', prob2: '', prob3: '' })
    const piege = ref('')                   //champ caché : un humain le laisse vide, un robot le remplit
    const ouvertA = Date.now()              //un humain ne remplit pas 6 champs en moins de 3 secondes

    const etat = ref('repos')               //repos | envoi | ok | erreur | limite
    const message = ref('')

    const vider = () => Object.keys(champs).forEach((cle) => { champs[cle] = '' })

    const envoyer = async () => {
        if (etat.value === 'envoi') return          //double clic

        //le robot croit avoir réussi, rien n'est envoyé
        if (piege.value) { vider(); etat.value = 'ok'; return }

        if (Date.now() - ouvertA < 3000) {
            etat.value = 'limite'
            message.value = 'Un instant, relisez votre demande puis envoyez-la de nouveau.'
            return
        }

        const permis = verifierEnvoi()
        if (!permis.ok) {
            etat.value = 'limite'
            message.value = `Vous avez envoyé plusieurs demandes à la suite. Réessayez dans ${dureeLisible(permis.attente)}, ou appelez-nous au ${contacts.proprietaire.tel}.`
            return
        }

        etat.value = 'envoi'
        message.value = ''
        try {
            await emailjs.send("service_898nfxs", "template_olyrc4g", {
                from_name: champs.nom,
                email_id: champs.courriel,
                sujet: champs.sujet,
                prob1: champs.prob1,
                prob2: champs.prob2,
                prob3: champs.prob3,
            });
            noterEnvoi()
            vider()
            etat.value = 'ok'
        }
        catch (error) {
            console.error("Email failed to send:", error);
            etat.value = 'erreur'
            message.value = `L'envoi a échoué. Réessayez dans un instant, ou appelez-nous au ${contacts.proprietaire.tel}.`
        }
    };

    const nouvelleDemande = () => { etat.value = 'repos'; message.value = '' }

    //à la confirmation, le focus passe au titre : le lecteur d'écran l'annonce et le clavier reste en place
    const titreMerci = ref(null)
    watch(etat, async (valeur) => {
        if (valeur === 'ok') {
            await nextTick()
            titreMerci.value?.focus()
        }
    })

</script>

<template>

    <div class="page-contenu page-service">

        <EntetePage surtitre="Besoin d'assistance durant votre séjour ?" titre="Appel de service" />

        <div class="service-contenu">

            <p class="service-intro">N'hésitez pas à nous contacter pour toute question, problème ou demande concernant votre logement. Notre équipe est là pour vous aider.</p>

            <div class="carte service-merci" v-if="etat === 'ok'">
                <IconeSvg class="service-merci__icone" nom="check_circle" />
                <h2 class="titre-section" ref="titreMerci" tabindex="-1">Merci, votre demande est <span>envoyée</span></h2>
                <p>Notre équipe vous répondra par courriel dès que possible.</p>
                <button class="bouton bouton--contour" type="button" @click="nouvelleDemande">Envoyer une autre demande</button>
            </div>

            <form class="carte service-form" v-else @submit.prevent="envoyer">

                <p class="service-requis">Tous les champs sont obligatoires.</p>

                <div class="champ">
                    <label for="service-nom">Nom complet</label>
                    <input id="service-nom" v-model="champs.nom" type="text" autocomplete="name" placeholder="Entrez votre nom complet" required />
                </div>
                <div class="champ">
                    <label for="service-courriel">Courriel</label>
                    <input id="service-courriel" v-model="champs.courriel" type="email" autocomplete="email" placeholder="Entrez votre courriel" required />
                </div>
                <div class="champ">
                    <label for="service-sujet">Sujet</label>
                    <textarea id="service-sujet" v-model="champs.sujet" rows="2" placeholder="Résumez votre demande" required></textarea>
                </div>
                <div class="champ">
                    <label for="service-prob1">Problème #1</label>
                    <textarea id="service-prob1" v-model="champs.prob1" rows="2" placeholder="Entrez votre problème #1" required></textarea>
                </div>
                <div class="champ">
                    <label for="service-prob2">Problème #2</label>
                    <textarea id="service-prob2" v-model="champs.prob2" rows="2" placeholder="Entrez votre problème #2" required></textarea>
                </div>
                <div class="champ">
                    <label for="service-prob3">Problème #3</label>
                    <textarea id="service-prob3" v-model="champs.prob3" rows="2" placeholder="Entrez votre problème #3" required></textarea>
                </div>

                <!-- piège à robots : invisible et sorti de l'ordre de tabulation -->
                <div class="service-piege" aria-hidden="true">
                    <label for="service-site">Ne pas remplir</label>
                    <input id="service-site" v-model="piege" type="text" tabindex="-1" autocomplete="off" />
                </div>

                <!-- zone d'annonce toujours présente : un lecteur d'écran lit le message dès qu'il y apparaît -->
                <div class="service-statut" role="status" aria-live="polite">
                    <p class="service-message" :class="`service-message--${etat}`" v-if="message" v-text="message"></p>
                </div>

                <div class="service-actions">
                    <button class="bouton bouton--vert" type="submit" :disabled="etat === 'envoi'">
                        <span v-text="etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer'"></span>
                        <IconeSvg :nom="etat === 'envoi' ? 'hourglass_top' : 'arrow_forward'" />
                    </button>
                </div>

            </form>

        </div>

    </div>

</template>

<style scoped>

</style>
