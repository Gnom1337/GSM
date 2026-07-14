import { useMemo, useState } from 'react'
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DeleteIcon from '@mui/icons-material/Delete'
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SaveIcon from '@mui/icons-material/Save'
import ScienceIcon from '@mui/icons-material/Science'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import './App.css'

const DRAWER_WIDTH = 292
const STORAGE_KEY = 'gsm.web.state.v2'
const SESSION_KEY = 'gsm.web.session.userId'

const appTheme = createTheme({
  palette: {
    primary: { main: '#0f766e', contrastText: '#ffffff' },
    secondary: { main: '#b45309', contrastText: '#ffffff' },
    success: { main: '#15803d' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
    info: { main: '#2563eb' },
    background: {
      default: '#f5f7f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#16211f',
      secondary: '#64706d',
    },
    divider: '#dfe7e4',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ['Roboto', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
    allVariants: {
      letterSpacing: 0,
    },
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 750 },
    h6: { fontWeight: 750 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 750,
          color: '#30413d',
          backgroundColor: '#f3f7f5',
        },
      },
    },
  },
})

const ROLE_LABELS = {
  admin: 'Администратор',
  operator: 'Оператор',
  warehouse_keeper: 'Кладовщик',
  manager: 'Менеджер',
}

const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Сводка', icon: <DashboardIcon /> },
  { id: 'tanks', label: 'Резервуары', icon: <Inventory2Icon /> },
  { id: 'receipts', label: 'Приход вагонов', icon: <DirectionsRailwayIcon /> },
  { id: 'dispatches', label: 'Отпуск', icon: <LocalShippingIcon /> },
  { id: 'measurements', label: 'Замеры', icon: <FactCheckIcon /> },
  { id: 'reports', label: 'Отчеты', icon: <AssessmentIcon /> },
  { id: 'admin', label: 'Администратор', icon: <AdminPanelSettingsIcon />, adminOnly: true },
]

const SEED_DATA = {
  settings: {
    naturalLossPercent: 0.5,
  },
  products: [
    { productId: 1, name: 'ДТ Евро', density: 0.84 },
    { productId: 2, name: 'АИ-92', density: 0.745 },
    { productId: 3, name: 'АИ-95', density: 0.755 },
    { productId: 4, name: 'Керосин ТС-1', density: 0.8 },
  ],
  tanks: [
    { tankId: 1, tankNumber: 'РВС-01', capacityLiters: 60000, productId: 1, currentVolumeLiters: 38600 },
    { tankId: 2, tankNumber: 'РВС-02', capacityLiters: 45000, productId: 1, currentVolumeLiters: 12800 },
    { tankId: 3, tankNumber: 'РВС-03', capacityLiters: 30000, productId: 2, currentVolumeLiters: 19300 },
    { tankId: 4, tankNumber: 'РВС-04', capacityLiters: 30000, productId: 3, currentVolumeLiters: 22650 },
    { tankId: 5, tankNumber: 'РВС-05', capacityLiters: 20000, productId: 4, currentVolumeLiters: 8100 },
  ],
  users: [
    { userId: 1, fullName: 'Администратор системы', login: 'admin', passwordHash: 'admin', roleName: 'admin' },
    { userId: 2, fullName: 'Иван Петров', login: 'operator', passwordHash: 'operator', roleName: 'operator' },
    { userId: 3, fullName: 'Мария Соколова', login: 'sklad', passwordHash: 'sklad', roleName: 'warehouse_keeper' },
    { userId: 4, fullName: 'Алексей Орлов', login: 'manager', passwordHash: 'manager', roleName: 'manager' },
  ],
  wagonReceipts: [
    {
      wagonReceiptId: 1,
      wagonNumber: '58541201',
      receiptDate: '2026-07-06',
      productId: 1,
      tankId: 1,
      volumeInvoiceLiters: 18500,
      volumeActualLiters: 18410,
      discrepancyLiters: 90,
      waybillNumber: 'ЖД-7612',
      userId: 2,
      createdAt: '2026-07-06T06:35:00.000Z',
    },
    {
      wagonReceiptId: 2,
      wagonNumber: '58541218',
      receiptDate: '2026-07-05',
      productId: 2,
      tankId: 3,
      volumeInvoiceLiters: 12600,
      volumeActualLiters: 12520,
      discrepancyLiters: 80,
      waybillNumber: 'ЖД-7599',
      userId: 3,
      createdAt: '2026-07-05T09:20:00.000Z',
    },
    {
      wagonReceiptId: 3,
      wagonNumber: '58541177',
      receiptDate: '2026-07-04',
      productId: 3,
      tankId: 4,
      volumeInvoiceLiters: 15600,
      volumeActualLiters: 15580,
      discrepancyLiters: 20,
      waybillNumber: 'ЖД-7583',
      userId: 2,
      createdAt: '2026-07-04T07:50:00.000Z',
    },
  ],
  dispatches: [
    {
      dispatchId: 1,
      dispatchDate: '2026-07-06',
      tankId: 1,
      truckNumber: 'А456ВС 77',
      driverName: 'Сергей Миронов',
      recipientOrg: 'ООО СеверСтрой',
      volumeInvoiceLiters: 5200,
      waybillNumber: 'АТ-1328',
      userId: 2,
      createdAt: '2026-07-06T10:15:00.000Z',
    },
    {
      dispatchId: 2,
      dispatchDate: '2026-07-05',
      tankId: 3,
      truckNumber: 'М102КТ 50',
      driverName: 'Павел Никифоров',
      recipientOrg: 'АО ДорСервис',
      volumeInvoiceLiters: 3100,
      waybillNumber: 'АТ-1320',
      userId: 3,
      createdAt: '2026-07-05T12:40:00.000Z',
    },
    {
      dispatchId: 3,
      dispatchDate: '2026-07-04',
      tankId: 4,
      truckNumber: 'О771РА 77',
      driverName: 'Денис Ковалев',
      recipientOrg: 'ООО ТрансЛогистик',
      volumeInvoiceLiters: 2800,
      waybillNumber: 'АТ-1317',
      userId: 2,
      createdAt: '2026-07-04T13:10:00.000Z',
    },
  ],
  tankMeasurements: [
    {
      tankMeasurementsId: 1,
      tankId: 1,
      measuredAt: '2026-07-06T16:10:00.000Z',
      volumeLiters: 38620,
      userId: 3,
      note: 'После дневного отпуска',
    },
    {
      tankMeasurementsId: 2,
      tankId: 3,
      measuredAt: '2026-07-05T17:30:00.000Z',
      volumeLiters: 19310,
      userId: 3,
      note: 'Плановый вечерний замер',
    },
    {
      tankMeasurementsId: 3,
      tankId: 4,
      measuredAt: '2026-07-04T18:05:00.000Z',
      volumeLiters: 22630,
      userId: 3,
      note: '',
    },
  ],
  dailyBalances: [
    {
      dailyBalanceId: 1,
      balanceDate: '2026-07-05',
      tankId: 3,
      openingVolume: 9890,
      totalReceived: 12520,
      totalDispatched: 3100,
      closingVolumeCalculated: 19310,
      closingVolumeActual: 19310,
      lossLiters: 0,
    },
    {
      dailyBalanceId: 2,
      balanceDate: '2026-07-04',
      tankId: 4,
      openingVolume: 9850,
      totalReceived: 15580,
      totalDispatched: 2800,
      closingVolumeCalculated: 22630,
      closingVolumeActual: 22630,
      lossLiters: 0,
    },
  ],
  auditLog: [],
}

const cloneSeedData = () => JSON.parse(JSON.stringify(SEED_DATA))

const todayInput = () => new Date().toISOString().slice(0, 10)

const firstDayOfMonthInput = () => {
  const date = new Date()
  date.setDate(1)
  return date.toISOString().slice(0, 10)
}

const nowDateTimeInput = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

const toDateTimeInput = (value) => {
  if (!value) return nowDateTimeInput()
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 16)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

const fromDateTimeInput = (value) => {
  if (!value) return new Date().toISOString()
  return new Date(value).toISOString()
}

const toNumber = (value) => {
  const normalized = String(value ?? '').replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatNumber = (value, digits = 0) =>
  new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(toNumber(value))

const formatLiters = (value) => `${formatNumber(value)} л`
const formatDensity = (value) => formatNumber(value, 3)

const formatDate = (value) => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('ru-RU').format(new Date(`${value}T00:00:00`))
}

const formatDateTime = (value) => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

const getNextId = (rows, idKey) => rows.reduce((max, row) => Math.max(max, Number(row[idKey]) || 0), 0) + 1

const clampVolume = (value) => Math.max(0, Math.round(toNumber(value)))

const getFillPercent = (tank) => {
  if (!tank?.capacityLiters) return 0
  return Math.min(100, Math.max(0, (toNumber(tank.currentVolumeLiters) / toNumber(tank.capacityLiters)) * 100))
}

const roleLabel = (roleName) => ROLE_LABELS[roleName] ?? roleName

const findProduct = (data, productId) => data.products.find((product) => Number(product.productId) === Number(productId))
const findTank = (data, tankId) => data.tanks.find((tank) => Number(tank.tankId) === Number(tankId))
const findUser = (data, userId) => data.users.find((user) => Number(user.userId) === Number(userId))

const productLabel = (data, productId) => findProduct(data, productId)?.name ?? 'Не указан'
const tankLabel = (data, tankId) => {
  const tank = findTank(data, tankId)
  return tank ? `${tank.tankNumber} · ${productLabel(data, tank.productId)}` : 'Не указан'
}
const userLabel = (data, userId) => findUser(data, userId)?.fullName ?? 'Не указан'

const discrepancyPercent = (receipt) => {
  const invoice = Math.abs(toNumber(receipt.volumeInvoiceLiters))
  if (!invoice) return 0
  return (Math.abs(toNumber(receipt.discrepancyLiters)) / invoice) * 100
}

