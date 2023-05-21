import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Stack, TextField, Tooltip } from "@mui/material";
import React, { Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "../../components/fileUpload/FileUploadList.scss";


const SIZE = ["S", "M", "L", "XL", "XXL", "XXXL"];
const COLOR = ["RED", "BLUE", "GREEN", "YELLOW", "BLACK", "WHITE"];
const CURRENCY_CODE = ["VND"];
const WEIGHT_UNIT = ["KILOGRAMS", "GRAMS"];
const DIMENSION_UNIT = ["MM", "CM", "M"];

const VariantProductDialog = ({ open, handleClickOpen, handleClose, variantsProduct,
    setVariantsProduct }) => {
    const [imageVariant, setImageVariant] = React.useState({});

    useEffect(() => {
        return () => {
            imageVariant && URL.revokeObjectURL(imageVariant.variantPreview);
        }
    }, [imageVariant]);

    const handleUploadImageVariant = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImageVariant({
            variantPreview: URL.createObjectURL(file),
        })
    }

    const handleDeleteImageVariant = (e) => {
        e.preventDefault();
        setImageVariant({})
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const handleAddVariantProduct = async () => {
        // add variant product
        const productVariantsDetail = [
            {
                "color": getValues("colorInput"),
                "dimension": {
                    "dimensionUnit": getValues("dimensionUnitInput"),
                    "height": getValues("heightInput"),
                    "length": getValues("lengthInput"),
                    "width": getValues("widthInput")
                },
                "discount": {
                    "amount": getValues("discountInput"),
                    "currencyCode": "VND"
                },
                "imageUrl": imageVariant,
                "price": {
                    "amount": getValues("amountPriceInput"),
                    "currencyCode": getValues("currencyPriceCodeInput")
                },
                "productName": "",
                "size": getValues("sizeInput"),
                "weight": getValues("weightInput"),
                "weightUnit": getValues("currencyWeightCodeInput")
            }
        ]
        setVariantsProduct([...variantsProduct, ...productVariantsDetail]);
        handleClose();
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <Button
                variant="outlined"
                onClick={handleClickOpen}>
                Thêm biến thể
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle>Tạo biến thể</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleAddVariantProduct)}
                        sx={{ width: 1 }}>
                        <Box display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gap={3}>
                            <Box gridColumn="span 7">
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            id="colorInput"
                                            label="colorInput"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            select
                                            defaultValue="RED"

                                            {...register("colorInput", {
                                                required: true,
                                            })
                                            }
                                            helperText={errors?.color?.type
                                                === 'required' && "Vui lòng chọn màu"}
                                            error={Boolean(errors.color)}
                                        >
                                            {COLOR.map((color) => (
                                                <MenuItem key={color} value={color}>
                                                    {color}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="dense"
                                            id="sizeInput"
                                            label="sizeInput"
                                            type="text"
                                            variant="standard"
                                            select
                                            fullWidth
                                            defaultValue="S"
                                            {...register("sizeInput", {
                                                required: true,
                                            })
                                            }
                                            helperText={errors?.sizeInput?.type
                                                === 'required' && "Vui lòng chọn Size"}
                                            error={Boolean(errors.sizeInput)}
                                        >

                                            {SIZE.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'

                                            }}
                                        >
                                            <TextField
                                                autoFocus
                                                margin="normal"
                                                id="lengthInput"
                                                name="lengthInput"
                                                label="Length"
                                                type="number"

                                                variant="standard"
                                                {...register("lengthInput", {
                                                    required: true,
                                                    min: 1,
                                                    max: 200
                                                })
                                                }
                                                helperText={(errors?.lengthInput?.type
                                                    === 'required' && "Nhập chiều dài")
                                                    || (errors?.lengthInput?.type
                                                        === 'min' && "Chiều dài phải lớn hơn 0")
                                                    || (errors?.lengthInput?.type
                                                        === 'max' && "Chiều dài phải nhỏ hơn 200")

                                                }
                                                error={Boolean(errors.lengthInput)}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="widthInput"
                                                label="widthInput"
                                                type="number"
                                                variant="standard"
                                                {...register("widthInput", {
                                                    required: true,
                                                    min: 1,
                                                    max: 200
                                                })
                                                }
                                                helperText={(errors?.widthInput?.type
                                                    === 'required' && "Nhập chiều rộng")
                                                    || (errors?.widthInput?.type
                                                        === 'min' && "Chiều rộng phải lớn hơn 0")
                                                    || (errors?.widthInput?.type
                                                        === 'max' && "Chiều rộng phải nhỏ hơn 200")
                                                }
                                                error={Boolean(errors.widthInput)}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="heightInput"
                                                label="HeightInput"
                                                type="number"
                                                variant="standard"
                                                {...register("heightInput", {
                                                    required: true,
                                                    min: 1,
                                                    max: 200
                                                })
                                                }
                                                helperText={(errors?.heightInput?.type
                                                    === 'required' && "Nhập chiều cao")
                                                    || (errors?.heightInput?.type
                                                        === 'min' && "Chiều cao phải lớn hơn 0")
                                                    || (errors?.heightInput?.type
                                                        === 'max' && "Chiều cao phải nhỏ hơn 200")
                                                }
                                                error={Boolean(errors.heightInput)}
                                            />


                                            <TextField
                                                margin="dense"
                                                id="dimensionUnitInput"
                                                label="dimensionUnitInput"
                                                type="text"
                                                style={{ width: '40%' }}
                                                variant="standard"
                                                select
                                                defaultValue="MM"
                                                {...register("dimensionUnitInput", {
                                                    required: true,
                                                })
                                                }
                                                helperText={errors?.dimensionUnitInput?.type
                                                    === 'required' && ""}
                                                error={Boolean(errors.dimensionUnitInput)}
                                            >
                                                {DIMENSION_UNIT.map((item) => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                        </Stack>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'

                                            }}
                                        >
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="amountPriceInput"
                                                label="amountPriceInput"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                {...register("amountPriceInput", {
                                                    required: true,
                                                    min: 1,
                                                    max: 1000000
                                                })
                                                }
                                                helperText={(errors?.amountPriceInput?.type
                                                    === 'required' && "Vui lòng nhập giá")
                                                    || (errors?.amountPriceInput?.type
                                                        === 'min' && "Giá phải lớn hơn 0")
                                                    || (errors?.amountPriceInput?.type
                                                        === 'max' && "Giá phải nhỏ hơn 1000000")
                                                }
                                                error={Boolean(errors.amountPriceInput)}
                                            />
                                            <TextField
                                                style={{ width: '45%' }}
                                                margin="dense"
                                                id="currencyPriceCodeInput"
                                                label="Currency Price Code"
                                                name="currencyPriceCode"
                                                type="text"
                                                variant="standard"
                                                select
                                                defaultValue="VND"
                                                {...register("currencyPriceCodeInput", {
                                                    required: true,
                                                })
                                                }
                                                helperText={errors?.currencyPriceCodeInput?.type
                                                    === 'required' && ""}
                                                error={Boolean(errors.currencyPriceCodeInput)}
                                            >
                                                {CURRENCY_CODE.map((item) => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'

                                            }}
                                        >
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="discountInput"
                                                label="Discount"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                {...register("discountInput", {
                                                    required: true,
                                                    min: 0,
                                                    max: 100
                                                })
                                                }
                                                helperText={(errors?.discountInput?.type
                                                    === 'required' && "Vui lòng nhập giá")
                                                    || (errors?.discountInput?.type
                                                        === 'max' && "Giảm giá phải nhỏ hơn 100")
                                                }
                                                error={Boolean(errors.discountInput)}

                                            />

                                            <TextField
                                                style={{ width: '45%' }}
                                                margin="dense"
                                                id="currencyCodeInput"
                                                label="Currency"
                                                type="text"
                                                variant="standard"
                                                select
                                                defaultValue="%"
                                                {...register("currencyCode", {
                                                    required: true,
                                                })}
                                            >
                                                <MenuItem value="%">
                                                    %
                                                </MenuItem>
                                            </TextField>

                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'

                                            }}
                                        >
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="weightInput"
                                                label="Weight"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                {...register("weightInput", {
                                                    required: true,
                                                    min: 1,
                                                    max: 160000,
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                    }

                                                })
                                                }
                                                helperText={(errors?.weightInput?.type
                                                    === 'required' && "Vui lòng nhập trọng lượng")
                                                    || (errors?.weightInput?.type
                                                        === 'pattern' && "Vui lòng nhập số")
                                                    || (errors?.weightInput?.type
                                                        === 'min' && "Vui lòng nhập số lớn hơn 0")
                                                    || (errors?.weightInput?.type
                                                        === 'max' && "Vui lòng nhập số nhỏ hơn 160000")
                                                }
                                                error={Boolean(errors.weightInput)}
                                            />

                                            <TextField
                                                style={{ width: '45%' }}
                                                margin="dense"
                                                id="currencyWeightCodeInput"
                                                label="Currency Weight Code"
                                                type="text"
                                                variant="standard"
                                                select
                                                defaultValue="KILOGRAMS"
                                                {...register("currencyWeightCodeInput", {
                                                    required: true,
                                                })
                                                }
                                                helperText={errors?.currencyWeightCodeInput?.type
                                                    === 'required' && ""}
                                                error={Boolean(errors.currencyWeightCodeInput)}
                                            >
                                                {WEIGHT_UNIT.map((item) => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box gridColumn="span 5"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Fragment>
                                    {
                                        imageVariant.variantPreview ? (<>
                                            <img
                                                style={{
                                                    objectFit: "fit", width: "100%", height: "100%",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "5px",
                                                }}
                                                src={imageVariant.variantPreview}
                                                alt="variant-review"
                                                loading="lazy"
                                            />
                                            <Tooltip
                                                title="Xoá ảnh">
                                                <span
                                                    style={
                                                        {
                                                            position: "absolute",
                                                            top: "60px",
                                                            right: "17px",
                                                            cursor: "pointer",
                                                            backgroundColor: "#000",
                                                            color: "#fff",
                                                            opacity: " 0.5",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: " 5px",
                                                            borderRadius: "5px",
                                                            margin: " 10px",
                                                            "&:hover": {
                                                                opacity: "1",
                                                                backgroundColor: "#fc0303"

                                                            }
                                                        }
                                                    }
                                                    onClick={(e) => handleDeleteImageVariant(e)}
                                                >
                                                    <HighlightOffIcon />
                                                </span>
                                            </Tooltip>

                                        </>) : (<>
                                            <input

                                                type="file"
                                                accept="image/*"
                                                onChange={handleUploadImageVariant}
                                                style={{ display: "none" }}
                                                id="file-upload-variant"
                                            />
                                            <label htmlFor="file-upload-variant">
                                                <Button variant="outlined" component="span">
                                                    Thêm ảnh
                                                </Button>
                                            </label>
                                        </>)
                                    }
                                </Fragment>
                            </Box>
                        </Box>

                        <DialogActions>
                            <Button onClick={handleClose}>Thoát</Button>
                            <Button type="submit"
                            >Thêm</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>

            </Dialog>
        </div >
    )
}

export default VariantProductDialog