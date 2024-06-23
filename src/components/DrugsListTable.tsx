import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationControls from "../components/TablePaginationControls";
import { TableFooter, TablePagination } from "@mui/material";
import { Row } from "./models";

const DrugsListTable = ({
  drugs,
  rowsPerPage,
  pageQuery,
  handleChangePage,
  handleChangeRowsPerPage,
  totalResults,
}: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Brand Name</TableCell>
            <TableCell align="right">Purpose</TableCell>
            <TableCell align="right">Product Type</TableCell>
            <TableCell align="right">Manufacturer name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drugs.map((row: Row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.brand_name}
              </TableCell>
              <TableCell align="right">{row.purpose}</TableCell>
              <TableCell align="right">{row.product_type}</TableCell>
              <TableCell align="right">{row.manufacturer_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
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
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DrugsListTable;
