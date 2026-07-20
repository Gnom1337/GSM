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
        roleId: 2
    });

    useEffect(() => {

        if (value) {

            setUser({
                fullName: value.fullName ?? "",
                login: value.login ?? "",
                password: "",
                roleId: value.roleId ?? 2
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
                    value={user.roleId}
                    label="Роль"
                    disabled={disabled}
                    onChange={(e) =>
                        update("roleId", e.target.value)
                    }
                >

                    <MenuItem value={1}>
                        Администратор
                    </MenuItem>

                    <MenuItem value={2}>
                        Оператор
                    </MenuItem>

                </Select>

            </FormControl>

        </>
    );

}