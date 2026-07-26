import {
    Stack,
    TextField,
    Typography,
    Paper,
    Divider,
    Box
} from "@mui/material";

import {
    AccessTime,
    WaterDrop,
    Note,
    Person
} from "@mui/icons-material";

import { useEffect, useState } from "react";

export default function TankMeasurementForm({
    value,
    mode,
    onChange
}) {

    const [form, setForm] = useState({
        measuredAt: "",
        volumeLiters: "",
        note: "",
        user: null
    });

    useEffect(() => {

        if (value) {

            setForm({

                measuredAt: value.measuredAt ?? "",
                volumeLiters: value.volumeLiters ?? "",
                note: value.note ?? "",
                user: value.user ?? null

            });

        }

    }, [value]);

    const handleChange = (field, fieldValue) => {

        const updated = {

            ...value,

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

                        <AccessTime color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Дата замера
                            </Typography>

                            <Typography variant="h6">
                                {form.measuredAt
                                    ? new Date(form.measuredAt).toLocaleString()
                                    : ""}
                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <WaterDrop color="primary" />

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

                        <Person color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Выполнил замер
                            </Typography>

                            <Typography variant="h6">
                                {form.user?.fullName ?? "-"}
                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                    >

                        <Note color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Примечание
                            </Typography>

                            <Typography variant="h6">
                                {form.note || "-"}
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
                value={
                    value?.measuredAt
                        ? new Date(value.measuredAt)
                            .toLocaleString("sv-SE", {
                                timeZone: "Europe/Moscow"
                            })
                            .replace(" ", "T")
                            .slice(0, 16)
                        : ""
                }
                onChange={(e) =>
                    handleChange(
                        "measuredAt",
                        e.target.value
                    )
                }
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
            />

            <TextField
                label="Объем (литры)"
                type="number"
                value={value?.volumeLiters ?? ""}
                onChange={(e) =>
                    handleChange(
                        "volumeLiters",
                        Number(e.target.value)
                    )
                }
                fullWidth
            />

            <TextField
                label="Примечание"
                value={value?.note ?? ""}
                onChange={(e) =>
                    handleChange(
                        "note",
                        e.target.value
                    )
                }
                multiline
                rows={4}
                fullWidth
            />

        </Stack>

    );

}