import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JournalIcon from "@mui/icons-material/MenuBook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import { ruRU } from "@mui/x-data-grid/locales";
import { styled } from '@mui/material/styles';
const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
        fill: '#3D4751',
        ...theme.applyStyles('light', {
            fill: '#AEB8C2',
        }),
    },
    '& .no-rows-secondary': {
        fill: '#1D2126',
        ...theme.applyStyles('light', {
            fill: '#E8EAED',
        }),
    },
}));
function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                fill="none"
                width={96}
                viewBox="0 0 452 257"
                aria-hidden
                focusable="false"
            >
                <path
                    className="no-rows-primary"
                    d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                />
                <path
                    className="no-rows-secondary"
                    d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                />
            </svg>
            <Box sx={{ mt: 2 }}>Нет данных</Box>
        </StyledGridOverlay>
    );
}
export default function AppDataGrid({
    title,
    rows,
    columns,
    sx,
    loading = true,
    getRowId = (row) => row.id,
    icon: Icon,
    showAddButton = true,
    onAdd,

    onJournal,
    onView,
    onEdit,
    onDelete,
}) {

    // Все колонки автоматически растягиваем
    const gridColumns = columns.map((column) => ({
        flex: column.flex ?? 1,
        minWidth: column.minWidth ?? 150,
        ...column,
    }));

    // Добавляем колонку действий
    if (onJournal || onView || onEdit || onDelete ) {
        gridColumns.push({
            field: "actions",
            type: "actions",
            headerName: "Действия",
            minWidth: 140,
            flex: 0.6,

            getActions: ({ row }) => {
                const actions = [];
                if (onJournal)
                    actions.push(
                        <GridActionsCellItem
                            icon={<JournalIcon color="secondary" />}
                            label="Журнал замеров"
                            onClick={() => onJournal(row)}
                        />
                    );
                if (onView)
                    actions.push(
                        <GridActionsCellItem
                            icon={<VisibilityIcon color="secondary" />}
                            label="Просмотр"
                            onClick={() => onView(row)}
                        />
                    );

                if (onEdit)
                    actions.push(
                        <GridActionsCellItem
                            icon={<EditIcon color="secondary" />}
                            label="Редактировать"
                            onClick={() => onEdit(row)}
                        />
                    );

                if (onDelete)
                    actions.push(
                        <GridActionsCellItem
                            icon={<DeleteIcon color="secondary" />}
                            label="Удалить"
                            onClick={() => onDelete(row)}
                        />
                    );
                
                return actions;
            },
        });
    }

    return (
        <Box
            sx={{
                width: "100%",
                overflowX: "auto",
            }}
        >

            {showAddButton && (
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
                        {Icon && (
                            <Icon
                                color="secondary"
                                sx={{ fontSize: 28 }}
                            />
                        )}
                    <Typography variant="h5" fontWeight={600}>
                        {title}
                        </Typography>
                    </Stack>
                    <Button color="secondary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        
                    >
                        Добавить
                    </Button>
                </Box>
            )}

            <DataGrid
                sx={{
                    height: "82vh",
                    minWidth: 300, // или вычислять динамически
                    ...sx,
                }}
                disableRowSelectionOnClick
                rows={rows}
                columns={gridColumns}
                loading={loading}
                getRowId={getRowId}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress',
                    },
                }}
            />
        </Box>
    );
}