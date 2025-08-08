<template>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <div class=" border-b border-gray-200 bg-white py-5 rounded-lg shadow-sm">
            <div class="ml-4">
                <h3 class="text-medium font-bold text-gray-800 ">Medal Count</h3>
            </div>
        </div>
        <div class="mt-4">
            <VueApexCharts type="area" height="275" width="100%" :options="state.complainantOptions"
                :series="state.complainantOptions.series" />
        </div>
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <h3 class="shadow-sm border-b border-gray-200 py-5 text-medium font-bold text-gray-800 dark:text-white/90">
                Top
                Performing Athletes</h3>
            <div class="space-y-5 mt-5">
                <div v-for="(value, index) in performance" :key="index" class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div>
                            <p class="font-semibold text-gray-800 text-sm dark:text-white/90">
                                {{ value.name }}
                            </p>
                            <span class="block text-gray-500 text-xs dark:text-gray-400">
                                {{ value.sport }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span class="block text-gray-500 text-xs dark:text-gray-400">
                            Top {{ value.id }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 lg:col-span-2">
            <h3 class="text-medium font-bold text-gray-800 dark:text-white/90 shadow-sm border-b border-gray-200 py-5">
                Most Active Sports</h3>
            <div class="flex w-full space-x-4 mt-5">
                <FormTextField name="search" v-model=state.nameFilter class="w-full" placeholder="Search athlete" />
                <FormTextField name="search" v-model=state.yearFilter class="w-full" placeholder="Search year" />
                <FormSelect name="search" v-model=state.eventFilter :options="state.options.sports" class="w-full"
                    placeholder="Search sports" />
                <FormButton type="submit" @click="filterData" class="flex items-center gap-x-2">
                    <MagnifyingGlassIcon class="w-6 h-6" />
                    Filtered
                </FormButton>
            </div>
            <div class="space-y-5 mt-5">
                <div v-if="state.filteredSportsParticipation.length > 0">
                    <div v-for="(athlete, index) in state.filteredSportsParticipation" :key="index.id"
                        class="flex items-center justify-between">
                        <div class="flex items-center gap-3 py-3">
                            <div>
                                <p class="font-semibold text-gray-800 text-sm dark:text-white/90">
                                    {{ athlete.name }}
                                </p>
                                <span class="block text-gray-500 text-xs dark:text-gray-400">
                                    {{ athlete.sport }}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span class="block text-gray-500 text-xs dark:text-gray-400">
                                {{ athlete.year }}
                            </span>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500 text-center">No students match your criteria.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FormSelect } from '#components';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import VueApexCharts from 'vue3-apexcharts';

const sportsParticipation = [
    {
        year: 2023,
        name: 'Rodel Fernandez',
        sport: 'Baseball',
        participationCount: 25
    },
    {
        year: 2023,
        name: 'Allan Ray',
        sport: 'Football',
        participationCount: 30
    },
    {
        year: 2023,
        name: 'John Diems',
        sport: 'Skateboarding',
        participationCount: 28
    },
    {
        year: 2023,
        name: 'Emily Davis',
        sport: 'Swimming',
        participationCount: 20
    },
    {
        year: 2024,
        name: 'Chris Lee',
        sport: 'Swimming',
        participationCount: 35
    },
    {
        year: 2024,
        name: 'Sarah Kim',
        sport: 'Skateboarding',
        participationCount: 40
    },
    {
        year: 2024,
        name: 'David Brown',
        sport: 'Baseball',
        participationCount: 18
    },
    {
        year: 2024,
        name: 'Anna Wilson',
        sport: 'Baseball',
        participationCount: 22
    },
    {
        year: 2025,
        name: 'James Miller',
        sport: 'Volleyball',
        participationCount: 31
    },
    {
        year: 2025,
        name: 'Laura Garcia',
        sport: 'Golf',
        participationCount: 29
    }
];

const performance = [
    {
        id: 1,
        name: 'Rodel Fernandez',
        sport: 'Baseball',
    },
    {
        id: 2,
        name: 'Allan Ray',
        sport: 'Football',
    },
    {
        id: 3,
        name: 'John Diems',
        sport: 'Skateboarding',
    },
    {
        id: 4,
        name: 'Emily Davis',
        sport: 'Swimming',
    },
    {
        id: 5,
        name: 'Chris Lee',
        sport: 'Baseball',
    },
    {
        id: 6,
        name: 'Sarah Kim',
        sport: 'Volleyball',
    },
    {
        id: 7,
        name: 'David Brown',
        sport: 'Golf',
    },
    {
        id: 8,
        name: 'Anna Wilson',
        sport: 'Badminton',
    },
    {
        id: 9,
        name: 'James Miller',
        sport: 'Boxing',
    },
    {
        id: 10,
        name: 'Laura Garcia',
        sport: 'Table Tennis',
    }
]

const medals = [
    {
        gold: 39,
        silver: 41,
        bronze: 33
    },
    {
        gold: 38,
        silver: 32,
        bronze: 18
    },
    {
        gold: 27,
        silver: 14,
        bronze: 17
    },
    {
        gold: 22,
        silver: 21,
        bronze: 22
    },
    {
        gold: 17,
        silver: 7,
        bronze: 22
    },
    {
        gold: 10,
        silver: 11,
        bronze: 16
    },
]

const goldData = medals.map(m => m.gold);
const silverData = medals.map(m => m.silver);
const bronzeData = medals.map(m => m.bronze);

const state = reactive({
    nameFilter: '',
    yearFilter: '',
    eventFilter: '',
    filteredSportsParticipation: [...sportsParticipation],
    options: {
        sports: [
            {
                value: 'baseball',
                label: 'Baseball'
            },
            {
                value: 'football',
                label: 'Football'
            },
            {
                value: 'skateboarding',
                label: 'Skateboarding'
            },
            {

                value: 'swimming',
                label: 'Swimming'
            },
            {
                value: 'volleyball',
                label: 'Volleyball'
            },
            {
                value: 'golf',
                label: 'Golf'
            },
            {
                value: 'boxing',
                label: 'Boxing'
            },
            {
                value: 'table-tennis',
                label: 'Table Tennis'
            },
        ],
    },
    complainantOptions: {
        chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#3B82F6'],
        dataLabels: { enabled: true },
        stroke: { curve: 'smooth' },
        series: [
            {
                name: 'Gold',
                data: goldData
            },
            {
                name: 'Silver',
                data: silverData
            },
            {
                name: 'Bronze',
                data: bronzeData
            }
        ],
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec',
            ],
        }
    }
})


onMounted(() => {
    filterData();
});


const filterData = () => {
    state.filteredSportsParticipation = sportsParticipation.filter(student => {
        const nameMatches = student.name.toLowerCase().includes(state.nameFilter.toLowerCase());
        const sportMatches = student.sport.toLowerCase().includes(state.eventFilter.toLowerCase())
        const yearMatches = state.yearFilter
            ? student.year === Number(state.yearFilter)
            : true;
        return nameMatches && yearMatches && sportMatches;
    });
};

</script>
