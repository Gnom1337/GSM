import {
    Stack,
    Button,
    Typography,
    Box
} from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
    ArrowBack,
    ArrowForward,
    Today
} from "@mui/icons-material";

export default function CalendarToolbar(toolbar) {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                p: 2,
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 6px 24px rgba(0,0,0,.08)"
            }}
        >

            <Typography variant="h4">
                {format(toolbar.date, "LLLL yyyy", {
                    locale: ru,
                })}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={1}>

                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() =>
                        toolbar.onNavigate("PREV")
                    }
                >
                    Назад
                </Button>

                <Button
                    variant="contained"
                    startIcon={<Today />}
                    onClick={() =>
                        toolbar.onNavigate("TODAY")
                    }
                >
                    Сегодня
                </Button>

                <Button
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    onClick={() =>
                        toolbar.onNavigate("NEXT")
                    }
                >
                    Вперед
                </Button>

            </Stack>

        </Box>

    );

}