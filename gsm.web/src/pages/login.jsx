import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    LocalGasStation,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            sx={(theme) => ({
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: `
radial-gradient(circle at top left, ${alpha(theme.palette.primary.light, 0.4)}, transparent 45%),
radial-gradient(circle at bottom right, ${alpha(theme.palette.primary.main, 0.35)}, transparent 35%),
linear-gradient(
135deg,
${theme.palette.primary.dark},
${theme.palette.primary.main},
${theme.palette.primary.light}
)
`,
                position: "relative",
                overflow: "hidden",
            })}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,.08)",
                    top: -120,
                    left: -120,
                    filter: "blur(80px)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    bgcolor: "rgba(14,165,233,.25)",
                    bottom: -100,
                    right: -100,
                    filter: "blur(60px)",
                }}
            />

            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        backdropFilter: "blur(18px)",
                        background: "rgba(255,255,255,.92)",
                        borderRadius: 5,
                        p: 5,
                        boxShadow: "0 20px 60px rgba(0,0,0,.25)",
                    }}
                >
                    <Stack spacing={4}>
                        <Stack
                            spacing={2}
                            sx={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 72,
                                    height: 72,
                                    bgcolor: "primary.main",
                                    borderRadius: 4,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                }}
                            >
                                <LocalGasStation sx={{ fontSize: 40 }} />
                            </Box>

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                align="center"
                            >
                                Склад ГСМ
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                align="center"
                            >
                                Система учёта движения нефтепродуктов
                            </Typography>
                        </Stack>

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Логин"
                                placeholder="Введите логин"
                            />

                            <TextField
                                fullWidth
                                label="Пароль"
                                type={showPassword ? "text" : "password"}
                                placeholder="Введите пароль"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Запомнить меня"
                            />

                            <Button
                                variant="contained"
                                
                                size="large"
                                sx={{
                                    height: 54,
                                    borderRadius: 3,
                                    fontSize: 16,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    bgcolor: "secondary.main"
                                }}
                            >
                                Войти
                            </Button>
                        </Stack>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                        >
                            © 2026 Система учёта движения нефтепродуктов
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}