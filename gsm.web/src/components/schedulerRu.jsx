import { getSchedulerLocalization } from '@mui/x-scheduler/locales'; // импортируем утилиту прямо из пакета

const ruRUDialog = { // EventDialog (Окно события)
    colorPickerLabel: 'Цвет события',
    dateTimeSectionLabel: 'Дата и время',
    resourceColorSectionLabel: 'Ресурс и цвет',
    allDayLabel: 'Весь день',
    closeButtonAriaLabel: 'Закрыть',
    closeButtonLabel: 'Закрыть',
    deleteEvent: 'Удалить событие',
    descriptionLabel: 'Описание',
    endDateLabel: 'Дата окончания',
    endTimeLabel: 'Время окончания',
    eventTitleAriaLabel: 'Название события',
    generalTabLabel: 'Основное',
    labelNoResource: 'Без ресурса',
    labelInvalidResource: 'Недопустимый ресурс',
    recurrenceLabel: 'Повторение',
    recurrenceNoRepeat: "Не повторять",
    recurrenceCustomRepeat: 'Кастомное правило повторения',
    recurrenceDailyPresetLabel: 'Повторяется ежедневно',
    recurrenceDailyFrequencyLabel: 'дн.',
    recurrenceEndsLabel: 'Окончание',
    recurrenceEndsAfterLabel: 'После',
    recurrenceEndsNeverLabel: 'Никогда',
    recurrenceEndsUntilLabel: 'До',
    recurrenceEndsTimesLabel: 'раз(а)',
    recurrenceEveryLabel: 'Каждый(е)',
    recurrenceRepeatLabel: 'Повторять',
    recurrenceTabLabel: 'Повторение',
    recurrenceMainSelectCustomLabel: 'Повторение',
    recurrenceWeeklyFrequencyLabel: 'нед.',
    recurrenceWeeklyPresetLabel: weekday => `Повторяется еженедельно по ${weekday}`,
    recurrenceMonthlyFrequencyLabel: 'мес.',
    recurrenceMonthlyDayOfMonthLabel: dayNumber => `День ${dayNumber}`,
    recurrenceMonthlyLastWeekAriaLabel: weekDay => `${weekDay} последней недели месяца`,
    recurrenceMonthlyLastWeekLabel: weekDay => `Последний(яя) ${weekDay} месяца`,
    recurrenceMonthlyPresetLabel: dayNumber => `Повторяется ежемесячно в день ${dayNumber}`,
    recurrenceMonthlyWeekNumberAriaLabel: (ord, weekDay) => `${ord}-й(яя) ${weekDay} месяца`,
    recurrenceMonthlyWeekNumberLabel: (ord, weekDay) => `${ord}-й(яя) ${weekDay}`,
    recurrenceWeeklyMonthlySpecificInputsLabel: 'В',
    recurrenceYearlyFrequencyLabel: 'г.',
    recurrenceYearlyPresetLabel: date => `Повторяется ежегодно: ${date}`,
    noResourceAriaLabel: 'Без конкретного ресурса',
    resourceLabel: 'Ресурс',
    saveChanges: 'Сохранить',
    startDateAfterEndDateError: 'Дата/время начала должны быть раньше даты/времени окончания.',
    startDateLabel: 'Дата начала',
    startTimeLabel: 'Время начала',

    // RecurringScopeDialog (Окно области применения для повторяющихся событий)
    all: 'Все события',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    onlyThis: 'Только это событие',
    radioGroupAriaLabel: 'Область редактирования повторяющихся событий',
    thisAndFollowing: 'Это и последующие события',
    title: 'Применить это изменение к:', };
const ruRUCalendar = {
    resourcesLabel: 'Ресурсы',

    // ViewSwitcher (Переключатель видов)
    agenda: 'Повестка дня',
    day: 'День',
    month: 'Месяц',
    other: 'Другое',
    today: 'Сегодня',
    week: 'Неделя',
    time: 'Время',
    days: 'Дни',
    months: 'Месяцы',
    weeks: 'Недели',
    years: 'Годы',

    // DateNavigator (Навигатор по датам)
    closeSidePanel: 'Закрыть боковую панель',
    openSidePanel: 'Открыть боковую панель',

    // Preferences menu (Меню настроек)
    amPm12h: '12-часовой (1:00 PM)',
    hour24h: '24-часовой (13:00)',
    preferencesMenu: 'Настройки',
    showWeekends: 'Показывать выходные',
    showEmptyDaysInAgenda: 'Показывать пустые дни',
    showWeekNumber: 'Номера недель',
    timeFormat: 'Формат времени',
    viewSpecificOptions: view => `Опции вида: ${view}`,

    // WeekView (Вид «Неделя»)
    allDay: 'Весь день',

    // MonthView (Вид «Месяц»)
    hiddenEvents: hiddenEventsCount => `Еще +${hiddenEventsCount}`,
    nextTimeSpan: timeSpan => `След. ${timeSpan}`,
    previousTimeSpan: timeSpan => `Пред. ${timeSpan}`,
    resourceAriaLabel: resourceName => `Ресурс: ${resourceName}`,
    weekAbbreviation: 'Н',
    weekNumberAriaLabel: weekNumber => `Неделя ${weekNumber}`,

    // EventItem (Элемент события)
    eventItemMultiDayLabel: endDate => `Окончание: ${endDate}`,

    // MiniCalendar (Мини-календарь в боковой панели)
    miniCalendarLabel: 'Календарь',
    miniCalendarGoToPreviousMonth: 'Показать предыдущий месяц',
    miniCalendarGoToNextMonth: 'Показать следующий месяц',

    // Timeline title sub grid (Заголовок таймлайна)
    timelineResourceTitleHeader: 'Название ресурса', };
const ruRUTimeline = { timelineResourceTitleHeader: 'Название ресурса', };

export const customRuRU = getSchedulerLocalization({
    dialog: ruRUDialog,
    calendar: ruRUCalendar,
    timeline: ruRUTimeline
});