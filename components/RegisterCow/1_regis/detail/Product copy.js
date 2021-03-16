import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import gql from "graphql-tag";

import { QUERY_PRODUCTONLINES } from "./ProductOnlines";
import { ME } from "./ProductItem";

const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $product_number:String
      $product_name:String 
      $product_price:Float
      $product_imageURL:String
      $product_barcode:String
      $product_QRcode:String 
      $unit_of_weight:String 
      $unit_product:String
      $product_description:String
      $product_weight:Float
  ) {
    updateProductOnline(
      id: $id
      product_number:$product_number 
      product_name:$product_name 
      product_price:$product_price
      product_imageURL:$product_imageURL
      product_barcode:$product_barcode
      product_QRcode: $product_QRcode
      unit_of_weight:$unit_of_weight
      unit_product: $unit_product
      product_description:$product_description
      product_weight:$product_weight
    ) {
      id
      product_number
      product_name
      product_price
      product_imageURL
      product_barcode
      product_QRcode
      unit_of_weight
      unit_product
      product_description
      product_weight
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT(
    $id: ID!
  ) {
    deleteProductOnline(
      id: $id
    ) {
      id
    }
  }
`;
const UserProductItem = ({ product }) => {
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState(product);

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: data => {
        console.log(data)
      setProductData(data.updateProductOnline);
      setEdit(false);
    },
    refetchQueries: [{ query: QUERY_PRODUCTONLINES }, { query: ME }]
  });
  const [deleteProductOnline] = useMutation(DELETE_PRODUCT, {
    onCompleted: data => {
        // console.log(data)
    },
    refetchQueries: [{ query: ME }]
});

  const handleChange = e =>
    setProductData({ ...productData, [e.target.name]: e.target.value });

  const selectFile = e => {
    const files = e.target.files;
    setFile(files[0]);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "graphql-basic");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/da7loumgx/image/upload",
      {
        method: "post",
        body: data
      }
    );

    const result = await res.json();
      console.log(result)

    return result.secure_url;
  };
//   console.log(product.imageUrl)
// const test =  cloudinary.v2.api.resource(product.imageUrl);
// console.log(test)
const handleSubmitDel = async () => {
  try {
      await deleteProductOnline({ variables: { id: product.id } })
  } catch (error) {
      console.log(error);
  }
};
  const handleSubmit = async () => {
    if (!file && productData === product) {
      setProductData(product);
      setEdit(false);
      return;
    }

   

    try {
      //   console.log(file)
      if (file) {
        const url = await uploadFile();
        if (url) {
          await updateProduct({
            variables: {
              ...productData,
              product_imageURL: url,
              product_price: +productData.product_price,
              product_weight:+productData.product_weight
            }
          });
        }
      } else {
        await updateProduct({
          variables: {
            ...productData,
            product_imageURL: productData.product_imageURL,
            product_price: +productData.product_price,
            product_weight:+productData.product_weight
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
// console.log(productData.product_name)
    // console.log(product)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 2fr',
        width: '100%',
        borderTop: '1px solid grey',
        borderBottom: '1px solid grey'
      }}
    >
      <div style={{ margin: "auto" }}>
        {!edit ? (
          <p>{productData.product_name}</p>
        ) : (
          <input
            type="text"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
          />
        )}
      </div>
      <div style={{ margin: "auto" }}>
        {!edit ? (
          <img
            src={productData.product_imageURL}
            alt={productData.product_description}
            width="50px"
          />
        ) : (
          <input type="file" name="file" onChange={selectFile} />
        )}
      </div>
      <div style={{ margin: "auto" }}>
        {!edit ? (
          <p>{productData.product_price}</p>
        ) : (
          <input
            type="number"
            name="product_price"
            value={productData.product_price}
            onChange={handleChange}
          />
        )}
      </div>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!edit ? (
          <>
            <button
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                border: "none",
                background: "orange",
                margin: "10px"
              }}
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                border: "none",
                background: "red",
                color: "white"
              }}
              onClick={handleSubmitDel}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                border: "none",
                background: "red",
                margin: "10px",
                color: "white"
              }}
              onClick={() => {
                setProductData(product);
                setEdit(false);
              }}
            >
              Cancel Edit
            </button>
            <button
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                border: "none",
                background: "green",
                color: "white"
              }}
              onClick={handleSubmit}
            >
              {loading ? "Editing..." : "Confirm Edit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProductItem;
