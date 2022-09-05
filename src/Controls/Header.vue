<template>
    <div class="MainHeader">
        <nav>
            <p style="text-align: center">Decahex Flashcards {{title}}</p>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
    props: {
        title: {
            type: String,
            required: false,
            default: 'fds'
        }
    }
})

</script>