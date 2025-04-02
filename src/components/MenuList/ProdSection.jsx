"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { BsArrowsCollapse, BsArrowsExpand, BsInfo } from "react-icons/bs";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Product";

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
                        <Product
                          formField={formField}
                          setFormField={setFormField}
                          product={product}
                          field={field}
                          index={index}
                          handleDropdownProducts={handleDropdownProducts}
                        />
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
