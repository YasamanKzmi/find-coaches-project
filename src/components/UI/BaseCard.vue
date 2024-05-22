<template>
    <div class="card">
        <slot></slot>
    </div>
</template>


<style scoped>
.card{
    margin: 2rem auto;
    max-width: 50rem;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    border-radius: 1rem;

}

@media (max-width: 750px) {
   .card{
   margin: 2rem;

   } 
}


</style>