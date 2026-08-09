import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    DialogTitle,
    Button
} from "@mui/material";
import tankMeasurementsApi from "../services/tankMeasurementsApi";
import JournalIcon from "@mui/icons-material/MenuBook";
import AppSnackbar from "./AppSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import AppDataGrid from "./DataGrid";
import EntityDialog from "./EntityDialog";
import TankMeasurementForm from "./TankMeasurementForm";
import CloseIcon from "@mui/icons-material/Close";
export default function TankJournalDialog({
    open,
    tank,
    onClose,
    onChanged
}) {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        snackbar,
        showSnackbar,
        closeSnackbar
    } = useSnackbar();
    const [dialog, setDialog] = useState({
        open: false,
        mode: null,
        value: null
    });

    const [form, setForm] = useState(null);

    const columns = [
        {
            field: "measuredAt",
            headerName: "Дата замера",
            flex: 1,
            valueGetter: (_, row) =>
                new Date(row.measuredAt).toLocaleString()
        },
        {
            field: "volumeLiters",
            headerName: "Объем (л)",
            flex: 1
        },
        {
            field: "fuelHeight",
            headerName: "Высота ост. топ. (м)",
            flex: 1
        },
        {
            field: "user.FullName",
            headerName: "Оператор",
            flex: 1,
            valueGetter: (_, row) =>
                row.user?.fullName ?? ""
        },
        {
            field: "note",
            headerName: "Примечание",
            flex: 2
        },
        {
            field: "status",
            headerName: "Статус",
            flex: 1
        }
    ];

    useEffect(() => {

        if (!open || !tank)
            return;

        loadData();

    }, [open, tank]);

    const loadData = async () => {

        setLoading(true);

        try {

            const data =
                await tankMeasurementsApi.getByTank(
                    tank.tankId
                );

            setRows(data);

        }
        finally {

            setLoading(false);

        }

    };

    const closeMeasurementDialog = () => {

        setDialog({
            open: false,
            mode: null,
            value: null
        });

        setForm(null);

    };

    const addMeasurement = () => {

        const empty = {

            tankId: tank.tankId,

            measuredAt: new Date(),

            volumeLiters: "",
            fuelHeight: "",
            note: "",
            status: "На проверке"

        };

        setForm(empty);

        setDialog({

            open: true,

            mode: "add",

            value: empty

        });

    };

    const editMeasurement = (row) => {

        setForm(row);

        setDialog({

            open: true,

            mode: "edit",

            value: row

        });

    };

    const viewMeasurement = (row) => {

        setForm(row);

        setDialog({

            open: true,

            mode: "view",

            value: row

        });

    };

    const deleteMeasurement = async (row) => {

        if (
            !window.confirm(
                "Удалить замер?"
            )
        )
            return;

        try {

            const result =
                await tankMeasurementsApi.remove(
                    row.tankMeasurementsId
                );
            showSnackbar(result);
            if (result.Status || result.status) {

                await loadData();
                onChanged?.();
            }

        }
        catch (error) {

            console.error(error);

        }

    };

    const saveMeasurement = async () => {

        try {

            const result =

                dialog.mode === "add"

                    ? await tankMeasurementsApi.create(form)

                    : await tankMeasurementsApi.update(form);
            showSnackbar(result);
            if (result.Status || result.status) {

                closeMeasurementDialog();

                await loadData();
                onChanged?.();
            }

        }
        catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <Dialog

                open={open}

                onClose={onClose}

                fullWidth

                maxWidth="lg"

            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center"
                    }}
                >

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>
                <DialogContent>

                    <AppDataGrid

                        icon={JournalIcon}

                        title={`Журнал замеров резервуара № ${tank?.tankNumber}`}

                        rows={rows}

                        columns={columns}

                        loading={loading}

                        getRowId={
                            row => row.tankMeasurementsId
                        }

                        onAdd={addMeasurement}

                        onEdit={editMeasurement}

                        onDelete={deleteMeasurement}

                        onView={viewMeasurement}
                        sx={{
                            height: "65vh"
                        }}
                    />

                </DialogContent>

                <DialogActions sx={{
                    justifyContent: "start",
                    p: 2
                }}>

                    <Button
                        onClick={onClose}
                    >
                        Закрыть
                    </Button>

                </DialogActions>

            </Dialog>

            <EntityDialog

                open={dialog.open}

                mode={dialog.mode}

                title="Замер"

                onClose={closeMeasurementDialog}

                onSave={saveMeasurement}

            >

                <TankMeasurementForm

                    value={form}

                    mode={dialog.mode}

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