"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormSection from "./FormSection";
import CategoryNamePopup from "./CategoryNamePopup";
import { createProduct } from "@/lib/actions/products.actions";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import {
  fetchMenuPublished,
  updateMenuPublished,
} from "@/lib/actions/menuPublished.action";

const MenuList = ({ data, dataPublished }) => {
  const productsData = data[0].products;

  const [formField, setFormField] = useState(data[0].products);
  const [isNewCategoryWindowOpen, setNewCategoryWindowOpen] = useState(false);
  const [isCategoryName, setCategoryName] = useState("");
  const [isCategoryNameEng, setCategoryNameEng] = useState("");
  const [isSortable, setSortable] = useState(false);
  const [isPublished, setPublished] = useState(productsData);
  const [inLanguage, setLanguage] = useState("sv");

  const handleDragStartCategory = () => {
    //toggleExpand(false);
  };

  const handleDragEndCategory = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const _formField = Array.from(formField);

    const [_formFieldCategory] = _formField.splice(source.index, 1);

    _formField.splice(destination.index, 0, _formFieldCategory);

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

  const handleDragStartProduct = () => {};

  const handleDragEndProduct = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const _formField = formField;
    console.log(_formField[source.droppableId].products);
    const [_isDataPerson] = _formField[source.droppableId].products.splice(
      source.index,
      1
    );
    _formField[source.droppableId].products.splice(
      destination.index,
      0,
      _isDataPerson
    );
    console.log(_formField);
    setFormField(_formField);

    try {
      if (formField !== undefined) {
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
      console.log("haha");
    }
  };

  const handleDropdownProducts = (CatId, prodId) => {
    console.log(prodId);
    const index = formField.findIndex((item) => item.categoryID === CatId);
    const indexProd = formField[index].products.findIndex(
      (item) => item._id === prodId
    );
    console.log(indexProd);
    let _formField = [...formField];
    _formField[index].products[indexProd].expanded =
      !_formField[index].products[indexProd].expanded;
    console.log(_formField);
    setFormField(_formField);

    try {
      createProduct(_formField);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpand = (expand) => {
    let _formField = [...formField];
    console.log(_formField);
    _formField.map((item) => {
      item.expanded = expand;
    });
    console.log(_formField);
    setFormField(_formField);
  };

  const handleSort = () => {
    handleExpand();
    setSortable((prevCheck) => !prevCheck);
  };

  const handleNewSectionSubmit = async (e) => {
    e.preventDefault();

    let _formField = [];
    if (formField) {
      _formField = [...formField];
      console.log(formField);
      console.log(_formField);
    }
    console.log(isCategoryName);
    _formField.push({
      _id: uuidv4(),
      categoryName: isCategoryName,
      categoryNameEng: isCategoryNameEng,
      categoryID: uuidv4(),
      expanded: true,
      products: [],
    });
    console.log(_formField);
    setFormField([]);
    setFormField(_formField);
    console.log(_formField);

    setCategoryName("");

    /*
    const antal = _formField.length;
    const lastCategory = document.getElementById(antal.toString());
    console.log(antal);
    lastCategory.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    */

    try {
      createProduct(_formField);
      setNewCategoryWindowOpen(false);
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
          setNewCategoryWindowOpen(false);
        } else {
          console.log("not ok");
        }
        */
    } catch (error) {
      console.log("haha");
    }
  };

  const handleChangePrublished = (e) => {
    console.log(e);
    setPublished(!isPublished);
    updateMenuPublished(e);
  };

  return (
    <div className="bg-slate-100 w-full min-h-screen relative overflow-hidden z-10 ">
      <div className=" mt-4 mr-16 gap-3 flex justify-end items-center">
        Publicera menyn{" "}
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={isPublished}
          value={isPublished}
          onChange={(e) => handleChangePrublished(e.target.checked)}
        />
      </div>
      <div className=" bg-slate-100  px-8">
        <div className="flex flex-col m-auto pt-8 ">
          <Header handleSort={handleSort} handleExpand={handleExpand} />
          <ToastContainer />
          <FormSection
            isSortable={isSortable}
            setSortable={setSortable}
            formField={formField}
            setFormField={setFormField}
            handleDragStartCategory={handleDragStartCategory}
            handleDragEndCategory={handleDragEndCategory}
            handleDragStartProduct={handleDragStartProduct}
            handleDragEndProduct={handleDragEndProduct}
            handleDropdownProducts={handleDropdownProducts}
          />
          <Footer setNewCategoryWindowOpen={setNewCategoryWindowOpen} />
        </div>
      </div>
      {isNewCategoryWindowOpen && (
        <CategoryNamePopup
          isCategoryName={isCategoryName}
          setCategoryName={setCategoryName}
          isCategoryNameEng={isCategoryNameEng}
          setCategoryNameEng={setCategoryNameEng}
          isNewCategoryWindowOpen={isNewCategoryWindowOpen}
          setNewCategoryWindowOpen={setNewCategoryWindowOpen}
          handleNewSectionSubmit={handleNewSectionSubmit}
          inLanguage={inLanguage}
          setLanguage={setLanguage}
        />
      )}
    </div>
  );
};

export default MenuList;
