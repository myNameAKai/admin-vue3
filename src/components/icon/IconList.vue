<template>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(1.875rem,1fr))] border-l border-t rounded">
        <li v-for="(item, index) in iconData" :key="index"
            :class="['border-r border-b flex flex-col justify-center items-center cursor-pointer', itemClass]"
            @click="handleClick(collection + ':' + item, index)">
            <component :is="Icon" :icon="collection + ':' + item" :class="[iconClass, {
                [activeClass]: moduleValue ? moduleValue === (collection + ':' + item) : activeIndex === index
            }]"></component>
            <div v-show="showText" class="mt-4">{{ transformString(item) }}</div>
        </li>
    </ul>
</template>

<script setup lang="ts">

import data from "./icon-ep.json"
import { loadIcons, Icon } from "@iconify/vue"
import type { IconListProps } from "./types";
import { defineModel } from "vue"
const props = withDefaults(defineProps<IconListProps>(), {
    iconData: () => data,
    collection: 'ep',
    itemClass: 'hover:bg-sky-100 py-4 w-1/8',
    iconClass: 'text-3xl',
    showText: false,
    activeClass: '',
})
const activeIndex = ref(-1)
const moduleValue = defineModel({
    type: String
})

const emits = defineEmits(['click'])
onBeforeMount(async () => {

    await loadIcons(props.iconData)
})

function transformString(input: string): string {
    const words = input.split('-');
    const transformedWords = words.map((word, index) => {
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return transformedWords.join('');
}



async function handleClick(i: string, num: number) {
    activeIndex.value = num
    // modueelValue undefined 问题 遗留 
    // moduleValue.value = i
    emits('click', i)
}
</script>

<style scoped></style>