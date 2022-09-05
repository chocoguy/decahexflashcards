<template>
    <div v-if="editMode">
                <p>Flash card No: {{FlashcardComponents.flashcard.countId}}</p>
        <p>Front side:</p><input class="GenericTextBox" type="text" v-model="frontsideContent" />
        <br />
        <p>Back side:</p><input class="GenericTextBox" type="text" v-model="backsideContent" />
        <br />
        <button class="GenericButtonSmall" style="background: #99EC8C" v-on:click="SaveChanges">Save</button>
        <button class="GenericButtonSmall" style="background: #EC8C8C" v-on:click="CancelChanges">Cancel</button>
        <button class="GenericButtonSmall" style="background: #EC8C8C" v-on:click="DeleteFlashcard">Delete</button>
    </div>
    <div v-else>
        <p>Flash card No: {{FlashcardComponents.flashcard.countId}}</p>
        <p>Front side:</p><input class="GenericTextBox" type="text" disabled value={{frontsideContent}} />
        <br />
        <p>Back side:</p><input class="GenericTextBox" type="text" disabled value={{backsideContent}} />
        <br />
        <button class="GenericButtonSmall" style="background: #99EC8C" v-on:click="InitEditMode">Edit</button>
        <button class="GenericButtonSmall" style="background: #EC8C8C" v-on:click="DeleteFlashcard">Delete</button>
    </div>
</template>

<script lang="ts">
import { Flashcard } from '../db/Flashcard.types';
import { defineComponent, reactive } from 'vue';

type FlashcardComponentProps = {
    flashcard : Flashcard,
    passEditFlashcard : Function,
    passDeleteFlashcard : Function,
    editMode : boolean
}

export default defineComponent({
    name: 'FlashcardComponent',
    props: {
        FlashcardComponents: { type: Object as () => FlashcardComponentProps, required : true}
    },
    data() {
        return {
            frontsideContent : "",
            backsideContent : "",
            editMode : false
        }
    },
    created(){
        this.editMode = this.FlashcardComponents.editMode
        this.frontsideContent = this.FlashcardComponents.flashcard.frontSide
        this.backsideContent = this.FlashcardComponents.flashcard.backSide
    },
    methods: {
        SaveChanges() {
            this.editMode = false;
            var flashcardToSend : Flashcard = {
                flashcardId : this.FlashcardComponents.flashcard.flashcardId,
                collectionId: this.FlashcardComponents.flashcard.collectionId,
                countId: this.FlashcardComponents.flashcard.countId,
                frontSide: this.frontsideContent,
                backSide: this.backsideContent
            }
            this.FlashcardComponents.passEditFlashcard(flashcardToSend)
        },

        CancelChanges() {
            this.editMode = false
            this.frontsideContent = this.FlashcardComponents.flashcard.frontSide
            this.backsideContent = this.FlashcardComponents.flashcard.backSide
        },

        DeleteFlashcard() {
            this.editMode = false;
            this.FlashcardComponents.passDeleteFlashcard(this.FlashcardComponents.flashcard)
        },

        InitEditMode() {
            this.editMode = true
        }
    }
})

</script>