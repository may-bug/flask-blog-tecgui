import {format, isToday, isYesterday, parseISO, subDays} from 'date-fns';

export function formatDate(dateString) {
    if (!dateString) return ''; // 如果日期字符串为空或未定义，返回空字符串

    const date = parseISO(dateString);

    if (!date) return ''; // 如果解析后的日期对象为空，返回空字符串

    if (isToday(date)) {
        return `今天 ${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
        return `昨天 ${format(date, 'HH:mm')}`;
    } else if (date > subDays(new Date(), 7)) {
        return format(date, 'EEEE HH:mm'); // 显示星期几和时间
    } else if (date > subDays(new Date(), 365)) {
        return format(date, 'MM-dd HH:mm'); // 显示月份、日期和时间
    } else {
        return format(date, 'yyyy-MM-dd HH:mm'); // 显示年份、月份、日期和时间
    }
}
