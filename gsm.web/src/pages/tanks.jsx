import { useEffect, useState } from "react";
import axios from "axios";
import AppDataGrid from "../components/DataGrid";

export default function TanksPage() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            field: "tankId",
            headerName: "ID",

        },
        {
            field: "tankNumber",
            headerName: "Номер резервуара",
        },
        {
            field: "capacityLiters",
            headerName: "Вместимость",

        },
        {
            field: "curentVolumeLiters",
            headerName: "Текущий остаток",

        }
    ];

    useEffect(() => {
        axios.get("https://localhost:5141/api/Tanks/GetAll")
            .then(res => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AppDataGrid
            title="Резервуары"
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.tankId}
            onAdd={() => console.log("Добавить")}
            onJournal={(row) => console.log("Журнал замеров", row)}
            onEdit={(row) => console.log("Редактировать", row)}
            onDelete={(row) => console.log("Удалить", row)}
            onView={(row) => console.log("Просмотр", row)}
        />
    );
}