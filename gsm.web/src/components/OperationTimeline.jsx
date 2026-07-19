import {
    Paper,
    Typography,
    Stack,
    Divider,
    Avatar
} from "@mui/material";

import {
    ArrowDownward,
    ArrowUpward,
    Straighten
} from "@mui/icons-material";

const icons = {
    receipt: {
        icon: ArrowDownward,
        color: "success.main"
    },
    dispatch: {
        icon: ArrowUpward,
        color: "info.main"
    },
    measurement: {
        icon: Straighten,
        color: "warning.main"
    }
};

export default function OperationTimeline({ operations = [] }) {

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Последние операции
            </Typography>

            <Stack divider={<Divider />} spacing={2}>

                {operations.map((item) => {

                    const config = icons[item.type];
                    const Icon = config.icon;

                    return (
                        <Stack
                            key={item.id}
                            direction="row"
                            spacing={2}
                            py={1}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: config.color
                                }}
                            >
                                <Icon />
                            </Avatar>

                            <Stack flex={1} spacing={0.5}>

                                <Typography fontWeight={600}>
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.description}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {item.dateTime}
                                </Typography>

                            </Stack>

                        </Stack>
                    );
                })}

            </Stack>

        </Paper>
    );
}