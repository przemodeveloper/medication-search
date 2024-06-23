import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination } from "@mui/material";
import TablePaginationControls from "./TablePaginationControls";
import { Row } from "../models";
import ErrorFallback from "./ErrorFallback";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },

  maxWidth: 100,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Brand Name</StyledTableCell>
            <StyledTableCell align="right">Purpose</StyledTableCell>
            <StyledTableCell align="right">Product Type</StyledTableCell>
            <StyledTableCell align="right">Manufacturer name</StyledTableCell>
          </TableRow>
          {error && <ErrorFallback error={error} />}
        </TableHead>

        <TableBody>
          {drugs?.length > 0 &&
            drugs.map((row: Row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <StyledLink to={`/details/${row.product_ndc.toLowerCase()}`}>
                    {row.brand_name}
                  </StyledLink>
                </StyledTableCell>
                <StyledTableCell align="right">{row.purpose}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.product_type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.manufacturer_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {totalResults > 0 && (
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
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.info.dark,
  fontWeight: 600,
}));

export default DrugsListTable;
