import {
    Stack,
    TextField,
    Typography,
    Paper,
    Divider,
    Box
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import NotesIcon from "@mui/icons-material/Notes";

import { useEffect, useState } from "react";

export default function MeasurementForm({

    value,

    mode,

    onChange

}) {

    const [form, setForm] = useState({

        measurementId: null,

        tankId: null,

        measurementDate: "",

        volumeLiters: "",

        temperature: "",

        density: "",

        comment: ""

    });

    useEffect(() => {

        if (value) {

            setForm({

                measurementId: value.measurementId,

                tankId: value.tankId,

                measurementDate:
                    value.measurementDate ?? "",

                volumeLiters:
                    value.volumeLiters ?? "",

                temperature:
                    value.temperature ?? "",

                density:
                    value.density ?? "",

                comment:
                    value.comment ?? ""

            });

        }

    }, [value]);

    const handleChange = (field, fieldValue) => {

        const updated = {

            ...form,

            [field]: fieldValue

        };

        setForm(updated);

        onChange(updated);

    };

    if (mode === "view") {

        return (

            <Paper

                elevation={0}

                sx={{

                    p: 3,

                    borderRadius: 3,

                    border: "1px solid",

                    borderColor: "divider"

                }}

            >

                <Stack spacing={2}>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <CalendarMonthIcon color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Дата замера
                            </Typography>

                            <Typography variant="h6">

                                {form.measurementDate || "—"}

                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <WaterDropIcon color="info" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Объем
                            </Typography>

                            <Typography variant="h6">

                                {form.volumeLiters} л

                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <ThermostatIcon color="error" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Температура
                            </Typography>

                            <Typography variant="h6">

                                {form.temperature} °C

                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <OpacityIcon color="secondary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Плотность
                            </Typography>

                            <Typography variant="h6">

                                {form.density}

                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                    >

                        <NotesIcon color="action" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Комментарий
                            </Typography>

                            <Typography>

                                {form.comment || "—"}

                            </Typography>

                        </Box>

                    </Stack>

                </Stack>

            </Paper>

        );

    }

    return (

        <Stack spacing={2}>

            <TextField

                label="Дата замера"

                type="datetime-local"

                InputLabelProps={{
                    shrink: true
                }}

                value={form.measurementDate}

                onChange={(e) =>
                    handleChange(
                        "measurementDate",
                        e.target.value
                    )
                }

                fullWidth

            />

            <TextField

                label="Объем"

                type="number"

                value={form.volumeLiters}

                onChange={(e) =>
                    handleChange(
                        "volumeLiters",
                        e.target.value
                    )
                }

                fullWidth

            />

            <TextField

                label="Температура"

                type="number"

                value={form.temperature}

                onChange={(e) =>
                    handleChange(
                        "temperature",
                        e.target.value
                    )
                }

                fullWidth

            />

            <TextField

                label="Плотность"

                type="number"

                value={form.density}

                onChange={(e) =>
                    handleChange(
                        "density",
                        e.target.value
                    )
                }

                fullWidth

            />

            <TextField

                label="Комментарий"

                multiline

                rows={3}

                value={form.comment}

                onChange={(e) =>
                    handleChange(
                        "comment",
                        e.target.value
                    )
                }

                fullWidth

            />

        </Stack>

    );

}