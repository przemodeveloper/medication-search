import { CardContent, Card, Typography } from "@mui/material";

interface DrugCardProps {
  productType: string;
  brandName: string;
  activeIngredient: string;
  purpose: string;
  dosageAndAdministration: string;
  stopUse: string;
}

const DrugCard = ({
  productType,
  brandName,
  activeIngredient,
  purpose,
  dosageAndAdministration,
  stopUse,
}: DrugCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {productType}
        </Typography>
        <Typography variant="h5" component="div">
          {brandName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {activeIngredient}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {purpose}
        </Typography>
        <Typography variant="body2">{dosageAndAdministration}</Typography>
        <Typography variant="body2">{stopUse}</Typography>
      </CardContent>
    </Card>
  );
};

export default DrugCard;
