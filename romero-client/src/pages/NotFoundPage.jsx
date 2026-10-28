import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h3" gutterBottom>404</Typography>
    <Typography>Page not found. <Link to="/dashboard">Back to dashboard</Link></Typography>
  </Box>
);

export default NotFoundPage;
