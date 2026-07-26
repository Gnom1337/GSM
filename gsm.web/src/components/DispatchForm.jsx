import {
    Stack,
    TextField,
    Paper,
    Typography,
    Divider,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import NumbersIcon from "@mui/icons-material/Numbers";
import ScaleIcon from "@mui/icons-material/Scale";
import EventIcon from "@mui/icons-material/Event";

import { useEffect, useState } from "react";

export default function DispatchForm({
    value,
    mode,
    tanks,
    onChange
}) {

    const [form, setForm] = useState({
        dispatchDate: "",
        tankId: "",
        truckNumber: "",
        driverName: "",
        recipientOrg: "",
        volumeInvoiceLiters: "",
        waybillNumber: ""
    });
    const selectedTank =
        tanks.find(t => t.tankId === form.tankId);
    const volumeError =
        Number(form.volumeInvoiceLiters) >
        Number(selectedTank?.curentVolumeLiters ?? 0);
    useEffect(() => {

        if (value) {

            setForm({

                dispatchId: value.dispatchId,

                dispatchDate: value.dispatchDate ?? "",

                tankId: value.tankId ?? "",

                truckNumber: value.truckNumber ?? "",

                driverName: value.driverName ?? "",

                recipientOrg: value.recipientOrg ?? "",

                volumeInvoiceLiters:
                    value.volumeInvoiceLiters ?? "",

                waybillNumber:
                    value.waybillNumber ?? ""

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

                    <Stack direction="row" spacing={2}>
                        <EventIcon color="primary" />
                        <Box>
                            <Typography variant="caption">
                                Дата
                            </Typography>
                            <Typography variant="h6">
                                {form.dispatchDate}
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <OilBarrelIcon color="primary" />
                        <Box>
                            <Typography variant="caption">
                                Резервуар
                            </Typography>

                            <Typography variant="h6">
                                {
                                    tanks.find(
                                        x => x.tankId === form.tankId
                                    )?.tankNumber
                                }
                            </Typography>

                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <LocalShippingIcon color="primary" />
                        <Box>
                            <Typography variant="caption">
                                Автоцистерна
                            </Typography>

                            <Typography variant="h6">
                                {form.truckNumber}
                            </Typography>

                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <PersonIcon color="primary" />
                        <Box>
                            <Typography variant="caption">
                                Водитель
                            </Typography>

                            <Typography variant="h6">
                                {form.driverName}
                            </Typography>

                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <BusinessIcon color="primary" />
                        <Box>

                            <Typography variant="caption">
                                Получатель
                            </Typography>

                            <Typography variant="h6">
                                {form.recipientOrg}
                            </Typography>

                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <ScaleIcon color="primary" />
                        <Box>

                            <Typography variant="caption">
                                Объем
                            </Typography>

                            <Typography variant="h6">
                                {form.volumeInvoiceLiters} л
                            </Typography>

                        </Box>
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={2}>
                        <NumbersIcon color="primary" />
                        <Box>

                            <Typography variant="caption">
                                Номер накладной
                            </Typography>

                            <Typography variant="h6">
                                {form.waybillNumber}
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
                label="Дата отпуска"
                type="date"
                value={form.dispatchDate}
                onChange={(e) =>
                    handleChange(
                        "dispatchDate",
                        e.target.value
                    )
                }
                InputLabelProps={{
                    shrink: true
                }}
                fullWidth
            />

            <FormControl fullWidth>

                <InputLabel>
                    Резервуар
                </InputLabel>

                <Select

                    value={form.tankId}

                    label="Резервуар"

                    onChange={(e) =>
                        handleChange(
                            "tankId",
                            e.target.value
                        )
                    }
                >

                    {
                        tanks.map(tank => (

                            <MenuItem
                                key={tank.tankId}
                                value={tank.tankId}
                            >

                                №{tank.tankNumber}

                            </MenuItem>

                        ))
                    }

                </Select>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: "grey.100",
                        borderRadius: 2
                    }}
                >

                    <Typography variant="subtitle2">
                        Информация о резервуаре
                    </Typography>

                    <Typography variant="body2">
                        Продукт:
                        {" "}
                        {selectedTank?.product?.name ?? "-"}
                    </Typography>

                    <Typography variant="body2">
                        Вместимость:
                        {" "}
                        {selectedTank?.capacityLiters ?? 0}
                        {" "}
                        л
                    </Typography>

                    <Typography variant="body2">
                        Остаток:
                        {" "}
                        {selectedTank?.curentVolumeLiters ?? 0}
                        {" "}
                        л
                    </Typography>

                </Box>
            </FormControl>

            <TextField
                label="Номер автоцистерны"
                value={form.truckNumber}
                onChange={(e) =>
                    handleChange(
                        "truckNumber",
                        e.target.value
                    )
                }
                fullWidth
            />

            <TextField
                label="Водитель"
                value={form.driverName}
                onChange={(e) =>
                    handleChange(
                        "driverName",
                        e.target.value
                    )
                }
                fullWidth
            />

            <TextField
                label="Получатель"
                value={form.recipientOrg}
                onChange={(e) =>
                    handleChange(
                        "recipientOrg",
                        e.target.value
                    )
                }
                fullWidth
            />

            <TextField
                label="Объем (л)"
                type="number"
                value={form.volumeInvoiceLiters}
                onChange={(e) =>
                    handleChange(
                        "volumeInvoiceLiters",
                        e.target.value
                    )
                }
                error={volumeError}
                helperText={
                    volumeError
                        ? "Недостаточно топлива в резервуаре"
                        : ""
                }
                fullWidth
            />

            <TextField
                label="Номер накладной"
                value={form.waybillNumber}
                onChange={(e) =>
                    handleChange(
                        "waybillNumber",
                        e.target.value
                    )
                }
                fullWidth
            />

        </Stack>

    );

}