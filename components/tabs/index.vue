<template>
    <div class="overflow-hidden rounded-lg border-l-blue-500 border border-x-4 bg-white shadow">
        <div class="grid grid-cols-1 sm:hidden">
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select aria-label="Select a tab"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
            </select>
            <ChevronDownIcon
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                aria-hidden="true" />
        </div>
        <div class="hidden sm:block">
            <div class="px-4">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                    <NuxtLink v-for="tab in props.tabs" :key="tab.name" :to="tab.href"
                        :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']"
                        :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</NuxtLink>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    } as any
})
</script>