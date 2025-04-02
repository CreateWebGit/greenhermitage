"use client";
import React, { useState } from "react";
import DropdownProd from "../DropdownsProd";
import { Trash2 } from "lucide-react";
import { HandPlatter } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { TfiInfo } from "react-icons/tfi";
import { CiCircleInfo } from "react-icons/ci";
import { PiInfoThin } from "react-icons/pi";
import Input from "../Input";
import { RiDraggable } from "react-icons/ri";
import { createProduct } from "@/lib/actions/products.actions";
import Popup from "../Popup";
import { cn } from "@/utils/utils";
import ReactCountryFlag from "react-country-flag";

const Product = ({
  product,
  field,
  index,
  formField,
  setFormField,
  handleDropdownProducts,
}) => {
  const [inLanguage, setLanguage] = useState("sv");
  const [isEditProduct, setEditProduct] = useState(false);
  const [isRemoveProdDialog, setRemoveProdDialog] = useState(false);

  const notify = () => {
    toast.success("Måltiden är nu borttagen!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleChangesProduct = async (categoryID, id, event) => {
    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );

    let _formField = [...formField];

    const productIndex = formField[categoryIndex].products.findIndex(
      (product) => product._id === id
    );
    console.log(id);

    _formField[categoryIndex].products[productIndex][event.target.name] =
      event.target.value;

    setFormField(_formField);

    try {
      if (formField !== undefined) {
        createProduct(_formField);
        setEditWindow(false);
      }
    } catch (error) {
      console.log("haha");
    }
  };

  const handeRemoveProduct = (categoryID, myindex) => {
    const index = formField.findIndex(
      (category) => category.categoryID === categoryID
    );

    let _formField = [...formField];

    _formField[index].products.splice(myindex, 1);
    setFormField(_formField);
    createProduct(_formField);
    setRemoveProdDialog(false);
    notify();
  };

  const handleExpandAndCollaps = (expand) => {
    let _formField = [...formField];
    console.log(_formField);
    _formField[categoryIndex].products.map((item) => {
      item.expanded = expand;
    });
    console.log(_formField);
    setFormField(_formField);
  };

  const handleLangSv = () => {
    setLanguage("sv");
  };

  const handleLangEng = () => {
    setLanguage("eng");
  };

  return (
    <>
      <DropdownProd
        title={product.title}
        price={product.price}
        handeRemoveProduct={() => setRemoveProdDialog(true)}
        expanded={product?.expanded}
        field={field}
        index={index}
        onClick={() => {
          handleDropdownProducts(field?.categoryID, product?._id);
          // setSortable(false);
        }}
      >
        <div
          key={product.id}
          className="flex flex-col items-start z-0 bg-[#F7F7F7] border-r border-l  border-b border-t-gray-150 "
        >
          <div className=" relative flex w-full pl-2 border">
            <div className=" flex  items-end w-full  ">
              <div className="w-[93%]">
                <div className=" flex justify-between gap-8">
                  {inLanguage === "sv" ? (
                    <Input
                      name="title"
                      type="text"
                      value={product?.title}
                      onChange={(e) =>
                        handleChangesProduct(field?.categoryID, product?._id, e)
                      }
                      placeholder="Maträttens titel"
                      icon={HandPlatter}
                      isEdit={isEditProduct}
                    />
                  ) : (
                    <Input
                      name="titleEng"
                      type="text"
                      value={product?.titleEng}
                      onChange={(e) =>
                        handleChangesProduct(field?.categoryID, product?._id, e)
                      }
                      placeholder="Maträttens titel eng"
                      icon={HandPlatter}
                      isEdit={isEditProduct}
                    />
                  )}

                  <Input
                    name="price"
                    type="text"
                    value={product?.price}
                    onChange={(e) =>
                      handleChangesProduct(field?.categoryID, product?._id, e)
                    }
                    placeholder="Tjänstens tittel"
                    icon={IoPricetagsOutline}
                    width="w-[100px]"
                    isEdit={isEditProduct}
                  />
                </div>

                {inLanguage === "sv" ? (
                  <Input
                    name="description"
                    type="textarea"
                    value={product?.description}
                    onChange={(e) =>
                      handleChangesProduct(field?.categoryID, product?._id, e)
                    }
                    placeholder="Kort beskrivning på svenska"
                    icon={PiInfoThin}
                    isEdit={isEditProduct}
                  />
                ) : (
                  <Input
                    name="descriptionEng"
                    type="textarea"
                    value={product?.descriptionEng}
                    onChange={(e) =>
                      handleChangesProduct(field?.categoryID, product?._id, e)
                    }
                    placeholder="Kort beskrivning på engelska"
                    icon={PiInfoThin}
                    isEdit={isEditProduct}
                  />
                )}
              </div>

              <div className="flex flex-col justify-between items-end gap-2 px-2 h-full">
                <div className="flex justify-end items-end gap-2 w-full mt-4 text-white z-50 ">
                  <div
                    className={cn(
                      "flex relative justify-between items-center px-1 cursor-pointer",
                      inLanguage === "sv" ? "border border-slate-500" : ""
                    )}
                    onClick={handleLangSv}
                  >
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode="SE"
                      style={{
                        fontSize: "2em",
                      }}
                      aria-label="United States"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex relative justify-between items-center px-1 cursor-pointer",
                      inLanguage === "eng" ? "border border-slate-500" : ""
                    )}
                    onClick={handleLangEng}
                  >
                    <ReactCountryFlag
                      className="emojiFlag"
                      countryCode="GB"
                      style={{
                        fontSize: "2em",
                      }}
                      aria-label="United States"
                    />
                  </div>
                </div>
                {isEditProduct ? (
                  <button
                    type="button"
                    onClick={
                      () => setEditProduct(false)
                      // editFieldRow(field.categoryID, product.id)
                    }
                  >
                    <IoCheckmarkDoneSharp color="green" size={26} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={
                      () => setEditProduct(true)
                      // editFieldRow(field.categoryID, product.id)
                    }
                  >
                    <CiEdit size={26} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DropdownProd>
      <Popup isPopup={isRemoveProdDialog} setPopup={setRemoveProdDialog}>
        <div className="flex flex-col justify-between h-[300px] border">
          <div className="flex justify-center items-center h-full">
            <p className="">
              Är du säker på att du vill ta bort denna maträtt?
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setRemoveProdDialog(false)}>Avbryt</button>
            <button onClick={() => handeRemoveProduct(field.categoryID, index)}>
              Ta bort
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Product;
