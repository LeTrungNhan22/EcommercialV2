import { Grid, Box, Button } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { motion } from "framer-motion";
import "./FileUploadList.scss";

const FileUpload = ({ productImage, handleUpload, handleDelete }) => {
  const [imageChange, setImageChange] = React.useState([]);

  useEffect(() => {
    setImageChange(productImage);
  }, [productImage]);

  return (
    <Grid container spacing={1}>
      {productImage.length !== 0 && (
        <Grid item xs={12}>
          <ImageList sx={{
            width: "100%",
            height: "100%",
            overflowY: "visible !important",
          }} cols={3} gap={6}>
            {imageChange.map((item) => (
              <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <ImageListItem
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  key={item.preview}
                >
                  <img
                    style={{
                      objectFit: "fit",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                    src={`${item.preview}`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <span
                    className="deleteButton"
                    onClick={() => handleDelete(item)}
                  >
                    <HighlightOffIcon />
                  </span>
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        </Grid>
      )}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span">
              Thêm ảnh
            </Button>
          </label>
          {productImage.length !== 0 && (
            <Button variant="outlined">Lưu ảnh</Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
