import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import FileUpload from "../../components/fileUpload/FileUploadList";
import "./NewProduct.scss";
import VariantProductDialog from "../../components/dialog/VariantProductDialog";
import MUIRichTextEditor from "mui-rte";
import VariantItemAdd from "../../components/variant/VariantItemAdd";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function NewProduct() {
  const [productImage, setProductImage] = useState([]);
  const [variantsProduct, setVariantsProduct] = useState([]);
  const [product, setProduct] = useState({})
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    return () => {
      productImage && URL.revokeObjectURL(productImage.preview);
    }
  }, [productImage]);


  const handleUpload = (e) => {
    const tempFile = [...productImage]
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      tempFile.push({
        preview: URL.createObjectURL(file[i]),
        file: file[i],
        title: file[i].name,
      })
    }
    setProductImage(tempFile)
  }


  const handleDelete = (index) => {
    const tempFile = [...productImage]
    tempFile.splice(index, 1)
    setProductImage(tempFile)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const save = (data) => {
    console.log(data);
  };
  const handleRemoveVariant = (index) => {
    const temp = [...variantsProduct]
    temp.splice(index, 1)
    setVariantsProduct(temp)
  }

  return (
    <div className="newProduct">
      <Container fixed>
        <h1 className="addProductTitle">New Product</h1>
        <div className="newProductWrapper">
          <Box sx={{ width: 1 }}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={2}>
              <Box gridColumn="span 8"
              >
                <Item
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '20px',
                    marginBottom: '20px'
                  }}
                >

                  <Typography variant="span" sx={{
                    fontSize: "20px",
                    color: "#000",
                    marginBottom: "3px",
                    fontWeight: "bold"
                  }} >Product Title</Typography>
                  <TextField
                    sx={{ width: '100%', marginBottom: '20px', height: '50px' }}
                    id="productName"
                    label="Product Name"
                    variant="outlined"
                    color="secondary"
                  />
                  {/* <Typography variant="span" sx={{ fontSize: "16px", color: "#000", marginBottom: "3px" }} >Description</Typography> */}
                  <Box component="span" sx={{
                    padding: 2, paddingBottom: 8,
                    border: '1px solid #d9dadb',
                    borderRadius: "5px",
                    transition: 'all .3s ease-in-out',
                    animationDuration: '1s',

                  }}>
                    <MUIRichTextEditor

                      label="Type something here...   "
                      onSave={save}
                      inlineToolbar={true}
                      toolbarButtonSize="small"
                      controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote", "code", "clear"]}
                    ></MUIRichTextEditor>
                  </Box>
                </Item>
                <Item
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}
                >
                  <Typography variant="span" sx={{ fontSize: "20px", color: "#000", marginBottom: "3px", fontWeight: "bold" }} >Media</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                      , justifyContent: 'center',
                      alignItems: 'center',
                      padding: '50px',
                      border: '1px dashed #d9dadb',
                      borderRadius: '5px', "&:hover": {
                        backgroundColor: '#e3e5e6'
                      },
                      transition: 'all .3s ease-in-out',


                    }}
                  >
                    <Fragment>
                      {productImage.length !== 0 ? (
                        <FileUpload
                          productImage={productImage}
                          handleUpload={handleUpload}
                          handleDelete={handleDelete}
                        />
                      ) : <>
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
                      </>}
                    </Fragment>
                  </Box>
                </Item>
                <Item
                  sx={{ padding: '20px', marginBottom: '20px' }}
                >
                  <Typography variant="span" sx={{
                    fontSize: "20px",
                    color: "#000",
                    marginBottom: "3px",
                    fontWeight: "bold"
                  }} >Variants Product</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '40px',
                    }}
                  >
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>

                      {
                        variantsProduct.map((item, index) => (
                          <VariantItemAdd
                            key={index}
                            item={item}
                            index={index}
                            handleRemoveVariant={handleRemoveVariant}

                          />
                        ))
                      }

                    </Grid>
                    {/* dialog variant */}
                    <VariantProductDialog
                      open={open}
                      handleClickOpen={handleClickOpen}
                      handleClose={handleClose}
                      variantsProduct={variantsProduct}
                      setVariantsProduct={setVariantsProduct}
                    />
                    {/* dialog variant */}
                  </Box>
                </Item>
              </Box>

              <Box gridColumn="span 4">
                <Item
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '20px',
                    marginBottom: '20px'
                  }}
                >
                  <Typography variant="span" sx={{
                    fontSize: "20px",
                    color: "#000",
                    marginBottom: "10px",
                    fontWeight: "bold"
                  }} >Product Organization</Typography>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="span" sx={{
                        fontSize: "16px",
                        color: "#000",
                        marginBottom: "15px",
                        fontWeight: "medium"
                      }} >Product category</Typography>

                      <TextField
                        sx={{
                          width: '100%',
                          marginTop: '5px',
                          marginBottom: '15px',
                          height: '50px'
                        }}
                        id="productName"
                        label=" Product category"
                        variant="outlined"
                        color="secondary"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" sx={{
                        fontSize: "16px",
                        color: "#000",
                        marginBottom: "15px",
                        fontWeight: "medium"
                      }} >IndustrialTypeName</Typography>

                      <TextField
                        sx={{ width: '100%', marginTop: '5px', marginBottom: '15px', height: '50px' }}
                        id="productName"
                        label=" Industrial Type Name  "
                        variant="outlined"
                        color="secondary"
                      />

                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" sx={{
                        fontSize: "16px",
                        color: "#000",
                        marginBottom: "15px",
                        fontWeight: "medium"
                      }} >Trade Mark Name</Typography>

                      <TextField
                        sx={{
                          width: '100%',
                          marginTop: '5px',
                          marginBottom: '15px',
                          height: '50px'
                        }}
                        id="productName"
                        label=" Trade Mark Name  "
                        variant="outlined"
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                </Item>

                <Button
                  sx={{
                    width: '100%',
                    marginTop: '5px',
                    height: '50px'

                  }}
                  variant="contained"
                >Tạo sản phẩm</Button>

              </Box>
            </Box>
          </Box>
        </div>
      </Container >
    </div >
  );
}
