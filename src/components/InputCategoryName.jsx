import { createProduct } from "@/lib/actions/products.actions";
import { cn } from "@/utils/utils";
import React, { useState } from "react";

import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";

const InputCategoryName = ({
  icon: Icon,
  name,
  value,
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

  const handleEditCategory = (e) => {
    setSetEdit({ edit: false, index: 500 });
    e.stopPropagation();

    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );

    console.log("myIIIIIIndex", categoryIndex);

    let _formField = [...formField];

    _formField[categoryIndex].categoryName = isData;

    setFormField(_formField);

    createProduct(_formField);
  };

  return (
    <>
      <div className="m-auto">
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
                  {value}
                </div>
              )}
            </>
          ) : (
            <div className="flex">
              {isSetEdit.edit == true && isSetEdit.index == categoryIndex ? (
                <div className="flex gap-3 items-center">
                  <input
                    name={name}
                    value={isData}
                    placeholder={placeholder}
                    onChange={(e) => setData(e.target.value)}
                    className="h-12 w-full text-center rounded-sm border pt-[0px] pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                  />
                  <FaCheck onClick={(e) => handleEditCategory(e)} />
                </div>
              ) : (
                <div className="h-12 w-full flex items-center pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  <div>{value}</div>
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
