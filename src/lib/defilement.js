// Le défilement du site se fait dans <body> (html et body ont overflow-x: hidden) :
// window.scrollTo et scrollIntoView ne le trouvent pas. Ces fonctions cherchent l'élément qui défile vraiment.

const animationsReduites = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ancetreDefilant(el) {
    for (let e = el?.parentElement; e; e = e.parentElement) {
        const ov = getComputedStyle(e).overflowY
        if ((ov === 'auto' || ov === 'scroll') && e.scrollHeight > e.clientHeight + 1) return e
    }
    return document.scrollingElement
}

//haut de la page, en douceur si on le demande (et si le visiteur n'a pas réduit les animations)
export function defilerEnHaut({ fluide = false } = {}) {
    const defilant = ancetreDefilant(document.querySelector('.interface') ?? document.body)
    defilant.scrollTo({ top: 0, behavior: fluide && !animationsReduites() ? 'smooth' : 'auto' })
}

//amène un élément sous l'entête fixe du mobile (100 px), avec un peu d'air
export function defilerVers(cible, { decalage = 24 } = {}) {
    if (!cible) return

    const defilant = ancetreDefilant(cible)
    const enteteFixe = window.matchMedia('(max-width: 767px)').matches ? 100 : 0
    const base = defilant === document.scrollingElement ? 0 : defilant.getBoundingClientRect().top

    defilant.scrollTo({
        top: cible.getBoundingClientRect().top - base + defilant.scrollTop - enteteFixe - decalage,
        behavior: animationsReduites() ? 'auto' : 'smooth',
    })
}
