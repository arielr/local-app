import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FileFormat, FileCategory } from "../../entities/FileFormat";
import classNames from "classnames";

const formats = [
  ["Image", FileFormat.getImageFormats()],
  ["Video", FileFormat.getVideoFormats()],
  ["Audio", FileFormat.getAudioFormats()],
];

const TargetFormatDropdown = ({ sourceFormat, updateSelectedFormat }) => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFormatType, setSelectedFormatType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [formatOptions, setFormatOptions] = useState();

  useEffect(() => {
    setFormatOptions(formats);
    console.log("TARGETFORMAT", sourceFormat);
    if (sourceFormat?.category == FileCategory.IMAGE) {
      setFormatOptions([formats[0]]);
    }
    if (sourceFormat?.category == FileCategory.VIDEO) {
      const newImage = ["Image", [FileFormat.GIF, FileFormat.WebP]];
      setFormatOptions([formats[1], formats[2], newImage]);
    }
    if (sourceFormat?.category == FileCategory.AUDIO) {
      setFormatOptions([formats[2]]);
    }
  }, [sourceFormat]);

  function updateFormat(selectedFormat) {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }

    updateSelectedFormat(selectedFormat);
    setSelectedFormat(selectedFormat);
  }

  return (
    <div className="dropdown- dropdown flex sm:dropdown-left">
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
        className="menu dropdown-content z-10 flex w-fit flex-row justify-center space-y-2 rounded-box bg-base-100 px-2 shadow sm:w-96"
      >
        <div className="w-full py-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="grow text-base-content"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="h-fill flex w-1/5 flex-col items-center justify-start">
          <ul className="overflow-auto *:rounded-l-md *:p-2 *:text-base-content">
            {formatOptions?.map((f, index) => {
              const categoryName = f[0];
              return (
                <li
                  key={categoryName}
                  className={classNames("hover:bg-slate-200", {
                    "bg-slate-200": selectedFormatType == index,
                  })}
                  onMouseEnter={() => setSelectedFormatType(index)}
                >
                  {categoryName}
                </li>
              );
            })}
            {/* <li
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
            </li> */}
          </ul>
        </div>
        <div className="w-4/5">
          <ul className="menu grid grid-cols-3 gap-2 overflow-auto">
            {getSupportedFormats().map((format, index) => (
              <li
                className={classNames("text-neutral", {
                  "rounded-xl bg-base-300": format == selectedFormat,
                })}
                key={`${format.name}${index}`}
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

  function getSupportedFormats() {
    console.log(formatOptions);
    if (formatOptions == undefined || formatOptions.length == 0) return [];
    console.log(formatOptions);
    return formatOptions[selectedFormatType][1]?.filter((f) => {
      return (
        searchText.length == 0 ||
        f.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
};

export default TargetFormatDropdown;
