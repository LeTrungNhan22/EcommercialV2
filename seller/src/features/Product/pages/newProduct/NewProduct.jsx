import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container } from "@mui/system";
import React, { Fragment, useRef } from "react";
import "./NewProduct.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
export default function NewProduct() {
  const uploadInputRef = useRef(null);

  return (
    <div className="newProduct">
      <Container fixed>
        <h1 className="addProductTitle">New Product</h1>
        <div className="newProductWrapper">
          <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 7"
              >
                <Item
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}
                >
                  {/* <Typography variant="span" sx={{ fontSize: "16px", color: "#000", marginBottom: "3px" }} >Product Name</Typography> */}
                  <TextField
                    sx={{ width: '100%', marginBottom: '20px', height: '50px' }}
                    id="productName"
                    label="Product Name"
                    variant="outlined"
                    color="secondary"
                  />
                  {/* <Typography variant="span" sx={{ fontSize: "16px", color: "#000", marginBottom: "3px" }} >Description</Typography> */}
                  <TextField
                    sx={{ width: '100%', height: '100%' }}
                    id="description"
                    label="Description..."
                    variant="outlined"
                    multiline
                    rows={3}
                    color="secondary"
                  />
                </Item>
                <Item
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}
                >
                  <Typography variant="span" sx={{ fontSize: "20px", color: "#000", marginBottom: "3px", fontWeight: "bold" }} >Media</Typography>
                  <Box
                    sx={{
                      display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '40px',
                      border: '1px solid #d9dadb', borderRadius: '5px', "&:hover": {
                        backgroundColor: '#e3e5e6'
                      }
                    }}
                  >
                    <Fragment>
                      <input
                        ref={uploadInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <Button
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                        color="primary"
                        size="medium"
                        variant="outlined"
                      >
                        Upload
                      </Button>
                    </Fragment>
                  </Box>
                </Item>
                <Item
                  sx={{ padding: '20px', marginBottom: '20px' }}
                >
                  <Typography variant="span" sx={{ fontSize: "20px", color: "#000", marginBottom: "3px", fontWeight: "bold" }} >Pricing</Typography>
                </Item>
              </Box>
              <Box gridColumn="span 5">
                <Item
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', marginBottom: '20px' }}
                >
                  <Typography variant="span" sx={{ fontSize: "20px", color: "#000", marginBottom: "3px", fontWeight: "bold" }} >Product Organization</Typography>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12}>
                      <Item>1</Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Item>1</Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Item>1</Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Item>1</Item>
                    </Grid>
                  </Grid>
                </Item>
              </Box>
            </Box>
          </Box>
        </div>
      </Container >



    </div >
  );
}
