import { useEffect, useState } from "react";

import IncomingIcon from "@mui/icons-material/CallReceived";

import AppDataGrid from "../components/DataGrid";
import EntityDialog from "../components/EntityDialog";
import WagonReceiptForm from "../components/WagonReceiptForm";

import AppSnackbar from "../components/AppSnackbar";
import useSnackbar from "../hooks/useSnackbar";

import wagonReceiptsApi from "../services/wagonReceiptsApi";
import productsApi from "../services/productsApi";
import tanksApi from "../services/tanksApi";

export default function IncomingPage() {

    const {
        snackbar,
        showSnackbar,
        closeSnackbar
    } = useSnackbar();

    const [rows, setRows] = useState([]);

    const [products, setProducts] = useState([]);

    const [tanks, setTanks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [dialog, setDialog] = useState({

        open: false,

        mode: null,

        value: null

    });

    const [form, setForm] = useState(null);

    const columns = [

        {
            field: "wagonReceiptId",
            headerName: "ID",
            width: 80
        },

        {
            field: "wagonNumber",
            headerName: "Номер вагона",
            flex: 1
        },

        {
            field: "receiptDate",
            headerName: "Дата прихода",
            flex: 1
        },

        {
            field: "product",
            headerName: "Продукт",
            flex: 1,
            valueGetter: (_, row) =>
                row.product?.name ?? ""
        },

        {
            field: "tank",
            headerName: "Резервуар",
            flex: 1,
            valueGetter: (_, row) =>
                row.tank?.tankNumber ?? ""
        },

        {
            field: "volumeInvoiceLiters",
            headerName: "По накладной",
            flex: 1
        },

        {
            field: "volumeActualLiters",
            headerName: "Фактически",
            flex: 1
        },

        {
            field: "discrepancyLiters",
            headerName: "Расхождение",
            flex: 1
        },

        {
            field: "waybillNumber",
            headerName: "Накладная",
            flex: 1
        }

    ];

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                receipts,
                productList,
                tankList
            ] = await Promise.all([

                wagonReceiptsApi.getAll(),

                productsApi.getAll(),

                tanksApi.getAll()

            ]);

            setRows(receipts);

            setProducts(productList);

            setTanks(tankList);

        }
        catch (error) {

            console.error(error);

            showSnackbar({

                Status: "Error",

                Message: "Ошибка загрузки данных."

            });

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    const closeDialog = () => {

        setDialog({

            open: false,

            mode: null,

            value: null

        });

        setForm(null);

    };

    const addReceipt = () => {

        const empty = {

            wagonNumber: "",

            receiptDate: new Date().toISOString().substring(0, 10),

            productId: "",

            tankId: "",

            volumeInvoiceLiters: "",

            volumeActualLiters: "",

            discrepancyLiters: 0,

            waybillNumber: ""

        };

        setForm(empty);

        setDialog({

            open: true,

            mode: "add",

            value: empty

        });

    };

    const viewReceipt = (row) => {

        setForm(row);

        setDialog({

            open: true,

            mode: "view",

            value: row

        });

    };

    const editReceipt = (row) => {

        setForm({
            ...row,
            oldVolumeActualLiters: row.volumeActualLiters
        });

        setDialog({
            open: true,
            mode: "edit",
            value: row
        });

    };

    const saveReceipt = async () => {
        const tank = tanks.find(

            x => x.tankId === Number(form.tankId)

        );

        if (!tank) {

            showSnackbar({

                Status: "Error",

                Message: "Выберите резервуар."

            });

            return;

        }
        const volume = Number(
            form.volumeActualLiters
        );

        const freeVolume =

            Number(tank.capacityLiters)

            -

            Number(tank.curentVolumeLiters);

        if (volume > freeVolume) {

            showSnackbar({

                Status: "Error",

                Message:
                    `Недостаточно свободного объема.

Свободно ${freeVolume} л.`

            });

            return;

        }
        try {

            const result =

                dialog.mode === "add"

                    ? await wagonReceiptsApi.create(form)

                    : await wagonReceiptsApi.update(form);

            showSnackbar(result);

            if (result.Status || result.status) {

                closeDialog();

                await loadData();

            }

        }
        catch (error) {

            console.error(error);

            showSnackbar({

                Status: "Error",

                Message: "Ошибка сохранения."

            });

        }

    };

    const deleteReceipt = async (row) => {

        if (
            !window.confirm(
                `Удалить вагон ${row.wagonNumber}?`
            )
        )
            return;

        try {

            const result =
                await wagonReceiptsApi.remove(
                    row.wagonReceiptId
                );

            showSnackbar(result);

            if (result.Status || result.status) {

                await loadData();

            }

        }
        catch (error) {

            console.error(error);

            showSnackbar({

                Status: "Error",

                Message: "Ошибка удаления."

            });

        }

    };
    return (

        <>

            <AppDataGrid

                icon={IncomingIcon}

                title="Приход вагонов"

                rows={rows}

                columns={columns}

                loading={loading}

                getRowId={(row) => row.wagonReceiptId}

                onAdd={addReceipt}

                onEdit={editReceipt}

                onDelete={deleteReceipt}

                onView={viewReceipt}

            />



            <EntityDialog

                open={dialog.open}

                title="Приход вагона"

                mode={dialog.mode}

                onClose={closeDialog}

                onSave={saveReceipt}
                dialogProps={{
                    maxWidth: "md"
                }}
            >

                <WagonReceiptForm

                    value={form}

                    mode={dialog.mode}

                    products={products}

                    tanks={tanks}

                    onChange={setForm}

                />

            </EntityDialog>



            <AppSnackbar

                open={snackbar.open}

                severity={snackbar.severity}

                message={snackbar.message}

                onClose={closeSnackbar}

            />

        </>

    );

}