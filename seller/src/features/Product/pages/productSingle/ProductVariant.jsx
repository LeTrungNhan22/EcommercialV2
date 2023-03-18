import { Publish } from "@mui/icons-material"
import React from 'react'
import "./ProductSingle.scss"

const ProductVariant = ({ variant }) => {
    console.log(variant);
    return (
        <div className="productBottom">
            <form action="" className="productForm">
                <div className="productFormLeft">
                    <label htmlFor="">{variant?.productName} ({variant?.id})</label>
                    <input type="text" defaultValue={variant?.productName} />
                    <label htmlFor="">Color</label>
                    <input type="text" defaultValue={variant?.color} />
                    <label htmlFor="">Price</label>
                    <input type="text" defaultValue={`${variant?.price.amount} ${variant?.price.currencyCode}`} />
                    <label htmlFor="">Weight</label>
                    <input type="text" defaultValue={`${variant?.weight} ${variant?.weightUnit}`} />
                </div>
                <div className="productFormMiddle">
                    <label htmlFor="">Dimension:</label>
                    <input type="text"
                        defaultValue={`${variant?.dimension?.width}x${variant?.dimension?.length}x${variant?.dimension?.height} ${variant?.dimension?.dimensionUnit}`}
                    />
                    <label htmlFor="">QuantityAvailable:</label>
                    <input type="text"
                        defaultValue={variant?.quantityAvailable}
                    />
                    <label htmlFor="">RequiresShipping:</label>
                    <input type="text"
                        defaultValue={`${variant?.requiresShipping}`}
                    />
                    <label htmlFor="">RequiresShipping:</label>
                    <input type="text"
                        defaultValue={`${variant?.requiresShipping}`}
                    />
                </div>

                <div className="productFormRight">
                    <div className="productUpload">
                        <img
                            src={variant?.imageUrl}
                            alt={variant?.productName}
                            className="productUploadImg"
                        />
                        <label htmlFor="file">
                            <Publish />
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} />
                    </div>
                    <button className="productButton">Update</button>
                </div>
            </form></div>
    )
}

export default ProductVariant