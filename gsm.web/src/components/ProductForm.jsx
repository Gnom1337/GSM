import {
    TextField,
    Stack,
    Typography,
    Paper,
    Divider,
    Box
} from "@mui/material";

import Inventory2Icon from '@mui/icons-material/Inventory2';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import { useEffect, useState } from "react";


export default function ProductForm({
    value,
    mode,
    onChange
}) {


    const [form, setForm] = useState({
        name: "",
        density: ""
    });



    useEffect(() => {


        if (value) {

            setForm({

                name: value.name ?? "",

                density: value.density ?? ""

            });

        }

    }, [value]);




    const handleChange = (field, value) => {

        const updated = {

            ...form,

            [field]: value

        };


        setForm(updated);

        onChange(updated);

    };



    // РЕЖИМ ПРОСМОТРА
    if (mode === "view") {

        return (

            <Paper

                elevation={0}

                sx={{

                    border: "1px solid",

                    borderColor: "divider",

                    borderRadius: 3,

                    p: 3,

                    backgroundColor: "background.default"

                }}

            >

                <Stack spacing={2}>


                    <Stack

                        direction="row"

                        spacing={2}

                        alignItems="center"

                    >

                        <Inventory2Icon

                            color="primary"

                        />


                        <Box>


                            <Typography

                                variant="caption"

                                color="text.secondary"

                            >

                                Наименование

                            </Typography>


                            <Typography

                                variant="h6"

                            >

                                {form.name || "—"}

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


                </Stack>


            </Paper>

        );

    }



    // ДОБАВЛЕНИЕ / РЕДАКТИРОВАНИЕ

    return (

        <Stack spacing={2}>


            <TextField

                label="Наименование"

                value={form.name}

                fullWidth

                onChange={
                    e =>
                        handleChange(
                            "name",
                            e.target.value
                        )
                }

            />



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


        </Stack>

    );

}