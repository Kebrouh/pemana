// Prépare les photos des logements : npm run photos
//
// Pour chaque photo listée dans src/assets/json/location.json (dossier public/) :
//  - si elle est trop lourde (plus de 900 Ko ou plus de 2000 px de large), elle est réduite à 2000 px en JPEG qualité 82
//    ATTENTION : le fichier est remplacé, gardez une copie de l'original ailleurs ;
//  - sa miniature de 640 px est créée dans public/min/ si elle n'existe pas ou si la photo a changé.

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(racine, 'public')
const dossierMin = path.join(pub, 'min')
const location = JSON.parse(fs.readFileSync(path.join(racine, 'src/assets/json/location.json'), 'utf8'))

const photos = new Set(Object.values(location).flat().flatMap((logement) => logement.images))
fs.mkdirSync(dossierMin, { recursive: true })

const manquantes = []
let reduites = 0
let miniatures = 0

for (const photo of photos) {
    const fichier = path.join(pub, photo)
    if (!fs.existsSync(fichier)) { manquantes.push(photo); continue }

    const { width } = await sharp(fichier).metadata()
    if (fs.statSync(fichier).size > 900 * 1024 || width > 2000) {
        const reduite = await sharp(fichier).rotate().resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
        fs.writeFileSync(fichier, reduite)
        reduites++
    }

    const mini = path.join(dossierMin, photo)
    if (!fs.existsSync(mini) || fs.statSync(mini).mtimeMs < fs.statSync(fichier).mtimeMs) {
        const petite = await sharp(fichier).rotate().resize({ width: 640, withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true }).toBuffer()
        fs.writeFileSync(mini, petite)
        miniatures++
    }
}

console.log(`${photos.size} photos dans location.json : ${reduites} réduite(s), ${miniatures} miniature(s) créée(s).`)
if (manquantes.length) {
    console.log(`\nAttention, ${manquantes.length} photo(s) listée(s) mais introuvable(s) dans public/ :`)
    manquantes.forEach((m) => console.log('  - ' + m))
    process.exitCode = 1
}
