import { createProduct } from "@/lib/actions/products.actions";
import { cn } from "@/utils/utils";
import React, { useState } from "react";

import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";

const InputCategoryName = ({
  icon: Icon,
  name,
  nameEng,
  value,
  valueEng,
  label,
  isLabel = true,
  type,
  onChange,
  placeholder,
  width = "w-full",
  strokeWidth = "0.5",
  isSetEdit,
  setSetEdit,
  categoryIndex,
  formField,
  setFormField,
  categoryID,
}) => {
  const [isData, setData] = useState(value);
  const [isDataEng, setDataEng] = useState(valueEng ? valueEng : "");
  const [inLanguage, setLanguage] = useState("sv");

  const handleEditCategory = (e) => {
    setSetEdit({ edit: false, index: 500 });
    e.stopPropagation();

    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );

    console.log("myIIIIIIndex", categoryIndex);

    let _formField = [...formField];

    if (inLanguage === "sv") {
      _formField[categoryIndex].categoryName = isData;
    } else {
      _formField[categoryIndex].categoryNameEng = isDataEng;
    }

    setFormField(_formField);

    createProduct(_formField);
  };

  const handleLangSv = (e) => {
    e.stopPropagation();
    setLanguage("sv");
  };

  const handleLangEng = (e) => {
    e.stopPropagation();
    setLanguage("eng");
  };

  return (
    <>
      <div className="w-full ">
        {isLabel ? (
          <div className="mb-2">
            <label>{label}</label>
          </div>
        ) : (
          ""
        )}
        <div className="flex focus-within:text-red-500">
          {Icon ? (
            <div
              className={cn(
                "top-0 flex h-12 w-12 items-center justify-center ",
                isEdit
                  ? "bg-white rounded-bl-md rounded-tl-md border-y border-l"
                  : ""
              )}
            >
              <span>
                <Icon strokeWidth={strokeWidth} className=" size-6 " />
              </span>
            </div>
          ) : (
            ""
          )}

          {type === "textarea" ? (
            <>
              {isSetEdit.edit === true && isEdit.index === categoryIndex ? (
                <textarea
                  name={name}
                  value={isData}
                  placeholder={placeholder}
                  onChange={onChange}
                  className="h-16 w-full rounded-sm border pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                />
              ) : (
                <div className="h-16 w-full border-b  pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  {isData}
                </div>
              )}
            </>
          ) : (
            <div className="flex w-full">
              {isSetEdit.edit == true && isSetEdit.index == categoryIndex ? (
                <div className="gap-3 items-center relative w-full">
                  <div className="w-full flex justify-center">
                    {inLanguage === "sv" ? (
                      <input
                        name={name}
                        value={isData}
                        placeholder={placeholder}
                        onChange={(e) => {
                          setData(e.target.value);
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="h-12 text-center rounded-sm border border-blue-300 pt-[0px] pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                      />
                    ) : (
                      <input
                        name={nameEng}
                        value={isDataEng}
                        placeholder={placeholder}
                        onChange={(e) => {
                          setDataEng(e.target.value);
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="h-12 text-center rounded-sm border border-blue-300 pt-[0px] pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                      />
                    )}
                  </div>
                  <div className="absolute right-2 top-1 z-50 flex items-center">
                    <div className="flex justify-end items-end gap-2 w-full  text-white z-50 ">
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
                    <FaCheck onClick={(e) => handleEditCategory(e)} />
                  </div>
                </div>
              ) : (
                <div className="h-12 w-full flex justify-center items-center pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  <div>{isData}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputCategoryName;
