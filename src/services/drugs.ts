import axios from "axios";
import { RootResult } from "../models";

const BASE_URL = "https://api.fda.gov/drug/label.json";

export const getDrugsList = async ({
  searchTerm,
  limit,
  skip,
}: {
  searchTerm: string;
  limit: number;
  skip?: number;
}): Promise<RootResult> => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error.message;
    }
    throw new Error("An unknown error occurred");
  }
};

export const getDrugDetails = async (id: string): Promise<RootResult> => {
  try {
    const response = await axios.get(`${BASE_URL}?search=id:${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error.message;
    }
    throw new Error("An unknown error occurred");
  }
};
