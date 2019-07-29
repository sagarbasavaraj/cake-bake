import { Typography, Divider, Box, List, ListItem } from "@material-ui/core";

const CareInstructions = () => {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h6" gutterBottom>
        Care Instructions
      </Typography>
      <Divider />
      <Box>
        <List>
          <ListItem>
            Store cream cakes in a refrigerator. Fondant cakes should be stored
            in an air conditioned environment.
          </ListItem>
          <ListItem>
            Slice and serve the cake at room temperature and make sure it is not
            exposed to heat.
          </ListItem>
          <ListItem>Use a serrated knife to cut a fondant cake.</ListItem>
          <ListItem>
            Sculptural elements and figurines may contain wire supports or
            toothpicks or wooden skewers for support.
          </ListItem>
          <ListItem>
            Please check the placement of these items before serving to small
            children.
          </ListItem>
          <ListItem>Enjoy your cake!</ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default CareInstructions;
