import { Stack, Button } from "@mui/material";
import {
    LocalizationProvider,
    DatePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DashboardFilters({
    from,
    to,
    setFrom,
    setTo,
    onApply
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                    <DatePicker
                        label="Дата с"
                        value={from}
                        onChange={setFrom}
                        format="DD/MM/YYYY"
                    />

                    <DatePicker
                        label="Дата по"
                        value={to}
                        onChange={setTo}
                        format="DD/MM/YYYY"
                    />
                </Stack>

                <Button
                    variant="contained"
                    sx={{ bgcolor: "secondary.main" } }
                    onClick={onApply}
                >
                    Применить
                </Button>
            </Stack>
        </LocalizationProvider>
    );
}