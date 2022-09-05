<template>
    <Header title="Home"></Header>
    <div class="Home">
        <div class="AddFlashCardDiv">
            <button class="HomeBtn" style="background: #99EC8C" v-on:click="InitAddFlashcards">Add Flashcards!</button>
        </div>
        <div>
            <button class="HomeBtn" style="background: #8CD5EC" v-on:click="NavigateTo('/viewflashcards')">View!</button>
        </div>
        <div>
            <button class="HomeBtn" style="background: #ECE88C" v-on:click="NavigateTo('/editflashcards')">Edit!</button>
        </div>
        <div>
            <button class="HomeBtn" style="background: #EC8C8C" v-on:click="NavigateTo('/deleteflashcards')">Delete!</button>
        </div>
        <div>
            <button class="HomeBtn" style="background: #AA8CEC" v-on:click="NavigateTo('/about')">About!</button>
        </div>
    </div>
    <div className='MainFooter'>
            <div className='MainFooterFlex'>
                <div>
                <img width="30" height="30"  src="../assets/house-solid.svg" />
                </div>
                <div>
                <img width="30" height="30" src="../assets/circle-question-solid.svg" />
                </div>
            </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DbService } from '../db/DbService';
import  Header  from '../Controls/Header.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'
import router from '@/router';


export default defineComponent({
    name: "Home",
    created() {
        DbService.InitTables();
    },
    methods: {
        InitAddFlashcards() {
            sessionStorage.setItem("initNewSet", "yea");
            router.push("/addeditcollection/-1");
        },
        NavigateTo(uri : string){
            router.push(uri)
        }
    },
    components: { Header }
})

</script>