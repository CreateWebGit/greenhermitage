import { cn } from "@/utils/utils";
import React from "react";

const InputProductName = ({
  icon: Icon,
  name,
  value,
  label,
  isLabel = true,
  type,
  onChange,
  placeholder,
  width = "w-full",
  isEdit = true,
  strokeWidth = "0",
}) => {
  return (
    <>
      <div className={`mb-2 ${width}`}>
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
              {isEdit ? (
                <textarea
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                  className="h-10 w-full  pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                />
              ) : (
                <div className="h-10 w-full  pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  {value}
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center w-full">
              {isEdit ? (
                <input
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                  className="h-6 pt-[0px] text-center pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                />
              ) : (
                <div className="h-6 w-full flex items-center justify-center pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  {value}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputProductName;
