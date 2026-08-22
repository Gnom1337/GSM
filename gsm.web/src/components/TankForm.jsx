import {
    Stack,
    TextField,
    MenuItem,
    Typography,
    Paper,
    Divider,
    Box
} from "@mui/material";

import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import InventoryIcon from "@mui/icons-material/Inventory";
import PercentIcon from "@mui/icons-material/Percent";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useEffect, useState } from "react";
export default function TankForm({
    value,
    mode,
    onChange
}) {


    const [products, setProducts] = useState([]);


    const [form, setForm] = useState({

        tankId: null,

        tankNumber: "",

        capacityLiters: "",

        productId: "",
        density: "",

        curentVolumeLiters: ""

    });



    useEffect(() => {


        axios
            .get(
                "https://localhost:5141/api/Products/GetAll"
            )

            .then(res => {

                setProducts(res.data);

            });


    }, []);





    useEffect(() => {


        if (value) {

            setForm({

                tankId: value.tankId,

                tankNumber: value.tankNumber ?? "",

                capacityLiters:
                    value.capacityLiters ?? "",


                productId:
                    value.productId ?? "",

                density: value.density ?? "",
                curentVolumeLiters:
                    value.curentVolumeLiters ?? ""

            });

        }


    }, [value]);






    const handleChange = (field, val) => {


        const updated = {

            ...form,

            [field]: val

        };


        setForm(updated);

        onChange(updated);


    };
    const fillPercent =
        form.capacityLiters > 0
            ? Math.round(
                (form.curentVolumeLiters /
                    form.capacityLiters) * 100
            )
            : 0;




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

                        <OilBarrelIcon
                            color="secondary"
                            fontSize="large"
                        />


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Номер резервуара
                            </Typography>


                            <Typography variant="h6">

                                {form.tankNumber || "—"}

                            </Typography>

                        </Box>

                    </Stack>



                    <Divider />



                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <LocalGasStationIcon
                            color="secondary"
                            fontSize="large"
                        />


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Вместимость
                            </Typography>


                            <Typography variant="h6">

                                {form.capacityLiters || 0} л

                            </Typography>

                        </Box>

                    </Stack>



                    <Divider />



                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <InventoryIcon
                            color="secondary"
                            fontSize="large"
                        />


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Продукт
                            </Typography>


                            <Typography variant="h6">

                                {
                                    value?.product?.name
                                    || "—"
                                }

                            </Typography>

                        </Box>

                    </Stack>



                    <Divider />



                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <WaterDropIcon
                            color="secondary"
                            fontSize="large"
                        />


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Текущий остаток
                            </Typography>


                            <Typography variant="h6">

                                {form.curentVolumeLiters || 0} л

                            </Typography>

                        </Box>

                    </Stack>
                    <Divider />



                    <Stack

                        direction="row"

                        spacing={2}

                        alignItems="center"

                    >


                        <DensityMediumIcon

                            color="secondary"

                        />


                        <Box>


                            <Typography

                                variant="caption"

                                color="text.secondary"

                            >

                                Плотность

                            </Typography>


                            <Typography

                                variant="h6"

                            >

                                {form.density
                                    ? `${form.density}`
                                    : "—"
                                }

                            </Typography>


                        </Box>


                    </Stack>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <PercentIcon
                            color="secondary"
                            fontSize="large"
                        />


                        <Box sx={{ flex: 1 }}>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Заполненность
                            </Typography>


                            <Typography variant="h6">
                                {fillPercent} %
                            </Typography>


                            <LinearProgress
                                variant="determinate"
                                value={fillPercent}
                                sx={{
                                    mt: 1,
                                    height: 8,
                                    borderRadius: 5
                                }}
                            />

                        </Box>

                    </Stack>

                </Stack>
                

            </Paper>

        );

    }





    return (

        <Stack spacing={2}>


            <TextField

                label="Номер резервуара"

                value={form.tankNumber}

                onChange={
                    e =>
                        handleChange(
                            "tankNumber",
                            e.target.value
                        )
                }

            />



            <TextField

                label="Вместимость"

                type="number"

                value={form.capacityLiters}

                onChange={
                    e =>
                        handleChange(
                            "capacityLiters",
                            Number(e.target.value)
                        )
                }

            />





            <TextField

                select

                label="Продукт"

                value={form.productId}

                onChange={
                    e =>
                        handleChange(
                            "productId",
                            Number(e.target.value)
                        )
                }

            >


                {
                    products.map(p => (

                        <MenuItem
                            key={p.productId}
                            value={p.productId}
                        >

                            {p.name}

                        </MenuItem>

                    ))
                }


            </TextField>

            <TextField

                label="Плотность"

                value={form.density}

                fullWidth

                type="number"

                onChange={
                    e =>
                        handleChange(
                            "density",
                            e.target.value
                        )
                }

            />



            <TextField

                label="Текущий остаток"

                type="number"

                value={form.curentVolumeLiters}

                onChange={
                    e =>
                        handleChange(
                            "curentVolumeLiters",
                            Number(e.target.value)
                        )
                }

            />


        </Stack>

    );

}