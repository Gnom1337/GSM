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

import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function UserForm({
    value = {},
    mode,
    onChange
}) {

    const disabled = mode === "view";

    const update = (field, newValue) => {

        onChange({
            ...value,
            [field]: newValue
        });

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
                                {value.fullName || "—"}
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
                                {value.login || "—"}
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
                                {value.roleName || "—"}
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
                    update("fullName", e.target.value)
                }
                fullWidth
            />

            <TextField
                label="Логин"
                value={value.login ?? ""}
                onChange={(e) =>
                    update("login", e.target.value)
                }
                fullWidth
            />

            <TextField
                label="Пароль"
                type="password"
                value={value.password ?? ""}
                onChange={(e) =>
                    update("password", e.target.value)
                }
                fullWidth
            />

            <FormControl fullWidth>

                <InputLabel>
                    Роль
                </InputLabel>

                <Select
                    value={value.roleName ?? "Оператор"}
                    label="Роль"
                    onChange={(e) =>
                        update("roleName", e.target.value)
                    }
                >

                    <MenuItem value="Администратор">
                        Администратор
                    </MenuItem>

                    <MenuItem value="Оператор">
                        Оператор
                    </MenuItem>

                </Select>

            </FormControl>

        </Stack>

    );

}