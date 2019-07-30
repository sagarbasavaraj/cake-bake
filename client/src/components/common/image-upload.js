import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CloudUpload } from "@material-ui/icons";
import fetch from "isomorphic-unfetch";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  upload: {
    marginRight: theme.spacing(0)
  }
}));

const ImageUpload = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(null);

  const handleOpen = () => setOpen(true);

  const save = async () => {
    try {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }
      const response = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        body: data
      });
      const uploadedFiles = await response.json();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSave = () => {
    //call end point to upload image.
    save();
  };

  const handleClose = () => setOpen(false);

  const handleFileInputChange = ({ target }) => {
    setFiles(target.files);
  };

  return (
    <Fragment>
      <IconButton
        className={classes.upload}
        color="inherit"
        aria-label="cart"
        onClick={handleOpen}
      >
        <CloudUpload />
      </IconButton>
      <Dialog open={open} aria-labelledby="upload-images">
        <DialogTitle id="upload-images">Upload Images</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select one or more images to upload.
          </DialogContentText>
          <Box>
            <input
              accept="image/*"
              id="images"
              multiple
              type="file"
              onChange={handleFileInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ImageUpload;
