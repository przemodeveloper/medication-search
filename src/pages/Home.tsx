import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { createData } from "../utils/createData";
import { getDrugsList } from "../services/drugs";
import useQueryParams from "../hooks/useQueryParams";
import TablePaginationControls from "../components/TablePaginationControls";

const Home = () => {
  const [drugs, setDrugs] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState<number>(0);

  const { setQueryParam, getQueryParam } = useQueryParams();

  const searchQuery = getQueryParam("search") || "";
  const pageQuery = Number(getQueryParam("page")) || 1;

  const debouncedGetDrugsList = useCallback(
    debounce(async (searchTerm: string, page: number) => {
      const data = await getDrugsList({
        searchTerm,
        limit: rowsPerPage,
        skip: rowsPerPage * (page - 1),
      });

      setTotalResults(data.meta.results.total);

      const rows = data.results.map((row: any) => {
        return createData(
          row.openfda.brand_name,
          row.purpose,
          row.openfda.product_type,
          row.openfda.manufacturer_name,
          row.id
        );
      });

      setDrugs(rows);
    }, 500),
    [rowsPerPage]
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQueryParam("page", String(newPage + 1));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setQueryParam("page", "1");
  };

  useEffect(() => {
    debouncedGetDrugsList(searchQuery, pageQuery);
  }, [debouncedGetDrugsList, searchQuery, pageQuery]);

  return (
    <div>
      <div className="mb-1">
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={getQueryParam("search") || ""}
          onChange={(e) => setQueryParam("search", e.target.value)}
        />
      </div>

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
            {drugs.map((row) => (
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
    </div>
  );
};

export default Home;
