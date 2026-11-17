<script setup>

    import IconeSvg from '@/components/commun/IconeSvg/IconeSvg.vue'

    import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
    import { urlComplete, urlMiniature } from '@/lib/logement.js'

    const props = defineProps({
        images : { type: Array, required: true },       //noms de fichiers de location.json
        alt : { type: String, default: '' },
    })

    const index = ref(0)
    const ouvert = ref(false)           //plein écran
    const miniatures = ref(null)
    const boutonFermer = ref(null)
    const boutonAgrandir = ref(null)

    const total = computed(() => props.images.length)
    const plusieurs = computed(() => total.value > 1)
    const texteAlt = (i) => `${props.alt}, photo ${i + 1} sur ${total.value}`

    const aller = (i) => { index.value = (i + total.value) % total.value }
    const precedente = () => aller(index.value - 1)
    const suivante = () => aller(index.value + 1)

    //une autre adresse = un autre logement, on repart de la première photo
    watch(() => props.images, () => { index.value = 0 })

    //la photo suivante se charge d'avance, la navigation reste fluide
    watch(index, async (i) => {
        new Image().src = urlComplete(props.images[(i + 1) % total.value])

        await nextTick()
        const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        miniatures.value?.children[i]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduit ? 'auto' : 'smooth' })
    })

    // - - - - - plein écran - - - - -
    //le reste du site est rendu inerte pendant le plein écran : le clavier et le lecteur d'écran n'en sortent pas
    const appInerte = (inerte) => {
        const app = document.getElementById('app')
        if (!app) return
        inerte ? app.setAttribute('inert', '') : app.removeAttribute('inert')
    }

    //Tab tourne dans la boîte de dialogue au lieu de s'échapper
    const piegerTab = (e) => {
        const focalisables = [...document.querySelectorAll('.lightbox button')]
        if (!focalisables.length) return
        const premier = focalisables[0]
        const dernier = focalisables[focalisables.length - 1]
        if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus() }
        else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus() }
    }

    const surClavier = (e) => {
        if (e.key === 'Escape') fermer()
        else if (e.key === 'ArrowLeft') precedente()
        else if (e.key === 'ArrowRight') suivante()
        else if (e.key === 'Tab') piegerTab(e)
    }

    const ouvrir = async () => {
        ouvert.value = true
        document.body.style.overflow = 'hidden'
        appInerte(true)
        document.addEventListener('keydown', surClavier)
        await nextTick()
        boutonFermer.value?.focus()
    }

    const fermer = () => {
        if (!ouvert.value) return
        ouvert.value = false
        document.body.style.overflow = ''
        appInerte(false)
        document.removeEventListener('keydown', surClavier)
        boutonAgrandir.value?.focus()
    }

    onBeforeUnmount(() => {
        document.body.style.overflow = ''
        appInerte(false)
        document.removeEventListener('keydown', surClavier)
    })

    // - - - - - glissement du doigt - - - - -
    let departX = null
    let glisse = false

    const debutGlisse = (e) => { departX = e.clientX; glisse = false }
    const finGlisse = (e) => {
        if (departX === null) return
        const dx = e.clientX - departX
        departX = null
        if (Math.abs(dx) > 40) {
            glisse = true
            dx < 0 ? suivante() : precedente()
        }
    }
    //le doigt qui glisse ne doit pas ouvrir le plein écran
    const clicPhoto = () => { if (!glisse) ouvrir(); glisse = false }

    //flèches du clavier quand la galerie a le focus
    const surClavierGalerie = (e) => {
        if (e.key === 'ArrowLeft') precedente()
        else if (e.key === 'ArrowRight') suivante()
    }

</script>

<template>

    <div class="galerie" @keydown="surClavierGalerie">

        <div class="galerie__scene" @pointerdown="debutGlisse" @pointerup="finGlisse" @pointercancel="departX = null">

            <button class="galerie__plein" ref="boutonAgrandir" type="button" aria-label="Agrandir la photo" @click="clicPhoto">
                <img :src="urlComplete(images[index])" :alt="texteAlt(index)" decoding="async">
            </button>

            <button class="galerie__nav galerie__nav--prec" type="button" aria-label="Photo précédente" v-if="plusieurs" @click.stop="precedente">
                <IconeSvg nom="chevron_left" />
            </button>
            <button class="galerie__nav galerie__nav--suiv" type="button" aria-label="Photo suivante" v-if="plusieurs" @click.stop="suivante">
                <IconeSvg nom="chevron_right" />
            </button>

            <p class="galerie__compteur" v-if="plusieurs">{{ index + 1 }} / {{ total }}</p>
            <IconeSvg class="galerie__agrandir" nom="zoom_out_map" />
        </div>

        <div class="galerie__miniatures" ref="miniatures" v-if="plusieurs">
            <button class="galerie__mini" type="button" v-for="(image, i) in images" :key="image + i"
                :aria-label="`Voir la photo ${i + 1}`"
                :aria-current="i === index"
                @click="aller(i)"
            >
                <img :src="urlMiniature(image)" alt="" loading="lazy" decoding="async">
            </button>
        </div>

        <Teleport to="body">
            <div class="lightbox" v-if="ouvert" role="dialog" aria-modal="true" aria-label="Galerie photo en plein écran" @click.self="fermer">

                <button class="lightbox__bouton lightbox__fermer" ref="boutonFermer" type="button" aria-label="Fermer" @click="fermer">
                    <IconeSvg nom="close" />
                </button>

                <button class="lightbox__bouton lightbox__nav lightbox__nav--prec" type="button" aria-label="Photo précédente" v-if="plusieurs" @click="precedente">
                    <IconeSvg nom="chevron_left" />
                </button>

                <img class="lightbox__image" :src="urlComplete(images[index])" :alt="texteAlt(index)" @click.self="fermer">

                <button class="lightbox__bouton lightbox__nav lightbox__nav--suiv" type="button" aria-label="Photo suivante" v-if="plusieurs" @click="suivante">
                    <IconeSvg nom="chevron_right" />
                </button>

                <p class="lightbox__compteur" v-if="plusieurs">{{ index + 1 }} / {{ total }}</p>
            </div>
        </Teleport>

    </div>

</template>

<style scoped>

</style>
