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
import ProductForm from "../components/ProductForm";
import EntityDialog from "../components/EntityDialog";
import UserForm from "../components/UserForm";


export default function AdminPage() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [mode, setMode] = useState("add");

    const [selectedUser, setSelectedUser] = useState(null);

    const [editedUser, setEditedUser] = useState({});
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [productMode, setProductMode] = useState("add");
    const loadProducts = () => {

        axios.get("https://localhost:5141/api/Products/GetAll")
            .then(res => {
                setProducts(res.data);
            });

    };
    const loadUsers = () => {

        setLoading(true);

        axios.get("https://localhost:5141/api/Users/GetAll")
            .then(res => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {

        loadUsers();
        loadProducts();

    }, []);
    const handleAddProduct = () => {

        setProductMode("add");

        setSelectedProduct(null);

        setEditedProduct({
            name: "",
            density: ""
        });

        setProductDialogOpen(true);

    };
    const handleViewProduct = async (row) => {

        try {

            const res = await axios.get(
                `https://localhost:5141/api/Products/GetById/${row.productId}`
            );


            const product = {

                productId: res.data.productId ?? res.data.ProductId,

                name: res.data.name ?? res.data.Name,

                density: res.data.density ?? res.data.Density

            };


            setSelectedProduct(product);

            setEditedProduct(product);

            setProductMode("view");

            setProductDialogOpen(true);


        }
        catch (error) {

            console.error(error);

        }

    };

    const handleEditProduct = (row) => {

        setProductMode("edit");

        setSelectedProduct(row);

        setEditedProduct(row);

        setProductDialogOpen(true);

    };
    const saveProduct = async () => {


        try {


            if (productMode === "add") {


                await axios.post(
                    "https://localhost:5141/api/Products/Create",
                    editedProduct
                );


            }



            if (productMode === "edit") {


                await axios.put(
                    `https://localhost:5141/api/Products/Update/${editedProduct.productId}`,
                    editedProduct
                );


            }



            setProductDialogOpen(false);


            loadProducts();


        }
        catch (error) {

            console.error(
                "Ошибка сохранения продукта",
                error
            );

        }

    };
    const handleDeleteProduct = async (row) => {


        const confirmDelete = window.confirm(
            `Удалить продукт ${row.name}?`
        );


        if (!confirmDelete)
            return;



        try {


            await axios.delete(

                `https://localhost:5141/api/Products/Delete/${row.productId}`

            );


            loadProducts();


        }
        catch (error) {

            console.error(
                "Ошибка удаления",
                error
            );

        }


    };
    const handleAddUser = () => {

        setMode("add");

        setSelectedUser(null);

        setEditedUser({
            fullName: "",
            login: "",
            password: "",
            roleId: null
        });

        setDialogOpen(true);
    };



    const handleViewUser = (row) => {

        setMode("view");

        setSelectedUser(row);

        setDialogOpen(true);
    };



    const handleEditUser = (row) => {

        setMode("edit");

        setSelectedUser(row);

        setEditedUser(row);

        setDialogOpen(true);
    };



    // СОХРАНЕНИЕ
    const saveUser = async () => {

        try {

            if (mode === "add") {

                await axios.post(
                    "https://localhost:5141/api/Users/Create",
                    editedUser
                );

            }


            if (mode === "edit") {

                await axios.put(
                    `https://localhost:5141/api/Users/Update/${editedUser.UserId}`,
                    editedUser
                );

            }


            setDialogOpen(false);

            loadUsers();


        }
        catch (error) {

            console.error(
                "Ошибка сохранения пользователя",
                error
            );

        }

    };




    // УДАЛЕНИЕ
    const handleDeleteUser = async (row) => {

        const confirmDelete = window.confirm(
            `Удалить пользователя ${row.fullName}?`
        );


        if (!confirmDelete)
            return;


        try {

            await axios.delete(
                `https://localhost:5141/api/Users/Delete/${row.UserId}`
            );


            loadUsers();

        }
        catch (error) {

            console.error(
                "Ошибка удаления пользователя",
                error
            );

        }

    };




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
            field: "productId",
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




    return (

        <Container maxWidth={false}>

            <Stack spacing={3}>


                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >

                    <AdminIcon
                        color="secondary"
                        sx={{ fontSize: 28 }}
                    />

                    <Typography
                        variant="h5"
                        fontWeight={600}
                    >
                        Панель администратора
                    </Typography>

                </Stack>



                <Grid container spacing={3}>


                    <Grid size={{ xs: 12, lg: 6 }}>


                        <UsersTable

                            sx={{
                                height: "60vh"
                            }}

                            title="Пользователи"

                            rows={rows}

                            columns={columnsUsers}

                            loading={loading}

                            getRowId={
                                row => row.UserId
                            }


                            onAdd={handleAddUser}


                            onEdit={
                                handleEditUser
                            }


                            onDelete={
                                handleDeleteUser
                            }


                            onView={
                                handleViewUser
                            }

                        />


                    </Grid>



                    <Grid size={{ xs: 12, lg: 6 }}>


                        <ProductsTable

                            sx={{
                                height: "60vh"
                            }}

                            title="Продукты"


                            rows={products}


                            columns={columnsProducts}


                            loading={loading}


                            getRowId={
                                row => row.productId
                            }
                            

                            onAdd={
                                handleAddProduct
                            }


                            onEdit={
                                handleEditProduct
                            }


                            onDelete={
                                handleDeleteProduct
                            }


                            onView={
                                handleViewProduct
                            }

                        />


                    </Grid>


                </Grid>



            </Stack>



            <EntityDialog

                open={dialogOpen}

                title={
                    mode === "add"
                        ?
                        "Добавить пользователя"
                        :
                        mode === "edit"
                            ?
                            "Редактирование пользователя"
                            :
                            "Просмотр пользователя"
                }


                mode={mode}


                onClose={
                    () => setDialogOpen(false)
                }


                onSave={saveUser}

            >


                <UserForm
                    value={selectedUser}
                    mode={mode}
                    onChange={setEditedUser}
                />


            </EntityDialog>
            <EntityDialog

                open={productDialogOpen}

                title={
                    productMode === "add"
                        ?
                        "Добавить продукт"
                        :
                        productMode === "edit"
                            ?
                            "Редактирование продукта"
                            :
                            "Просмотр продукта"
                }

                mode={productMode}

                onClose={
                    () => setProductDialogOpen(false)
                }

                onSave={saveProduct}

            >

                <ProductForm

                    value={editedProduct}

                    mode={productMode}

                    onChange={setEditedProduct}

                />

            </EntityDialog>

        </Container>

    );
}