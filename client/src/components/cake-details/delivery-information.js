import { Typography, Divider, Box, List, ListItem } from "@material-ui/core";

const DeliveryInformation = () => {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Divider />
      <Box>
        <List>
          <ListItem>
            Every cake we offer is handcrafted and since each chef has his/her
            own way of baking and designing a cake, there might be slight
            variation in the product in terms of design and shape.
          </ListItem>
          <ListItem>
            The chosen delivery time is an estimate and depends on the
            availability of the product
          </ListItem>
          <ListItem>
            Occasionally, substitutions of flavours/designs is necessary due to
            temporary and/or regional unavailability issues.
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default DeliveryInformation;
