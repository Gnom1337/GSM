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

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

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