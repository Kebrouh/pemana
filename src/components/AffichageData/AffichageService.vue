<script setup>
    import { ref } from 'vue'; // Import ref from Vue
    
    //EMAIL STUFF HERE
    import emailjs from '@emailjs/browser';

    emailjs.init("cZqdre7q7kdlaR_KQ");

    const fullName = ref("");
    const email = ref("");
    const sujet = ref("");
    const prob1 = ref("");
    const prob2 = ref("");
    const prob3 = ref("");

    const sendEmail = async () => {
        try {
            const response = await emailjs.send("service_2hq03a5", "template_olyrc4g", {
                from_name: fullName.value,
                email_id: email.value,
                sujet: sujet.value,
                prob1: prob1.value,
                prob2: prob2.value,
                prob3: prob3.value,
            });
            console.log("Email sent:", response);
            
            // Optionally, you can reset the form inputs
            fullName.value = "";
            email.value = "";
            sujet.value = "";
            prob1.value = "";
            prob2.value = "";
            prob3.value = "";
            alert("Envoi réussi!");
        } 
        catch (error) {
            console.error("Email failed to send:", error);
            alert("Échec de l'envoi, veuillez-réessayer", error);
        }
    };
</script>

<template>

    <div class="affichageService">
        <div class="wrapIntroForm">
            <h2>Besoin d'assistance durant votre séjour ?</h2>
            <h3>N'hésitez pas à nous contacter pour toute question, problème ou demande concernant votre logement. Notre équipe est là pour vous aider.</h3>
            <div class="wrapImg">
                <img src="@/assets/img/logo_pemana_light_plein.svg" alt="">
            </div>
        </div>

        <div class="wrapForm">
            <form @submit.prevent="sendEmail">
                <div class="formName">
                    <p>Nom complet</p>
                    <input v-model="fullName" type="text" placeholder="Entrez votre nom complet" required /> <br/>
                </div>
                <div class="formEmail">
                    <p>Courriel</p>
                    <input v-model="email" type="email" placeholder="Entrez votre courriel" required /> <br/>
                </div>
                <div class="formSujet">
                    <p>Sujet</p>
                    <textarea v-model="sujet" placeholder="Résumez votre demande" required></textarea> <br/>
                </div>
                <div class="formProb1">
                    <p>Problème #1</p>
                    <textarea v-model="prob1" placeholder="Entrez votre problème #1" required></textarea> <br/>
                </div>
                <div class="formProb2">
                    <p>Problème #2</p>
                    <textarea v-model="prob2" placeholder="Entrez votre problème #2" required></textarea> <br/>
                </div>
                <div class="formProb3">
                    <p>Problème #3</p>
                    <textarea v-model="prob3" placeholder="Entrez votre problème #3" required></textarea> <br/>
                </div>
                <button type="submit">Envoyer<span class="material-symbols-outlined">arrow_forward</span></button>
            </form>
        </div>
    </div>

</template>

<style scoped>

</style>
