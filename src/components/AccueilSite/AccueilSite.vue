<script setup>

  import { ref } from 'vue'

  import categorieData from '@/assets/json/categories.json'
  import location from '@/assets/json/location.json'
  import { contacts, lienTel } from '@/data/contact.js'
  import { defilerVers } from '@/lib/defilement.js'

  const explorer = ref(null)

  //on vise le titre « Explorer nos locations » et non le haut de la section, qui a un grand espace au-dessus
  const versLocations = () => defilerVers(explorer.value?.querySelector('.titre-section'))

  //une phrase tirée des données pour chaque endroit, rien d'écrit à la main qui pourrait vieillir
  const nombre = (cle) => location[cle]?.length ?? 0
  const detail = {
    '/marina': () => 'Quai saisonnier à partir de 35 $ / pied',
    '/lac-superieur': () => `${nombre('lacSup')} logements`,
    '/saint-jerome': () => `${nombre('saintJe')} logements`,
    '/a-venir': () => 'Lac Lilly, Lac Simon et Saint-Adèle',
  }

</script>


<template>
    <div class="accueil-site">

      <section class="hero">
        <img class="hero__photo" src="/pemana_accueil_site.jpg" alt="Logements Pemana Inc.">
        <div class="hero__voile"></div>

        <div class="hero__contenu">
          <h1>Pemana Inc.</h1>
          <p>Location de logement et de quai</p>

          <div class="hero__actions">
            <button class="bouton bouton--vert" type="button" @click="versLocations">
              Explorer nos locations
              <span class="material-symbols-outlined" aria-hidden="true">arrow_downward</span>
            </button>
            <a class="bouton bouton--clair" :href="lienTel(contacts.principal.tel)">
              <span class="material-symbols-outlined" aria-hidden="true">call</span>
              {{ contacts.principal.tel }}
            </a>
          </div>
        </div>
      </section>

      <section class="page-contenu explorer" ref="explorer">
        <h2 class="titre-section">Explorer nos <span>locations</span></h2>

        <div class="explorer__grille">
          <RouterLink v-for="categorie in categorieData" :key="categorie.id"
            class="carte-lieu" :class="{ 'carte-lieu--marina': categorie.link === '/marina' }" :to="categorie.link"
          >
            <div class="carte-lieu__photo">
              <img :src="categorie.img" :alt="categorie.name" loading="lazy" decoding="async">
            </div>
            <div class="carte-lieu__corps">
              <span class="material-symbols-outlined carte-lieu__icone" v-text="categorie.icon" aria-hidden="true"></span>
              <div>
                <h3 v-text="categorie.name"></h3>
                <p v-text="detail[categorie.link]?.()"></p>
              </div>
              <span class="material-symbols-outlined carte-lieu__fleche" aria-hidden="true">arrow_forward</span>
            </div>
          </RouterLink>
        </div>

        <div class="assistance carte">
          <div>
            <h2 class="titre-section">Besoin d'assistance <span>durant votre séjour ?</span></h2>
            <p>N'hésitez pas à nous contacter pour toute question, problème ou demande concernant votre logement. Notre équipe est là pour vous aider.</p>
          </div>
          <RouterLink class="bouton bouton--vert" to="/service">
            Appel de service
            <span class="material-symbols-outlined" aria-hidden="true">person</span>
          </RouterLink>
        </div>
      </section>

    </div>
</template>

<style scoped>

</style>
