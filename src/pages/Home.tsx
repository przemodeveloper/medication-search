import { TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { createData } from "../utils/createData";
import { getDrugsList } from "../services/drugs";
import useQueryParams from "../hooks/useQueryParams";
import DrugsListTable from "../components/DrugsListTable";
import { Result, Row } from "../components/models";

const Home = () => {
  const [drugs, setDrugs] = useState<Row[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

      console.log(data);

      const rows = data.results.map((result: Result) => {
        return createData(
          result.openfda.brand_name.join(", "),
          result.purpose?.join(", ") ?? "",
          result.openfda.product_type.join(", "),
          result.openfda.manufacturer_name.join(", "),
          result.id
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
    <div className="mt-4">
      <div className="mb-2">
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
