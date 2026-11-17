<script setup>
    import { contacts, lienTel } from '@/data/contact.js'

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
                <h3>Contact</h3>
                <ul>
                    <li><a :href="`mailto:${contacts.courriel}`" v-text="contacts.courriel"></a></li>
                    <li>
                        <a :href="lienTel(contacts.ventes.tel)" v-text="contacts.ventes.tel"></a>
                        <span>{{ contacts.ventes.nom }}, {{ contacts.ventes.titre }}</span>
                    </li>
                    <li>
                        <a :href="lienTel(contacts.proprietaire.tel)" v-text="contacts.proprietaire.tel"></a>
                        <span>{{ contacts.proprietaire.nom }}, {{ contacts.proprietaire.titre }}</span>
                    </li>
                    <li v-text="contacts.adresse"></li>
                </ul>
            </div>

            <nav class="pied__colonne" aria-label="Navigation du pied de page">
                <h3>Navigation</h3>
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

        <p class="pied__droits">© {{ annee }} Pemana Inc.</p>

    </footer>
</template>

<style scoped>

</style>
