<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { getStreakColor } from '@/utils/get'
import { UserDailyActivityResponse } from '@/interfaces/daily'
import { formatDateTime, formatSteakTooltip } from '@/utils/format'
import { DATE_STEAK_FORMAT, MONTH_STEAK_FORMAT } from '@/constants/datetime'

interface Props {
    records: UserDailyActivityResponse[]
}
const props = defineProps<Props>()

const days = ['Mon', 'Wed', 'Fri', 'Sun']

const recordsMap = computed(() => {
    const map: Record<string, number> = {}
    props.records.forEach((r) => {
        map[r.date] = r.completed_lessons
    })
    return map
})

const start = dayjs().startOf('year')
const end = dayjs()
const allDays: dayjs.Dayjs[] = []
let cursor = start.clone()
while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
    allDays.push(cursor.clone())
    cursor = cursor.add(1, 'day')
}

const weeks = computed(() => {
    const result: ({ date: string; lessons: number } | null)[][] = []
    let currentWeek: ({ date: string; lessons: number } | null)[] = new Array(
        7
    ).fill(null)

    allDays.forEach((date, idx) => {
        const dayOfWeek = (date.day() + 6) % 7
        const key = formatDateTime(date, DATE_STEAK_FORMAT)
        const value = recordsMap.value[key] ?? 0

        currentWeek[dayOfWeek] = { date: key, lessons: value }

        if (dayOfWeek === 6 || idx === allDays.length - 1) {
            result.push(currentWeek)
            currentWeek = new Array(7).fill(null)
        }
    })

    if (currentWeek.some((v) => v !== null)) {
        result.push(currentWeek)
    }
    return result
})

const monthLabels = computed(() => {
    const labels: { name: string; startCol: number }[] = []

    weeks.value.forEach((week, wIdx) => {
        const dayIndex = week.findIndex((v) => v !== null)
        if (dayIndex === -1) return

        const date = start.add(wIdx, 'week').add(dayIndex, 'day')
        const monthName = formatDateTime(date, MONTH_STEAK_FORMAT)

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

<template>
    <div class="streak-container">
        <div class="day-labels">
            <span v-for="d in days" :key="d">{{ d }}</span>
        </div>

        <div class="calendar-body">
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
                    <div v-for="(val, dIdx) in week" :key="dIdx">
                        <el-tooltip
                            effect="dark"
                            :content="formatSteakTooltip(val)"
                            :show-after="100"
                        >
                            <div
                                class="day-cell"
                                :style="{
                                    backgroundColor: !val
                                        ? '#fff'
                                        : getStreakColor(val.lessons),
                                }"
                            />
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    height: 14px;
}

.calendar-body {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: repeat(auto-fit, 14px);
    gap: 4px;
}

.month-labels {
    display: grid;
    grid-template-columns: repeat(v-bind('weeks.length'), 14px);
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
}
.month-label {
    grid-row: 1;
    text-align: left;
}

.weeks {
    display: grid;
    grid-template-columns: repeat(v-bind('weeks.length'), 14px);
}

.week-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.day-cell {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    cursor: pointer;
}

.day-cell:hover {
    outline: 1px solid #333;
    outline-offset: 1px;
}
</style>
