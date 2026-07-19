import {
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import UsersTable from "../components/dataGrid";
import ProductsTable from "../components/dataGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
export default function AdminPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columnsUsers = [
        {
            field: "UserId",
            headerName: "ID",

        },
        {
            field: "fullName",
            headerName: "ФИО",
        },
        {
            field: "login",
            headerName: "Логин",

        },
        {
            field: "roleName",
            headerName: "Роль",

        }
    ];
    const columnsProducts = [
        {
            field: "ProductId",
            headerName: "ID",

        },
        {
            field: "name",
            headerName: "Наименование",
        },
        {
            field: "density",
            headerName: "Плотность",

        },
        
    ];
    useEffect(() => {
        axios.get("https://localhost:5141/api/Users/GetAll")
            .then(res => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (

        <Container maxWidth={false}>

            <Stack spacing={3}>

                <Stack direction="row" spacing={1} alignItems="center">
                    <AdminIcon color="secondary" sx={{ fontSize: 28 }} />
                    <Typography variant="h5" fontWeight={600} >
                        Панель администратора
                    </Typography>
                </Stack>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, lg: 6 }}>
                       
                        <UsersTable
                            sx={{ height: "60vh" }}
                                title="Пользователи"
                                rows={rows}
                                columns={columnsUsers}
                                loading={loading}
                                getRowId={(row) => row.UserId}
                                onAdd={() => console.log("Добавить")}
                                onEdit={(row) => console.log("Редактировать", row)}
                                onDelete={(row) => console.log("Удалить", row)}
                                onView={(row) => console.log("Просмотр", row)}
                            />
                       
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                       
                            <ProductsTable
                            sx={{ height: "60vh" }}
                                title="Продукты"
                                rows={rows}
                                columns={columnsProducts}
                                loading={loading}
                                getRowId={(row) => row.UserId}
                                onAdd={() => console.log("Добавить")}
                                onEdit={(row) => console.log("Редактировать", row)}
                                onDelete={(row) => console.log("Удалить", row)}
                                onView={(row) => console.log("Просмотр", row)}
                            />
                       
                    </Grid>

                   

                </Grid>

            </Stack>

        </Container>

    );

}