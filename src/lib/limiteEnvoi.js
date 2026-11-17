// Limites d'envoi du formulaire d'appel de service, pour qu'un seul visiteur ne vide pas le quota gratuit d'EmailJS.
// Rien de bloquant pour un vrai locataire : 30 s entre deux envois, 5 par heure, 10 par jour.
//
// Ces limites vivent dans le navigateur du visiteur : elles arrêtent les excès et les doubles clics,
// pas un robot qui appellerait EmailJS directement. Pour ce cas, les protections sont dans le compte EmailJS.

const CLE = 'pemana-service-envois'
const MIN_ENTRE_ENVOIS = 30 * 1000
const PAR_HEURE = 5
const PAR_JOUR = 10
const HEURE = 60 * 60 * 1000
const JOUR = 24 * HEURE

const lire = () => {
    try {
        const liste = JSON.parse(localStorage.getItem(CLE) || '[]')
        return Array.isArray(liste) ? liste.filter((t) => Number.isFinite(t) && Date.now() - t < JOUR) : []
    } catch {
        return []
    }
}

//{ ok: true } ou { ok: false, attente: millisecondes à patienter }
export function verifierEnvoi() {
    const maintenant = Date.now()
    const envois = lire()

    const dernier = Math.max(0, ...envois)
    if (maintenant - dernier < MIN_ENTRE_ENVOIS) return { ok: false, attente: MIN_ENTRE_ENVOIS - (maintenant - dernier) }

    const derniereHeure = envois.filter((t) => maintenant - t < HEURE).sort((a, b) => a - b)
    if (derniereHeure.length >= PAR_HEURE) return { ok: false, attente: HEURE - (maintenant - derniereHeure[0]) }

    if (envois.length >= PAR_JOUR) return { ok: false, attente: JOUR - (maintenant - Math.min(...envois)) }

    return { ok: true }
}

export function noterEnvoi() {
    try {
        localStorage.setItem(CLE, JSON.stringify([...lire(), Date.now()]))
    } catch {
        //navigation privée ou stockage bloqué : on laisse passer, le double clic est déjà bloqué par le bouton
    }
}

//"2 minutes", "45 secondes"
export function dureeLisible(ms) {
    const s = Math.ceil(ms / 1000)
    if (s < 60) return `${s} seconde${s > 1 ? 's' : ''}`
    const m = Math.ceil(s / 60)
    if (m < 60) return `${m} minute${m > 1 ? 's' : ''}`
    const h = Math.ceil(m / 60)
    return `${h} heure${h > 1 ? 's' : ''}`
}
