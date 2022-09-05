<template>
    <div v-if="editMode">
        <input class="GenericTextBox" type="text" v-model="name" />
        <button class="GenericButtonSmall" style="background: #99EC8C" v-on:click="SaveChanges">Save</button>
        <button class="GenericButtonSmall" style="background: #EC8C8C" v-on:click="CancelChanges">Cancel</button>
    </div>
    <div v-else>
        <input class="GenericTextBox" type="text" disabled value={{name}} />
        <button class="GenericButtonSmall" style="background: #99EC8C" v-on:click="InitEditMode">Edit</button>
    </div>
</template>

<script lang="ts">
import { Collection } from '../db/Collection.types';
import { defineComponent, reactive } from 'vue';

type CollectionProps = {
    collection : Collection,
    passEditCollection : Function,
    editMode : boolean
}

export default defineComponent({
    name: 'CollectionComponent',
    props: {
        CollectionsProp: { type: Object as () => CollectionProps, required : true}
    },
    data() {
        return {
            name: "",
            editMode : false
        }
    },
    created(){
        this.editMode = this.CollectionsProp.editMode
        this.name = this.CollectionsProp.collection.name
    },
    methods: {
        SaveChanges() {
            this.editMode = false
            var collectionToSend : Collection = {
                collectionId : this.CollectionsProp.collection.collectionId,
                name: this.name,
                flashcardCount: this.CollectionsProp.collection.flashcardCount
            }
            this.CollectionsProp.passEditCollection(collectionToSend)
        },

        CancelChanges() {
            this.editMode = false
            this.name = this.CollectionsProp.collection.name
        },

        InitEditMode() {
            this.editMode = true
        }
    }
})

</script>