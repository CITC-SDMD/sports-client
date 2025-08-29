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
                            {{ props.model?.event_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <TrophyIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.sport?.sports_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <EnvelopeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.event_type }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <AcademicCapIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.organizer }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CalendarDateRangeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (props.model?.event_start) ?
                                moment(props.model?.event_start).format("MMMM DD, YYYY") : '' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CalendarDateRangeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (props.model?.event_end) ?
                                moment(props.model?.event_end).format("MMMM DD, YYYY") : '' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <PencilIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.description }}
                        </span>
                    </div>
                </div>
                <div class="flex-col space-y-3">
                    <div class="flex items-center gap-x-2">
                        <IdentificationIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.gender_category }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <UserGroupIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.participant_type }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <TrophyIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.venue_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <MapPinIcon class="w-5 h-5 text-blue-600" />
                        {{ props.model?.location }}
                    </div>
                    <div class="flex items-center gap-x-2">
                        <UsersIcon class="w-5 h-5 text-blue-600" />
                        {{ props.model?.capacity }}
                    </div>
                    <div class="flex items-center gap-x-2">
                        <TagIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ props.model?.age_category }}
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
    CalendarDateRangeIcon,
    EnvelopeIcon,
    IdentificationIcon,
    MapPinIcon,
    TrophyIcon,
    UsersIcon,
    UserGroupIcon,
    PencilIcon,
    TagIcon
} from '@heroicons/vue/24/outline'

const avatarUrl = ref('/img/avatars/tropy.png')

const props = defineProps({
    model: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    if (props.model.image) {
        avatarUrl.value = props.model.image
    }
})
</script>