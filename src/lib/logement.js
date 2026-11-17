// Petits utilitaires pour afficher un logement de location.json

export const LIEUX = {
    lacSup: { nom: 'Lac-Supérieur', route: '/lac-superieur' },
    saintJe: { nom: 'Saint-Jérôme', route: '/saint-jerome' },
}

//photo en pleine grandeur (carrousel) et miniature de 640 px (listes et vignettes)
export const urlComplete = (fichier) => `${import.meta.env.BASE_URL}${fichier}`
export const urlMiniature = (fichier) => `${import.meta.env.BASE_URL}min/${fichier}`

//"2 050$" -> "2 050 $", "sur demande" reste tel quel
export const prixNumerique = (prix) => /\d/.test(prix || '')
export const formaterPrix = (prix) => prix.replace(/\s*\$/, ' $')

export const libelleChambres = (n) => `${n} chambre${Number(n) > 1 ? 's' : ''}`
export const libelleSdb = (n) => `${n} salle${Number(n) > 1 ? 's' : ''} de bain`

//Une phrase tout en majuscules au début ("DISPONIBLE POUR LA SAISON...") devient une accroche lisible
export function decouperDescription(texte = '') {
    const m = texte.match(/^([A-ZÀ-ÖØ-Ý0-9'’ ,.-]{20,}?\.)\s+([\s\S]*)$/)
    if (!m) return { accroche: '', corps: texte }

    const minuscules = m[1].toLocaleLowerCase('fr-CA')
    return {
        accroche: minuscules.charAt(0).toLocaleUpperCase('fr-CA') + minuscules.slice(1),
        corps: m[2],
    }
}
