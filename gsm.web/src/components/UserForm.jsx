import { useEffect, useState } from "react";

import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";

export default function UserForm({
    value,
    mode,
    onChange
}) {

    const [user, setUser] = useState({
        fullName: "",
        login: "",
        password: "",
        roleName: 2
    });

    useEffect(() => {

        if (value) {

            setUser({
                fullName: value.fullName ?? "",
                login: value.login ?? "",
                password: "",
                roleName: value.roleName ?? 2
            });

        }

    }, [value]);

    const disabled = mode === "view";

    const update = (field, value) => {

        const updated = {
            ...user,
            [field]: value
        };

        setUser(updated);

        onChange(updated);

    };

    return (
        <>

            <TextField
                label="ФИО"
                value={user.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                fullWidth
                disabled={disabled}
            />

            <TextField
                label="Логин"
                value={user.login}
                onChange={(e) => update("login", e.target.value)}
                fullWidth
                disabled={disabled}
            />

            {mode !== "view" && (

                <TextField
                    label="Пароль"
                    type="password"
                    value={user.password}
                    onChange={(e) => update("password", e.target.value)}
                    fullWidth
                />

            )}

            <FormControl fullWidth>

                <InputLabel>
                    Роль
                </InputLabel>

                <Select
                    value={user.roleName}
                    label="Роль"
                    disabled={disabled}
                    onChange={(e) =>
                        update("roleName", e.target.value)
                    }
                >

                    <MenuItem value={"Администратор"}>
                        Администратор
                    </MenuItem>

                    <MenuItem value={"Оператор"}>
                        Оператор
                    </MenuItem>

                </Select>

            </FormControl>

        </>
    );

}