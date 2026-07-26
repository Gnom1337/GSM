import {
    Grid,
    Stack,
    TextField,
    MenuItem,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Chip,
    Alert,
    Divider,
    Box
} from "@mui/material";

import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import TrainIcon from "@mui/icons-material/Train";

export default function WagonReceiptForm({

    value,
    mode,
    onChange,
    products,
    tanks

}) {

    const disabled = mode === "view";

    const update = (field, val) => {

        const model = {

            ...value,

            [field]: val,

            ...(field === "productId"
                ? { tankId: "" }
                : {})

        };

        const invoice = Number(

            field === "volumeInvoiceLiters"
                ? val
                : model.volumeInvoiceLiters

        );

        const actual = Number(

            field === "volumeActualLiters"
                ? val
                : model.volumeActualLiters

        );

        model.discrepancyLiters =
            invoice - actual;

        onChange(model);

    };

    const filteredTanks =
        value?.productId

            ? tanks.filter(

                x =>
                    x.productId ===
                    Number(value.productId)

            )

            : [];

    const selectedTank = tanks.find(

        x =>
            x.tankId ===
            Number(value?.tankId)

    );

    const currentVolume =
        Number(
            selectedTank?.curentVolumeLiters ?? 0
        );

    const capacity =
        Number(
            selectedTank?.capacityLiters ?? 0
        );

    const freeVolume =
        capacity - currentVolume;

    const actualVolume =
        Number(
            value?.volumeActualLiters ?? 0
        );

    const remain =
        freeVolume - actualVolume;

    const percent =
        capacity === 0
            ? 0
            : currentVolume / capacity * 100;

    return (

        <Box>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <CardContent>

                            <Stack spacing={2}>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >

                                    <TrainIcon color="primary" />

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >

                                        Данные вагона

                                    </Typography>

                                </Stack>

                                <Divider />

                                <TextField

                                    label="Номер вагона"

                                    value={value?.wagonNumber ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "wagonNumber",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                />

                                <TextField

                                    type="date"

                                    label="Дата прихода"

                                    InputLabelProps={{
                                        shrink: true
                                    }}

                                    value={value?.receiptDate ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "receiptDate",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                />

                                <TextField

                                    label="Номер накладной"

                                    value={value?.waybillNumber ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "waybillNumber",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                />

                                <TextField

                                    label="Объем по накладной"

                                    type="number"

                                    value={value?.volumeInvoiceLiters ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "volumeInvoiceLiters",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                />

                                <TextField

                                    label="Фактический объем"

                                    type="number"

                                    value={value?.volumeActualLiters ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "volumeActualLiters",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                />

                                <TextField

                                    label="Расхождение"

                                    value={value?.discrepancyLiters ?? 0}

                                    InputProps={{
                                        readOnly: true
                                    }}

                                    fullWidth

                                />

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 4
                        }}
                    >

                        <CardContent>

                            <Stack spacing={2}>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >

                                    <OilBarrelIcon color="secondary" />

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >

                                        Слив в резервуар

                                    </Typography>

                                </Stack>

                                <Divider />

                                <TextField

                                    select

                                    label="Продукт"

                                    value={value?.productId ?? ""}

                                    onChange={(e) =>

                                        update(

                                            "productId",

                                            e.target.value

                                        )

                                    }

                                    disabled={disabled}

                                    fullWidth

                                >

                                    {products.map(product => (

                                        <MenuItem

                                            key={product.productId}

                                            value={product.productId}

                                        >

                                            {product.name}

                                        </MenuItem>

                                    ))}
                                </TextField>

                                <TextField

                                    select

                                    label="Резервуар"

                                    value={value?.tankId ?? ""}

                                    onChange={(e) =>

                                        update(
                                            "tankId",
                                            e.target.value
                                        )

                                    }

                                    disabled={
                                        disabled ||
                                        !value?.productId
                                    }

                                    fullWidth

                                >

                                    {filteredTanks.map(tank => (

                                        <MenuItem

                                            key={tank.tankId}

                                            value={tank.tankId}

                                        >

                                            Резервуар №{tank.tankNumber}

                                        </MenuItem>

                                    ))}

                                </TextField>

                                {
                                    selectedTank && (

                                        <Card

                                            elevation={0}

                                            sx={{

                                                mt: 1,

                                                borderRadius: 3,

                                                background:
                                                    "linear-gradient(135deg,#faf5ff,#f3e5f5)",

                                                border: "1px solid #E1BEE7"

                                            }}

                                        >

                                            <CardContent>

                                                <Stack spacing={2}>

                                                    <Stack

                                                        direction="row"

                                                        justifyContent="space-between"

                                                        alignItems="center"

                                                    >

                                                        <Stack>

                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={700}
                                                            >

                                                                🛢 Резервуар №{selectedTank.tankNumber}

                                                            </Typography>

                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >

                                                                {selectedTank.product?.name}

                                                            </Typography>

                                                        </Stack>

                                                        <Chip

                                                            label={`${Math.round(percent)} %`}

                                                            color={
                                                                percent > 95
                                                                    ? "error"
                                                                    : percent > 80
                                                                        ? "warning"
                                                                        : "success"
                                                            }

                                                        />

                                                    </Stack>

                                                    <Box>

                                                        <LinearProgress

                                                            variant="determinate"

                                                            value={percent}

                                                            sx={{

                                                                height: 12,

                                                                borderRadius: 10

                                                            }}

                                                        />

                                                    </Box>

                                                    <Grid
                                                        container
                                                        spacing={2}
                                                    >

                                                        <Grid
                                                            size={6}
                                                        >

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >

                                                                Остаток

                                                            </Typography>

                                                            <Typography
                                                                variant="h5"
                                                                fontWeight={700}
                                                            >

                                                                {currentVolume.toLocaleString()} л

                                                            </Typography>

                                                        </Grid>

                                                        <Grid
                                                            size={6}
                                                        >

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >

                                                                Вместимость

                                                            </Typography>

                                                            <Typography
                                                                variant="h5"
                                                                fontWeight={700}
                                                            >

                                                                {capacity.toLocaleString()} л

                                                            </Typography>

                                                        </Grid>

                                                        <Grid
                                                            size={6}
                                                        >

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >

                                                                Свободно

                                                            </Typography>

                                                            <Typography

                                                                variant="h5"

                                                                fontWeight={700}

                                                                color="success.main"

                                                            >

                                                                {freeVolume.toLocaleString()} л

                                                            </Typography>

                                                        </Grid>

                                                        <Grid
                                                            size={6}
                                                        >

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >

                                                                После слива

                                                            </Typography>

                                                            <Typography

                                                                variant="h5"

                                                                fontWeight={700}

                                                                color={
                                                                    remain < 0
                                                                        ? "error.main"
                                                                        : "primary.main"
                                                                }

                                                            >

                                                                {remain.toLocaleString()} л

                                                            </Typography>

                                                        </Grid>

                                                    </Grid>

                                                    {
                                                        remain < 0 ? (

                                                            <Alert severity="error">

                                                                В резервуар не помещается

                                                                <b>

                                                                    {" "}
                                                                    {Math.abs(remain).toLocaleString()} л

                                                                </b>

                                                            </Alert>

                                                        )

                                                            :

                                                            remain < capacity * 0.05 ? (

                                                                <Alert severity="warning">

                                                                    После слива резервуар будет практически заполнен.

                                                                </Alert>

                                                            )

                                                                :

                                                                (

                                                                    <Alert severity="success">

                                                                        Объем полностью помещается.

                                                                    </Alert>

                                                                )

                                                    }

                                                </Stack>

                                            </CardContent>

                                        </Card>

                                    )

                                }

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Box>

    );

}