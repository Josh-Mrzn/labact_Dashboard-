import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

// ===== ENHANCEMENT 1: data used by the PDF export =====
const monthlyReports = [
    { month: 'January', generated: 18, completed: 12 },
    { month: 'February', generated: 24, completed: 19 },
    { month: 'March', generated: 20, completed: 17 },
    { month: 'April', generated: 27, completed: 23 },
];
const completionRate = 78; // also used by <Gauge value={completionRate} />
const totalGenerated = monthlyReports.reduce((sum, m) => sum + m.generated, 0);
const totalCompleted = monthlyReports.reduce((sum, m) => sum + m.completed, 0);

const buildPrintHtml = ({ headMarkup, exportedAt, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reports Summary</title>
  ${headMarkup}
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 18mm;
      @bottom-center { content: "Page " counter(page) " of " counter(pages); font-size: 10px; color: #6b7280; }
    }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #111827; background: #fff; }
    .banner { background: #1565c0; color: #fff; padding: 22px 26px; border-radius: 8px; margin-bottom: 18px; }
    .banner h1 { margin: 0 0 4px; font-size: 26px; }
    .banner p { margin: 0; font-size: 13px; opacity: .9; }
    .summary { display: flex; gap: 12px; margin-bottom: 18px; }
    .summary div { flex: 1; border: 1px solid #e5e7eb; border-left: 5px solid #1565c0; border-radius: 6px; padding: 12px 14px; }
    .summary span { display: block; font-size: 12px; color: #6b7280; }
    .summary strong { font-size: 24px; }
    h2 { font-size: 16px; margin: 22px 0 8px; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; }
    table.monthly { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 18px; }
    table.monthly th { background: #eff6ff; text-align: left; }
    table.monthly th, table.monthly td { border: 1px solid #e5e7eb; padding: 6px 10px; }
    .report-content .MuiCard-root { box-shadow: none !important; border: 1px solid #e5e7eb; break-inside: avoid; page-break-inside: avoid; }
    .report-content svg { max-width: 100%; }
    .footer { margin-top: 20px; font-size: 11px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <header class="banner">
    <h1>Reports Summary</h1>
    <p>Generated reports, category breakdown, and completion performance</p>
    <p>Prepared on ${exportedAt}</p>
  </header>
  <section class="summary">
    <div><span>Reports generated</span><strong>${totalGenerated}</strong></div>
    <div><span>Reports completed</span><strong>${totalCompleted}</strong></div>
    <div><span>On-time completion</span><strong>${completionRate}%</strong></div>
  </section>
  <h2>Monthly Report Output</h2>
  <table class="monthly">
    <thead><tr><th>Month</th><th>Generated</th><th>Completed</th></tr></thead>
    <tbody>
      ${monthlyReports.map((m) => `<tr><td>${m.month}</td><td>${m.generated}</td><td>${m.completed}</td></tr>`).join('')}
    </tbody>
  </table>
  <h2>Charts and Data</h2>
  <section class="report-content">${content}</section>
  <p class="footer">Reports Summary &middot; ${exportedAt}</p>
</body>
</html>`;


const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        ).map((node) => node.outerHTML).join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(
            buildPrintHtml({ headMarkup, exportedAt, content: printContent.outerHTML })
        );
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500); // wait for charts to render, then "Save as PDF"
    };

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography variant="h4" gutterBottom>Reports</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Report analytics overview showing generated reports, category breakdown, and current completion performance.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                    <Button variant="contained">Generate</Button>
                    <Button variant="outlined" onClick={handlePrint}>Export PDF</Button>
                    <Button variant="outlined">Filter</Button>
                </Stack>
            </Stack>

            <Stack ref={printRef} spacing={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Monthly Report Output</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            This chart compares how many reports were generated and how many were completed across the last four months.
                        </Typography>
                        <BarChart
                            series={[
                                { data: monthlyReports.map((m) => m.generated), label: 'Generated' },
                                { data: monthlyReports.map((m) => m.completed), label: 'Completed' },
                            ]}
                            height={300}
                            xAxis={[{ data: monthlyReports.map((m) => m.month), scaleType: 'band', label: 'Months' }]}
                        />
                    </CardContent>
                </Card>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Report Category Share</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                This chart shows the distribution of report requests by category for the current reporting period.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PieChart
                                    series={[{
                                        data: [
                                            { id: 0, value: 14, label: 'Sales' },
                                            { id: 1, value: 10, label: 'Users' },
                                            { id: 2, value: 8, label: 'Inventory' },
                                            { id: 3, value: 6, label: 'Finance' },
                                        ],
                                    }]}
                                    width={380}
                                    height={220}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Completion Rate</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
                            </Typography>
                            <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Gauge width={180} height={180} value={completionRate} />
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>

                <Card>
                    <CardContent>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            autoHeight
                        />
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
};

export default ReportsPage;
