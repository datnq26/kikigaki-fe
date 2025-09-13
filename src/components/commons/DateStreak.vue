<template>
    <div class="streak-container">
        <div class="day-labels">
            <span v-for="d in days" :key="d">{{ d }}</span>
        </div>

        <div class="streak-weeks">
            <div class="month-labels">
                <span
                    v-for="(month, idx) in monthLabels"
                    :key="idx"
                    class="month-label"
                    :style="{ gridColumnStart: month.startCol }"
                >
                    {{ month.name }}
                </span>
            </div>
            <div class="weeks">
                <div v-for="(week, wIdx) in weeks" :key="wIdx" class="week-col">
                    <div
                        v-for="(val, dIdx) in week"
                        :key="dIdx"
                        class="day-cell"
                        :style="{ backgroundColor: getStreakColor(val) }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { getStreakColor } from '@/utils/get'

interface Props {
    records: Record<string, number>
}

const props = defineProps<Props>()

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const start = dayjs().startOf('year')
const end = dayjs()
const allDays: dayjs.Dayjs[] = []
let cursor = start.clone()
while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
    allDays.push(cursor.clone())
    cursor = cursor.add(1, 'day')
}

const weeks = computed(() => {
    const result: number[][] = []
    let currentWeek: number[] = new Array(7).fill(0)

    allDays.forEach((date, idx) => {
        const dayOfWeek = date.day()
        const key = date.format('YYYY-MM-DD')
        const value = props.records[key] ?? 0
        currentWeek[dayOfWeek] = value

        if (dayOfWeek === 6 || idx === allDays.length - 1) {
            result.push(currentWeek)
            currentWeek = new Array(7).fill(0)
        }
    })
    return result
})

const monthLabels = computed(() => {
    const labels: { name: string; startCol: number }[] = []
    weeks.value.forEach((_, wIdx) => {
        const baseDay = allDays[wIdx * 7]
        if (!baseDay) return
        const monthName = baseDay.format('MMM')
        if (
            labels.length === 0 ||
            labels[labels.length - 1].name !== monthName
        ) {
            labels.push({ name: monthName, startCol: wIdx + 1 })
        }
    })
    return labels
})
</script>

<style scoped>
.panel {
    border-radius: 12px;
    padding: 16px;
}

.section-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.streak-container {
    display: flex;
    gap: 8px;
}

.day-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
    margin-right: 4px;
}

.day-labels span {
    height: 18px;
}

.streak-weeks {
    display: flex;
    flex-direction: column;
}

.month-labels {
    display: grid;
    grid-auto-flow: column;
    font-size: 12px;
    margin-bottom: 4px;
    color: #666;
}

.month-label {
    text-align: left;
}

.weeks {
    display: flex;
    gap: 4px;
}

.week-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.day-cell {
    width: 12px;
    height: 12px;
    border-radius: 3px;
}

.legend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    margin-top: 12px;
}

.legend-box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
}
</style>
