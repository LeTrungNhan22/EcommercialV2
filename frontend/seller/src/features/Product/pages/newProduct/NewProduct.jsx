import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container } from "@mui/system";
import React, { Fragment, useContext, useEffect, useState } from "react";
import FileUpload from "../../components/fileUpload/FileUploadList";
import "./NewProduct.scss";
import VariantProductDialog from "../../components/dialog/VariantProductDialog";
import MUIRichTextEditor from "mui-rte";
import VariantItemAdd from "../../components/variant/VariantItemAdd";
import productApi from "../../api/product/productApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../../../context/authContext";
import uploadImages, { uploadImageVariants, uploadSingleImage } from "../../../../utils/uploadImage";
import { color } from "framer-motion";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function NewProduct() {
  const [productImage, setProductImage] = useState([]);
  const [variantsProduct, setVariantsProduct] = useState([]);
  const [productInput, setProductInput] = useState({})
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,

  } = useForm();

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

  const handleRemoveVariant = (index) => {
    const temp = [...variantsProduct]
    temp.splice(index, 1)
    setVariantsProduct(temp)
  }
  // get industrials list
  const [industrials, setIndustrials] = useState([]);
  useEffect(() => {
    const getIndustrialsList = async () => {
      const res = await productApi.getIndustrials();
      setIndustrials(res);
    }
    getIndustrialsList();
  }, [])
  // get trade marks list
  const [tradeMarks, setTradeMarks] = useState([]);
  useEffect(() => {
    const getTradeMarksList = async () => {
      const res = await productApi.getTradeMarks();
      setTradeMarks(res);
    }
    getTradeMarksList();
  }, [])

  const handleAddVariant = async (data, e) => {
    e.preventDefault();

    if (productImage.length === 0) {
      toast.error("Vui lòng thêm ảnh sản phẩm");
      return;
    } else if (productImage.length < 3) {
      toast.error("Vui lòng thêm ít nhất 3 ảnh sản phẩm");
      return;
    }

    if (variantsProduct.length === 0) {
      toast.error("Vui lòng thêm biến thể sản phẩm");
      return;
    }

    setLoading(false);

    const mediumPrice =
      variantsProduct.reduce((a, b) => a + Number(b.price.amount), 0) /
      variantsProduct.length;

    const salePrice = mediumPrice - (mediumPrice * data.discount / 100);

    const imageUrls = await uploadImages(productImage.map((item) => item.file));

    const productVariants = await Promise.all(
      variantsProduct.map(async (item) => {
        const imageUrl = await uploadImageVariants(item?.imageUrl.variantFile);
        return {
          ...item,
          productName: data.productName,
          imageUrl: imageUrl,
        };
      })
    );

    const updatedProductInput = {
      product: {
        name: data.productName === "" ? getValues("productName") : data.productName,
        description: description === "" ? description : description,
        imageUrls: imageUrls,
        quantityAvailable: Number.parseInt(data.quantityAvailable) === 0 ? Number.parseInt(getValues("quantityAvailable")) : Number.parseInt(data.quantityAvailable),
        salePrice: {
          amount: Number(salePrice) === 0 ? Number(mediumPrice) : Number(salePrice),
          currencyCode: "VND",
        },
        discount: Number.parseInt(data.discount) === 0 ? Number.parseInt(getValues("discount")) : Number.parseInt(data.discount),
        featuredImageUrl: imageUrls[0],
        tradeMarkId: data.tradeMarkName === "" ? getValues("tradeMarkName") : data.tradeMarkName,
        industrialId: data.industrialTypeName === "" ? getValues("industrialTypeName") : data.industrialTypeName,
        industrialTypeName: industrials.filter((item) => item.id === (data.industrialTypeName)[0].name === "" ? getValues("industrialTypeName")[0].name : data.industrialTypeName)[0].name,
        mediumPrice: {
          amount: Number(mediumPrice) === 0 ? Number(mediumPrice) : Number(mediumPrice),
          currencyCode: "VND",
        },
        shopId: user?.shop?.shopId,
      },
      productVariants: productVariants,
    };

    createProduct(updatedProductInput);
  };


  const createProduct = async (updatedProductInput) => {
    if (Object.keys(updatedProductInput).length !== 0) {
      try {
        const res = await productApi.createProduct(updatedProductInput);
        if (res) {
          toast.success("Thêm sản phẩm thành công");
          setValue("productName", "");
          setValue("quantityAvailable", "");
          setValue("discount", "");
          setValue("industrialTypeName", "");
          setValue("tradeMarkName", "");
          setProductImage([]);
          setVariantsProduct([]);
          setDescription("");
          setLoading(true);
        }
      } catch (error) {
        setLoading(true);
        toast.error("Thêm sản phẩm thất bại");
      }
    }
  }
  useEffect(() => {
    if (Object.keys(productInput).length === 0) {
      setLoading(true);
    } else {
      createProduct();
    }
  }, [productInput]);





  return (
    <div className="newProduct">
      <Container fixed>
        <h1 className="addProductTitle">New Product</h1>
        <div className="newProductWrapper">
          <Box
            sx={{ width: 1 }}
          >
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
                    sx={{ width: '100%', marginBottom: '30px', height: '50px' }}
                    id="productName"
                    label="Product Name"
                    variant="outlined"
                    color="secondary"
                    {...register("productName", {
                      required: true,
                      minLength: 6,
                      maxLength: 50,
                    })}
                    helperText={(errors.productName && errors.productName.type === "required" && "Product name is required") ||
                      (errors.productName && errors.productName.type === "minLength" && "Product name must be at least 6 characters") ||
                      (errors.productName && errors.productName.type === "maxLength" && "Product name must be at most 50 characters")}
                    error={Boolean(errors.productName)}


                  />
                  {/* <Typography variant="span" sx={{ fontSize: "16px", color: "#000", marginBottom: "3px" }} >Description</Typography> */}
                  <Box component="span" sx={{
                    padding: 2, paddingBottom: 8,
                    border: `1px solid #9dadb8`,
                    borderRadius: "5px",
                    transition: 'all .3s ease-in-out',
                    animationDuration: '1s',

                  }}>
                    <MUIRichTextEditor
                      label="Type something here.."
                      error={description === ""}
                      onChange={(e) => setDescription(e.getCurrentContent().getPlainText())}
                      inlineToolbar={true}
                      toolbarButtonSize="small"
                      controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote", "code", "clear"]}
                    ></MUIRichTextEditor>

                  </Box>
                  {description === "" && <Typography variant="span" sx={{
                    fontSize: "12px",
                    color: "#f44336",
                    marginBottom: "3px",
                    marginLeft: "10px",
                  }} >Description is required</Typography>}
                  {description.length < 15 && <Typography variant="span" sx={{
                    fontSize: "12px",
                    color: "#f44336",
                    marginBottom: "3px",
                    marginLeft: "10px",
                  }} >
                    Description must be at least 15 characters
                  </Typography>}

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

              <Box
                gridColumn="span 4"
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
                    marginBottom: "10px",
                    fontWeight: "bold"
                  }} >Product Organization</Typography>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {/* <Grid item xs={12}>

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
                    </Grid> */}
                    <Grid item xs={12}>
                      <FormControl
                        sx={
                          {
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '15px',
                            height: '50px'
                          }
                        }
                        fullWidth>
                        <InputLabel
                          color="secondary"
                          id="industrialTypeName"
                        >Industrial TypeName</InputLabel>
                        <Select

                          labelId="demo-simple-select-label"
                          id="industrialTypeName"
                          color="secondary"
                          label="industrialTypeName"
                          MenuProps={MenuProps}
                          defaultValue={""}
                          {...register("industrialTypeName", { required: true })
                          }

                          error={errors.industrialTypeName ? true : false}


                        >
                          {industrials.map((industrial) => (
                            <MenuItem
                              key={industrial?.id}
                              value={industrial?.id}>{industrial?.name}</MenuItem>
                          ))}

                        </Select>
                        {errors.industrialTypeName && <FormHelperText style={{ color: "red" }}>Industrial Type Name is required</FormHelperText>}
                      </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        sx={
                          {
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '15px',
                            height: '50px'
                          }
                        }
                        fullWidth>
                        <InputLabel
                          color="secondary"
                          id="industrialTypeName"
                        >Trade Marks</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="industrialTypeName"
                          color="secondary"
                          label="industrialTypeName"
                          MenuProps={MenuProps}
                          defaultValue={""}
                          {...register("tradeMarkName", { required: true })
                          }
                          error={errors.tradeMarkName ? true : false}
                        >
                          {tradeMarks.map((tradeMark) => (
                            <MenuItem key={tradeMark?.id} value={tradeMark?.id}>{tradeMark?.name}</MenuItem>
                          ))}

                        </Select>
                        {errors.tradeMarkName && <FormHelperText style={{ color: "red" }}>TradeMarks Name is required</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        sx={
                          {
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '15px',
                            height: '50px'
                          }
                        }
                        fullWidth>

                        <TextField
                          sx={{ width: '100%', marginBottom: '30px', height: '50px' }}
                          id="quantityAvailable"
                          label="Quantity Available"
                          type="number"
                          variant="outlined"
                          color="secondary"
                          {...register("quantityAvailable", {
                            required: "Quantity Available is required",
                            min: { value: 1, message: "Quantity Available must be at least 1" },
                            max: { value: 100, message: "Quantity Available must be at most 100" },
                          })}
                          helperText={errors.quantityAvailable?.message}
                          error={Boolean(errors.quantityAvailable)}
                        />


                      </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        sx={
                          {
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '15px',
                            height: '50px'
                          }
                        }
                        fullWidth>

                        <TextField
                          sx={{ width: '100%', marginBottom: '30px', height: '50px' }}
                          id="discount"
                          label="Discount"
                          type="number"
                          variant="outlined"
                          color="secondary"
                          {...register("discount", {
                            required: true,
                            minLength: 1,
                            maxLength: 100,
                          })}
                          helperText={(errors.discount && errors.discount.type === "required" && "Discount is required") ||
                            (errors.discount && errors.discount.type === "minLength" && "Discount must be at least 1 characters") ||
                            (errors.discount && errors.discount.type === "maxLength" && "Discount must be at most 100 characters")}
                          error={Boolean(errors.discount)}

                        />


                      </FormControl>

                    </Grid>
                  </Grid>
                </Item>
                {loading ? (<Button
                  onClick={handleSubmit(handleAddVariant)}
                  type="submit"
                  sx={{
                    width: '100%',
                    marginTop: '5px',
                    height: '50px'

                  }}
                  variant="contained"
                >Tạo sản phẩm</Button>) : (
                  <Button
                    disabled
                    sx={{
                      width: '100%',
                      marginTop: '5px',
                      height: '50px'

                    }}
                    variant="contained"
                  >Tạo sản phẩm</Button>
                )}
              </Box>
            </Box>
          </Box>
        </div>
      </Container >
    </div >
  );
}
