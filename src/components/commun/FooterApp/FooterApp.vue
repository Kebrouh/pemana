<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'
    import { contacts, lienTel } from '@/data/contact.js'
    import { rouvrirChoix } from '@/lib/consentement.js'

    const annee = new Date().getFullYear()
</script>

<template>
    <footer class="pied">

        <div class="pied__contenu">

            <div class="pied__marque">
                <RouterLink class="pied__logo" to="/">
                    <img src="@/assets/img/logo_pemana.svg" alt="Logo Pemana Inc.">
                </RouterLink>

                <a class="pied__facebook" :href="contacts.facebook" target="_blank" rel="noopener noreferrer">
                    <img src="@/assets/img/icons8-facebook.svg" alt="Facebook">
                </a>
            </div>

            <div class="pied__colonne">
                <h2>Contact</h2>
                <ul>
                    <li class="pied__ligne">
                        <IconeSvg class="pied__icone" nom="mail" />
                        <div><a :href="`mailto:${contacts.courriel}`" v-text="contacts.courriel"></a></div>
                    </li>
                    <li class="pied__ligne">
                        <IconeSvg class="pied__icone" nom="call" />
                        <div>
                            <a :href="lienTel(contacts.ventes.tel)" v-text="contacts.ventes.tel"></a>
                            <span class="pied__nom">{{ contacts.ventes.nom }}, {{ contacts.ventes.titre }}</span>
                        </div>
                    </li>
                    <li class="pied__ligne">
                        <IconeSvg class="pied__icone" nom="call" />
                        <div>
                            <a :href="lienTel(contacts.proprietaire.tel)" v-text="contacts.proprietaire.tel"></a>
                            <span class="pied__nom">{{ contacts.proprietaire.nom }}, {{ contacts.proprietaire.titre }}</span>
                        </div>
                    </li>
                    <li class="pied__ligne">
                        <IconeSvg class="pied__icone" nom="location_on" />
                        <div v-text="contacts.adresse"></div>
                    </li>
                </ul>
            </div>

            <nav class="pied__colonne" aria-label="Navigation du pied de page">
                <h2>Navigation</h2>
                <ul>
                    <li><RouterLink to="/">Accueil</RouterLink></li>
                    <li><RouterLink to="/service">Appel de service</RouterLink></li>
                    <li><RouterLink to="/marina">Quai Marina Zool</RouterLink></li>
                    <li><RouterLink to="/lac-superieur">Logement Lac-Supérieur</RouterLink></li>
                    <li><RouterLink to="/saint-jerome">Logement Saint-Jérôme</RouterLink></li>
                    <li><RouterLink to="/a-venir">Projet à venir</RouterLink></li>
                </ul>
            </nav>

        </div>

        <div class="pied__droits">
            <p>© {{ annee }} Pemana Inc.</p>
            <ul>
                <li><RouterLink to="/confidentialite">Politique de confidentialité</RouterLink></li>
                <li><button class="pied__lien" type="button" @click="rouvrirChoix">Gérer les témoins</button></li>
            </ul>
        </div>

    </footer>
</template>

<style scoped>

</style>
