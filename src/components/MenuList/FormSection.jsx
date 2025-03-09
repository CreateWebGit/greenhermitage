import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import Dropdown from "../Dropdowns";
import Input from "../Input";
import { cn } from "@/utils/utils";

import { IoPricetagsOutline } from "react-icons/io5";
import { HandPlatter, Trash2 } from "lucide-react";
import {
  BsArrowsCollapse,
  BsArrowsCollapseVertical,
  BsArrowsExpand,
  BsInfoLg,
} from "react-icons/bs";

import { RiDraggable } from "react-icons/ri";

import anime from "animejs";
import ProdSection from "./ProdSection";
import { createProduct } from "@/lib/actions/products.actions";
import DropdownProd from "../DropdownsProd";

const FormSection = ({
  isSortable,
  setSortable,
  field,
  categoryIndex,
  index,
  formField,
  setFormField,

  handleDragStartCategory,
  handleDragEndCategory,
  handleDragStartProduct,
  handleDragEndProduct,
  handleDropdownProducts,
}) => {
  const [isCategoryID, setCategoryID] = useState("");
  const [isAllCollapsed, setAllCollapsed] = useState(false);
  const [isProductTitle, setProductTitle] = useState("");
  const [isProductPrice, setProductPrice] = useState("");
  const [isProductDescription, setProductDescription] = useState("");
  const [isProductVegan, setProductVegan] = useState(false);
  const [isEditWindow, setEditWindow] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const saveCatID = async (id) => {
    await setCategoryID(id);
    console.log(isCategoryID);
  };

  const handleChangesCategory = (id, event) => {
    console.log("jaja");
    const index = formField.findIndex((product) => product.categoryID === id);
    console.log(index);
    let _formField = [...formField];

    _formField[index][event.target.name] = event.target.value;
    console.log("hahaha", _formField);
    setFormField(_formField);
  };

  const handleNewProductSubmit = async (id, i) => {
    const index = formField.findIndex((product) => product.categoryID === id);
    console.log("jaja");
    let _formField = [...formField];
    _formField[index].products.push({
      _id: uuidv4(),
      expanded: true,
      title: isProductTitle,
      price: isProductPrice,
      description: isProductDescription,
      vegan: isProductVegan,
    });

    setFormField(_formField);

    setCategoryID("");
    setProductDescription("");
    setProductPrice("");
    setProductTitle("");
    setProductVegan(false);

    try {
      console.log("hihihihih");
      if (formField !== undefined) {
        console.log("myFormField", _formField);
        createProduct(_formField);

        /*
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
        */
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangesProduct = (categoryID, id, event) => {
    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );
    console.log(categoryIndex);
    console.log(id);
    let _formField = [...formField];

    const productIndex = formField[categoryIndex].products.findIndex(
      (product) => product._id === id
    );
    console.log(id);

    _formField[categoryIndex].products[productIndex][event.target.name] =
      event.target.value;

    setFormField(_formField);
  };

  const toggle = (e, id) => {
    e.stopPropagation();
    console.log(id);
    const index = formField.findIndex((item) => item.categoryID === id);
    console.log(index);
    let _formField = [...formField];
    _formField[index].expanded = !_formField[index].expanded;
    console.log(_formField);
    setFormField(_formField);

    try {
      createProduct(_formField);
    } catch (error) {
      console.log(error);
    }
  };

  const swipeLeftDataSimple = (name) => ({
    content: (
      <div className=" inline-block">
        <span>Right content</span>
      </div>
    ),
    action: () => console.log("Hej"),
  });

  var startTouchX;
  const handleTouchStart = (e) => {
    startTouchX = e.touches[0].pageX;
    console.log(e);
    e.stopPropagation();
    e.target.dataset.x =
      Number(e.touches[0].pageX) + Number(e.target.dataset.move) || 0;
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    let moveX = Number(e.target.dataset.x) - e.touches[0].pageX;

    moveX > 50 ? (moveX = 50) : null;
    moveX < -50 ? (moveX = -50) : null;

    e.target.dataset.move = moveX;

    if (e.touches[0].pageX < startTouchX - 50) {
      //animeJS functions
      const timeline = anime.timeline({
        duration: 300,
      });

      timeline.add({
        targets: e.target,
        translateX: Number(e.target.dataset.move),
      });
    }

    if (e.touches[0].pageX > startTouchX + 50) {
      //animeJS functions
      const timeline = anime.timeline({
        duration: 300,
      });

      timeline.add({
        targets: e.target,
        translateX: -Number(e.target.dataset.move),
      });
      setSortable(false);
    }
  };

  var startX;
  const handleDragStarten = (e) => {
    startX = e.pageX;
    console.log(e);
    e.target.dataset.x = Number(e.pageX) + Number(e.target.dataset.move) || 0;
  };

  const handleDragMove = (e) => {
    let moveX = Number(e.target.dataset.x) - e.pageX;

    moveX > 50 ? (moveX = 50) : null;
    moveX < -50 ? (moveX = -50) : null;

    e.target.dataset.move = moveX;

    console.log(e.pageX);
    console.log(e.pageX);

    if (e.pageX > startX + 80) {
      //animeJS functions
      const timeline = anime.timeline({
        duration: 300,
      });

      timeline.add({
        targets: e.target,
        translateX: -Number(e.target.dataset.move),
      });
      setSortable(false);
    }
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={handleDragEndCategory}
        onDragStart={handleDragStartCategory}
      >
        <Droppable droppableId="haha">
          {(droppableProvider, snapshot) => (
            <div
              className={cn(
                "flex flex-col gap-1",
                snapshot.isDraggingOver ? "" : ""
              )}
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {formField?.map((field, categoryIndex, index) => (
                <div key={field.categoryID}>
                  <div
                    id={categoryIndex}
                    className={cn(
                      " fixed top-0 left-[200px] right-0  bottom-0 bg-slate-500/90  h-full justify-center items-center z-[999]",
                      isEditWindow && isCategoryID === field.categoryID
                        ? "flex"
                        : "hidden"
                    )}
                  >
                    <div className=" bg-white w-10/12 h-5/6 pt-32 px-16 pb-4 absolute ">
                      <div
                        className=" absolute top-2 right-2"
                        onClick={() => {
                          setEditWindow(false);
                          setCategoryID("");
                        }}
                      >
                        X
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col grow ">
                          <Input
                            name="title"
                            label="Titel"
                            type="text"
                            value={isProductTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                            placeholder="Titel på maträtt"
                            Icon={HandPlatter}
                          />
                        </div>
                        <div className="flex flex-col grow-0 w-1/4">
                          <Input
                            name="price"
                            label="Pris"
                            type="text"
                            value={isProductPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="Pris"
                            Icon={IoPricetagsOutline}
                          />
                        </div>
                      </div>
                      <div>
                        <Input
                          name="price"
                          label="Beskrivning"
                          type="textarea"
                          value={isProductDescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          placeholder="Kort beskrivning"
                          Icon={BsInfoLg}
                        />
                      </div>
                      <div className="allergiesContainer">
                        <input
                          type="checkbox"
                          id="veganskt"
                          name="alergier"
                          value={isProductVegan}
                          onChange={(e) => setProductVegan(e.target.value)}
                        />
                        <label htmlFor="veganskt">Veganskt</label>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleNewProductSubmit(
                            field.categoryID,
                            categoryIndex
                          )
                        }
                      >
                        Registrera
                      </button>
                    </div>
                  </div>

                  <Dropdown
                    title={field?.categoryName}
                    id={field?.categoryID}
                    onClick={(e) => {
                      toggle(e, field?.categoryID);
                      // setSortable(false);
                    }}
                    onTouchStart={(e) => {
                      handleTouchStart(e);
                    }}
                    onTouchMove={(e) => {
                      handleTouchMove(e);
                    }}
                    onDragStart={(e) => {
                      handleDragStarten(e);
                    }}
                    onDragMove={(e) => {
                      handleDragMove(e);
                    }}
                    expanded={field?.expanded}
                    field={field}
                    categoryIndex={categoryIndex}
                    isSortable={isSortable}
                    setSortable={setSortable}
                    isActionOpen={isActionOpen}
                    setIsActionOpen={setIsActionOpen}
                    formField={formField}
                    setFormField={setFormField}
                    categoryID={field.categoryID}
                  >
                    <ProdSection
                      formField={formField}
                      setFormField={setFormField}
                      field={field}
                      isEditWindow={isEditWindow}
                      setEditWindow={setEditWindow}
                      handleDragStartProduct={handleDragStartProduct}
                      handleDragEndProduct={handleDragEndProduct}
                      categoryIndex={categoryIndex}
                      handleDropdownProducts={handleDropdownProducts}
                      saveCatID={saveCatID}
                    />
                  </Dropdown>
                </div>
              ))}
              {droppableProvider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FormSection;
