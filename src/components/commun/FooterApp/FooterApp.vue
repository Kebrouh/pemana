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
                        <img src="@/assets/img/icons8-facebook.svg" alt="icons-facebook">
                    </div>
                    <div class="wrapLogo">
                        <img src="@/assets/img/icons8-twitter.svg" alt="icons-twitter">
                    </div>
                    <div class="wrapLogo">
                        <img src="@/assets/img/icons8-tumblr.svg" alt="icons-tumblr">
                    </div>
                    <div class="wrapLogo">
                        <img src="@/assets/img/icons8-instagram.svg" alt="icons-instagram">
                    </div>
                    <div class="wrapLogo">
                        <img src="@/assets/img/icons8-pinterest.svg" alt="icons-pinterest">
                    </div>
                </div>
            </div>

            <div class="contact">
                <h3>Contact</h3>
                <ul>
                    <li>info@lacliniquedarchitecture.ca</li>
                    <li>(514) 880-3770</li>
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
