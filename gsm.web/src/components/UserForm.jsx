import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Typography,
    Paper,
    Divider,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function UserForm({
    value,
    mode,
    onChange
}) {


    const [form, setForm] = useState({
        fullName: "",
        login: "",
        roleName: ""
    });
    useEffect(() => {


        if (value) {

            setForm({

                fullName: value.fullName ?? "",
                login: value.login ?? "",
                roleName: value.roleName ?? ""

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

                        <PersonIcon color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                ФИО
                            </Typography>

                            <Typography variant="h6">
                                {form.fullName}
                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <BadgeIcon color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Логин
                            </Typography>

                            <Typography variant="h6">
                                {form.login}
                            </Typography>

                        </Box>

                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <AdminPanelSettingsIcon color="primary" />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Роль
                            </Typography>

                            <Typography variant="h6">
                                {form.roleName }
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
                label="ФИО"
                value={value.fullName ?? ""}
                onChange={(e) =>
                    handleChange("fullName", e.target.value)
                }
                fullWidth
            />

            <TextField
                label="Логин"
                value={value.login ?? ""}
                onChange={(e) =>
                    handleChange("login", e.target.value)
                }
                fullWidth
            />

            <TextField
                label="Пароль"
                type="password"
                value={value.password ?? ""}
                onChange={(e) =>
                    handleChange("password", e.target.value)
                }
                fullWidth
            />

            <FormControl fullWidth>

                <InputLabel>
                    Роль
                </InputLabel>

                <Select
                    value={value.roleName ?? "Operator"}
                    label="Роль"
                    onChange={(e) =>
                        handleChange("roleName", e.target.value)
                    }
                >

                    <MenuItem value="Admin">
                        Администратор
                    </MenuItem>

                    <MenuItem value="Operator">
                        Оператор
                    </MenuItem>
                    <MenuItem value="Warehouse_keeper">
                        Кладовщик
                    </MenuItem>
                    <MenuItem value="Manager">
                        Менеджер
                    </MenuItem>
                </Select>

            </FormControl>

        </Stack>

    );

}