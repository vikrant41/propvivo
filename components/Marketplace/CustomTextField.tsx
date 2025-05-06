import { Field } from "formik";
import React, { useState } from "react";
import { ErrorIcon } from "../shared/Icons";


interface FormTextFieldPropType {
  title?: string;
  name: string;
  type: string;
  maxLength?: string;
  placeholder: string;
  errors?: any;
  required?: boolean;
  showErrorIcon?: boolean;
  value?: string;
  disable?: boolean;
  clsName?: string;
  rows?: number;
  showCharacterCount?: boolean;
  columns?: number;
  min?: any;
  max?: any;
  onChange?: any;
  showDeleteIcon?: boolean;
  onDelete?: (arg: number) => void;
  index?: number;
  disabled?: string;
  mainClsName?: string;
  isShowIcon?: boolean;
  icon?: any;
  handleIconclick?: () => void;
}

export const CustomTextField = ({
  title,
  name,
  type,
  maxLength,
  placeholder,
  errors,
  required = false,
  showErrorIcon = false,
  value,
  disable = false,
  clsName,
  rows,
  columns,
  showCharacterCount = true,
  min,
  max,
  onChange,
  showDeleteIcon = false,
  onDelete,
  index,
  disabled,
  mainClsName,
  isShowIcon = false,
  icon,
  handleIconclick,
}: FormTextFieldPropType) => {
  const InputComponent = type === "textarea" ? "textarea" : "input";
  const maxCharacters = parseInt(maxLength || "100");

  return (
    <div className={`flex flex-col gap-1 ${mainClsName}`}>
      {/* <div className="flex justify-between items-center gap-4 w-full">
        <div className="text-sm font-medium w-fit">
          <span className="text-black-b-300">{title}</span>
          {required && <span className="text-status-danger-800">*</span>}
        </div>
        {showDeleteIcon && (
          <button type="button" onClick={() => onDelete(index)}>
            <DeleteIconDustbin />
          </button>
        )}
      </div> */}
      <div className="relative">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            {icon && icon}
          </div>
          <Field
            as={InputComponent}
            type={type !== "textarea" ? type : undefined}
            maxLength={maxLength}
            name={name}
            value={value}
            placeholder={placeholder}
            rows={rows}
            cols={columns}
            min={min}
            max={max}
            className={`relative px-3 pl-7 py-2 border-b border-gray-p-350 w-full outline-none bg-white font-karla text-associationGray ${
              errors ? "border-status-danger-800" : "border-gray-p-350"
            } focus:ring-0 ${
              errors
                ? "focus:border-status-danger-800"
                : "focus:border-gray-p-350"
            } text-17 disabled:text-gray-400 ${clsName}`}
            disabled={disable}
          />
          {/* {isShowIcon && (
          <span
            className="absolute top-3 right-3 "
            onClick={() => {
              handleIconclick && handleIconclick();
            }}
          >
            {icon && icon}
          </span>
        )} */}
          {type === "textarea" && showCharacterCount && (
            <p
              className={`${
                errors ? "" : ""
              } w-full text-right text-xs font-medium text-gray-o-450`}
            >
              {value ? value.length : 0}/{maxCharacters}
            </p>
          )}
        </div>
        {errors && showErrorIcon && (
          <span className="absolute top-2 right-3">
            <ErrorIcon />
          </span>
        )}
        {errors && (
          <p
            className={` ${
              type === "textarea" && showCharacterCount
                ? "absolute bottom-0 left-0"
                : "relative"
            } text-xs font-medium text-red-500 mt-1`}
          >
            {errors}
          </p>
        )}
      </div>
    </div>
  );
};
