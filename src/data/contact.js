// Coordonnées de l'entreprise : une seule source pour le pied de page, les fiches et les pages de projets

export const contacts = {
    ventes: { nom: 'Alexandre Cagiotti', titre: 'Directeur des ventes', tel: '(514) 269-3770' },
    proprietaire: { nom: 'Jean-François Dubé', titre: 'Propriétaire', tel: '(514) 880-3770' },
    courriel: 'pemana2014@gmail.com',
    adresse: '164, rue de la Charente, Saint-Jérôme, Québec, Canada',
    facebook: 'https://www.facebook.com/people/Pemana-Inc/61561865790005/',
}

//(514) 880-3770 -> tel:+15148803770
export const lienTel = (tel) => 'tel:+1' + tel.replace(/\D/g, '')
