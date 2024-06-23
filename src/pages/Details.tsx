import { useParams } from "react-router-dom";
import { getDrugDetails } from "../services/drugs";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DrugCard from "../components/DrugCard";

const Details = () => {
  const { ndc } = useParams();
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    if (!ndc) {
      return;
    }
    getDrugDetails(ndc).then((data) => {
      const [resultDetails] = data.results;
      setDetails(resultDetails);
    });
  }, [ndc]);

  return (
    <Box sx={{ minWidth: 275 }} className="mt-5">
      <DrugCard
        productType={details.product_type?.join(", ")}
        brandName={details?.openfda?.brand_name?.join(", ")}
        activeIngredient={details.active_ingredient?.join(", ")}
        purpose={details.purpose?.join(", ")}
        dosageAndAdministration={details.dosage_and_administration?.join(", ")}
        stopUse={details.stop_use?.join(", ")}
      />
    </Box>
  );
};

export default Details;
