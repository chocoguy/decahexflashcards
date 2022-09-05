<template>
    <Header title="- Edit Flashcards!"></Header>
    <h1>Edit the flashcards</h1>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Collection } from '../db/Collection.types';
    import { DbService } from '..//db/DbService';
    import Header from '../Controls/Header.vue';
    import router from '@/router';

    export default defineComponent({
        name: "EditFlashcards",
        created() {

        },
        methods: {
            NavigateTo(uri : string){
                router.push(uri);
            }
        },
        components: { Header }
    })

</script>