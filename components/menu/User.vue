<template>
    <Menu as="div" class="absolute inline-block text-left py-2">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-800">
                Options
                <ChevronDownIcon class="-mr-1 size-5 text-white" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <NuxtLink @click="goToEdit(props.uuid)"
                        :class="[active ? 'bg-gray-100 text-blue-500 outline-none' : 'text-gray-700', 'flex block px-4 py-2 text-sm cursor-pointer']">
                        <PencilSquareIcon :class="[active ? 'text-blue-500' : 'text-gray-900', 'size-5 mr-2']" />
                        Edit User
                    </NuxtLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <NuxtLink @click=""
                        :class="[active ? 'bg-gray-100 text-red-500 outline-none' : 'text-gray-700', 'flex block px-4 py-2 text-sm cursor-pointer']">
                        <TrashIcon :class="[active ? 'text-red-500' : 'text-gray-900', 'size-5 mr-2']" />
                        Delete User
                    </NuxtLink>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    uuid: {
        type: String,
        required: true
    }
})

const route = useRoute()
const path = route.fullPath

function goToEdit(data: string) {
    navigateTo(`${path}/${data}/edit`)
}
</script>