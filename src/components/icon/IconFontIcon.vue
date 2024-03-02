<template>
    <!--  v-bind="$attrs" 透传所有Neticon上的属性 -->
    <Neticon v-bind="props"></Neticon>
</template>

<script setup lang="ts">
import type { NeticonProps } from './types';


const props = withDefaults(defineProps<NeticonProps>(), {
    url: '/font_4440590_lfenwi7ww6l.css',
    fontFamily: 'iconfont',
    fontClass: 'icon-',
    type: ''
})
</script>

<style scoped></style>