import {
    Grid,
    Paper,
    Typography,
    Stack,
    LinearProgress,
    Chip,
    Box
} from "@mui/material";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function TankStatusCards({ tanks = [] }) {
    return (
        <Grid container spacing={3}>
            {tanks.map((tank) => {
                const percent = Math.round(
                    (tank.currentVolume / tank.capacity) * 100
                );

                const color =
                    percent >= 90
                        ? "success"
                        : percent >= 40
                            ? "warning"
                            : "error";

                return (
                    <Grid
                        key={tank.tankId}
                        size={{ xs: 12, sm: 6, lg: 3 }}
                    >
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >
                            <Stack spacing={2}>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        {tank.number}
                                    </Typography>

                                    <LocalGasStationIcon
                                        color="secondary"
                                    />
                                </Stack>

                                <Chip
                                    label={tank.product}
                                    color="secondary"
                                    size="small"
                                    sx={{ width: "fit-content" }}
                                />

                                <Box>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mb={0.5}
                                    >
                                        <Typography variant="body2">
                                            Заполнение {percent}%
                                        </Typography>

                                      
                                    </Stack>

                                    <LinearProgress
                                        variant="determinate"
                                        value={percent}
                                        color={color}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5
                                        }}
                                    />

                                </Box>

                                <Stack spacing={0.5}>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Текущий объем
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                    >
                                        {tank.currentVolume.toLocaleString("ru-RU")} л
                                    </Typography>

                                </Stack>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Вместимость:{" "}
                                    {tank.capacity.toLocaleString("ru-RU")} л
                                </Typography>

                            </Stack>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}