const isReceiptOverNorm = (receipt, naturalLossPercent) => discrepancyPercent(receipt) > toNumber(naturalLossPercent)

const dateInRange = (date, from, to) => {
  if (!date) return false
  if (from && date < from) return false
  if (to && date > to) return false
  return true
}

const loadInitialData = () => {
  const fallback = cloneSeedData()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return fallback
    const parsed = JSON.parse(stored)
    return {
      ...fallback,
      ...parsed,
      settings: { ...fallback.settings, ...(parsed.settings ?? {}) },
      auditLog: parsed.auditLog ?? [],
    }
  } catch {
    return fallback
  }
}

const withAudit = (data, currentUser, action, entity) => ({
  ...data,
  auditLog: [
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      action,
      entity,
      userId: currentUser?.userId ?? null,
      userName: currentUser?.fullName ?? 'Система',
      createdAt: new Date().toISOString(),
    },
    ...(data.auditLog ?? []),
  ].slice(0, 200),
})

function RoleChip({ role }) {
  const color = role === 'admin' ? 'error' : role === 'manager' ? 'info' : role === 'warehouse_keeper' ? 'success' : 'secondary'
  return <Chip size="small" color={color} label={roleLabel(role)} />
}

function PageHeader({ title, description, action }) {
  return (
    <Box className="page-header">
      <Box>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" className="page-header__description">
            {description}
          </Typography>
        ) : null}
      </Box>
      {action ? <Box className="page-header__action">{action}</Box> : null}
    </Box>
  )
}

function InfoTile({ title, value, caption, tone = 'primary', icon }) {
  return (
    <Paper className={`info-tile info-tile--${tone}`} variant="outlined">
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Avatar className="info-tile__icon">{icon}</Avatar>
        <Box>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
          {caption ? <Typography variant="caption">{caption}</Typography> : null}
        </Box>
      </Stack>
    </Paper>
  )
}

function getColumnValue(row, column) {
  if (!column) return ''
  if (column.searchValue) return column.searchValue(row)
  if (column.value) return column.value(row)
  return row[column.id]
}

function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  const left = a == null ? '' : String(a)
  const right = b == null ? '' : String(b)
  return left.localeCompare(right, 'ru', { numeric: true, sensitivity: 'base' })
}

