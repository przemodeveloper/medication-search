import { TableCell, TableRow, Typography } from "@mui/material";

const ErrorFallback = ({ error }: { error: string }) => {
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default ErrorFallback;
