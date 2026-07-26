import {
    Grid,
    Paper,
    Typography,
    Stack
} from "@mui/material";

import {
    TrendingUp,
    TrendingDown,
    LocalGasStation
} from "@mui/icons-material";

const cards = [
    {
        key: "totalReceived",
        title: "Поступило",
        icon: TrendingUp
    },
    {
        key: "totalDispatched",
        title: "Отгружено",
        icon: TrendingDown
    },
    {
        key: "currentVolume",
        title: "Остаток",
        icon: LocalGasStation
    }
];

export default function StatCards({ data }) {
    return (
        <Grid container spacing={3}>
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 4
                        }}
                        key={card.key}
                    >
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <div>
                                    <Typography color="text.secondary">
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                    >
                                        {Number(data?.[card.key] ?? 0).toLocaleString()}
                                    </Typography>

                                    <Typography variant="caption">
                                        литров
                                    </Typography>
                                </div>

                                <Icon
                                    color="secondary"
                                    sx={{ fontSize: 42 }}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}