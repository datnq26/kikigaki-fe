import dayjs from '@/configs/dayjs.config'
import {
    DEFAULT_DATETIME_FORMAT,
    MONTH_DATE_FORMAT,
} from '@/constants/datetime'

export function capitalize(word: string): string {
    return word.charAt(0) + word.slice(1).toLowerCase()
}

export const formatDateTime = (datetime: any, format: any = null) => {
    if (!format) {
        format = DEFAULT_DATETIME_FORMAT
    }
    return dayjs(datetime).tz().format(format)
}

export function formatSteakTooltip(
    record: { date: string; lessons: number } | null
): string {
    if (!record) return ''
    const day = formatDateTime(record.date, MONTH_DATE_FORMAT)
    if (!record.lessons) {
        return `No lessons completed on ${day}`
    }
    return `${record.lessons} lesson${record.lessons > 1 ? 's' : ''} completed on ${day}`
}
