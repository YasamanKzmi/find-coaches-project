<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>

    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>


<script>
export default {
    props:{
        mode:{
            type: String,
            required: false,
            default: null
        },
        link:{
            type: Boolean,
            required: false,
            default: false
        },
        to:{
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
button,
a{
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 50px;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    text-decoration: none;
    background-color: rgb(87, 2, 87);
    color: white;
   
}
button:hover, 
a:hover{
background-color: rgba(62, 1, 62, 0.597);
border: 1px solid rgb(67, 2, 67);
}

.flat{
    background-color: transparent;
    color: rgb(101, 2, 101);
}

.outline{
    background-color: transparent;
    border-color: rgb(101, 2, 101);
    color: rgb(101, 2, 101);
}


@media (max-width: 750px) {
   button,
   a{
    padding: 0.2rem 0.4rem;
    margin: 0.2rem;
   } 
}
</style>