<template>
    <div>
        <IconPicker @submit="handleSubmit"></IconPicker>
    </div>
</template>

<script setup lang="ts">
import type { IconPickerSubmitProps } from '@/components/icon/types';

function handleSubmit(e: IconPickerSubmitProps) {
    console.log(e)
}
</script>

<style scoped></style>