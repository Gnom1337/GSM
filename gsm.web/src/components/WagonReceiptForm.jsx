/* eslint-disable react-hooks/static-components */
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


    const formatNumber = (num) => {

        const value = Number(num);

        if (isNaN(value)) {
            return "0";
        }

        return value.toLocaleString("ru-RU");

    };


    const update = (field, val) => {

        const model = {

            ...value,

            [field]: val,

            ...(field === "productId"
                ? {
                    tankId: ""
                }
                : {})

        };


        const invoice =
            Number(model.volumeInvoiceLiters || 0);


        const actual =
            Number(model.volumeActualLiters || 0);



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



    const selectedTank =
        tanks.find(
            x =>
                x.tankId ===
                Number(value?.tankId)
        );

    const currentVolume =
        Number(
            selectedTank?.curentVolumeLiters ?? 0
        );


    const displayedCurrentVolume =
        currentVolume;


    const capacity =
        Number(
            selectedTank?.capacityLiters ?? 0
        );



    const newVolume =
        Number(
            value?.volumeActualLiters ?? 0
        );



    // объём операции, который уже был учтён
    const oldVolume =
        mode === "edit" || mode === "view"
            ? Number(
                value?.oldVolumeActualLiters ??
                value?.volumeActualLiters ??
                0
            )
            : 0;



    // прогнозируемый объём после сохранения
    const predictedVolume =
        mode === "edit" || mode === "view"

            ?

            currentVolume
            - oldVolume
            + newVolume

            :

            currentVolume
            + newVolume;



    const predictedFreeVolume =
        Math.max(
            capacity - predictedVolume,
            
        );



    const remain =
        predictedFreeVolume;



    const percent =
        capacity === 0

            ? 0

            :

            Math.min(
                100,
                Math.max(
                    0,
                    predictedVolume /
                    capacity *
                    100
                )
            );



   




    const ViewField = ({
        label,
        value,
        color
    }) => (

        <Box

            sx={{

                p: 1,

                borderRadius: 3,

                background:
                    "#fafafa",

                border:
                    "1px solid #eeeeee"

            }}

        >

            <Typography

                variant="caption"

                color="text.secondary"

            >

                {label}

            </Typography>


            <Typography

                variant="h6"

                fontWeight={700}

                color={color}

            >

                {value || "-"}

            </Typography>


        </Box>

    );




    return (

        <Box>


            <Grid

                container

                spacing={3}

            >



                {/* ВАГОН */}


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

                                    <TrainIcon color="primary" />


                                    <Typography

                                        variant="h6"

                                        fontWeight={700}

                                    >

                                        Данные вагона

                                    </Typography>


                                </Stack>


                                <Divider />




                                {
                                    disabled ?


                                        <>

                                            <ViewField

                                                label="Номер вагона"

                                                value={
                                                    value?.wagonNumber
                                                }

                                            />


                                            <ViewField

                                                label="Дата прихода"

                                                value={
                                                    value?.receiptDate
                                                }

                                            />


                                            <ViewField

                                                label="Номер накладной"

                                                value={
                                                    value?.waybillNumber
                                                }

                                            />


                                            <ViewField

                                                label="Объем по накладной"

                                                value={
                                                    `${formatNumber(
                                                        value?.volumeInvoiceLiters
                                                    )} л`
                                                }

                                            />


                                            <ViewField

                                                label="Фактический объем"

                                                value={
                                                    `${formatNumber(
                                                        value?.volumeActualLiters
                                                    )} л`
                                                }

                                                color="primary"

                                            />


                                            <ViewField

                                                label="Расхождение"

                                                value={
                                                    `${formatNumber(
                                                        value?.discrepancyLiters
                                                    )} л`
                                                }

                                                color={
                                                    Number(
                                                        value?.discrepancyLiters
                                                    ) === 0

                                                        ?

                                                        "success.main"

                                                        :

                                                        "warning.main"
                                                }

                                            />

                                        </>


                                        :


                                        <>


                                            <TextField

                                                label="Номер вагона"

                                                value={
                                                    value?.wagonNumber ?? ""
                                                }

                                                onChange={
                                                    e =>
                                                        update(
                                                            "wagonNumber",
                                                            e.target.value
                                                        )
                                                }

                                                fullWidth

                                            />



                                            <TextField

                                                type="date"

                                                label="Дата прихода"

                                                InputLabelProps={{
                                                    shrink: true
                                                }}

                                                value={
                                                    value?.receiptDate ?? ""
                                                }

                                                onChange={
                                                    e =>
                                                        update(
                                                            "receiptDate",
                                                            e.target.value
                                                        )
                                                }

                                                fullWidth

                                            />



                                            <TextField

                                                label="Номер накладной"

                                                value={
                                                    value?.waybillNumber ?? ""
                                                }

                                                onChange={
                                                    e =>
                                                        update(
                                                            "waybillNumber",
                                                            e.target.value
                                                        )
                                                }

                                                fullWidth

                                            />



                                            <TextField

                                                label="Объем по накладной"

                                                type="number"

                                                value={
                                                    value?.volumeInvoiceLiters ?? ""
                                                }

                                                onChange={
                                                    e =>
                                                        update(
                                                            "volumeInvoiceLiters",
                                                            e.target.value
                                                        )
                                                }

                                                fullWidth

                                            />



                                            <TextField

                                                label="Фактический объем"

                                                type="number"

                                                value={
                                                    value?.volumeActualLiters ?? ""
                                                }

                                                onChange={
                                                    e =>
                                                        update(
                                                            "volumeActualLiters",
                                                            e.target.value
                                                        )
                                                }

                                                fullWidth

                                            />


                                        </>

                                }



                            </Stack>


                        </CardContent>


                    </Card>


                </Grid>





                {/* РЕЗЕРВУАР */}


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

                                    value={
                                        value?.productId ?? ""
                                    }

                                    disabled={disabled}

                                    onChange={
                                        e =>
                                            update(
                                                "productId",
                                                e.target.value
                                            )
                                    }

                                    fullWidth

                                >

                                    {
                                        products.map(
                                            p =>

                                                <MenuItem

                                                    key={
                                                        p.productId
                                                    }

                                                    value={
                                                        p.productId
                                                    }

                                                >

                                                    {p.name}

                                                </MenuItem>

                                        )
                                    }


                                </TextField>




                                <TextField

                                    select

                                    label="Резервуар"

                                    value={
                                        value?.tankId ?? ""
                                    }

                                    disabled={
                                        disabled ||
                                        !value?.productId
                                    }

                                    onChange={
                                        e =>
                                            update(
                                                "tankId",
                                                e.target.value
                                            )
                                    }

                                    fullWidth

                                >

                                    {
                                        filteredTanks.map(
                                            tank =>

                                                <MenuItem

                                                    key={
                                                        tank.tankId
                                                    }

                                                    value={
                                                        tank.tankId
                                                    }

                                                >

                                                    Резервуар №
                                                    {tank.tankNumber}

                                                </MenuItem>

                                        )
                                    }


                                </TextField>





                                {
                                    selectedTank && (

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 3,
                                                background: "#fafafa"
                                            }}
                                        >

                                            <CardContent
                                                sx={{
                                                    p: 2,
                                                    "&:last-child": {
                                                        pb: 2
                                                    }
                                                }}
                                            >

                                                <Stack spacing={1.5}>


                                                    {/* Заголовок */}

                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >

                                                        <Box>

                                                            <Typography
                                                                fontWeight={700}
                                                                variant="subtitle1"
                                                            >
                                                                🛢 Резервуар №
                                                                {selectedTank.tankNumber}
                                                            </Typography>


                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {selectedTank.product?.name}
                                                            </Typography>

                                                        </Box>


                                                        <Chip

                                                            size="small"

                                                            label={
                                                                `${Math.round(percent)} %`
                                                            }

                                                            color={
                                                                percent < 55 || remain < 0
                                                                    ? "error"
                                                                    :
                                                                    percent < 80
                                                                        ? "warning"
                                                                        :
                                                                        "success"
                                                            }

                                                        />

                                                    </Stack>



                                                    {/* Один progress */}

                                                    <Box>


                                                        <LinearProgress

                                                            variant="determinate"

                                                            value={percent}

                                                            color={
                                                                percent < 55 || remain < 0
                                                                    ? "error"
                                                                    :
                                                                    percent < 80
                                                                        ? "warning"
                                                                        :
                                                                        "success"
                                                            }

                                                            sx={{

                                                                height: 10,

                                                                borderRadius: 10

                                                            }}

                                                        />


                                                    </Box>



                                                    {/* Цифры */}

                                                    <Grid
                                                        container
                                                        spacing={1}
                                                    >


                                                        <Grid size={6}>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Текущий объем
                                                            </Typography>


                                                            <Typography
                                                                fontWeight={700}
                                                            >
                                                                {
                                                                    formatNumber(
                                                                        displayedCurrentVolume
                                                                    )
                                                                } л
                                                            </Typography>


                                                        </Grid>




                                                        <Grid size={6}>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Вместимость
                                                            </Typography>


                                                            <Typography
                                                                fontWeight={700}
                                                            >
                                                                {
                                                                    formatNumber(
                                                                        capacity
                                                                    )
                                                                } л
                                                            </Typography>


                                                        </Grid>




                                                        <Grid size={6}>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Свободно
                                                            </Typography>


                                                            <Typography
                                                                fontWeight={700}
                                                                color="success.main"
                                                            >

                                                                {
                                                                    formatNumber(
                                                                        predictedFreeVolume
                                                                    )
                                                                } л

                                                            </Typography>


                                                        </Grid>




                                                        {
                                                            mode !== "view" && (

                                                                <Grid size={6}>

                                                                    <Typography
                                                                        variant="caption"
                                                                        color="text.secondary"
                                                                    >
                                                                        После сохранения
                                                                    </Typography>


                                                                    <Typography
                                                                        fontWeight={700}
                                                                        color={
                                                                            remain < 0
                                                                                ?
                                                                                "error.main"
                                                                                :
                                                                                "primary.main"
                                                                        }
                                                                    >

                                                                        {
                                                                            formatNumber(
                                                                                predictedVolume
                                                                            )
                                                                        } л


                                                                    </Typography>

                                                                </Grid>

                                                            )
                                                        }


                                                    </Grid>



                                                    {
                                                        mode !== "view" &&
                                                        remain < 0 &&

                                                        <Alert
                                                            severity="error"
                                                            sx={{
                                                                py: 0
                                                            }}
                                                        >

                                                            Не хватает{" "}
                                                            {
                                                                formatNumber(
                                                                    Math.abs(remain)
                                                                )
                                                            } л

                                                        </Alert>

                                                    }



                                                    {
                                                        mode !== "view" &&
                                                        remain >= 0 &&

                                                        <Alert
                                                            severity="success"
                                                            sx={{
                                                                py: 0
                                                            }}
                                                        >

                                                            Объем помещается

                                                        </Alert>

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