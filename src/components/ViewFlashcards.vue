<template>
    <Header title="fd"></Header>
    <div>
        <h1>View flashcards</h1>

    </div>
</template>

<script lang="ts">
import { Collection } from '../db/Collection.types';
import { defineComponent, reactive } from 'vue';
import { DbService } from '../db/DbService'
import Header from '../Controls/Header.vue';
import router from '@/router'


export default defineComponent({
    name: 'ViewFlashcards',
    props: {

    },
    data() {
        return {
            collections: [] as Collection[]
        }
    },
    created(){
        this.LoadCollections();
    },
    methods: {
        async LoadCollections() {
            var Collections : Collection[]  = await DbService.GetAllCollections();
            this.collections = Collections;
            console.log(Collections);
        },
        NavigateTo(uri : string){
            router.push(uri);
        }

    },
    components: { Header }
})

</script>