export const createData = (
  brand_name: string,
  purpose: string,
  product_type: string,
  manufacturer_name: string,
  id: string,
  product_ndc: string
) => {
  return {
    brand_name,
    purpose,
    product_type,
    manufacturer_name,
    id,
    product_ndc,
  };
};
