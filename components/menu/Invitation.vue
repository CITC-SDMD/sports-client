<template>
    <Menu as="div" class="relative inline-block text-left">
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
                    <a @click="generateQualifiedAthlete"
                        :class="[active ? 'bg-gray-100 text-blue-600 outline-none' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-pointer']">
                        <UsersIcon :class="[active ? 'text-blue-500' : '', 'mr-3 size-5']" aria-hidden="true" />
                        Generate athletes
                    </a>
                    </MenuItem>
                </div>
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a @click="sendInvitationToQualified"
                        :class="[active ? 'bg-gray-100 text-blue-600 outline-none' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-pointer']">
                        <PaperAirplaneIcon :class="[active ? 'text-blue-500' : '', 'mr-3 size-5']" aria-hidden="true" />
                        Send invitation athletes
                    </a>
                    </MenuItem>
                </div>
                <div v-if="canSendLetter" class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a @click="sendEndorsementLetter()"
                        :class="[active ? 'bg-gray-100 text-blue-600 outline-none' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-pointer']">
                        <PaperAirplaneIcon :class="[active ? 'text-blue-500' : '', 'mr-3 size-5']" aria-hidden="true" />
                        Send endorsement letter
                    </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { eventService } from '@/api/event/EventService'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, UsersIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'
import moment from 'moment';

const { successAlert } = useAlert()

const emit = defineEmits(['isPageLoading', 'showError'])

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
    eventStart: {
        type: String,
        required: true
    },
})

const state = reactive({
    error: null
})

const canSendLetter = computed(() => {
    if (!props.eventStart?.event_start) return false
    return moment(props.eventStart?.event_start).isSameOrAfter(moment(), 'day')
})

async function generateQualifiedAthlete() {
    emit('isPageLoading', true)
    try {
        const response = await eventService.generateQualifiedAthletes(uuid)
        if (response.data) {
            successAlert('Success!', 'Generate qualified athletes.')
        }
    } catch (error) {
        emit('showError', state.error)
    }
    emit('isPageLoading', false)
}

async function sendInvitationToQualified() {
    emit('isPageLoading', true)
    try {
        let params = {
            event_uuid: uuid
        }
        const response = await eventService.sendInvitationToAthletes(params)
        if (response) {
            successAlert('Success!', 'Send invitation qualified athletes.')
        }
    } catch (error) {
        state.error = error
    }
    emit('isPageLoading', false)
}

async function sendEndorsementLetter() {
    emit('isPageLoading', true)
    try {
        let params = {
            event_uuid: uuid
        }
        const response = await eventService.sendEndorsementLetter(params)
        if (response) {
            successAlert('Success!', 'Send endorsement letter.')
        }
    } catch (error) {
        state.error = error
    } finally {
        emit('isPageLoading', false)
    }
}

</script>