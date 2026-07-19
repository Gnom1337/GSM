import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import {
    Container,
    Stack,
    Typography
} from "@mui/material";

import dayjs from "dayjs";
import Stats from '@mui/icons-material/BarChart';
import DashboardFilters from "../components/DashboardFilters";
import StatCards from "../components/StatCards";
import OperationTimeline from "../components/OperationTimeline";
import { getDashboard } from "../services/dashboardApi";
import FuelMovementChart from "../components/FuelMovementChart";
import TankStatusCards from "../components/TankStatusCards";
export default function DashboardPage() {

    const [from, setFrom] = useState(dayjs().startOf("month"));

    const [to, setTo] = useState(dayjs());

    const [dashboard, setDashboard] = useState({});

    const load = async () => {
        console.log("before");

        const data = await getDashboard();

        console.log("after");

        setDashboard({
            totalReceived: data.totalReceived,
            totalDispatched: data.totalDispatched,
            totalLoss: data.totalLoss,
            currentVolume: data.currentVolume,
            dailyStats: data.dailyStats,
            operations: data.operations,
            tanks : data.tanks
        });
    };

    useEffect(() => {
        load();
    }, []);


    return (
        <Container maxWidth={false}>
            <Stack spacing={3}>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "stretch",
                            sm: "center",
                        },
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stats color="secondary" sx={{ fontSize: 28 }} />
                    <Typography variant="h5" fontWeight={600} >
                         Стастистика
                    </Typography>
                    </Stack>
                    <DashboardFilters
                        from={from}
                        to={to}
                        setFrom={setFrom}
                        setTo={setTo}
                        onApply={load}
                    />
                </Box>

                <StatCards data={dashboard} />

                <FuelMovementChart
                    data={dashboard.dailyStats ?? []}
                />
                <TankStatusCards
                    tanks={dashboard.tanks ?? []}
                />
                <OperationTimeline
                    operations={dashboard.operations ?? []}
                />

            </Stack>
        </Container>
    );
}