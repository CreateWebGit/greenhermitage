import { cn } from "@/utils/utils";
import React from "react";

const Input = ({
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
  strokeWidth = "0.5",
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
                  className="h-16 w-full rounded-sm border pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                />
              ) : (
                <div className="h-16 w-full border-b  pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  {value}
                </div>
              )}
            </>
          ) : (
            <>
              {isEdit ? (
                <input
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                  className="h-12 w-full rounded-sm border pt-[0px] pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
                />
              ) : (
                <div className="h-12 w-full border-b pt-[11px] pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700">
                  {value}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
