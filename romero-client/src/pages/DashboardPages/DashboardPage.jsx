import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

const DashboardPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>Welcome! Open Reports or Users from the menu.</Typography>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Card sx={{ flex: 1 }}><CardContent>
        <Typography variant="h6">Reports</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Charts, summary and the Export PDF feature.</Typography>
        <Button component={Link} to="/dashboard/reports" variant="contained">Open Reports</Button>
      </CardContent></Card>
      <Card sx={{ flex: 1 }}><CardContent>
        <Typography variant="h6">Users</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Search, filters, and add or edit users with validation.</Typography>
        <Button component={Link} to="/dashboard/users" variant="contained">Open Users</Button>
      </CardContent></Card>
    </Stack>
  </Box>
);

export default DashboardPage;
