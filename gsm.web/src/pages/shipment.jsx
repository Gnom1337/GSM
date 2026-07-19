import * as React from 'react';
import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import Box from "@mui/material/Box";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { createDateLocaleTheme } from '@mui/x-scheduler/locales'; 
import { ru } from 'date-fns/locale';
import { deepPurple } from '@mui/material/colors'
import { customRuRU } from '../components/schedulerRu';
import {

    createTheme,
    ThemeProvider,
} from '@mui/material/styles';

const customRuLocale = {
    ...ru,

    localize: {
        ...ru.localize,

        month: (n) => {
            const months = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ];

            return months[n];
        },
    },
};


const theme = createTheme({
    palette: {
        primary: deepPurple,
        secondary: deepPurple,
    }, 
    },

    customRuRU,

    createDateLocaleTheme(customRuLocale)
);





const initialEvents = [
    {
        id: 1,
        title: 'Team Meeting',
        start: '2024-01-15T10:00:00',
        end: '2024-01-15T11:00:00',
    },
    {
        id: 2,
        title: 'Project Review',
        start: '2024-01-16T14:00:00',
        end: '2024-01-16T15:30:00',
    },
    {
        id: 3,
        title: 'Client Call',
        start: '2024-01-17T09:00:00',
        end: '2024-01-17T10:00:00',
    },
];

export default function RenderEventCalendar() {
    const [events, setEvents] = React.useState(initialEvents);

    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
                width: "100%",
                overflowX: "auto",
            }}
        >
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
                        mb: 2,
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                    <ScheduleSendIcon 
                                color="secondary"
                                sx={{ fontSize: 28 }}
                            />
                        <Typography variant="h5" fontWeight={600}>
                            Отпуск в автоцистерны
                        </Typography>
                    </Stack>
                </Box>

        <EventCalendar
                sx={{
                    height: "82vh",
                    minWidth: 300, 
                   
                }}
                views={['month']}
                defaultView="month" 
                events={events}
                onEventsChange={setEvents}
                    defaultVisibleDate={new Date()}
                    defaultPreferences={{
                        isSidePanelOpen: false,
                    }}
            />
            </Box>
        </ThemeProvider>
    );
}