function CrudTable({
  title,
  description,
  rows,
  columns,
  getRowId,
  canEdit = false,
  onAdd,
  onEdit,
  onDelete,
  addLabel = 'Добавить',
  searchPlaceholder = 'Поиск',
  extraActions,
  emptyText = 'Нет данных',
  initialRowsPerPage = 8,
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [orderBy, setOrderBy] = useState(columns[0]?.id ?? '')
  const [order, setOrder] = useState('asc')

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    const visibleRows = query
      ? rows.filter((row) =>
          columns
            .map((column) => getColumnValue(row, column))
            .join(' ')
            .toLowerCase()
            .includes(query),
        )
      : rows

    const sortColumn = columns.find((column) => column.id === orderBy)
    if (!sortColumn || sortColumn.sortable === false) return visibleRows

    return [...visibleRows].sort((left, right) => {
      const result = compareValues(getColumnValue(left, sortColumn), getColumnValue(right, sortColumn))
      return order === 'asc' ? result : -result
    })
  }, [columns, order, orderBy, rows, search])

  const maxPage = Math.max(0, Math.ceil(filteredRows.length / rowsPerPage) - 1)
  const safePage = Math.min(page, maxPage)
  const pagedRows = filteredRows.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage)

  const handleSort = (column) => {
    if (column.sortable === false) return
    const isAsc = orderBy === column.id && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(column.id)
  }

  const hasActions = canEdit && (onEdit || onDelete)

  return (
    <Paper className="table-panel" variant="outlined">
      <Box className="table-toolbar">
        <Box>
          <Typography variant="h6">{title}</Typography>
          {description ? <Typography color="text.secondary">{description}</Typography> : null}
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} className="table-toolbar__actions">
          <TextField
            size="small"
            value={search}
            placeholder={searchPlaceholder}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(0)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          {extraActions}
          {canEdit && onAdd ? (
            <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
              {addLabel}
            </Button>
          ) : null}
        </Stack>
      </Box>
      <TableContainer className="table-panel__container">
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? (column.numeric ? 'right' : 'left')}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.sortable === false ? (
                    column.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column)}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
              {hasActions ? <TableCell align="right">Действия</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedRows.map((row) => (
              <TableRow hover key={getRowId(row)}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align ?? (column.numeric ? 'right' : 'left')}>
                    {column.render ? column.render(row) : getColumnValue(row, column)}
                  </TableCell>
                ))}
                {hasActions ? (
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      {onEdit ? (
                        <Tooltip title="Редактировать">
                          <IconButton size="small" onClick={() => onEdit(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      {onDelete ? (
                        <Tooltip title="Удалить">
                          <IconButton size="small" color="error" onClick={() => onDelete(row)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </Stack>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
            {!pagedRows.length ? (
              <TableRow>
                <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} align="center">
                  <Typography color="text.secondary" className="empty-state">
                    {emptyText}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={safePage}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 8, 10, 25]}
        labelRowsPerPage="Строк"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
      />
    </Paper>
  )
}

function createInitialRecordValues(fields, record) {
  const nextValues = {}
  fields.forEach((field) => {
    const rawValue = record?.[field.name]
    if (field.formatValue) {
      nextValues[field.name] = field.formatValue(rawValue, record)
    } else if (rawValue !== undefined && rawValue !== null) {
      nextValues[field.name] = rawValue
    } else {
      nextValues[field.name] = field.defaultValue ?? ''
    }
  })
  return nextValues
}

function RecordDialog({ open, title, record, fields, onClose, onSave, preview }) {
  const [values, setValues] = useState(() => createInitialRecordValues(fields, record))

  const handleValueChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = () => {
    const saved = onSave(values, record)
    if (saved !== false) onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {preview ? <Box className="dialog-preview">{preview(values, record)}</Box> : null}
        <Box className="dialog-grid">
          {fields.map((field) => {
            const disabled = typeof field.disabled === 'function' ? field.disabled(values, record) : field.disabled
            return (
              <TextField
                key={field.name}
                className={field.fullWidth ? 'dialog-grid__full' : undefined}
                select={field.type === 'select'}
                label={field.label}
                value={values[field.name] ?? ''}
                onChange={(event) => handleValueChange(field.name, event.target.value)}
                required={field.required}
                type={field.type && field.type !== 'select' ? field.type : 'text'}
                multiline={field.multiline}
                minRows={field.multiline ? 3 : undefined}
                helperText={field.helperText}
                disabled={disabled}
                InputLabelProps={field.type === 'date' || field.type === 'datetime-local' ? { shrink: true } : undefined}
                inputProps={field.inputProps}
                fullWidth
              >
                {field.type === 'select'
                  ? field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            )
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function LoginPage({ users, onLogin }) {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const user = users.find((candidate) => candidate.login === login.trim())
    if (!user || user.passwordHash !== password) {
      setError('Неверный логин или пароль')
      return
    }
    onLogin(user)
  }

  return (
    <Box className="login-screen">
      <Paper className="login-panel" variant="outlined">
        <Stack spacing={3} component="form" onSubmit={submit}>
          <Box>
            <Avatar className="login-panel__icon">
              <LockIcon />
            </Avatar>
            <Typography variant="h4" component="h1">
              Склад ГСМ
            </Typography>
            <Typography color="text.secondary">Учет движения нефтепродуктов, остатков и потерь</Typography>
          </Box>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField label="Логин" value={login} onChange={(event) => setLogin(event.target.value)} autoFocus fullWidth />
          <TextField
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            fullWidth
          />
          <Button type="submit" size="large" variant="contained">
            Войти
          </Button>
          <Divider />
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Тестовые учетные записи
            </Typography>
            <Stack direction="row" spacing={1}  useFlexGap>
              {users.map((user) => (
                <Chip
                  key={user.userId}
                  label={`${user.login} / ${user.passwordHash}`}
                  onClick={() => {
                    setLogin(user.login)
                    setPassword(user.passwordHash)
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Paper>
      <Box className="login-side">
        <Typography variant="overline">оперативный контур</Typography>
        <Typography variant="h3">Приход, хранение и отпуск в одном рабочем месте</Typography>
        <Typography>
          Интерфейс рассчитан на кладовщика и оператора: быстрые журналы, контроль остатков, предупреждения по расхождениям
          и отчеты для руководителя.
        </Typography>
      </Box>
    </Box>
  )
}

function AppShell({ currentUser, activeSection, onSectionChange, onLogout, children }) {
  const isDesktop = useMediaQuery(appTheme.breakpoints.up('lg'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const visibleNav = NAV_ITEMS.filter((item) => !item.adminOnly || currentUser.roleName === 'admin')

  const drawerContent = (
    <Box className="app-drawer">
      <Box className="app-drawer__brand">
        <Avatar className="app-drawer__logo">
          <ScienceIcon />
        </Avatar>
        <Box>
          <Typography variant="h6">GSM</Typography>
          <Typography variant="caption">Склад нефтепродуктов</Typography>
        </Box>
      </Box>
      <List className="app-drawer__nav">
        {visibleNav.map((item) => (
          <ListItemButton
            key={item.id}
            selected={activeSection === item.id}
            onClick={() => {
              onSectionChange(item.id)
              setMobileOpen(false)
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box className="app-drawer__user">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar>{currentUser.fullName.slice(0, 1)}</Avatar>
          <Box minWidth={0}>
            <Typography variant="subtitle2" noWrap>
              {currentUser.fullName}
            </Typography>
            <RoleChip role={currentUser.roleName} />
          </Box>
        </Stack>
      </Box>
    </Box>
  )

  return (
    <Box className="app-shell">
      {isDesktop ? (
        <Drawer
          variant="permanent"
          PaperProps={{ sx: { width: DRAWER_WIDTH, borderRight: '1px solid #dfe7e4' } }}
          open
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      )}
      <Box className="app-main" sx={{ marginLeft: isDesktop ? `${DRAWER_WIDTH}px` : 0 }}>
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            width: isDesktop ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
            ml: isDesktop ? `${DRAWER_WIDTH}px` : 0,
            borderBottom: '1px solid #dfe7e4',
          }}
        >
          <Toolbar className="topbar">
            {!isDesktop ? (
              <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Открыть меню">
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography variant="subtitle1" className="topbar__title">
              Учет движения нефтепродуктов
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <RoleChip role={currentUser.roleName} />
              <Tooltip title="Выйти">
                <IconButton onClick={onLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box component="main" className="content-shell">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

function DashboardPage({ data }) {
  const today = todayInput()
  const totalVolume = data.tanks.reduce((sum, tank) => sum + toNumber(tank.currentVolumeLiters), 0)
  const totalCapacity = data.tanks.reduce((sum, tank) => sum + toNumber(tank.capacityLiters), 0)
  const receivedToday = data.wagonReceipts
    .filter((receipt) => receipt.receiptDate === today)
    .reduce((sum, receipt) => sum + toNumber(receipt.volumeActualLiters), 0)
  const dispatchedToday = data.dispatches
    .filter((dispatch) => dispatch.dispatchDate === today)
    .reduce((sum, dispatch) => sum + toNumber(dispatch.volumeInvoiceLiters), 0)
  const overNormReceipts = data.wagonReceipts.filter((receipt) => isReceiptOverNorm(receipt, data.settings.naturalLossPercent))

  const productStocks = data.products.map((product) => {
    const tanks = data.tanks.filter((tank) => Number(tank.productId) === Number(product.productId))
    const volume = tanks.reduce((sum, tank) => sum + toNumber(tank.currentVolumeLiters), 0)
    const capacity = tanks.reduce((sum, tank) => sum + toNumber(tank.capacityLiters), 0)
    return { ...product, volume, capacity, fill: capacity ? (volume / capacity) * 100 : 0 }
  })

  const tankWarnings = data.tanks.filter((tank) => getFillPercent(tank) >= 90 || getFillPercent(tank) <= 10)
  const recentMovements = [
    ...data.wagonReceipts.map((receipt) => ({
      id: `r-${receipt.wagonReceiptId}`,
      date: receipt.createdAt,
      title: `Приход ${receipt.wagonNumber}`,
      subtitle: `${tankLabel(data, receipt.tankId)} · ${formatLiters(receipt.volumeActualLiters)}`,
      tone: 'success',
    })),
    ...data.dispatches.map((dispatch) => ({
      id: `d-${dispatch.dispatchId}`,
      date: dispatch.createdAt,
      title: `Отпуск ${dispatch.truckNumber}`,
      subtitle: `${tankLabel(data, dispatch.tankId)} · ${formatLiters(dispatch.volumeInvoiceLiters)}`,
      tone: 'warning',
    })),
  ]
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 6)

  return (
    <Box>
      <PageHeader
        title="Сводка склада"
        description="Остатки, операции за день и контрольные предупреждения по складу ГСМ."
      />
      <Box className="kpi-grid">
        <InfoTile
          title="Текущий остаток"
          value={formatLiters(totalVolume)}
          caption={`${formatNumber((totalVolume / totalCapacity) * 100, 1)}% общей емкости`}
          icon={<Inventory2Icon />}
        />
        <InfoTile title="Приход сегодня" value={formatLiters(receivedToday)} caption={formatDate(today)} icon={<DirectionsRailwayIcon />} tone="success" />
        <InfoTile title="Отпуск сегодня" value={formatLiters(dispatchedToday)} caption={formatDate(today)} icon={<LocalShippingIcon />} tone="warning" />
        <InfoTile
          title="Превышения нормы"
          value={overNormReceipts.length}
          caption={`Норма ${formatNumber(data.settings.naturalLossPercent, 2)}%`}
          icon={<WarningAmberIcon />}
          tone={overNormReceipts.length ? 'error' : 'primary'}
        />
      </Box>

      <Box className="dashboard-grid">
        <Paper className="section-panel" variant="outlined">
          <Typography variant="h6">Остатки по продуктам</Typography>
          <Stack spacing={2} mt={2}>
            {productStocks.map((product) => (
              <Box key={product.productId}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography fontWeight={700}>{product.name}</Typography>
                  <Typography color="text.secondary">{formatLiters(product.volume)}</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={Math.min(product.fill, 100)} className="stock-progress" />
                <Typography variant="caption" color="text.secondary">
                  Заполнение {formatNumber(product.fill, 1)}% · емкость {formatLiters(product.capacity)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper className="section-panel" variant="outlined">
          <Typography variant="h6">Контроль склада</Typography>
          <Stack spacing={1.5} mt={2}>
            {!tankWarnings.length && !overNormReceipts.length ? (
              <Alert severity="success">Критичных отклонений по остаткам и приходам нет.</Alert>
            ) : null}
            {tankWarnings.map((tank) => (
              <Alert key={tank.tankId} severity={getFillPercent(tank) >= 90 ? 'warning' : 'info'}>
                {tank.tankNumber}: заполнение {formatNumber(getFillPercent(tank), 1)}%, остаток {formatLiters(tank.currentVolumeLiters)}
              </Alert>
            ))}
            {overNormReceipts.slice(0, 4).map((receipt) => (
              <Alert key={receipt.wagonReceiptId} severity="warning">
                Вагон {receipt.wagonNumber}: расхождение {formatLiters(receipt.discrepancyLiters)} (
                {formatNumber(discrepancyPercent(receipt), 2)}%)
              </Alert>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Paper className="section-panel" variant="outlined">
        <Typography variant="h6">Последние операции</Typography>
        <Box className="activity-list">
          {recentMovements.map((item) => (
            <Box key={item.id} className="activity-list__item">
              <Chip size="small" color={item.tone} label={item.tone === 'success' ? 'Приход' : 'Отпуск'} />
              <Box>
                <Typography fontWeight={700}>{item.title}</Typography>
                <Typography color="text.secondary">{item.subtitle}</Typography>
              </Box>
              <Typography color="text.secondary" className="activity-list__date">
                {formatDateTime(item.date)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

function TankCards({ data, selectedTankId, onSelectTank }) {
  return (
    <Box className="tank-grid">
      {data.tanks.map((tank) => {
        const fill = getFillPercent(tank)
        const tone = fill > 90 ? 'error' : fill < 10 ? 'warning' : 'success'
        return (
          <Paper
            key={tank.tankId}
            className={`tank-card ${Number(selectedTankId) === Number(tank.tankId) ? 'tank-card--selected' : ''}`}
            variant="outlined"
            onClick={() => onSelectTank(tank.tankId)}
          >
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Box>
                <Typography variant="h6">{tank.tankNumber}</Typography>
                <Typography color="text.secondary">{productLabel(data, tank.productId)}</Typography>
              </Box>
              <Chip size="small" color={tone} label={`${formatNumber(fill, 1)}%`} />
            </Stack>
            <LinearProgress variant="determinate" value={Math.min(fill, 100)} className="stock-progress" />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Остаток</Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatLiters(tank.currentVolumeLiters)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Емкость {formatLiters(tank.capacityLiters)}
            </Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

function buildTankMovement(data, tankId) {
  const receipts = data.wagonReceipts
    .filter((receipt) => Number(receipt.tankId) === Number(tankId))
    .map((receipt) => ({
      id: `receipt-${receipt.wagonReceiptId}`,
      date: receipt.receiptDate,
      type: 'Приход',
      volume: receipt.volumeActualLiters,
      description: `Вагон ${receipt.wagonNumber}, накладная ${receipt.waybillNumber}`,
      tone: 'success',
    }))

  const dispatches = data.dispatches
    .filter((dispatch) => Number(dispatch.tankId) === Number(tankId))
    .map((dispatch) => ({
      id: `dispatch-${dispatch.dispatchId}`,
      date: dispatch.dispatchDate,
      type: 'Отпуск',
      volume: -toNumber(dispatch.volumeInvoiceLiters),
      description: `${dispatch.truckNumber}, ${dispatch.recipientOrg}`,
      tone: 'warning',
    }))

  const measurements = data.tankMeasurements
    .filter((measurement) => Number(measurement.tankId) === Number(tankId))
    .map((measurement) => ({
      id: `measurement-${measurement.tankMeasurementsId}`,
      date: measurement.measuredAt.slice(0, 10),
      type: 'Замер',
      volume: measurement.volumeLiters,
      description: measurement.note || 'Контрольный замер',
      tone: 'info',
    }))

  return [...receipts, ...dispatches, ...measurements].sort((left, right) => right.date.localeCompare(left.date))
}

function TanksPage({ data, canEdit, onSaveTank, onDeleteTank }) {
  const [dialog, setDialog] = useState({ open: false, record: null })
  const [selectedTankId, setSelectedTankId] = useState(data.tanks[0]?.tankId ?? '')
  const selectedTank = findTank(data, selectedTankId) ?? data.tanks[0]
  const movement = selectedTank ? buildTankMovement(data, selectedTank.tankId) : []

  const productOptions = data.products.map((product) => ({ value: product.productId, label: product.name }))
  const tankFields = [
    { name: 'tankNumber', label: 'Номер резервуара', required: true },
    { name: 'productId', label: 'Нефтепродукт', type: 'select', required: true, options: productOptions },
    { name: 'capacityLiters', label: 'Вместимость, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'currentVolumeLiters', label: 'Текущий остаток, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
  ]

  const columns = [
    { id: 'tankNumber', label: 'Резервуар', minWidth: 120 },
    { id: 'productId', label: 'Продукт', value: (row) => productLabel(data, row.productId), render: (row) => <Chip size="small" label={productLabel(data, row.productId)} /> },
    { id: 'capacityLiters', label: 'Вместимость', numeric: true, value: (row) => toNumber(row.capacityLiters), render: (row) => formatLiters(row.capacityLiters) },
    { id: 'currentVolumeLiters', label: 'Остаток', numeric: true, value: (row) => toNumber(row.currentVolumeLiters), render: (row) => formatLiters(row.currentVolumeLiters) },
    {
      id: 'fill',
      label: 'Заполнение',
      numeric: true,
      value: (row) => getFillPercent(row),
      render: (row) => (
        <Box minWidth={150}>
          <LinearProgress variant="determinate" value={Math.min(getFillPercent(row), 100)} className="stock-progress" />
          <Typography variant="caption">{formatNumber(getFillPercent(row), 1)}%</Typography>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <PageHeader title="Резервуары" description="Текущие остатки, заполнение и история движения по каждому резервуару." />
      <TankCards data={data} selectedTankId={selectedTank?.tankId} onSelectTank={setSelectedTankId} />

      {selectedTank ? (
        <Paper className="section-panel" variant="outlined">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
            <Box>
              <Typography variant="h6">Карточка {selectedTank.tankNumber}</Typography>
              <Typography color="text.secondary">
                {productLabel(data, selectedTank.productId)} · {formatLiters(selectedTank.currentVolumeLiters)} из{' '}
                {formatLiters(selectedTank.capacityLiters)}
              </Typography>
            </Box>
            <Select size="small" value={selectedTank.tankId} onChange={(event) => setSelectedTankId(event.target.value)}>
              {data.tanks.map((tank) => (
                <MenuItem key={tank.tankId} value={tank.tankId}>
                  {tank.tankNumber}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Box className="movement-list">
            {movement.length ? (
              movement.map((item) => (
                <Box key={item.id} className="movement-list__item">
                  <Chip size="small" color={item.tone} label={item.type} />
                  <Box>
                    <Typography fontWeight={700}>{item.description}</Typography>
                    <Typography color="text.secondary">{formatDate(item.date)}</Typography>
                  </Box>
                  <Typography fontWeight={700} color={item.volume < 0 ? 'warning.main' : 'success.main'}>
                    {item.type === 'Замер' ? formatLiters(item.volume) : `${item.volume > 0 ? '+' : ''}${formatLiters(item.volume)}`}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary" className="empty-state">
                По резервуару пока нет операций.
              </Typography>
            )}
          </Box>
        </Paper>
      ) : null}

      <CrudTable
        title="Справочник резервуаров"
        description="CRUD с поиском, сортировкой и пагинацией."
        rows={data.tanks}
        columns={columns}
        getRowId={(row) => row.tankId}
        canEdit={canEdit}
        onAdd={() => setDialog({ open: true, record: null })}
        onEdit={(record) => setDialog({ open: true, record })}
        onDelete={onDeleteTank}
        addLabel="Резервуар"
      />

      <RecordDialog
        key={dialog.open ? `tank-${dialog.record?.tankId ?? 'new'}` : 'tank-closed'}
        open={dialog.open}
        title={dialog.record ? 'Редактировать резервуар' : 'Новый резервуар'}
        record={dialog.record}
        fields={tankFields}
        onClose={() => setDialog({ open: false, record: null })}
        onSave={onSaveTank}
      />
    </Box>
  )
}

function ReceiptsPage({ data, canEdit, onSaveReceipt, onDeleteReceipt }) {
  const [dialog, setDialog] = useState({ open: false, record: null })
  const productOptions = data.products.map((product) => ({ value: product.productId, label: product.name }))
  const tankOptions = data.tanks.map((tank) => ({
    value: tank.tankId,
    label: `${tank.tankNumber} · ${productLabel(data, tank.productId)} · ${formatLiters(tank.currentVolumeLiters)}`,
  }))

  const fields = [
    { name: 'wagonNumber', label: 'Номер вагона', required: true },
    { name: 'receiptDate', label: 'Дата прихода', type: 'date', required: true, defaultValue: todayInput() },
    { name: 'productId', label: 'Продукт', type: 'select', required: true, options: productOptions },
    { name: 'tankId', label: 'Резервуар-получатель', type: 'select', required: true, options: tankOptions },
    { name: 'volumeInvoiceLiters', label: 'Объем по накладной, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'volumeActualLiters', label: 'Фактический слив, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'waybillNumber', label: 'Номер накладной', required: true },
  ]

  const preview = (values) => {
    const invoice = toNumber(values.volumeInvoiceLiters)
    const actual = toNumber(values.volumeActualLiters)
    const discrepancy = invoice - actual
    const percent = invoice ? (Math.abs(discrepancy) / invoice) * 100 : 0
    const overNorm = percent > toNumber(data.settings.naturalLossPercent)
    return (
      <Alert severity={overNorm ? 'warning' : 'info'}>
        Расхождение: {formatLiters(discrepancy)} ({formatNumber(percent, 2)}%). Норма естественной убыли:{' '}
        {formatNumber(data.settings.naturalLossPercent, 2)}%.
      </Alert>
    )
  }

  const columns = [
    { id: 'receiptDate', label: 'Дата', value: (row) => row.receiptDate, render: (row) => formatDate(row.receiptDate) },
    { id: 'wagonNumber', label: 'Вагон' },
    { id: 'productId', label: 'Продукт', value: (row) => productLabel(data, row.productId), render: (row) => <Chip size="small" label={productLabel(data, row.productId)} /> },
    { id: 'tankId', label: 'Резервуар', value: (row) => tankLabel(data, row.tankId), render: (row) => tankLabel(data, row.tankId) },
    { id: 'volumeInvoiceLiters', label: 'Накладная', numeric: true, value: (row) => toNumber(row.volumeInvoiceLiters), render: (row) => formatLiters(row.volumeInvoiceLiters) },
    { id: 'volumeActualLiters', label: 'Факт', numeric: true, value: (row) => toNumber(row.volumeActualLiters), render: (row) => formatLiters(row.volumeActualLiters) },
    {
      id: 'discrepancyLiters',
      label: 'Расхождение',
      numeric: true,
      value: (row) => toNumber(row.discrepancyLiters),
      render: (row) => (
        <Chip
          size="small"
          color={isReceiptOverNorm(row, data.settings.naturalLossPercent) ? 'warning' : 'default'}
          label={`${formatLiters(row.discrepancyLiters)} · ${formatNumber(discrepancyPercent(row), 2)}%`}
        />
      ),
    },
    { id: 'waybillNumber', label: 'Накладная' },
    { id: 'userId', label: 'Автор', value: (row) => userLabel(data, row.userId), render: (row) => userLabel(data, row.userId) },
  ]

  return (
    <Box>
      <PageHeader
        title="Приход вагонов"
        description="Фиксация слива, автоматический расчет расхождения и обновление остатка резервуара."
      />
      <CrudTable
        title="Журнал приходов"
        rows={data.wagonReceipts}
        columns={columns}
        getRowId={(row) => row.wagonReceiptId}
        canEdit={canEdit}
        onAdd={() => setDialog({ open: true, record: null })}
        onEdit={(record) => setDialog({ open: true, record })}
        onDelete={onDeleteReceipt}
        addLabel="Приход"
        searchPlaceholder="Вагон, продукт, резервуар"
      />
      <RecordDialog
        key={dialog.open ? `receipt-${dialog.record?.wagonReceiptId ?? 'new'}` : 'receipt-closed'}
        open={dialog.open}
        title={dialog.record ? 'Редактировать приход' : 'Новый приход вагона'}
        record={dialog.record}
        fields={fields}
        preview={preview}
        onClose={() => setDialog({ open: false, record: null })}
        onSave={onSaveReceipt}
      />
    </Box>
  )
}

function DispatchesPage({ data, canEdit, onSaveDispatch, onDeleteDispatch }) {
  const [dialog, setDialog] = useState({ open: false, record: null })
  const tankOptions = data.tanks.map((tank) => ({
    value: tank.tankId,
    label: `${tank.tankNumber} · ${productLabel(data, tank.productId)} · остаток ${formatLiters(tank.currentVolumeLiters)}`,
  }))

  const fields = [
    { name: 'dispatchDate', label: 'Дата отпуска', type: 'date', required: true, defaultValue: todayInput() },
    { name: 'tankId', label: 'Резервуар-источник', type: 'select', required: true, options: tankOptions },
    { name: 'truckNumber', label: 'Номер автоцистерны', required: true },
    { name: 'driverName', label: 'Водитель', required: true },
    { name: 'recipientOrg', label: 'Получатель', required: true },
    { name: 'volumeInvoiceLiters', label: 'Объем по накладной, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'waybillNumber', label: 'Номер накладной', required: true },
  ]

  const preview = (values, record) => {
    const tank = findTank(data, values.tankId)
    const requested = toNumber(values.volumeInvoiceLiters)
    const restored = record && Number(record.tankId) === Number(values.tankId) ? toNumber(record.volumeInvoiceLiters) : 0
    const available = toNumber(tank?.currentVolumeLiters) + restored
    const severity = requested > available ? 'error' : 'info'
    return (
      <Alert severity={severity}>
        Доступно в резервуаре: {formatLiters(available)}. После отпуска останется {formatLiters(available - requested)}.
      </Alert>
    )
  }

  const columns = [
    { id: 'dispatchDate', label: 'Дата', value: (row) => row.dispatchDate, render: (row) => formatDate(row.dispatchDate) },
    { id: 'tankId', label: 'Резервуар', value: (row) => tankLabel(data, row.tankId), render: (row) => tankLabel(data, row.tankId) },
    { id: 'truckNumber', label: 'Автоцистерна' },
    { id: 'driverName', label: 'Водитель' },
    { id: 'recipientOrg', label: 'Получатель' },
    { id: 'volumeInvoiceLiters', label: 'Объем', numeric: true, value: (row) => toNumber(row.volumeInvoiceLiters), render: (row) => formatLiters(row.volumeInvoiceLiters) },
    { id: 'waybillNumber', label: 'Накладная' },
    { id: 'userId', label: 'Автор', value: (row) => userLabel(data, row.userId), render: (row) => userLabel(data, row.userId) },
  ]

  return (
    <Box>
      <PageHeader title="Отпуск в автоцистерны" description="Списание из резервуара с блокировкой отпуска сверх доступного остатка." />
      <CrudTable
        title="Журнал отпусков"
        rows={data.dispatches}
        columns={columns}
        getRowId={(row) => row.dispatchId}
        canEdit={canEdit}
        onAdd={() => setDialog({ open: true, record: null })}
        onEdit={(record) => setDialog({ open: true, record })}
        onDelete={onDeleteDispatch}
        addLabel="Отпуск"
        searchPlaceholder="Автоцистерна, водитель, получатель"
      />
      <RecordDialog
        key={dialog.open ? `dispatch-${dialog.record?.dispatchId ?? 'new'}` : 'dispatch-closed'}
        open={dialog.open}
        title={dialog.record ? 'Редактировать отпуск' : 'Новый отпуск'}
        record={dialog.record}
        fields={fields}
        preview={preview}
        onClose={() => setDialog({ open: false, record: null })}
        onSave={onSaveDispatch}
      />
    </Box>
  )
}

function MeasurementsPage({ data, canEdit, onSaveMeasurement, onDeleteMeasurement }) {
  const [dialog, setDialog] = useState({ open: false, record: null })
  const tankOptions = data.tanks.map((tank) => ({
    value: tank.tankId,
    label: `${tank.tankNumber} · ${productLabel(data, tank.productId)}`,
  }))

  const fields = [
    { name: 'tankId', label: 'Резервуар', type: 'select', required: true, options: tankOptions },
    {
      name: 'measuredAt',
      label: 'Дата и время замера',
      type: 'datetime-local',
      required: true,
      defaultValue: nowDateTimeInput(),
      formatValue: (value) => toDateTimeInput(value),
    },
    { name: 'volumeLiters', label: 'Объем, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'note', label: 'Примечание', multiline: true, fullWidth: true },
  ]

  const columns = [
    { id: 'measuredAt', label: 'Дата и время', value: (row) => row.measuredAt, render: (row) => formatDateTime(row.measuredAt) },
    { id: 'tankId', label: 'Резервуар', value: (row) => tankLabel(data, row.tankId), render: (row) => tankLabel(data, row.tankId) },
    { id: 'volumeLiters', label: 'Объем', numeric: true, value: (row) => toNumber(row.volumeLiters), render: (row) => formatLiters(row.volumeLiters) },
    { id: 'userId', label: 'Замерил', value: (row) => userLabel(data, row.userId), render: (row) => userLabel(data, row.userId) },
    { id: 'note', label: 'Примечание', minWidth: 180 },
  ]

  return (
    <Box>
      <PageHeader title="Журнал замеров" description="Контрольные замеры резервуаров для сверки суточного баланса и потерь." />
      <CrudTable
        title="Замеры резервуаров"
        rows={data.tankMeasurements}
        columns={columns}
        getRowId={(row) => row.tankMeasurementsId}
        canEdit={canEdit}
        onAdd={() => setDialog({ open: true, record: null })}
        onEdit={(record) => setDialog({ open: true, record })}
        onDelete={onDeleteMeasurement}
        addLabel="Замер"
      />
      <RecordDialog
        key={dialog.open ? `measurement-${dialog.record?.tankMeasurementsId ?? 'new'}` : 'measurement-closed'}
        open={dialog.open}
        title={dialog.record ? 'Редактировать замер' : 'Новый замер'}
        record={dialog.record}
        fields={fields}
        onClose={() => setDialog({ open: false, record: null })}
        onSave={onSaveMeasurement}
      />
    </Box>
  )
}

function buildDailyReportRows(data, date, tankFilter) {
  const tanks = tankFilter === 'all' ? data.tanks : data.tanks.filter((tank) => Number(tank.tankId) === Number(tankFilter))
  return tanks.map((tank) => {
    const manual = data.dailyBalances.find((balance) => balance.balanceDate === date && Number(balance.tankId) === Number(tank.tankId))
    const totalReceived = data.wagonReceipts
      .filter((receipt) => receipt.receiptDate === date && Number(receipt.tankId) === Number(tank.tankId))
      .reduce((sum, receipt) => sum + toNumber(receipt.volumeActualLiters), 0)
    const totalDispatched = data.dispatches
      .filter((dispatch) => dispatch.dispatchDate === date && Number(dispatch.tankId) === Number(tank.tankId))
      .reduce((sum, dispatch) => sum + toNumber(dispatch.volumeInvoiceLiters), 0)
    const sameDayMeasurements = data.tankMeasurements
      .filter((measurement) => measurement.measuredAt.slice(0, 10) === date && Number(measurement.tankId) === Number(tank.tankId))
      .sort((left, right) => right.measuredAt.localeCompare(left.measuredAt))
    const closingActual = manual?.closingVolumeActual ?? sameDayMeasurements[0]?.volumeLiters ?? tank.currentVolumeLiters
    const opening = manual?.openingVolume ?? toNumber(closingActual) - totalReceived + totalDispatched
    const closingCalculated = manual?.closingVolumeCalculated ?? opening + totalReceived - totalDispatched
    const loss = manual?.lossLiters ?? closingCalculated - toNumber(closingActual)
    return {
      id: `${date}-${tank.tankId}`,
      balanceDate: date,
      tankId: tank.tankId,
      openingVolume: opening,
      totalReceived,
      totalDispatched,
      closingVolumeCalculated: closingCalculated,
      closingVolumeActual: closingActual,
      lossLiters: loss,
    }
  })
}

function buildTurnoverRows(data, from, to, productFilter) {
  return data.products
    .filter((product) => productFilter === 'all' || Number(product.productId) === Number(productFilter))
    .map((product) => {
      const productTanks = data.tanks.filter((tank) => Number(tank.productId) === Number(product.productId))
      const tankIds = new Set(productTanks.map((tank) => Number(tank.tankId)))
      const received = data.wagonReceipts
        .filter((receipt) => Number(receipt.productId) === Number(product.productId) && dateInRange(receipt.receiptDate, from, to))
        .reduce((sum, receipt) => sum + toNumber(receipt.volumeActualLiters), 0)
      const dispatched = data.dispatches
        .filter((dispatch) => tankIds.has(Number(dispatch.tankId)) && dateInRange(dispatch.dispatchDate, from, to))
        .reduce((sum, dispatch) => sum + toNumber(dispatch.volumeInvoiceLiters), 0)
      const discrepancy = data.wagonReceipts
        .filter((receipt) => Number(receipt.productId) === Number(product.productId) && dateInRange(receipt.receiptDate, from, to))
        .reduce((sum, receipt) => sum + toNumber(receipt.discrepancyLiters), 0)
      const stock = productTanks.reduce((sum, tank) => sum + toNumber(tank.currentVolumeLiters), 0)
      return {
        productId: product.productId,
        productName: product.name,
        received,
        dispatched,
        discrepancy,
        stock,
        tankCount: productTanks.length,
      }
    })
}

function exportCsv(filename, rows, columns) {
  const escapeCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`
  const header = columns.map((column) => escapeCell(column.label)).join(';')
  const body = rows
    .map((row) =>
      columns
        .map((column) => escapeCell(column.exportValue ? column.exportValue(row) : getColumnValue(row, column)))
        .join(';'),
    )
    .join('\n')
  const csv = `\uFEFF${header}\n${body}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function ReportsPage({ data, canEdit, onSaveBalance, onDeleteBalance }) {
  const [filters, setFilters] = useState({
    date: todayInput(),
    tankId: 'all',
    from: firstDayOfMonthInput(),
    to: todayInput(),
    productId: 'all',
  })
  const [dialog, setDialog] = useState({ open: false, record: null })
  const tankOptions = [
    { value: 'all', label: 'Все резервуары' },
    ...data.tanks.map((tank) => ({ value: tank.tankId, label: `${tank.tankNumber} · ${productLabel(data, tank.productId)}` })),
  ]
  const productOptions = [
    { value: 'all', label: 'Все продукты' },
    ...data.products.map((product) => ({ value: product.productId, label: product.name })),
  ]

  const dailyRows = buildDailyReportRows(data, filters.date, filters.tankId)
  const turnoverRows = buildTurnoverRows(data, filters.from, filters.to, filters.productId)
  const lossRows = data.wagonReceipts
    .filter(
      (receipt) =>
        dateInRange(receipt.receiptDate, filters.from, filters.to) &&
        isReceiptOverNorm(receipt, data.settings.naturalLossPercent) &&
        (filters.productId === 'all' || Number(receipt.productId) === Number(filters.productId)),
    )
    .map((receipt) => ({
      ...receipt,
      percent: discrepancyPercent(receipt),
    }))

  const dailyColumns = [
    { id: 'balanceDate', label: 'Дата', render: (row) => formatDate(row.balanceDate) },
    { id: 'tankId', label: 'Резервуар', value: (row) => tankLabel(data, row.tankId), render: (row) => tankLabel(data, row.tankId) },
    { id: 'openingVolume', label: 'Начало', numeric: true, render: (row) => formatLiters(row.openingVolume) },
    { id: 'totalReceived', label: 'Приход', numeric: true, render: (row) => formatLiters(row.totalReceived) },
    { id: 'totalDispatched', label: 'Расход', numeric: true, render: (row) => formatLiters(row.totalDispatched) },
    { id: 'closingVolumeCalculated', label: 'Расчетный конец', numeric: true, render: (row) => formatLiters(row.closingVolumeCalculated) },
    { id: 'closingVolumeActual', label: 'Фактический конец', numeric: true, render: (row) => formatLiters(row.closingVolumeActual) },
    { id: 'lossLiters', label: 'Потери', numeric: true, render: (row) => formatLiters(row.lossLiters) },
  ]
  const turnoverColumns = [
    { id: 'productName', label: 'Продукт' },
    { id: 'received', label: 'Приход', numeric: true, render: (row) => formatLiters(row.received) },
    { id: 'dispatched', label: 'Расход', numeric: true, render: (row) => formatLiters(row.dispatched) },
    { id: 'discrepancy', label: 'Расхождение прихода', numeric: true, render: (row) => formatLiters(row.discrepancy) },
    { id: 'stock', label: 'Текущий остаток', numeric: true, render: (row) => formatLiters(row.stock) },
    { id: 'tankCount', label: 'Резервуаров', numeric: true },
  ]
  const lossColumns = [
    { id: 'receiptDate', label: 'Дата', render: (row) => formatDate(row.receiptDate) },
    { id: 'wagonNumber', label: 'Вагон' },
    { id: 'productId', label: 'Продукт', value: (row) => productLabel(data, row.productId), render: (row) => productLabel(data, row.productId) },
    { id: 'tankId', label: 'Резервуар', value: (row) => tankLabel(data, row.tankId), render: (row) => tankLabel(data, row.tankId) },
    { id: 'discrepancyLiters', label: 'Расхождение', numeric: true, render: (row) => formatLiters(row.discrepancyLiters) },
    { id: 'percent', label: 'Процент', numeric: true, render: (row) => `${formatNumber(row.percent, 2)}%` },
  ]

  const balanceFields = [
    { name: 'balanceDate', label: 'Дата баланса', type: 'date', required: true, defaultValue: todayInput() },
    { name: 'tankId', label: 'Резервуар', type: 'select', required: true, options: tankOptions.filter((option) => option.value !== 'all') },
    { name: 'openingVolume', label: 'Остаток на начало, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'totalReceived', label: 'Приход за день, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'totalDispatched', label: 'Расход за день, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
    { name: 'closingVolumeActual', label: 'Фактический остаток, л', type: 'number', required: true, inputProps: { min: 0, step: 1 } },
  ]

  return (
    <Box>
      <PageHeader title="Отчеты" description="Суточный баланс, оборотная ведомость по продуктам и контроль потерь." />

      <Paper className="section-panel" variant="outlined">
        <Typography variant="h6">Фильтры отчетов</Typography>
        <Box className="filters-grid">
          <TextField
            label="Дата баланса"
            type="date"
            value={filters.date}
            onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Резервуар"
            value={filters.tankId}
            onChange={(event) => setFilters((current) => ({ ...current, tankId: event.target.value }))}
          >
            {tankOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Период с"
            type="date"
            value={filters.from}
            onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Период по"
            type="date"
            value={filters.to}
            onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Продукт"
            value={filters.productId}
            onChange={(event) => setFilters((current) => ({ ...current, productId: event.target.value }))}
          >
            {productOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>

      <CrudTable
        title="Суточный баланс"
        description="Расчет: opening + received - dispatched; фактический остаток берется из ручного баланса или последнего замера дня."
        rows={dailyRows}
        columns={dailyColumns}
        getRowId={(row) => row.id}
        extraActions={
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => exportCsv('daily-balance.csv', dailyRows, dailyColumns)}>
            Excel
          </Button>
        }
      />

      <CrudTable
        title="Оборотная ведомость"
        rows={turnoverRows}
        columns={turnoverColumns}
        getRowId={(row) => row.productId}
        extraActions={
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => exportCsv('turnover.csv', turnoverRows, turnoverColumns)}>
            Excel
          </Button>
        }
      />

      <CrudTable
        title="Отчет по потерям"
        description={`Показываются приходы с расхождением выше ${formatNumber(data.settings.naturalLossPercent, 2)}%.`}
        rows={lossRows}
        columns={lossColumns}
        getRowId={(row) => row.wagonReceiptId}
        emptyText="Превышений нормы за выбранный период нет"
        extraActions={
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => exportCsv('losses.csv', lossRows, lossColumns)}>
            Excel
          </Button>
        }
      />

      <CrudTable
        title="Ручной журнал суточных балансов"
        description="Записи этого журнала могут переопределять расчетные значения в отчете."
        rows={data.dailyBalances}
        columns={dailyColumns}
        getRowId={(row) => row.dailyBalanceId}
        canEdit={canEdit}
        onAdd={() => setDialog({ open: true, record: null })}
        onEdit={(record) => setDialog({ open: true, record })}
        onDelete={onDeleteBalance}
        addLabel="Баланс"
      />

      <RecordDialog
        key={dialog.open ? `balance-${dialog.record?.dailyBalanceId ?? 'new'}` : 'balance-closed'}
        open={dialog.open}
        title={dialog.record ? 'Редактировать баланс' : 'Новый суточный баланс'}
        record={dialog.record}
        fields={balanceFields}
        onClose={() => setDialog({ open: false, record: null })}
        onSave={onSaveBalance}
      />
    </Box>
  )
}

function AdminPage({ data, currentUser, onSaveUser, onDeleteUser, onSaveProduct, onDeleteProduct, onSaveSettings }) {
  const [userDialog, setUserDialog] = useState({ open: false, record: null })
  const [productDialog, setProductDialog] = useState({ open: false, record: null })
  const [lossPercent, setLossPercent] = useState(data.settings.naturalLossPercent)

  const userFields = [
    { name: 'fullName', label: 'ФИО', required: true },
    { name: 'login', label: 'Логин', required: true },
    { name: 'passwordHash', label: 'Пароль', required: true, helperText: 'Для демо хранится в открытом виде на фронте.' },
    { name: 'roleName', label: 'Роль', type: 'select', required: true, options: ROLE_OPTIONS },
  ]
  const productFields = [
    { name: 'name', label: 'Название продукта', required: true },
    { name: 'density', label: 'Плотность', type: 'number', required: true, inputProps: { min: 0, step: 0.001 } },
  ]

  const userColumns = [
    { id: 'fullName', label: 'ФИО' },
    { id: 'login', label: 'Логин' },
    { id: 'roleName', label: 'Роль', value: (row) => roleLabel(row.roleName), render: (row) => <RoleChip role={row.roleName} /> },
  ]
  const productColumns = [
    { id: 'name', label: 'Продукт' },
    { id: 'density', label: 'Плотность', numeric: true, render: (row) => formatDensity(row.density) },
  ]
  const auditColumns = [
    { id: 'createdAt', label: 'Когда', value: (row) => row.createdAt, render: (row) => formatDateTime(row.createdAt) },
    { id: 'userName', label: 'Пользователь' },
    { id: 'entity', label: 'Раздел' },
    { id: 'action', label: 'Действие', minWidth: 240 },
  ]

  return (
    <Box>
      <PageHeader title="Администратор" description="Пользователи, роли, справочники и настройки бизнес-контроля." />

      <Paper className="section-panel" variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} justifyContent="space-between">
          <Box>
            <Typography variant="h6">Настройки контроля</Typography>
            <Typography color="text.secondary">Норма естественной убыли применяется к приходам вагонов и отчету по потерям.</Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <TextField
              label="Норма, %"
              type="number"
              size="small"
              value={lossPercent}
              onChange={(event) => setLossPercent(event.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
            />
            <Button variant="contained" startIcon={<TuneIcon />} onClick={() => onSaveSettings({ naturalLossPercent: toNumber(lossPercent) })}>
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <CrudTable
        title="Пользователи и роли"
        rows={data.users}
        columns={userColumns}
        getRowId={(row) => row.userId}
        canEdit
        onAdd={() => setUserDialog({ open: true, record: null })}
        onEdit={(record) => setUserDialog({ open: true, record })}
        onDelete={(record) => onDeleteUser(record, currentUser)}
        addLabel="Пользователь"
      />

      <CrudTable
        title="Нефтепродукты"
        rows={data.products}
        columns={productColumns}
        getRowId={(row) => row.productId}
        canEdit
        onAdd={() => setProductDialog({ open: true, record: null })}
        onEdit={(record) => setProductDialog({ open: true, record })}
        onDelete={onDeleteProduct}
        addLabel="Продукт"
      />

      <CrudTable
        title="Журнал операций"
        description="Локальный аудит действий пользователя во фронтенде."
        rows={data.auditLog ?? []}
        columns={auditColumns}
        getRowId={(row) => row.id}
        emptyText="Операций пока нет"
      />

      <RecordDialog
        key={userDialog.open ? `user-${userDialog.record?.userId ?? 'new'}` : 'user-closed'}
        open={userDialog.open}
        title={userDialog.record ? 'Редактировать пользователя' : 'Новый пользователь'}
        record={userDialog.record}
        fields={userFields}
        onClose={() => setUserDialog({ open: false, record: null })}
        onSave={onSaveUser}
      />
      <RecordDialog
        key={productDialog.open ? `product-${productDialog.record?.productId ?? 'new'}` : 'product-closed'}
        open={productDialog.open}
        title={productDialog.record ? 'Редактировать продукт' : 'Новый продукт'}
        record={productDialog.record}
        fields={productFields}
        onClose={() => setProductDialog({ open: false, record: null })}
        onSave={onSaveProduct}
      />
    </Box>
  )
}

function App() {
  const [data, setData] = useState(loadInitialData)
  const [currentUserId, setCurrentUserId] = useState(() => Number(localStorage.getItem(SESSION_KEY)) || null)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [toast, setToast] = useState(null)

  const currentUser = useMemo(() => data.users.find((user) => Number(user.userId) === Number(currentUserId)) ?? null, [currentUserId, data.users])
  const canEdit = currentUser && currentUser.roleName !== 'manager'
  const effectiveSection = activeSection === 'admin' && currentUser?.roleName !== 'admin' ? 'dashboard' : activeSection



  const notify = (message, severity = 'success') => {
    setToast({ message, severity })
  }

  const commit = (updater, action, entity) => {
    setData((previous) => {
      const next = updater(previous)
      if (!next) return previous
      return withAudit(next, currentUser, action, entity)
    })
  }

  const handleSaveProduct = (values, previous) => {
    const name = String(values.name ?? '').trim()
    const density = toNumber(values.density)
    if (!name) return notify('Укажите название продукта', 'error'), false
    if (density <= 0) return notify('Плотность должна быть больше нуля', 'error'), false

    commit(
      (state) => {
        const record = {
          productId: previous?.productId ?? getNextId(state.products, 'productId'),
          name,
          density,
        }
        const products = previous
          ? state.products.map((product) => (Number(product.productId) === Number(previous.productId) ? record : product))
          : [record, ...state.products]
        return { ...state, products }
      },
      previous ? `Обновлен продукт ${name}` : `Создан продукт ${name}`,
      'products',
    )
    notify('Продукт сохранен')
    return true
  }

  const handleDeleteProduct = (record) => {
    if (data.tanks.some((tank) => Number(tank.productId) === Number(record.productId))) {
      notify('Нельзя удалить продукт, который используется в резервуарах', 'error')
      return
    }
    if (!window.confirm(`Удалить продукт "${record.name}"?`)) return
    commit(
      (state) => ({ ...state, products: state.products.filter((product) => Number(product.productId) !== Number(record.productId)) }),
      `Удален продукт ${record.name}`,
      'products',
    )
    notify('Продукт удален')
  }

  const handleSaveTank = (values, previous) => {
    const tankNumber = String(values.tankNumber ?? '').trim()
    const productId = Number(values.productId)
    const capacityLiters = toNumber(values.capacityLiters)
    const currentVolumeLiters = toNumber(values.currentVolumeLiters)
    if (!tankNumber) return notify('Укажите номер резервуара', 'error'), false
    if (!findProduct(data, productId)) return notify('Выберите продукт', 'error'), false
    if (capacityLiters <= 0) return notify('Вместимость должна быть больше нуля', 'error'), false
    if (currentVolumeLiters < 0 || currentVolumeLiters > capacityLiters) {
      return notify('Остаток должен быть в диапазоне от 0 до вместимости', 'error'), false
    }
    const hasHistory =
      previous &&
      (data.wagonReceipts.some((receipt) => Number(receipt.tankId) === Number(previous.tankId)) ||
        data.dispatches.some((dispatch) => Number(dispatch.tankId) === Number(previous.tankId)))
    if (hasHistory && Number(previous.productId) !== productId) {
      return notify('Нельзя сменить продукт у резервуара с историей движения', 'error'), false
    }

    commit(
      (state) => {
        const record = {
          tankId: previous?.tankId ?? getNextId(state.tanks, 'tankId'),
          tankNumber,
          productId,
          capacityLiters,
          currentVolumeLiters,
        }
        const tanks = previous
          ? state.tanks.map((tank) => (Number(tank.tankId) === Number(previous.tankId) ? record : tank))
          : [record, ...state.tanks]
        return { ...state, tanks }
      },
      previous ? `Обновлен резервуар ${tankNumber}` : `Создан резервуар ${tankNumber}`,
      'tanks',
    )
    notify('Резервуар сохранен')
    return true
  }

  const handleDeleteTank = (record) => {
    const hasHistory =
      data.wagonReceipts.some((receipt) => Number(receipt.tankId) === Number(record.tankId)) ||
      data.dispatches.some((dispatch) => Number(dispatch.tankId) === Number(record.tankId)) ||
      data.tankMeasurements.some((measurement) => Number(measurement.tankId) === Number(record.tankId)) ||
      data.dailyBalances.some((balance) => Number(balance.tankId) === Number(record.tankId))
    if (hasHistory) {
      notify('Нельзя удалить резервуар с операциями или замерами', 'error')
      return
    }
    if (!window.confirm(`Удалить резервуар ${record.tankNumber}?`)) return
    commit(
      (state) => ({ ...state, tanks: state.tanks.filter((tank) => Number(tank.tankId) !== Number(record.tankId)) }),
      `Удален резервуар ${record.tankNumber}`,
      'tanks',
    )
    notify('Резервуар удален')
  }

  const handleSaveUser = (values, previous) => {
    const fullName = String(values.fullName ?? '').trim()
    const login = String(values.login ?? '').trim()
    const passwordHash = String(values.passwordHash ?? '').trim()
    const roleName = String(values.roleName ?? '').trim()
    if (!fullName || !login || !passwordHash || !roleName) return notify('Заполните все поля пользователя', 'error'), false
    const duplicate = data.users.some(
      (user) => user.login === login && Number(user.userId) !== Number(previous?.userId ?? 0),
    )
    if (duplicate) return notify('Пользователь с таким логином уже есть', 'error'), false

    commit(
      (state) => {
        const record = {
          userId: previous?.userId ?? getNextId(state.users, 'userId'),
          fullName,
          login,
          passwordHash,
          roleName,
        }
        const users = previous
          ? state.users.map((user) => (Number(user.userId) === Number(previous.userId) ? record : user))
          : [record, ...state.users]
        return { ...state, users }
      },
      previous ? `Обновлен пользователь ${fullName}` : `Создан пользователь ${fullName}`,
      'users',
    )
    notify('Пользователь сохранен')
    return true
  }

  const handleDeleteUser = (record) => {
    if (Number(record.userId) === Number(currentUserId)) {
      notify('Нельзя удалить текущего пользователя', 'error')
      return
    }
    const hasHistory =
      data.wagonReceipts.some((receipt) => Number(receipt.userId) === Number(record.userId)) ||
      data.dispatches.some((dispatch) => Number(dispatch.userId) === Number(record.userId)) ||
      data.tankMeasurements.some((measurement) => Number(measurement.userId) === Number(record.userId))
    if (hasHistory) {
      notify('Нельзя удалить пользователя с операциями в журналах', 'error')
      return
    }
    if (!window.confirm(`Удалить пользователя ${record.fullName}?`)) return
    commit(
      (state) => ({ ...state, users: state.users.filter((user) => Number(user.userId) !== Number(record.userId)) }),
      `Удален пользователь ${record.fullName}`,
      'users',
    )
    notify('Пользователь удален')
  }

  const handleSaveReceipt = (values, previous) => {
    const wagonNumber = String(values.wagonNumber ?? '').trim()
    const receiptDate = values.receiptDate || todayInput()
    const productId = Number(values.productId)
    const tankId = Number(values.tankId)
    const volumeInvoiceLiters = toNumber(values.volumeInvoiceLiters)
    const volumeActualLiters = toNumber(values.volumeActualLiters)
    const waybillNumber = String(values.waybillNumber ?? '').trim()
    const tank = findTank(data, tankId)
    if (!wagonNumber || !waybillNumber) return notify('Укажите номер вагона и накладной', 'error'), false
    if (!findProduct(data, productId) || !tank) return notify('Выберите продукт и резервуар', 'error'), false
    if (Number(tank.productId) !== productId) return notify('Продукт прихода должен совпадать с продуктом резервуара', 'error'), false
    if (volumeInvoiceLiters <= 0 || volumeActualLiters <= 0) return notify('Объемы должны быть больше нуля', 'error'), false

    const targetFinal =
      toNumber(tank.currentVolumeLiters) - (previous && Number(previous.tankId) === tankId ? toNumber(previous.volumeActualLiters) : 0) + volumeActualLiters
    if (targetFinal > toNumber(tank.capacityLiters)) {
      return notify('После прихода резервуар превысит вместимость', 'error'), false
    }
    if (previous && Number(previous.tankId) !== tankId) {
      const oldTank = findTank(data, previous.tankId)
      if (oldTank && toNumber(oldTank.currentVolumeLiters) - toNumber(previous.volumeActualLiters) < 0) {
        return notify('Редактирование приведет к отрицательному остатку старого резервуара', 'error'), false
      }
    }

    const record = {
      wagonReceiptId: previous?.wagonReceiptId,
      wagonNumber,
      receiptDate,
      productId,
      tankId,
      volumeInvoiceLiters,
      volumeActualLiters,
      discrepancyLiters: volumeInvoiceLiters - volumeActualLiters,
      waybillNumber,
      userId: currentUser.userId,
      createdAt: previous?.createdAt ?? new Date().toISOString(),
    }

    commit(
      (state) => {
        const saved = { ...record, wagonReceiptId: previous?.wagonReceiptId ?? getNextId(state.wagonReceipts, 'wagonReceiptId') }
        const tanks = state.tanks.map((item) => {
          let delta = 0
          if (previous && Number(item.tankId) === Number(previous.tankId)) delta -= toNumber(previous.volumeActualLiters)
          if (Number(item.tankId) === tankId) delta += volumeActualLiters
          return delta ? { ...item, currentVolumeLiters: clampVolume(toNumber(item.currentVolumeLiters) + delta) } : item
        })
        const wagonReceipts = previous
          ? state.wagonReceipts.map((receipt) => (Number(receipt.wagonReceiptId) === Number(previous.wagonReceiptId) ? saved : receipt))
          : [saved, ...state.wagonReceipts]
        return { ...state, tanks, wagonReceipts }
      },
      previous ? `Обновлен приход вагона ${wagonNumber}` : `Создан приход вагона ${wagonNumber}`,
      'wagonReceipts',
    )
    notify(isReceiptOverNorm(record, data.settings.naturalLossPercent) ? 'Приход сохранен, есть предупреждение по расхождению' : 'Приход сохранен')
    return true
  }

  const handleDeleteReceipt = (record) => {
    const tank = findTank(data, record.tankId)
    if (tank && toNumber(tank.currentVolumeLiters) - toNumber(record.volumeActualLiters) < 0) {
      notify('Удаление прихода приведет к отрицательному остатку резервуара', 'error')
      return
    }
    if (!window.confirm(`Удалить приход вагона ${record.wagonNumber}?`)) return
    commit(
      (state) => ({
        ...state,
        tanks: state.tanks.map((item) =>
          Number(item.tankId) === Number(record.tankId)
            ? { ...item, currentVolumeLiters: clampVolume(toNumber(item.currentVolumeLiters) - toNumber(record.volumeActualLiters)) }
            : item,
        ),
        wagonReceipts: state.wagonReceipts.filter((receipt) => Number(receipt.wagonReceiptId) !== Number(record.wagonReceiptId)),
      }),
      `Удален приход вагона ${record.wagonNumber}`,
      'wagonReceipts',
    )
    notify('Приход удален')
  }

  const handleSaveDispatch = (values, previous) => {
    const dispatchDate = values.dispatchDate || todayInput()
    const tankId = Number(values.tankId)
    const truckNumber = String(values.truckNumber ?? '').trim()
    const driverName = String(values.driverName ?? '').trim()
    const recipientOrg = String(values.recipientOrg ?? '').trim()
    const volumeInvoiceLiters = toNumber(values.volumeInvoiceLiters)
    const waybillNumber = String(values.waybillNumber ?? '').trim()
    const tank = findTank(data, tankId)
    if (!tank) return notify('Выберите резервуар', 'error'), false
    if (!truckNumber || !driverName || !recipientOrg || !waybillNumber) return notify('Заполните данные отпуска', 'error'), false
    if (volumeInvoiceLiters <= 0) return notify('Объем отпуска должен быть больше нуля', 'error'), false

    const available =
      toNumber(tank.currentVolumeLiters) + (previous && Number(previous.tankId) === tankId ? toNumber(previous.volumeInvoiceLiters) : 0)
    if (volumeInvoiceLiters > available) {
      return notify(`Недостаточно остатка: доступно ${formatLiters(available)}`, 'error'), false
    }

    const record = {
      dispatchId: previous?.dispatchId,
      dispatchDate,
      tankId,
      truckNumber,
      driverName,
      recipientOrg,
      volumeInvoiceLiters,
      waybillNumber,
      userId: currentUser.userId,
      createdAt: previous?.createdAt ?? new Date().toISOString(),
    }

    commit(
      (state) => {
        const saved = { ...record, dispatchId: previous?.dispatchId ?? getNextId(state.dispatches, 'dispatchId') }
        const tanks = state.tanks.map((item) => {
          let delta = 0
          if (previous && Number(item.tankId) === Number(previous.tankId)) delta += toNumber(previous.volumeInvoiceLiters)
          if (Number(item.tankId) === tankId) delta -= volumeInvoiceLiters
          return delta ? { ...item, currentVolumeLiters: clampVolume(toNumber(item.currentVolumeLiters) + delta) } : item
        })
        const dispatches = previous
          ? state.dispatches.map((dispatch) => (Number(dispatch.dispatchId) === Number(previous.dispatchId) ? saved : dispatch))
          : [saved, ...state.dispatches]
        return { ...state, tanks, dispatches }
      },
      previous ? `Обновлен отпуск ${truckNumber}` : `Создан отпуск ${truckNumber}`,
      'dispatches',
    )
    notify('Отпуск сохранен')
    return true
  }

  const handleDeleteDispatch = (record) => {
    const tank = findTank(data, record.tankId)
    if (tank && toNumber(tank.currentVolumeLiters) + toNumber(record.volumeInvoiceLiters) > toNumber(tank.capacityLiters)) {
      notify('Удаление отпуска превысит вместимость резервуара', 'error')
      return
    }
    if (!window.confirm(`Удалить отпуск ${record.truckNumber}?`)) return
    commit(
      (state) => ({
        ...state,
        tanks: state.tanks.map((item) =>
          Number(item.tankId) === Number(record.tankId)
            ? { ...item, currentVolumeLiters: clampVolume(toNumber(item.currentVolumeLiters) + toNumber(record.volumeInvoiceLiters)) }
            : item,
        ),
        dispatches: state.dispatches.filter((dispatch) => Number(dispatch.dispatchId) !== Number(record.dispatchId)),
      }),
      `Удален отпуск ${record.truckNumber}`,
      'dispatches',
    )
    notify('Отпуск удален')
  }

  const handleSaveMeasurement = (values, previous) => {
    const tankId = Number(values.tankId)
    const volumeLiters = toNumber(values.volumeLiters)
    const tank = findTank(data, tankId)
    if (!tank) return notify('Выберите резервуар', 'error'), false
    if (volumeLiters < 0 || volumeLiters > toNumber(tank.capacityLiters)) {
      return notify('Замер должен быть в диапазоне от 0 до вместимости резервуара', 'error'), false
    }

    commit(
      (state) => {
        const record = {
          tankMeasurementsId: previous?.tankMeasurementsId ?? getNextId(state.tankMeasurements, 'tankMeasurementsId'),
          tankId,
          measuredAt: fromDateTimeInput(values.measuredAt),
          volumeLiters,
          userId: currentUser.userId,
          note: String(values.note ?? '').trim(),
        }
        const tankMeasurements = previous
          ? state.tankMeasurements.map((measurement) =>
              Number(measurement.tankMeasurementsId) === Number(previous.tankMeasurementsId) ? record : measurement,
            )
          : [record, ...state.tankMeasurements]
        return { ...state, tankMeasurements }
      },
      previous ? `Обновлен замер ${tank.tankNumber}` : `Создан замер ${tank.tankNumber}`,
      'tankMeasurements',
    )
    notify('Замер сохранен')
    return true
  }

  const handleDeleteMeasurement = (record) => {
    if (!window.confirm('Удалить замер?')) return
    commit(
      (state) => ({
        ...state,
        tankMeasurements: state.tankMeasurements.filter(
          (measurement) => Number(measurement.tankMeasurementsId) !== Number(record.tankMeasurementsId),
        ),
      }),
      `Удален замер ${tankLabel(data, record.tankId)}`,
      'tankMeasurements',
    )
    notify('Замер удален')
  }

  const handleSaveBalance = (values, previous) => {
    const tankId = Number(values.tankId)
    const tank = findTank(data, tankId)
    if (!tank) return notify('Выберите резервуар', 'error'), false
    const openingVolume = toNumber(values.openingVolume)
    const totalReceived = toNumber(values.totalReceived)
    const totalDispatched = toNumber(values.totalDispatched)
    const closingVolumeActual = toNumber(values.closingVolumeActual)
    if ([openingVolume, totalReceived, totalDispatched, closingVolumeActual].some((value) => value < 0)) {
      return notify('Значения баланса не могут быть отрицательными', 'error'), false
    }
    const closingVolumeCalculated = openingVolume + totalReceived - totalDispatched
    const lossLiters = closingVolumeCalculated - closingVolumeActual

    commit(
      (state) => {
        const record = {
          dailyBalanceId: previous?.dailyBalanceId ?? getNextId(state.dailyBalances, 'dailyBalanceId'),
          balanceDate: values.balanceDate || todayInput(),
          tankId,
          openingVolume,
          totalReceived,
          totalDispatched,
          closingVolumeCalculated,
          closingVolumeActual,
          lossLiters,
        }
        const dailyBalances = previous
          ? state.dailyBalances.map((balance) => (Number(balance.dailyBalanceId) === Number(previous.dailyBalanceId) ? record : balance))
          : [record, ...state.dailyBalances]
        return { ...state, dailyBalances }
      },
      previous ? `Обновлен суточный баланс ${tank.tankNumber}` : `Создан суточный баланс ${tank.tankNumber}`,
      'dailyBalances',
    )
    notify('Баланс сохранен')
    return true
  }

  const handleDeleteBalance = (record) => {
    if (!window.confirm('Удалить суточный баланс?')) return
    commit(
      (state) => ({
        ...state,
        dailyBalances: state.dailyBalances.filter((balance) => Number(balance.dailyBalanceId) !== Number(record.dailyBalanceId)),
      }),
      `Удален суточный баланс ${tankLabel(data, record.tankId)}`,
      'dailyBalances',
    )
    notify('Баланс удален')
  }

  const handleSaveSettings = (settings) => {
    if (settings.naturalLossPercent < 0) {
      notify('Норма не может быть отрицательной', 'error')
      return
    }
    commit(
      (state) => ({ ...state, settings: { ...state.settings, naturalLossPercent: settings.naturalLossPercent } }),
      `Изменена норма естественной убыли: ${formatNumber(settings.naturalLossPercent, 2)}%`,
      'settings',
    )
    notify('Настройки сохранены')
  }

  const renderSection = () => {
    switch (effectiveSection) {
      case 'tanks':
        return <TanksPage data={data} canEdit={canEdit} onSaveTank={handleSaveTank} onDeleteTank={handleDeleteTank} />
      case 'receipts':
        return <ReceiptsPage data={data} canEdit={canEdit} onSaveReceipt={handleSaveReceipt} onDeleteReceipt={handleDeleteReceipt} />
      case 'dispatches':
        return <DispatchesPage data={data} canEdit={canEdit} onSaveDispatch={handleSaveDispatch} onDeleteDispatch={handleDeleteDispatch} />
      case 'measurements':
        return (
          <MeasurementsPage
            data={data}
            canEdit={canEdit}
            onSaveMeasurement={handleSaveMeasurement}
            onDeleteMeasurement={handleDeleteMeasurement}
          />
        )
      case 'reports':
        return <ReportsPage data={data} canEdit={canEdit} onSaveBalance={handleSaveBalance} onDeleteBalance={handleDeleteBalance} />
      case 'admin':
        return currentUser?.roleName === 'admin' ? (
          <AdminPage
            data={data}
            currentUser={currentUser}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onSaveSettings={handleSaveSettings}
          />
        ) : (
          <DashboardPage data={data} />
        )
      default:
        return <DashboardPage data={data} />
    }
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {!currentUser ? (
        <LoginPage users={data.users} onLogin={(user) => setCurrentUserId(user.userId)} />
      ) : (
        <AppShell
          currentUser={currentUser}
          activeSection={effectiveSection}
          onSectionChange={setActiveSection}
          onLogout={() => setCurrentUserId(null)}
        >
          {renderSection()}
        </AppShell>
      )}
      <Snackbar open={Boolean(toast)} autoHideDuration={3500} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>
            {toast.message}
          </Alert>
        ) : null}
      </Snackbar>
    </ThemeProvider>
  )
}

export default App
