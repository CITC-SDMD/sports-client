<template>
    <Multiselect :close-on-select="true" :searchable="searchable" :options="options" :canClear="canClear" />
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const props = defineProps({
    name: String,
    canClear: {
        type: Boolean,
        default: true,
    },
    options: {
        type: Array,
        required: true,
    },
    searchable: {
        type: Boolean,
        default: true,
    },
})
</script>