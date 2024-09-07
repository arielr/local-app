import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FileFormat, FileCategory } from "../../entities/FileFormat";
import classNames from "classnames";

const formats = [
  FileFormat.getImageFormats(),
  FileFormat.getVideoFormats(),
  FileFormat.getAudioFormats(),
];

const TargetFormatDropdown = ({ updateSelectedFormat }) => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFormatType, setSelectedFormatType] = useState(0);

  function updateFormat(selectedFormat) {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }

    updateSelectedFormat(selectedFormat);
    setSelectedFormat(selectedFormat);
  }

  return (
    <div className="dropdown flex">
      <div
        tabIndex={0}
        role="button"
        className="sm:btn-xl btn btn-sm sm:btn-md"
      >
        {selectedFormat ? selectedFormat.name : "..."}
        <AiOutlineDown />
      </div>
      <div
        tabIndex={0}
        className="menu dropdown-content z-10 flex w-72 flex-row justify-center rounded-box bg-base-100 shadow"
      >
        <div className="h-fill flex w-1/5 flex-col items-center justify-start">
          <ul className="overflow-auto *:rounded-l-md *:p-2 *:text-base-content">
            <li
              className={classNames("border-b-2 hover:bg-slate-200", {
                "bg-slate-200": selectedFormatType == 0,
              })}
              onMouseEnter={() => {
                setSelectedFormatType(0);
              }}
            >
              Image
            </li>
            <li
              className={classNames("hover:bg-slate-200", {
                "bg-slate-200": selectedFormatType == 1,
              })}
              onMouseEnter={() => setSelectedFormatType(1)}
            >
              Video
            </li>
            <li
              className={classNames("hover:bg-slate-200", {
                "bg-slate-200": selectedFormatType == 2,
              })}
              onMouseEnter={() => setSelectedFormatType(2)}
            >
              Audio
            </li>
          </ul>
        </div>
        <div className="w-4/5">
          <ul className="menu grid grid-cols-3 gap-2 overflow-auto">
            {formats[selectedFormatType].map((format, index) => (
              <li
                className={classNames("text-neutral", {
                  "rounded-xl bg-base-300": format == selectedFormat,
                })}
                key={index}
              >
                <a className="truncate" onClick={() => updateFormat(format)}>
                  {format.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TargetFormatDropdown;
