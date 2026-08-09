import {
    Stack,
    TextField,
    Typography,
    Paper,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import AuthContext from "../context/authContext";
import { useContext } from "react";
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
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        measuredAt: "",
        volumeLiters: "",
        note: "",
        user: null,
        status: "На проверке"
    });

    useEffect(() => {

        if (value) {

            setForm({

                measuredAt: value.measuredAt ?? "",
                volumeLiters: value.volumeLiters ?? "",
                note: value.note ?? "",
                user: value.user ?? null,
                status: value.status ?? "На проверке"
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
                                Статус
                            </Typography>

                            <Typography variant="h6">
                                {form.status}
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
                label="Высота ост. топ. (м)"
                type="number"
                value={value?.fuelHeight ?? ""}
                onChange={(e) =>
                    handleChange(
                        "fuelHeight",
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
            <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                    value={form.status}
                    label="Статус"
                    disabled={user?.role !== "Admin" && user?.role !== "Master"}
                    onChange={(e) => handleChange("status", e.target.value)}
                >
                    <MenuItem value="На проверке">На проверке</MenuItem>
                    <MenuItem value="Утверждено">Утверждено</MenuItem>
                    <MenuItem value="На доработке">На доработке</MenuItem>
                </Select>
            </FormControl>
        </Stack>

    );

}