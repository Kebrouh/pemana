<script setup>

    const props = defineProps({
        objImage : null,
        alt : { type: String, default: "" },
    })

</script>

<template>
    
    <div class="wrapImg">

        <img :src="props.objImage" :alt="props.alt" unselectable="on">

    </div>

</template>

<style scoped>

</style>
