import {
    useEffect,
    useState
} from "react";


import AppDataGrid from "../components/DataGrid";

import Tank from "@mui/icons-material/OilBarrel";

import EntityDialog from "../components/EntityDialog";
import TankJournalDialog from "../components/TankJournalDialog";
import TankForm from "../components/TankForm";
import AppSnackbar from "../components/AppSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import  tanksApi  from "../services/tanksApi";

export default function TanksPage() {

    const {
        snackbar,
        showSnackbar,
        closeSnackbar
    } = useSnackbar();
    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);
    const [journalOpen, setJournalOpen] = useState(false);

    const [selectedTank, setSelectedTank] = useState(null);

    const [dialog, setDialog] = useState({

        open: false,

        mode: null,

        value: null

    });



    const [form, setForm] = useState(null);





    const columns = [

        {
            field: "tankId",
            headerName: "ID",
            width: 80
        },

        {
            field: "tankNumber",
            headerName: "Номер",
            flex: 1
        },


        {
            field: "product",
            headerName: "Продукт",
            flex: 1,

            valueGetter: (value, row) =>
                row.product?.name ?? ""

        },


        {
            field: "capacityLiters",
            headerName: "Вместимость",
            flex: 1
        },

        {
            field: "density",
            headerName: "Плотность",
            flex: 0.6
        },
        {
            field: "curentVolumeLiters",
            headerName: "Остаток",
            flex: 1
        }

    ];






    const loadData = async () => {

        try {

            setLoading(true);

            const data = await tanksApi.getAll();

            setRows(data);

        }
        catch (error) {

            console.error(error);

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









    // Добавление

    const addTank = () => {


        const empty = {

            tankNumber: "",

            capacityLiters: "",

            curentVolumeLiters: ""

        };


        setForm(empty);


        setDialog({

            open: true,

            mode: "add",

            value: empty

        });


    };









    // Просмотр

    const viewTank = (row) => {


        setForm(row);


        setDialog({

            open: true,

            mode: "view",

            value: row

        });


    };








    // Редактирование

    const editTank = (row) => {


        setForm(row);


        setDialog({

            open: true,

            mode: "edit",

            value: row

        });


    };









    // Сохранение

    const saveTank = async () => {


        try {


            const result =

                dialog.mode === "add"

                    ? await tanksApi.create(form)

                    : await tanksApi.update(form);



            showSnackbar(result);



            if (result.Status || result.status) {


                setDialog({

                    open: false,

                    mode: null,

                    value: null

                });


                await loadData();


            }


        }

        catch (error) {

            console.error(error);

        }


    };









    // Удаление

    const deleteTank = async (row) => {


        if (
            !window.confirm(
                `Удалить резервуар ${row.tankNumber}?`
            )
        )
            return;



        try {


            const result =
                await tanksApi.remove(
                    row.tankId
                );


            showSnackbar(result);



            if (result.Status || result.status) {


                await loadData();


            }


        }

        catch (error) {

            console.error(error);

        }


    };






    return (

        <>


            <AppDataGrid

                icon={Tank}

                title="Резервуары"

                rows={rows}

                columns={columns}

                loading={loading}


                getRowId={
                    row => row.tankId
                }


                onAdd={addTank}


                onEdit={editTank}


                onDelete={deleteTank}


                onView={viewTank}


                onJournal={(row) => {

                    setSelectedTank(row);

                    setJournalOpen(true);

                }}

            />





            <EntityDialog

                open={dialog.open}

                title="Резервуар"

                mode={dialog.mode}

                onClose={closeDialog}

                onSave={saveTank}

            >


                <TankForm

                    value={form}

                    mode={dialog.mode}

                    onChange={setForm}

                />


            </EntityDialog>
            <TankJournalDialog
                open={journalOpen}
                tank={selectedTank}
                onClose={() => {

                    setJournalOpen(false);

                    setSelectedTank(null);

                }}
                onChanged={loadData}
            />
            <AppSnackbar

                open={snackbar.open}

                severity={snackbar.severity}

                message={snackbar.message}

                onClose={closeSnackbar}

            />

        </>

    );

}