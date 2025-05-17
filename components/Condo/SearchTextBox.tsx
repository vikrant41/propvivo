import React, { useState, useEffect, useRef } from "react";

interface SearchTextBoxProps {
  name: string;
  placeholder: string;
  required?: boolean;
  disable?: boolean;
  maxLength?: number;
  errors?: any;
  searchAfterChar?: number;
  data: { name?: string; code?: string; lineId?: string; filedName?: string }[];
  onChangeValue: (text: string, lineId: string, e?: any) => void;
  selectionAllow?: boolean;
  selectedValue?: string;
  handleSetValue: (x: any) => void;
  onManualInputChange?: (text: string) => void;
}

const SearchTextBox = ({
  name,
  placeholder,
  required = false,
  disable = false,
  maxLength = 50,
  errors,
  searchAfterChar = 3,
  data = [],
  onChangeValue,
  selectionAllow = false,
  selectedValue,
  handleSetValue = () => {
    return;
  },
  onManualInputChange,
}: SearchTextBoxProps) => {
  const [text, setText] = useState(selectedValue !== "" ? selectedValue : "");
  const [lineId, setlineId] = useState("");

  const [showData, setShowData] = useState(false);
  const ref = useRef(null);

  // useEffect(() => {
  //   selectedValue ? setText(selectedValue): setText("");
  // }, [selectedValue]);

  useEffect(() => {
    onChangeValue(text, lineId);
  }, [text]);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref?.current?.contains(e?.target)) {
        setShowData(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative">
      <div className="text-sm font-medium w-fit mb-1">
        {/* <span className=" text-black-b-300">{title}</span> */}
        {required && <span className="text-status-danger-800">*</span>}
      </div>
      <div className="">
        <div className="flex items-center border-b border-gray-o-60">
          <input
            name={name}
            type="text"
            placeholder={placeholder}
            onClick={() => setShowData(true)}
            value={text}
            onChange={(e) => {
              const newText = e.target.value;
              setText(newText);
              onManualInputChange?.(newText);
            }}
            onFocus={() => setShowData(true)}
            onBlur={() => !selectionAllow && setShowData(false)}
            disabled={disable}
            maxLength={maxLength}
            autoComplete="off"
            className={`w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack  ${
              errors ? " border-status-danger-800" : " border-gray-o-400"
            } focus:ring-0 ${
              errors
                ? " focus:border-status-danger-800"
                : "focus:border-primary-o-600"
            } text-17 disabled:text-gray-p-250 disabled:bg-gray-p-150 text-pvBlack `}
          />
        </div>
        <div>{errors && <p className="text-red-500 text-sm">{errors}</p>}</div>
      </div>
      {showData && text.length >= searchAfterChar && (
        <div
          className="absolute w-full max-h-32 overflow-y-auto text-sm bg-white z-50 rounded-md shadow-md p-2 border space-y-1"
          ref={ref}
        >
          {data &&
            data?.map(
              (e) =>
                ((e.name &&
                  e.name.toLowerCase().startsWith(text.toLowerCase())) ||
                  (e.code &&
                    e.code.toLowerCase().startsWith(text.toLowerCase()))) && (
                  <div
                    key={e.code || e.name}
                    className="p-2 cursor-pointer font-normal text-sm text-dropdownText hover:bg-dropdownHover hover:text-accent1 transition-all leading-none flex gap-2 rounded-md"
                    onClick={() => {
                      setText(e.name || e.code || e.lineId);
                      if (e.filedName === "glCode") {
                        setlineId(e.lineId);
                      }
                      selectionAllow &&
                        (setShowData(false),
                        onChangeValue(e.name || e.code, e.lineId),
                        handleSetValue(e));
                    }}
                  >
                    <span>
                      {e.name &&
                      e.name.toLowerCase().startsWith(text.toLowerCase())
                        ? e.name
                        : e.code &&
                          e.code.toLowerCase().startsWith(text.toLowerCase())
                        ? e.code
                        : ""}
                    </span>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default SearchTextBox;
