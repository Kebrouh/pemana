<script setup>

    import EntetePage from '@/components/commun/EntetePage/EntetePage.vue'
    import { contacts, lienTel } from '@/data/contact.js'

    const photosProjet = ['06', '04', '03', '01', '02', '05']

</script>

<template>

    <div class="page-contenu page-marina">

        <EntetePage surtitre="Zool bar gîte riverain" titre="Marina">
            <template #actions>
                <a class="bouton" href="https://www.meteomedia.com/fr/ville/ca/quebec/carillon/actuelle" target="_blank" rel="noopener noreferrer">
                    Météo <span class="material-symbols-outlined" aria-hidden="true">cloud</span>
                </a>
            </template>
        </EntetePage>

        <section class="marina-hero">
            <figure class="marina-hero__principale">
                <img src="@/assets/img/quai.jpg" alt="Quai de la marina">
                <figcaption class="etiquette etiquette--bleu">Quai saisonnier à partir de 35 $ / pied</figcaption>
            </figure>

            <div class="marina-hero__cote">
                <div class="carte marina-hero__logo">
                    <img src="@/assets/img/logo_marina.svg" alt="Logo Marina Zool">
                </div>
                <img class="marina-hero__condos" src="/marina_condo_3d_01.jpg" alt="Rendu 3D du projet de condos près de la marina">
            </div>
        </section>

        <section class="marina-infos">

            <div class="carte">
                <h2 class="titre-section">Services offerts, <span>Marina</span></h2>
                <ul class="liste-coches">
                    <li>Stationnement réservé à nos clients et leur entourage.</li>
                    <li>Membre saisonnier de la marina</li>
                    <li>Électricité 15 ampères</li>
                    <li>Eau</li>
                    <li>Surveillance des lieux</li>
                    <li>Quais de service ou d'accostage temporaire</li>
                    <li>Activités à proximité</li>
                </ul>
            </div>

            <div class="carte marina-carte">
                <img src="@/assets/img/map_zoom_v2.svg" alt="Carte de la marina">
                <div class="marina-carte__corps">
                    <address>
                        692 Chem. des Outaouais, Pointe-Fortune<br>
                        QC J0P 1N0<br>
                        <a :href="lienTel(contacts.ventes.tel)" v-text="contacts.ventes.tel"></a>
                    </address>
                    <div class="marina-carte__boutons">
                        <a class="bouton bouton--vert" target="_blank" rel="noopener noreferrer"
                            href="https://www.google.com/maps/place/692+Chem.+des+Outaouais,+Pointe-Fortune,+QC+J0P+1N0/@45.5615963,-74.3823692,17z/data=!3m1!4b1!4m6!3m5!1s0x4ccec4fbaea2a129:0xde46e275c0255d68!8m2!3d45.5615926!4d-74.3797889!16s%2Fg%2F11cph362pk?entry=ttu">
                            <span class="material-symbols-outlined" aria-hidden="true">directions</span> Directions
                        </a>
                    </div>
                </div>
            </div>

        </section>

        <section class="marina-projet">

            <a class="marina-projet__photo" href="https://creagine.ca/360/pointe/" target="_blank" rel="noopener noreferrer">
                <img src="/marina_condo_3d_02.jpg" alt="Rendu 3D du projet de condos, visite virtuelle">
            </a>

            <div class="carte marina-projet__texte">
                <h2 class="titre-section">Projet de construction <span>près de la marina</span></h2>
                <p>À venir :</p>
                <ul class="liste-coches">
                    <li><strong>Condos à louer pour long terme</strong> : 8 x <strong>3 ½</strong> &amp; 8 x <strong>4 ½</strong></li>
                    <li><strong>Gîte pour location journalière</strong></li>
                </ul>

                <h3 class="marina-projet__sous-titre">Services offerts, <span>Logement</span></h3>
                <ul class="liste-coches">
                    <li>16 logements (3 ½ &amp; 4 ½)</li>
                    <li>Stationnement pour chaque unité.</li>
                    <li>2 bornes de recharge de niveau 2 pour véhicules électriques.</li>
                </ul>

                <a class="bouton" href="https://creagine.ca/360/pointe/" target="_blank" rel="noopener noreferrer">
                    Visite virtuelle 3D <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
                </a>
            </div>

        </section>

        <section class="marina-galerie">
            <img v-for="(n, i) in photosProjet" :key="n" :src="`/pf_${n}.jpg`" :alt="`Projet de la marina, photo ${i + 1}`" loading="lazy" decoding="async">
        </section>

    </div>

</template>

<style scoped>

</style>
