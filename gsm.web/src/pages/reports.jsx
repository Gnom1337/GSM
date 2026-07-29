import { useState, useEffect } from "react";

import {
    Grid,
    Typography,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    IconButton,
} from "@mui/material";

import {
    Inventory,
    CalendarMonth,
    WarningAmber,
    Download,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Report from '@mui/icons-material/Assignment';
import dayjs from "dayjs";
import ReportCard from "../components/ReportCard";
import axios from "axios";
import tanksApi from "../services/tanksApi";
import productsApi from "../services/productsApi";
export default function ReportsPage() {

    const [open, setOpen] = useState(false);

    const [reportType, setReportType] = useState("");

    const [from, setFrom] = useState(dayjs());

    const [to, setTo] = useState(dayjs());

    const [tank, setTank] = useState("");

    const [product, setProduct] = useState("");
    const [tanks, setTanks] = useState([]);
    const [products, setProducts] = useState([]);
    const openDialog = (type) => {
        setReportType(type);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };
    useEffect(() => {

        const loadData = async () => {
            try {
                const tanks = await tanksApi.getAll();
                setTanks(tanks);

                const products = await productsApi.getAll();
                setProducts(products);

            } catch (error) {
                console.error("Ошибка загрузки справочников:", error);
            }
        };

        loadData();

    }, []);
    const getTitle = () => {

        switch (reportType) {

            case "balance":
                return "Суточный баланс";

            case "turnover":
                return "Оборотная ведомость";

            case "loss":
                return "Отчет по потерям";

            default:
                return "";
        }

    };

    const generateReport = async () => {

        let url = "";

        switch (reportType) {

            case "balance":
                url = `/api/reports/daily-balance?date=${from.format("YYYY-MM-DD")}`;
                if (tank)
                    url += `&tankId=${tank}`;
                break;

            case "turnover":
                url = `/api/reports/turnover?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`;

                if (product)
                    url += `&productId=${product}`;

                break;

            case "loss":
                url = `/api/reports/loss?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`;

                if (tank)
                    url += `&tankId=${tank}`;

                break;
        }

        const response = await axios.get(url, {
            responseType: "blob"
        });

        const blob = new Blob([response.data], {
            type: "application/pdf"
        });

        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = href;

        link.download =
            response.headers["content-disposition"]
                ?.match(/filename="?(.+)"?/)?.[1]
            || "Report.pdf";

        link.click();

        URL.revokeObjectURL(href);

        closeDialog();
    };

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Box sx={{ width: "100%", } }>

                <Stack spacing={2}>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                            gap: 2,
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "stretch",
                                sm: "center",
                            },
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Report color="secondary" sx={{ fontSize: 28 }} />
                            <Typography variant="h5" fontWeight={600} >
                                Отчеты
                            </Typography>
                        </Stack>
                        
                    </Box>
                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                            <ReportCard

                                title="Суточный баланс"

                                description="Остатки топлива по резервуарам за выбранную дату."

                                icon={CalendarMonth}

                                color="#43a047"

                                onClick={() => openDialog("balance")}

                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                            <ReportCard

                                title="Оборотная ведомость"

                                description="Движение нефтепродуктов за выбранный период."

                                icon={Inventory}

                                color="#1e88e5"

                                onClick={() => openDialog("turnover")}

                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                            <ReportCard

                                title="Отчет по потерям"

                                description="Превышение норм естественной убыли."

                                icon={WarningAmber}

                                color="#fb8c00"

                                onClick={() => openDialog("loss")}

                            />

                        </Grid>

                    </Grid>

                </Stack>

            </Box>

            <Dialog
                open={open}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 1
                    }
                }}
            >

                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pb: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        {getTitle()}
                    </Typography>

                    <IconButton
                        onClick={closeDialog}
                        size="small"
                        aria-label="Закрыть"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={3}>

                        {reportType === "balance" && (

                            <>

                                <DatePicker
                                    label="Дата"
                                    value={from}
                                    onChange={setFrom}

                                />

                                <TextField
                                    select
                                    label="Резервуар"
                                    value={tank}
                                    onChange={(e) => setTank(e.target.value)}
                                >

                                    <MenuItem value="">
                                        Все резервуары
                                    </MenuItem>

                                    {tanks.map((item) => (
                                        <MenuItem
                                            key={item.tankId}
                                            value={item.tankId}
                                        >
                                            {item.tankNumber}
                                        </MenuItem>
                                    ))}

                                </TextField>

                            </>

                        )}

                        {reportType === "turnover" && (

                            <>
                                <DatePicker
                                    label="Дата с"
                                    value={from}
                                    onChange={setFrom}
                                />

                                <DatePicker
                                    label="Дата по"
                                    value={to}
                                    onChange={setTo}
                                />

                                <TextField
                                    select
                                    label="Продукт"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                >

                                    <MenuItem value="">
                                        Все продукты
                                    </MenuItem>

                                    {products.map((item) => (
                                        <MenuItem
                                            key={item.productId}
                                            value={item.productId}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}

                                </TextField>

                            </>

                        )}

                        {reportType === "loss" && (

                            <>
                                <DatePicker
                                    label="Дата с"
                                    value={from}
                                    onChange={setFrom}
                                />

                                <DatePicker
                                    label="Дата по"
                                    value={to}
                                    onChange={setTo}
                                />

                                <TextField
                                    select
                                    label="Резервуар"
                                    value={tank}
                                    onChange={(e) => setTank(e.target.value)}
                                >

                                    <MenuItem value="">
                                        Все резервуары
                                    </MenuItem>

                                    {tanks.map((item) => (
                                        <MenuItem
                                            key={item.tankId}
                                            value={item.tankId}
                                        >
                                            {item.tankNumber}
                                        </MenuItem>
                                    ))}

                                </TextField>

                            </>

                        )}

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={closeDialog}
                    >
                        Отмена
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        onClick={generateReport}
                        sx={{ bgcolor: "secondary.main" } }
                    >
                        Сформировать
                    </Button>

                </DialogActions>

            </Dialog>

        </LocalizationProvider>

    );

}