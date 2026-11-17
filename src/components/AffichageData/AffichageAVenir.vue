<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'

    import EntetePage from '@/components/commun/EntetePage/EntetePage.vue'
    import { contacts, lienTel } from '@/data/contact.js'

    import imgLacLilly from '@/assets/img/lac_lilly.jpg'
    import logoChertsey from '@/assets/img/logo_chertsey.svg'
    import imgLacSimon from '@/assets/img/lac_simon.jpg'
    import logoLacSimon from '@/assets/img/logo_lac_simon.jpg'

    const projets = [
        { nom: 'Lac Lilly', type: 'Location court terme', photo: imgLacLilly, logo: logoChertsey, logoAlt: 'Logo Chertsey' },
        { nom: 'Lac Simon', type: 'Location long terme', photo: imgLacSimon, logo: logoLacSimon, logoAlt: 'Logo Lac Simon' },
        { nom: 'Saint-Adèle', type: 'Location court terme', photo: '/saintAdele_aVenir.jpg', logo: '/logo_saint_adele.jpg', logoAlt: 'Logo Saint-Adèle' },
    ]

</script>

<template>

    <div class="page-contenu page-a-venir">

        <EntetePage surtitre="Nos prochains" titre="Projets à venir" />

        <div class="grille-projets">
            <article class="projet" v-for="projet in projets" :key="projet.nom">
                <div class="projet__photo">
                    <img :src="projet.photo" :alt="projet.nom" loading="lazy" decoding="async">
                    <img class="projet__logo" :src="projet.logo" :alt="projet.logoAlt">
                </div>
                <div class="projet__corps">
                    <span class="etiquette" v-text="projet.type"></span>
                    <h2 v-text="projet.nom"></h2>
                </div>
            </article>
        </div>

        <section class="a-venir-contact carte">
            <h2 class="titre-section">Un projet vous <span>intéresse ?</span></h2>
            <p>Contactez-nous, nous serons heureux de vous en parler.</p>
            <div class="a-venir-contact__boutons">
                <a class="bouton bouton--vert" :href="lienTel(contacts.ventes.tel)">
                    <IconeSvg nom="call" />
                    {{ contacts.ventes.tel }}
                </a>
                <a class="bouton bouton--contour" :href="`mailto:${contacts.courriel}`">
                    <IconeSvg nom="mail" />
                    {{ contacts.courriel }}
                </a>
            </div>
        </section>

    </div>

</template>

<style scoped>

</style>
