import { useState, Fragment } from "react";
<DialogTitle id="upload-images">Upload images</DialogTitle>;
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const ImageUpload = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(null);

  const handleOpen = () => setOpen(true);

  const save = async () => {
    try {
      console.log(files);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }
      const uploadedFiles = await axios.post(
        "http://localhost:3000/api/cakes/upload",
        data
      );
      console.log(uploadedFiles);
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
      <Button
        variant="contained"
        color="default"
        component="span"
        className={classes.button}
        onClick={handleOpen}
      >
        Upload
        <CloudUpload className={classes.rightIcon} />
      </Button>
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
