"use client";
import { Trash2 } from "lucide-react";
import { HandPlatter } from "lucide-react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsArrowsCollapse, BsArrowsExpand, BsInfo } from "react-icons/bs";
import { TfiInfo } from "react-icons/tfi";
import { CiCircleInfo } from "react-icons/ci";
import { PiInfoThin } from "react-icons/pi";
import Input from "../Input";
import DropdownProd from "../DropdownsProd";
import { RiDraggable } from "react-icons/ri";
import { createProduct } from "@/lib/actions/products.actions";
import Popup from "../Popup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProdSection = ({
  product,
  formField,
  setFormField,
  field,
  categoryIndex,
  isEditWindow,
  setEditWindow,
  handleDragStartProduct,
  handleDragEndProduct,
  handleDropdownProducts,
  saveCatID,
}) => {
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
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _formField,
            type: "productsList",
          }),
        });

        if (res.ok) {
          console.log("ok");
          setEditWindow(false);
        } else {
          console.log("not ok");
        }
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

  return (
    <div className="flex flex-row items-end py-4 mb-4 mt-0 border-r border-l border-b border-b-gray-150 border-l-gray-150 border-r-gray-150 z-10">
      <div className="grow">
        <DragDropContext
          onDragEnd={handleDragEndProduct}
          onDragStart={handleDragStartProduct}
        >
          <Droppable droppableId={`${categoryIndex}`}>
            {(droppableProvider, snapshot) => (
              <div
                className={snapshot.isDraggingOver ? "" : " "}
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
              >
                <div className=" flex justify-end gap-2 mb-4 mr-12">
                  <button
                    className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
                    type="button"
                    onClick={() => handleExpandAndCollaps(true)}
                  >
                    <BsArrowsExpand />
                  </button>

                  <button
                    className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
                    type="button"
                    onClick={() => handleExpandAndCollaps(false)}
                  >
                    <BsArrowsCollapse />
                  </button>
                </div>
                <div className=" ">
                  {field.products[0]?._id !== undefined ? (
                    field.products.map((product, index) => (
                      <div key={index}>
                        <DropdownProd
                          title={product.title}
                          price={product.price}
                          handeRemoveProduct={() => setRemoveProdDialog(true)}
                          expanded={product?.expanded}
                          field={field}
                          index={index}
                          onClick={() => {
                            handleDropdownProducts(
                              field?.categoryID,
                              product?._id
                            );
                            // setSortable(false);
                          }}
                        >
                          <div
                            key={product.id}
                            className="flex flex-row items-start z-0 bg-[#F7F7F7] border-r border-l  border-b border-t-gray-150 "
                          >
                            <div className=" relative flex w-full p-4">
                              <div className=" flex  items-end w-full  ">
                                <div className="w-[93%]">
                                  <div className=" flex justify-between gap-8">
                                    <Input
                                      name="title"
                                      type="text"
                                      value={product?.title}
                                      onChange={(e) =>
                                        handleChangesProduct(
                                          field?.categoryID,
                                          product?._id,
                                          e
                                        )
                                      }
                                      placeholder="Tjänstens tittel"
                                      icon={HandPlatter}
                                      isEdit={isEditProduct}
                                    />

                                    <Input
                                      name="price"
                                      type="text"
                                      value={product?.price}
                                      onChange={(e) =>
                                        handleChangesProduct(
                                          field?.categoryID,
                                          product?._id,
                                          e
                                        )
                                      }
                                      placeholder="Tjänstens tittel"
                                      icon={IoPricetagsOutline}
                                      width="w-[100px]"
                                      isEdit={isEditProduct}
                                    />
                                  </div>

                                  <Input
                                    name="description"
                                    type="textarea"
                                    value={product?.description}
                                    onChange={(e) =>
                                      handleChangesProduct(
                                        field?.categoryID,
                                        product?._id,
                                        e
                                      )
                                    }
                                    placeholder="Kort beskrivning"
                                    icon={PiInfoThin}
                                    isEdit={isEditProduct}
                                  />
                                </div>

                                <div className="flex gap-2 px-2">
                                  {isEditProduct ? (
                                    <button
                                      type="button"
                                      onClick={
                                        () => setEditProduct(false)
                                        // editFieldRow(field.categoryID, product.id)
                                      }
                                    >
                                      <IoCheckmarkDoneSharp
                                        color="green"
                                        size={26}
                                      />
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
                        <Popup
                          isPopup={isRemoveProdDialog}
                          setPopup={setRemoveProdDialog}
                        >
                          <div className="flex flex-col justify-between h-[300px] border">
                            <div className="flex justify-center items-center h-full">
                              <p className="">
                                Är du säker på att du vill ta bort denna
                                maträtt?
                              </p>
                            </div>
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => setRemoveProdDialog(false)}
                              >
                                Avbryt
                              </button>
                              <button
                                onClick={() =>
                                  handeRemoveProduct(field.categoryID, index)
                                }
                              >
                                Ta bort
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </div>
                    ))
                  ) : (
                    <div>Inga maträtter tillagda</div>
                  )}
                </div>
                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>

          <div className="flex justify-end mt-3 mr-12">
            <button
              type="button"
              onClick={() => {
                setEditWindow(true);
                saveCatID(field.categoryID);
                // setCategoryID(field.categoryID);
              }}
            >
              Lägg till maträtt
            </button>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProdSection;
