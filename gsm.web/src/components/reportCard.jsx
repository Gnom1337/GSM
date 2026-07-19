import {
    Paper,
    Typography,
    Stack,
    Button
} from "@mui/material";

export default function ReportCard({
    title,
    description,
    icon,
    color,
    onClick
}) {

    const Icon = icon;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                transition: ".25s",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6
                }
            }}
        >
            <Stack
                spacing={3}
                height="100%"
            >
                <Icon
                    sx={{
                        fontSize: 46,
                        color
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    {title}
                </Typography>

                <Typography
                    color="text.secondary"
                    flex={1}
                >
                    {description}
                </Typography>

                <Button
                    variant="contained"
                    onClick={onClick}
                    sx={{ bgcolor: "secondary.main" }}
                >
                    Сформировать
                </Button>

            </Stack>
        </Paper>
    );
}