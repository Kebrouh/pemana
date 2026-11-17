import { createRouter, createWebHashHistory } from 'vue-router'
import { defilerEnHaut } from '@/lib/defilement.js'

const router = createRouter({

  history: createWebHashHistory(import.meta.env.BASE_URL),

  //Le défilement se fait dans <body>, le comportement par défaut de vue-router ne le voit pas.
  //D'une fiche de logement à une autre, on remonte en douceur pour présenter le nouveau logement.
  scrollBehavior(to, from) {
    defilerEnHaut({ fluide: Boolean(from.name) && to.name === from.name })
    return false
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/PageAccueil.vue"),
    },   
    
    {
      path: '/marina',
      name: 'marina',
      component: () => import("@/views/PageMarina.vue"),
    },   
    {
      path: '/lac-superieur',
      name: 'lac-superieur',
      component: () => import("@/views/PageLacSup.vue"),
    },   
    {
      path: '/saint-jerome',
      name: 'saint-jerome',
      component: () => import("@/views/PageSaintJe.vue"),
    },   
    {
      path: '/a-venir',
      name: 'a-venir',
      component: () => import("@/views/PageAVenir.vue"),
    },   
    {
      path: '/service',
      name: 'service',
      component: () => import("@/views/PageService.vue"),
    },   
    
    {
      path: '/details/:emplacement/:id',
      name: 'details',
      component: () => import("@/views/PageDetails.vue"),
    },

    {
      path: '/confidentialite',
      name: 'confidentialite',
      component: () => import("@/views/PageConfidentialite.vue"),
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ]
})

export default router
