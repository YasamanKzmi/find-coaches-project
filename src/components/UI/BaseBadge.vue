<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script>
export default {
    props:['title', 'type'],
    computed:{
        text(){
           return this.title.toUpperCase()
        }
    }
}
</script>

<style scoped>
.badge{
    padding: 0.4rem 2rem;
    border-radius: 30px;
    color: white;
    margin: 0.3rem;
    cursor: pointer;

}
.frontend{
background-color: rgb(3, 3, 94);
}
.backend{
    background-color: rgb(66, 0, 128);

}
.career{
    background-color: rgb(206, 34, 34);

}


@media (max-width: 750px) {
   .badge{
    padding: 0.2rem 0.4rem;

   } 
}
</style>