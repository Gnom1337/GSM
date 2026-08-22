import { useEffect, useState } from "react";

import {
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import AdminIcon from "@mui/icons-material/AdminPanelSettings";

import UsersTable from "../components/dataGrid";
import ProductsTable from "../components/dataGrid";
import EntityDialog from "../components/EntityDialog";
import UserForm from "../components/UserForm";
import ProductForm from "../components/ProductForm";
import AppSnackbar from "../components/AppSnackbar";

import useSnackbar from "../hooks/useSnackbar";

import usersApi from "../services/usersApi";
import productsApi from "../services/productsApi";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const [usersLoading, setUsersLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const isSuccess = (result) =>
        (result.Status ?? result.status) === "Success";
    // Пользователи

    const [dialogOpen, setDialogOpen] = useState(false);

    const [mode, setMode] = useState("add");

    const [editedUser, setEditedUser] = useState({
        fullName: "",
        login: "",
        password: "",
        roleName: "Оператор"
    });

    // Продукты

    const [productDialogOpen, setProductDialogOpen] = useState(false);

    const [productMode, setProductMode] = useState("add");

    const [editedProduct, setEditedProduct] = useState({
        name: "",
    });

    // Snackbar

    const {

        snackbar,

        showSnackbar,

        closeSnackbar

    } = useSnackbar();

    const loadUsers = async () => {

        setUsersLoading(true);

        try {

            const result = await usersApi.getAll();

            setUsers(result);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setUsersLoading(false);

        }

    };
    const loadProducts = async () => {

        setProductsLoading(true);

        try {

            const result = await productsApi.getAll();

            setProducts(result);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setProductsLoading(false);

        }

    };
    useEffect(() => {

        Promise.all([
            loadUsers(),
            loadProducts()
        ]);

    }, []);
    const handleAddUser = () => {

        setMode("add");

        setEditedUser({

            fullName: "",

            login: "",

            password: "",

            roleName: "Operator"

        });

        setDialogOpen(true);

    };
    const handleViewUser = async (row) => {

        try {

            const result = await usersApi.getById(row.userId);

            setEditedUser(result);

            setMode("view");

            setDialogOpen(true);

        }
        catch (error) {

            console.error(error);

        }

    };
    const handleEditUser = async (row) => {

        try {

            const result = await usersApi.getById(row.userId);

            setEditedUser(result);

            setMode("edit");

            setDialogOpen(true);

        }
        catch (error) {

            console.error(error);

        }

    };
    const saveUser = async () => {
        try {
            const result =
                mode === "add"
                    ? await usersApi.create(editedUser)
                    : await usersApi.update(editedUser);

            showSnackbar(result);

            if (isSuccess(result)) {
                setDialogOpen(false);
                await loadUsers();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteUser = async (row) => {
        if (!window.confirm(`Удалить ${row.fullName}?`)) return;

        try {
            const result = await usersApi.remove(row.userId);

            showSnackbar(result);

            if (isSuccess(result)) {
                await loadUsers();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddProduct = () => {

        setProductMode("add");

        setEditedProduct({

            name: "",


        });

        setProductDialogOpen(true);

    };
    const handleViewProduct = async (row) => {

        try {

            const result = await productsApi.getById(
                row.productId
            );

            setEditedProduct(result);

            setProductMode("view");

            setProductDialogOpen(true);

        }
        catch (error) {

            console.error(error);

        }

    };
    const handleEditProduct = async (row) => {

        try {

            const result = await productsApi.getById(
                row.productId
            );

            setEditedProduct(result);

            setProductMode("edit");

            setProductDialogOpen(true);

        }
        catch (error) {

            console.error(error);

        }

    };
    const saveProduct = async () => {
        try {
            const result =
                productMode === "add"
                    ? await productsApi.create(editedProduct)
                    : await productsApi.update(editedProduct);

            showSnackbar(result);

            if (isSuccess(result)) {
                setProductDialogOpen(false);
                await loadProducts();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteProduct = async (row) => {

        if (!window.confirm(`Удалить ${row.name}?`))
            return;

        try {

            const result = await productsApi.remove(
                row.productId
            );

            showSnackbar(result);

            if (result.Status || result.status) {

                await loadProducts();

            }

        }
        catch (error) {

            console.error(error);

        }

    };
    const columnsUsers = [

        {
            field: "userId",
            headerName: "ID",
            flex: 0.3
        },

        {
            field: "fullName",
            headerName: "ФИО",
            flex: 1
        },

        {
            field: "login",
            headerName: "Логин",
            flex: 0.8
        },

        {
            field: "roleName",
            headerName: "Роль",
            flex: 0.7
        }

    ];

    const columnsProducts = [

        {
            field: "productId",
            headerName: "ID",
            flex: 0.3
        },

        {
            field: "name",
            headerName: "Наименование",
            flex: 1
        }

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
                        sx={{ fontSize: 30 }}
                    />

                    <Typography
                        variant="h5"
                        fontWeight={600}
                    >

                        Панель администратора

                    </Typography>

                </Stack>


                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}
                    >

                        <UsersTable

                            title="Пользователи"

                            rows={users}

                            columns={columnsUsers}

                            loading={usersLoading}

                            getRowId={(row) => row.userId}

                            onAdd={handleAddUser}

                            onView={handleViewUser}

                            onEdit={handleEditUser}

                            onDelete={handleDeleteUser}

                            sx={{
                                height: "65vh"
                            }}

                        />

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}
                    >

                        <ProductsTable

                            title="Продукты"

                            rows={products}

                            columns={columnsProducts}

                            loading={productsLoading}

                            getRowId={(row) => row.productId}

                            onAdd={handleAddProduct}

                            onView={handleViewProduct}

                            onEdit={handleEditProduct}

                            onDelete={handleDeleteProduct}

                            sx={{
                                height: "65vh"
                            }}

                        />

                    </Grid>

                </Grid>

            </Stack>


            <EntityDialog

                open={dialogOpen}

                mode={mode}

                title={
                    mode === "add"
                        ? "Добавить пользователя"
                        : mode === "edit"
                            ? "Редактирование пользователя"
                            : "Просмотр пользователя"
                }

                onClose={() => setDialogOpen(false)}

                onSave={saveUser}

            >

                <UserForm

                    value={editedUser}

                    mode={mode}

                    onChange={setEditedUser}

                />

            </EntityDialog>



            <EntityDialog

                open={productDialogOpen}

                mode={productMode}

                title={
                    productMode === "add"
                        ? "Добавить продукт"
                        : productMode === "edit"
                            ? "Редактирование продукта"
                            : "Просмотр продукта"
                }

                onClose={() => setProductDialogOpen(false)}

                onSave={saveProduct}

            >

                <ProductForm

                    value={editedProduct}

                    mode={productMode}

                    onChange={setEditedProduct}

                />

            </EntityDialog>


            <AppSnackbar

                open={snackbar.open}

                severity={snackbar.severity}

                message={snackbar.message}

                onClose={closeSnackbar}

            />

        </Container>

    );
    }