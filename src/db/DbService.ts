import { openDB, deleteDB, wrap, unwrap } from "idb";
import { Collection } from './Collection.types';
import { CollectionWithFlashcard } from "./CollectionWithFlashcard";
import { Flashcard } from "./Flashcard.types";


export class DbService {


    static async InitTables() {
        const dbPromise = openDB('flashcards', 1, {
            upgrade(db) {
                if(!db.objectStoreNames.contains('collection')){
                   const collectionStore = db.createObjectStore('collection', {
                       keyPath : 'collectionId'
                   });
                   collectionStore.createIndex('name', 'name', {unique : false})
                   collectionStore.createIndex('flashcardCount', 'flashcardCount', {unique : false})
                }
                if(!db.objectStoreNames.contains('flashcard')){
                   const flashcardStore = db.createObjectStore('flashcard', {
                       keyPath : 'flashcardId'
                   });
                   flashcardStore.createIndex('collectionId', 'collectionId', {unique : false})
                   flashcardStore.createIndex('countId', 'countId', {unique : false})
                   flashcardStore.createIndex('frontSide', 'frontSide', {unique : false})
                   flashcardStore.createIndex('backSide', 'backSide', {unique : false})
                }
            }
        })
    }


    static async InsertSingleCollection(collectionObject : Collection) {
        const db = await openDB('flashcards', 1)
        var tx = db.transaction('collection', 'readwrite');
        var store = tx.objectStore('collection');
        store.add(collectionObject);
    }
    

    static async GetSingleCollection(collectionId : string) {
        const db = await openDB('flashcards', 1)
        var tx = db.transaction('collection', 'readonly');
        var store = tx.objectStore('collection');
        return store.get(collectionId);
    }


    static async GetFlashcardsByCollectionId(collectionId : string) {
        const db = await openDB('flashcards', 1);
        const tx = db.transaction('flashcard', 'readwrite');
        const store = tx.objectStore('flashcard')
        const collectionIdIndex = store.index("collectionid")
        return collectionIdIndex.getAll(collectionId)
    }


    static async GetSingleCollectionWithFlashcards(collectionId : string) {
        var flashCardsFromCollection : Array<Flashcard> = []
        const db = await openDB('flashcards', 1);
        var tx1 = db.transaction('collection', 'readonly');
        var collectionStore = tx1.objectStore('collection');
        var currentCollection = collectionStore.get(collectionId)

        //flashcards
        var tx2 = db.transaction('flashcard', 'readonly');
        var index = tx2.store.index('collectionid');
        for await ( const cursor of index.iterate(collectionId)) {
            const flashcard = { ...cursor.value }
            flashCardsFromCollection.push(flashcard);
        }
        var flashcardStore = tx2.objectStore('flashcard')
    }


    static async InsertSingleFlashcard(flashcardObject : Flashcard) {
        const db = await openDB('flashcards', 1);
        var tx = db.transaction('flashcard', 'readwrite');
        var store = tx.objectStore('flashcard')
        store.add(flashcardObject);
    }


    static async GetSingleFlashcard(flashcardId : string) {
        const db = await openDB('flashcards', 1);
        var tx = db.transaction('flashcard', 'readonly');
        var store = tx.objectStore('flashcard');
        return store.get(flashcardId);
    }


    static async InsertCollectionAndFlashcards(collectionObject : Collection, flashcardArray : Array<Flashcard>) {
        const db = await openDB('flashcards', 1);
        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        collectionstore.add(collectionObject);
        
        for (let i = 0; i < flashcardArray.length; i++) {
            flashcardstore.add(flashcardArray[i])
            
        }
    }


    static async UpdateCollectionAndFlashcards(collectionObject : Collection, flashcardArray : Array<Flashcard>) {
        try {
            var currentCollectionFlashCards = await this.GetFlashcardsByCollectionId(collectionObject.collectionId)

            const db = await openDB('flashcards', 1);
            var flashcardtx = db.transaction('flashcard', 'readwrite');
            var flashcardstore = flashcardtx.objectStore('flashcard')

            var collectiontx = db.transaction('collection', 'readwrite');
            var collectionstore = collectiontx.objectStore('collection');
            console.log("open")
            collectionstore.put(collectionObject);
            console.log("put collection")

            for (let i = 0; i < currentCollectionFlashCards.length; i++) {
                flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
                //flashcardstore.add(flashCardArray[i])
                //flashcardstore.put(flashCardArray[i])
            }
            for (let i = 0; i < flashcardArray.length; i++) {
                console.log(flashcardArray[i])
                //flashcardstore.delete(flashCardArray[i].flashcardid)



                flashcardstore.add(flashcardArray[i])



                //flashcardstore.put(flashCardArray[i])


            }
        }
        catch (error) {
            console.log(error)
        }
    }


    static async AddUpdateSingleCollection(collectionObject : Collection) {
        try{
            const db = await openDB('flashcards', 1);
            var collectiontx = db.transaction('collection', 'readwrite');
            var collectionstore = collectiontx.objectStore('collection');
            console.log("OPENN")
            collectionstore.put(collectionObject)
            console.log("PUT da COLLECTION")
          }
          catch(error){
            console.log(error)
          }
    }


    static async DeleteSingleCollection(collectionObject : Collection) {
      //should probably also delete associated flashcards
      try{

        var currentCollectionFlashCards = await this.GetFlashcardsByCollectionId(collectionObject.collectionId)

        const db = await openDB('flashcards', 1);

        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        for (let i = 0; i < currentCollectionFlashCards.length; i++) {
          flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
          //flashcardstore.add(flashCardArray[i])
          //flashcardstore.put(flashCardArray[i])
        }

        console.log("OPENN")
        collectionstore.delete(collectionObject.collectionId)
        console.log("DELETE da COLLECTION")
      }
      catch(error){
        console.log(error)
      }
    }


    static async DeleteSingleCollectionByCollectionId(collectionId : string) {
      //should probably also delete associated flashcards
      try{

        var currentCollectionFlashCards = await this.GetFlashcardsByCollectionId(collectionId)

        const db = await openDB('flashcards', 1);

        var flashcardtx = db.transaction('flashcard', 'readwrite');
        var flashcardstore = flashcardtx.objectStore('flashcard')

        var collectiontx = db.transaction('collection', 'readwrite');
        var collectionstore = collectiontx.objectStore('collection');

        for (let i = 0; i < currentCollectionFlashCards.length; i++) {
          flashcardstore.delete(currentCollectionFlashCards[i].flashcardid)
          //flashcardstore.add(flashCardArray[i])
          //flashcardstore.put(flashCardArray[i])
        }

        console.log("OPENN")
        collectionstore.delete(collectionId)
        console.log("DELETE da COLLECTION")
      }
      catch(error){
        console.log(error)
      }
    }


    static async GetAllCollections() {
        const db = await openDB('flashcards', 1);
        const tx = db.transaction('collection', 'readwrite');
        const store = tx.objectStore('collection')
        return  store.getAll()
    }


}