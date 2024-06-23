import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import TablePaginationControls from "./TablePaginationControls";
import { Row } from "../models";
import ErrorFallback from "./ErrorFallback";
import { Link } from "react-router-dom";

interface DrugsListTableProps {
  drugs: Row[];
  rowsPerPage: number;
  pageQuery: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalResults: number;
  error: string | null;
}

const DrugsListTable = ({
  drugs,
  rowsPerPage,
  pageQuery,
  handleChangePage,
  handleChangeRowsPerPage,
  totalResults,
  error,
}: DrugsListTableProps) => {
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Brand Name</TableCell>
              <TableCell align="right">Purpose</TableCell>
              <TableCell align="right">Product Type</TableCell>
              <TableCell align="right">Manufacturer name</TableCell>
            </TableRow>
            {error && <ErrorFallback error={error} />}
          </TableHead>

          <TableBody>
            {drugs?.length > 0 &&
              drugs.map((row: Row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <StyledLink
                      to={`/details/${row.product_ndc.toLowerCase()}`}
                    >
                      {row.brand_name}
                    </StyledLink>
                  </TableCell>
                  <TableCell align="right">{row.purpose}</TableCell>
                  <TableCell align="right">{row.product_type}</TableCell>
                  <TableCell align="right">{row.manufacturer_name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalResults > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={pageQuery - 1}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationControls}
        />
      )}
    </Paper>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.info.dark,
  fontWeight: 600,
}));

export default DrugsListTable;
