<template>
    <div>
        <dl class="divide-y divide-gray-300">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-xl font-medium text-gray-900">Career details</dt>
                <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="px-4 py-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="flex flex-col">
                                <span class="text-sm">Competition</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.competition.competition_name }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Sport</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.sport.sports_name }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">ID number</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.id_number }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Performance</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.performance }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Career date</span>
                                <span class="text-xl font-medium">
                                    {{ moment(props.career.career_date).format('MMMM DD, YYYY') }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Position role</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.position_role }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Highlights</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.highlights }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Awards</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.awards }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Coach status</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.coach_status ?? '\u00A0' }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Is player injured</span>
                                <span class="text-xl font-medium" v-if="props.career.is_injured">
                                    Yes
                                </span>
                                <span class="text-xl font-medium" v-else>
                                    No
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Affiliations</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.affiliations ?? '\u00A0' }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Sports Association</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.sports_asso ?? '\u00A0' }}
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm">Trainings & Seminars</span>
                                <span class="text-xl font-medium">
                                    {{ props.career.training_seminar ?? '\u00A0' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-xl font-medium text-gray-900">Health Status</dt>
                <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="px-4 py-5 sm:p-6">
                            <!-- Content goes here -->
                        </div>
                    </div>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script setup>
import moment from 'moment'

const props = defineProps({
    career: {
        type: Object,
        required: true
    }
})

</script>