// Consentement à la mesure d'audience (Google Analytics), pour la loi 25 du Québec.
//
// Rien de Google n'est chargé tant que le visiteur n'a pas accepté : index.html ne contient plus de balise Google.
// Le choix (accepte / refuse) est gardé dans le navigateur ; il peut être modifié en tout temps depuis le pied de page.

import { ref } from 'vue'

const CLE = 'pemana-consentement-analytique'
const ID_MESURE = 'G-RPGZ8L422R'

const lire = () => {
    try {
        const valeur = localStorage.getItem(CLE)
        return valeur === 'accepte' || valeur === 'refuse' ? valeur : null
    } catch {
        return null     //stockage bloqué : on redemande à chaque visite plutôt que de supposer un accord
    }
}

const ecrire = (valeur) => {
    try { localStorage.setItem(CLE, valeur) } catch { /* choix valable pour cette visite seulement */ }
}

export const choix = ref(lire())                //'accepte' | 'refuse' | null (pas encore choisi)
export const bandeauOuvert = ref(choix.value === null)

let charge = false

function chargerAnalytics() {
    window['ga-disable-' + ID_MESURE] = false
    if (charge) return
    charge = true

    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', ID_MESURE)

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID_MESURE
    document.head.appendChild(script)
}

//un refus après un accord : on coupe la mesure et on efface les témoins de Google déjà déposés
function arreterAnalytics() {
    window['ga-disable-' + ID_MESURE] = true

    const hote = location.hostname
    const parties = hote.split('.')
    const domaines = [undefined, hote, '.' + hote, ...(parties.length > 2 ? ['.' + parties.slice(-2).join('.')] : [])]
    const noms = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n === '_gid' || n.startsWith('_ga_'))

    for (const nom of noms) {
        for (const domaine of domaines) {
            document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (domaine ? `; domain=${domaine}` : '')
        }
    }
}

export function accepter() {
    ecrire('accepte')
    choix.value = 'accepte'
    bandeauOuvert.value = false
    chargerAnalytics()
}

export function refuser() {
    ecrire('refuse')
    choix.value = 'refuse'
    bandeauOuvert.value = false
    arreterAnalytics()
}

export function rouvrirChoix() {
    bandeauOuvert.value = true
}

//au démarrage du site : on ne charge Google que si le visiteur a déjà accepté
export function initialiserConsentement() {
    if (choix.value === 'accepte') chargerAnalytics()
}
