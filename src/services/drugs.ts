import axios from "axios";

const BASE_URL = "https://api.fda.gov/drug/label.json";

export const getDrugsList = async ({
  searchTerm,
  limit,
  skip,
}: {
  searchTerm: string;
  limit: number;
  skip?: number;
}) => {
  try {
    let url = `${BASE_URL}?limit=${limit}`;

    if (searchTerm) {
      url = `${BASE_URL}?search=openfda.brand_name:${searchTerm}&limit=${limit}`;
    }

    if (skip) {
      url += `&skip=${skip}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching drugs list");
  }
};
