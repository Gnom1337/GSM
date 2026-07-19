import dayjs from "dayjs";

export const getDashboard = async () => {

    const dailyStats = [];

    for (let i = 1; i <= 30; i++) {

        dailyStats.push({

            date: dayjs()
                .startOf("month")
                .add(i - 1, "day")
                .format("DD.MM"),

            received:
                Math.round(Math.random() * 12000 + 4000),

            dispatched:
                Math.round(Math.random() * 10000 + 3000)

        });

    }

    return {

        totalReceived: 125430,

        totalDispatched: 118900,

        totalLoss: 76,

        currentVolume: 382700,

        dailyStats,
        tanks: [
            {
                tankId: 1,
                number: "РВС-1",
                product: "АИ-92",
                currentVolume: 24500,
                capacity: 30000
            },
            {
                tankId: 2,
                number: "РВС-2",
                product: "АИ-95",
                currentVolume: 16200,
                capacity: 30000
            },
            {
                tankId: 3,
                number: "РВС-3",
                product: "ДТ",
                currentVolume: 28900,
                capacity: 30000
            },
            {
                tankId: 4,
                number: "РВС-4",
                product: "ТС-1",
                currentVolume: 5200,
                capacity: 30000
            }
        ],
        operations: [
            {
                id: 1,
                type: "receipt",
                title: "Поступление вагона №52413718",
                description: "РВС-2 • ДТ • +48 520 л",
                dateTime: "Сегодня 14:32"
            },
            {
                id: 2,
                type: "dispatch",
                title: "Отгрузка МАЗ А123ВС",
                description: "ООО «ГазСнаб» • −9 800 л",
                dateTime: "Сегодня 11:05"
            },
            {
                id: 3,
                type: "measurement",
                title: "Замер резервуара РВС-1",
                description: "Фактический объем: 24 520 л",
                dateTime: "Сегодня 08:00"
            },
            {
                id: 4,
                type: "receipt",
                title: "Поступление вагона №51274891",
                description: "РВС-3 • АИ-92 • +42 300 л",
                dateTime: "Вчера 18:20"
            },
            {
                id: 5,
                type: "receipt",
                title: "Поступление вагона №51274891",
                description: "РВС-3 • АИ-92 • +42 300 л",
                dateTime: "Вчера 18:20"
            }
            
        ]
    }

}