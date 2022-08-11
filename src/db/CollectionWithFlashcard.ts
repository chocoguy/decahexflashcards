import { Flashcard } from "./Flashcard.types";

export type CollectionWithFlashcard = {
    collectionId : string,
    name : string,
    flashCardCount : number
    flashcards : Array<Flashcard>
}