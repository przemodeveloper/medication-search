import { IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { createData } from "../utils/createData";
import { getDrugsList } from "../services/drugs";
import DrugsListTable from "../components/DrugsListTable";
import { Result, Row } from "../models";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [drugs, setDrugs] = useState<Row[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const pageQuery = Number(searchParams.get("page")) || 1;

  const debouncedGetDrugsList = useCallback(
    debounce(async (searchTerm: string, page: number) => {
      try {
        const data = await getDrugsList({
          searchTerm,
          limit: rowsPerPage,
          skip: rowsPerPage * (page - 1),
        });

        setTotalResults(data.meta.results.total);

        const rows = data.results.map((result: Result) => {
          return createData(
            result.openfda?.brand_name
              ? result.openfda?.brand_name.join(", ")
              : "",
            result.purpose ? result.purpose.join(", ") : "",
            result.openfda.product_type
              ? result.openfda.product_type.join(", ")
              : "",
            result.openfda.manufacturer_name
              ? result.openfda.manufacturer_name.join(", ")
              : "",
            result.id
          );
        });

        setDrugs(rows);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        setDrugs([]);
      }
    }, 500),
    [rowsPerPage]
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParams((prevSearchParams) => ({
      page: String(newPage + 1),
      search: prevSearchParams.get("search") || "",
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setSearchParams((prevSearchParams) => ({
      page: "1",
      search: prevSearchParams.get("search") || "",
    }));
  };

  const handleClearSearch = () => {
    setSearchParams({ search: "", page: "1" });
  };

  useEffect(() => {
    debouncedGetDrugsList(searchQuery, pageQuery);
  }, [debouncedGetDrugsList, searchQuery, pageQuery]);

  return (
    <div className="mt-4">
      <div className="mb-2">
        <TextField
          id="outlined-basic"
          label="Search medication"
          InputProps={{
            endAdornment: searchQuery && (
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            ),
          }}
          variant="outlined"
          value={searchQuery}
          onChange={(e) =>
            setSearchParams({ search: e.target.value, page: "1" })
          }
        >
          clear
        </TextField>
      </div>

      <DrugsListTable
        drugs={drugs}
        totalResults={totalResults}
        rowsPerPage={rowsPerPage}
        pageQuery={pageQuery}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        error={error}
      />
    </div>
  );
};

export default Home;
