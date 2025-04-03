import React, { useState, useEffect, useRef } from "react";

interface SearchTextBoxProps {
//   title: string;
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
      <div>
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          onClick={() => setShowData(true)}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onFocus={() => setShowData(true)}
          onBlur={() => !selectionAllow && setShowData(false)}
          disabled={disable}
          maxLength={maxLength}
          autoComplete="off"
          className={`p-2 border border-gray-p-350 rounded-md w-full outline-none focus-within:shadow-input-ring  ${
            errors ? " border-status-danger-800" : " border-gray-o-400"
          } focus:ring-0 ${
            errors
              ? " focus:border-status-danger-800"
              : "focus:border-primary-o-600"
          } text-sm disabled:text-gray-p-250 disabled:bg-gray-p-150`}
        />
        {errors && (
          <p className="text-status-danger-800 font-medium">{errors}</p>
        )}
      </div>
      {showData && text.length >= searchAfterChar && (
        <div
          className="absolute w-full max-h-32 overflow-y-auto text-sm bg-white z-50 rounded-md"
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
                    className="hover:bg-secondary-g-50 cursor-pointer px-3 py-1"
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
