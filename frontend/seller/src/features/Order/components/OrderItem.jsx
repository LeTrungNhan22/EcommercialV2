import React from 'react'

const OrderItem = ({ item }) => {
    const { variant } = item;
    // 
    const totalPrice = item.originalTotalPrice.amount - item.discountedTotalPrice.amount;

    return (
        <div><div className="productBottom">
            <form action="" className="productForm">
                <div className="productFormLeft">
                    <label htmlFor="">{variant?.productName} ({variant?.id})</label>
                    <input type="text" disabled
                        defaultValue={variant?.productName} />

                    <label htmlFor="">Color</label>
                    <input type="text"
                        disabled defaultValue={variant?.color} />

                    <label htmlFor="">Original TotalPrice</label>
                    <input type="text" disabled
                        defaultValue={`${Number(item?.originalTotalPrice.amount).toLocaleString('vi')} ${variant?.price.currencyCode}`} />

                    <label htmlFor="">Discount TotalPrice</label>
                    <input type="text" disabled
                        defaultValue={`${Number(item?.discountedTotalPrice.amount).toLocaleString('vi')} ${variant?.price.currencyCode}`} />

                    <label htmlFor="">Weight</label>
                    <input type="text" defaultValue={`${variant?.weight} ${variant?.weightUnit}`} />
                </div>
                <div className="productFormMiddle">
                    <label htmlFor="">Dimension:</label>
                    <input type="text"
                        defaultValue={`${variant?.dimension?.width}x${variant?.dimension?.length}x${variant?.dimension?.height} ${variant?.dimension?.dimensionUnit}`}
                    />
                    <label htmlFor="">Quantity:</label>
                    <input type="text"
                        defaultValue={item?.quantity}
                    />
                    <label htmlFor="">RequiresShipping:</label>
                    <input type="text"
                        defaultValue={`${variant?.requiresShipping}`}
                    />
                    <label htmlFor="">SalePrice:</label>
                    <input type="text"
                        defaultValue={`${Number(variant?.salePrice.amount).toLocaleString('vi')} ${variant?.price.currencyCode}`}
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
                            {/* <Publish /> */}
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} />
                    </div>

                </div>
            </form>
        </div></div>
    )
}

export default OrderItem