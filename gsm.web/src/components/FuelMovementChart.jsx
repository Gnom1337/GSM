import {

    Paper,
    Typography

} from "@mui/material";

import {

    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend

} from "recharts";

export default function FuelMovementChart({ data }) {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        // Вернет дату в локальном формате, например: 26.07.2026
        return date.toLocaleDateString("ru-RU");

        // Альтернатива, если на бэкенде дата уже в формате YYYY-MM-DD:
        // return dateStr.split('T')[0];
    };
    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                height: 420
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Движение топлива
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" tickFormatter={formatDate} />

                    <YAxis />

                    <Tooltip
                        labelFormatter={formatDate}
                        formatter={(value, name) => [value, name]}
                    />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="received"
                        name="Поступление"
                        stroke="#4caf50"
                        strokeWidth={3}
                        
                    />

                    <Line
                        type="monotone"
                        dataKey="dispatched"
                        name="Отгрузка"
                        stroke="#f44336"
                        strokeWidth={3}
                        
                    />

                </LineChart>

            </ResponsiveContainer>

        </Paper>

    )

}