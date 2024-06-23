import { useParams } from "react-router-dom";
import { getDrugDetails } from "../services/drugs";
import { useEffect, useState } from "react";

const Details = () => {
  const { name } = useParams();
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    console.log(name);
    if (!name) {
      return;
    }
    getDrugDetails(name).then((data) => {
      setDetails(data);
    });
  }, [name]);

  return <div>{name}</div>;
};

export default Details;
