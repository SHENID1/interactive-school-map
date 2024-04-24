export default class DateFunctions {
    static options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    static DayOptions = () => [
        {
            value: 1,
            label: 'Понедельник',
        },
        {
            value: 2,
            label: 'Вторник',
        },
        {
            value: 3,
            label: 'Среда',
        },
        {
            value: 4,
            label: 'Четверг',
        },
        {
            value: 5,
            label: 'Пятница',
        },
        {
            value: 6,
            label: 'Суббота',
        },
        {
            value: 0,
            label: 'Воскресенье',
        }
    ]


}