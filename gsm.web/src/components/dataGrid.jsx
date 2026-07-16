import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import {
    DataGrid,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import { ruRU } from "@mui/x-data-grid/locales";

export default function AppDataGrid({
    title,
    rows,
    columns,
    loading = false,
    getRowId = (row) => row.id,

    showAddButton = true,
    onAdd,

    onView,
    onEdit,
    onDelete,
}) {

    // Все колонки автоматически растягиваем
    const gridColumns = columns.map(column => ({
        minWidth: 120,
        flex: 1,
        ...column,
    }));

    // Добавляем колонку действий
    if (onView || onEdit || onDelete) {
        gridColumns.push({
            field: "actions",
            type: "actions",
            headerName: "Действия",
            width: 140,
            flex: 0.6,

            getActions: ({ row }) => {
                const actions = [];

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
        <Box sx={{ width: "100%" }}>

            {showAddButton && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        {title}
                    </Typography>
                    <Button color="secondary"
                        variant="contained"
                        startIcon={<AddIcon color="transparrent" />}
                        onClick={onAdd}
                        sx={{ color:"transparrent"} }
                    >
                        Добавить
                    </Button>
                </Box>
            )}

            <DataGrid
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
            />
        </Box>
    );
}