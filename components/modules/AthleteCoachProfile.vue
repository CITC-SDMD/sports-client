<template>
    <div class="overflow-hidden rounded-lg border-l-blue-500 border border-x-4 bg-white shadow">
        <div class="px-4 py-5 sm:p-6">
            <div class="flex flex-col sm:flex-row sm:gap-x-10 space-y-4 sm:space-y-0">
                <div class="flex items-center justify-center sm:justify-normal">
                    <img class="size-32 rounded-full ring-4 ring-white sm:size-48 bg-white" :src="avatarUrl"
                        alt="profile photo" />
                </div>
                <div class="space-y-3">
                    <div>
                        <span class="font-bold text-xl">
                            {{ props.model?.firstname }}
                            {{ (props.model?.middlename === 'null') ? '' : props.model?.middlename }}
                            {{ props.model?.lastname }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CakeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (props.model?.birth_date) ?
                                moment(props.model?.birth_date).format('MMMM DD, YYYY') : '' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <EnvelopeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.email }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <MapPinIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.address }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <ScaleIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.civil_status }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <IdentificationIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.age }}
                        </span>
                    </div>
                </div>
                <div class="flex-col space-y-3">
                    <div class="flex items-center gap-x-2">
                        <PhoneIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.contact_no }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <AcademicCapIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.school?.school_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <BriefcaseIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.occupation }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <TrophyIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.club_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CalendarDateRangeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (props.model?.registry_date) ?
                                moment(props.model?.registry_date).format("MMMM DD, YYYY") : '' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <UserIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.sex }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import {
    AcademicCapIcon,
    BriefcaseIcon,
    CakeIcon,
    CalendarDateRangeIcon,
    EnvelopeIcon,
    IdentificationIcon,
    MapPinIcon,
    PhoneIcon,
    ScaleIcon,
    TrophyIcon,
    UserIcon
} from '@heroicons/vue/24/outline'

const avatarUrl = ref('/img/avatars/user.svg')

const props = defineProps({
    model: {
        type: Object,
        required: true
    }
})

const state = reactive({
    age: null as any
})

onMounted(() => {
    state.age = computedAge
    avatarUrl.value = props.model.image
})

const computedAge = computed(() => {
    const birthDate = props.model?.birth_date
    if (!birthDate) return ''

    const today = new Date()
    const birth = new Date(birthDate)

    if (isNaN(birth.getTime())) return ''

    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
})
</script>