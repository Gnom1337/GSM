import { useEffect, useState } from "react";
import axios from "axios";
import AppDataGrid from "../components/DataGrid";
import Incoming from '@mui/icons-material/CallReceived';


export default function IncomingPage() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const columns = [
        {
            field: "Id",
            headerName: "ID",

        },
        {
            field: "wagonNumber",
            headerName: "Номер вагона",
        },
        {
            field: "receiptDate",
            headerName: "Дата прихода",

        },
        {
            field: "volumeInvocieLiters",
            headerName: "Объём по ж/д накладной",

        },
        {
            field: "volumeActualLiters",
            headerName: "Фактический объём слива",

        },
        {
            field: "discrepancyLiters",
            headerName: "Расхождение, л.",

        },
        {
            field: "waybillNumber",
            headerName: "Номер накладной",

        }
    ];

    useEffect(() => {
        axios.get("https://localhost:5141/api/WagonReceipts/GetAll")
            .then(res => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AppDataGrid
            icon={Incoming}
            title="Приход вагонов"
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.WagonReceiptId}
            onAdd={() => console.log("Добавить")}
            onEdit={(row) => console.log("Редактировать", row)}
            onDelete={(row) => console.log("Удалить", row)}
            onView={(row) => console.log("Просмотр", row)}
        />
    );
}