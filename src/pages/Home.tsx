import { TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { createData } from "../utils/createData";
import { getDrugsList } from "../services/drugs";
import useQueryParams from "../hooks/useQueryParams";
import DrugsListTable from "../components/DrugsListTable";

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

      <DrugsListTable
        drugs={drugs}
        totalResults={totalResults}
        rowsPerPage={rowsPerPage}
        pageQuery={pageQuery}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
