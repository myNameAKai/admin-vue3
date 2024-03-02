<template>
    <!-- <span class="ep:fullscreen" v-if="!isFullScreen" @click="toggle"></span>
    <span class="ep:fullscreen-exit" v-else @click="toggle"></span> -->
    <component :is="tag"
        :class="[isFullscreen ? 'i-material-symbols:fullscreen-exit' : 'i-material-symbols:fullscreen', 'cursor-pointer']"
        @click="toggle"></component>
</template>

<script setup lang="ts">
const {
    isFullscreen,
    toggle
} = useFullscreen()

defineProps({
    tag: {
        type: String,
        default: 'i'
    }
})
</script>

<style scoped></style>