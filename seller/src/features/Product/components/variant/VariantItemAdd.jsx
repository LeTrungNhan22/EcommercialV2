import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Chip, Stack } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const VariantItemAdd = ({ item, index, handleRemoveVariant }) => {

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                marginBottom: "10px",
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            elevation={3}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img
                            alt="complex"
                            src={item?.imageUrl?.variantPreview}
                            loading="lazy"
                            sx={{
                                width: 128,
                                height: 128,
                                objectFit: "cover",
                                borderRadius: "5px",
                            }
                            }

                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            {/* <Typography gutterBottom variant="subtitle1" component="div">
                                Variant {id}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                ID: #{id}
                            </Typography> */}
                            <Typography variant="body2" color="text.primary">
                                Dimension : {item.dimension.length} x {item.dimension.width} x {item.dimension.height} x {item.dimension.dimensionUnit}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Color: {item.color}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Discount: {item?.discount?.amount} %
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                Weight: {item?.weight} {item?.weightUnit}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction="row" spacing={1}>


                                <Chip
                                    sx={{
                                        backgroundColor: "#ff0059",
                                        color: "#fff",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "#b80442 !important",
                                            color: "#fff",
                                        },


                                    }}
                                    onClick={() => handleRemoveVariant(index)}


                                    label="Xóa"
                                    variant="outlined"
                                    icon={<HighlightOffIcon
                                        style={{ color: "#fff" }}
                                    />}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",

                            }}
                            variant="subtitle1"
                            component="div">
                            {item.price.amount} {item.price.currencyCode}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default VariantItemAdd