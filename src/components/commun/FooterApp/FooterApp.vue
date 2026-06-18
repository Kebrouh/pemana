<script setup>
    import categorieData from '@/assets/json/categories.json'
    import FooterNavItem from '@/components/commun/FooterApp/FooterNavItem.vue';
</script>

<template>
    <div class="footer">

        <div class="wrapInfo">

            <div class="entreprise">

                <RouterLink class="wrapLogo" to="/">
                    <img src="@/assets/img/logo_pemana.svg" alt="logo-pemana">
                </RouterLink>
                
                <div class="reseauxSociaux">
                    <!-- <a target="_blank" href="https://icons8.com/icon/01GWmP9aUoPj/twitterx">Twitter</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> -->
                    <div class="wrapLogo">
                        <a target="_blank" href="https://www.facebook.com/people/Pemana-Inc/61561865790005/"><img src="@/assets/img/icons8-facebook.svg" alt="icons-facebook"></a>
                    </div>
                </div>
            </div>

            <div class="contact">
                <h3>Contact</h3>
                <ul>
                    <li>pemana2014@gmail.com</li>
                    <li>(514) 269-3770 - <p>Alexandre Cagiotti, Directeur des ventes</p></li>
                    <li>(514) 880-3770 - <p>Jean-François Dubé, Propriétaire</p></li>
                    <li>164, rue de la Charente, Saint-Jérôme, Québec, Canada</li>
                </ul>
            </div>

            <div class="navFooter">
                <h3>Location</h3>
                <div class="links" v-if="categorieData">  
                    <FooterNavItem v-for="categorie in categorieData" :key="categorie.id"
                        :objCat="categorie" 
                    />
                </div>
            </div>
            

        </div>

    </div>

</template>

<style scoped>

</style>
