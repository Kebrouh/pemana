<script setup>

  import { ref } from 'vue'

  import categorieData from '@/assets/json/categories.json'
  import location from '@/assets/json/location.json'

  const explorer = ref(null)

  //Le défilement du site se fait dans <body> (html et body ont overflow-x: hidden) :
  //scrollIntoView ne le trouvait pas et le bouton ne faisait rien. On cherche l'élément qui défile vraiment.
  const ancetreDefilant = (el) => {
    for (let e = el.parentElement; e; e = e.parentElement) {
      const ov = getComputedStyle(e).overflowY
      if ((ov === 'auto' || ov === 'scroll') && e.scrollHeight > e.clientHeight + 1) return e
    }
    return document.scrollingElement
  }

  const versLocations = () => {
    //on vise le titre « Explorer nos locations » et non le haut de la section, qui a un grand espace au-dessus
    const cible = explorer.value?.querySelector('.titre-section')
    if (!cible) return

    const defilant = ancetreDefilant(cible)
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const enteteFixe = window.matchMedia('(max-width: 767px)').matches ? 100 : 0    //l'entête mobile est collée en haut
    const base = defilant === document.scrollingElement ? 0 : defilant.getBoundingClientRect().top

    defilant.scrollTo({
      top: cible.getBoundingClientRect().top - base + defilant.scrollTop - enteteFixe - 24,
      behavior: reduit ? 'auto' : 'smooth',
    })
  }

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
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
            <RouterLink class="bouton bouton--clair" to="/service">
              Appel de service
              <span class="material-symbols-outlined">person</span>
            </RouterLink>
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
              <span class="material-symbols-outlined carte-lieu__icone" v-text="categorie.icon"></span>
              <div>
                <h3 v-text="categorie.name"></h3>
                <p v-text="detail[categorie.link]?.()"></p>
              </div>
              <span class="material-symbols-outlined carte-lieu__fleche">arrow_forward</span>
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
            <span class="material-symbols-outlined">person</span>
          </RouterLink>
        </div>
      </section>

    </div>
</template>

<style scoped>

</style>
