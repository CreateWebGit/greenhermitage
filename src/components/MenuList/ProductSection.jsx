import React from "react";

import Input from "../Input";

import { PiShoppingCartThin } from "react-icons/pi";
import { MdOutlineDescription } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const ProductSection = ({
  title,
  productIndex,
  setAllActive,
  isAllActive,
  mykey,
  isSingelActive,
  categoryIndex,
  isActive,
  setActive,
  field,
  product,
  formField,
  setFormField,
}) => {
  const handleChangesProduct = (categoryID, id, event) => {
    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );
    console.log(categoryIndex);
    let _formField = [...formField];

    const productIndex = formField[categoryIndex].products.findIndex(
      (product) => product.id === id
    );
    console.log(id);

    _formField[categoryIndex].products[productIndex][event.target.name] =
      event.target.value;

    setFormField(_formField);
  };

  return (
    <div className="grow">
      <div className="flex gap-4">
        <div className="flex flex-col grow ">
          <Input
            name="title"
            label="Tjänst"
            type="text"
            value={product?.title}
            onChange={(e) =>
              handleChangesProduct(field?.categoryID, product?.id, e)
            }
            placeholder="Tjänstens tittel"
            icon={PiShoppingCartThin}
          />
        </div>
        <div className="flex flex-col grow-0 w-1/4">
          <Input
            name="price"
            label="Pris"
            type="text"
            value={product?.price}
            onChange={(e) =>
              handleChangesProduct(field?.categoryID, product?.id, e)
            }
            placeholder=""
            Icon={IoPricetagsOutline}
          />
        </div>
      </div>
      <div className="flex flex-col grow ">
        <Input
          name="description"
          label="Beskrivning"
          type="textarea"
          value={product?.description}
          onChange={(e) =>
            handleChangesProduct(field?.categoryID, product?.id, e)
          }
          placeholder="Kort beskrivning av tjänsten"
          icon={MdOutlineDescription}
        />
      </div>
    </div>
  );
};

export default ProductSection;
