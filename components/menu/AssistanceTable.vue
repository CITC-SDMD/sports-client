<template>
    <Menu as="div" class="absolute inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-600">
                Options
                <ChevronDownIcon class="-mr-1 size-5 text-white" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems :class="[
                'absolute z-10 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none',
                props.isReversedDropdown
                    ? 'bottom-full mb-2 origin-bottom-right right-0'
                    : 'mt-2 origin-top-right right-0'
            ]">
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a @click="goToViewDocuments(props.uuid)"
                        :class="[active ? 'bg-gray-100 text-blue-600 outline-none' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-pointer']">
                        <EyeIcon :class="[active ? 'text-blue-500' : '', 'mr-3 size-5']" aria-hidden="true" />
                        View certificate
                    </a>
                    </MenuItem>
                </div>
                <div v-if="props.model != 'approval'" class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a @click="goToViewProcessing(props.uuid)"
                        :class="[active ? 'bg-gray-100 text-blue-600 outline-none' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-pointer']">
                        <EyeIcon :class="[active ? 'text-blue-500' : '', 'mr-3 size-5']" aria-hidden="true" />
                        View Assistance
                    </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { athleteService } from '@/api/athlete/AthleteService'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
    ChevronDownIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/vue/20/solid'

const route = useRoute()
const path = route.fullPath

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const props = defineProps({
    isReversedDropdown: {
        type: Boolean,
        required: false
    },
    uuid: {
        type: String,
        required: true
    },
    model: {
        type: Object,
        required: false
    },
})


async function goToViewDocuments(value) {
    try {
        const response = await athleteService.fetchCertificate(value)
        if (response) {
            const blobContent = new Blob([response], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blobContent);
            const iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            iframe.src = blobUrl
            document.body.appendChild(iframe)
            iframe.onload = () => {
                iframe.contentWindow.print()
                iframe.onload = () => {
                    URL.revokeObjectURL(blobUrl)
                    document.body.removeChild(iframe)
                }
            }
        }
    } catch (error) {

    }
}

function goToViewProcessing(data) {
    if (path === '/assistance/process') {
        navigateTo(`${path}/${data}/assistance`)
    }

    if (path === '/assistance/release') {
        navigateTo(`${path}/${data}/assistance`)
    }
}

console.log(path)
console.log(uuid)

</script>