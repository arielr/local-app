import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FileFormat, FileCategory } from "../../entities/FileFormat";
import classNames from "classnames";
import useWindowDimensions from "../../utils/useWindowDimensions.js";

const formats = [
  ["Image", FileFormat.getImageFormats()],
  ["Video", FileFormat.getVideoFormats()],
  ["Audio", FileFormat.getAudioFormats()],
];

const ExtensionSearchBar = ({ searchText, setSearchText }) => (
  <div className="w-full sm:border-b-2">
    <label className="input input-ghost flex items-center justify-center p-4">
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
);

const FileCategoryOptions = ({
  formatOptions,
  selectedFormatType,
  setSelectedFormatType,
}) => (
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
    </ul>
  </div>
);

const FormatsOptions = ({
  getSupportedFormats,
  selectedFormat,
  updateFormat,
}) => (
  <ul className="menu grid grid-cols-3 gap-2 overflow-auto rounded-xl">
    {getSupportedFormats().map((format, index) => (
      <li
        className={classNames("text-neutral", {
          "rounded-xl bg-base-300": format == selectedFormat,
        })}
        key={`${format.name}${index}`}
      >
        <a
          className="truncate"
          onClick={() => {
            updateFormat(format);
            document.getElementById("my_modal_4")?.close();
          }}
        >
          {format.name}
        </a>
      </li>
    ))}
  </ul>
);

const FileCategoryTabMenu = ({
  formatOptions,
  getSupportedFormats,
  selectedFormatType,
  setSelectedFormatType,
}) => (
  <div role="tablist" className="tabs tabs-bordered w-full">
    {formatOptions?.map((f, index) => {
      const categoryName = f[0];
      return (
        <a
          key={`${categoryName}_${index}`}
          role="tab"
          // key={categoryName}
          className={classNames("tab", {
            "tab-active": index == selectedFormatType,
            "text-base-300": getSupportedFormats(index).length == 0,
          })}
          onClick={() => {
            setSelectedFormatType(index);
          }}
        >
          {categoryName}
        </a>
      );
    })}
  </div>
);

const TargetFormatDropdown = ({
  disabled,
  sourceFormat,
  updateSelectedFormat,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFormatType, setSelectedFormatType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [formatOptions, setFormatOptions] = useState();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setFormatOptions(formats);
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

  useEffect(() => {
    if (searchText.length > 0) {
      setSearchText("");
    }
  }, [selectedFormat]);
  function updateFormat(selectedFormat) {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }

    updateSelectedFormat(selectedFormat);
    setSelectedFormat(selectedFormat);
  }
  function isMobileScreen() {
    // https://tailwindcss.com/docs/screens     'sm': '640px',
    return width <= 640;
  }

  if (isMobileScreen()) {
    return (
      <>
        <div
          onClick={
            disabled
              ? () => {}
              : () => document.getElementById("my_modal_4").showModal()
          }
          tabIndex={0}
          role="button"
          className={classNames("sm:btn-xl btn btn-sm sm:btn-md", {
            "btn-disabled": disabled,
          })}
        >
          {selectedFormat ? selectedFormat.name : "..."}
          <AiOutlineDown />
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box h-1/2 w-11/12 max-w-5xl">
            <ExtensionSearchBar
              searchText={searchText}
              setSearchText={setSearchText}
            />

            {searchText.length == 0 && (
              <FileCategoryTabMenu
                formatOptions={formatOptions}
                getSupportedFormats={getSupportedFormats}
                selectedFormatType={selectedFormatType}
                setSelectedFormatType={setSelectedFormatType}
              />
            )}
            <div className="h-4"></div>
            <FormatsOptions
              getSupportedFormats={() =>
                getSupportedFormats(selectedFormatType)
              }
              selectedFormat={selectedFormat}
              updateFormat={updateFormat}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSearchText("")}>close</button>
          </form>
        </dialog>
      </>
    );
  }
  return (
    <div className="dropdown dropdown-end flex">
      <div
        tabIndex={0}
        role="button"
        className={classNames("sm:btn-xl btn btn-sm sm:btn-md", {
          "btn-disabled": disabled,
        })}
      >
        {selectedFormat ? selectedFormat.name : "..."}
        <AiOutlineDown />
      </div>
      <div
        tabIndex={0}
        className="menu dropdown-content z-10 flex flex-row justify-center space-y-4 rounded-box bg-base-100 px-4 shadow sm:w-96"
      >
        <ExtensionSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {searchText.length == 0 && (
          <FileCategoryOptions
            formatOptions={formatOptions}
            selectedFormatType={selectedFormatType}
            setSelectedFormatType={setSelectedFormatType}
          />
        )}
        <div className="w-4/5">
          <FormatsOptions
            getSupportedFormats={() => getSupportedFormats(selectedFormatType)}
            selectedFormat={selectedFormat}
            updateFormat={updateFormat}
          />
        </div>
      </div>
    </div>
  );

  function getSupportedFormats(formatTypeIndex) {
    if (formatOptions == undefined || formatOptions.length == 0) return [];

    return formatOptions[formatTypeIndex][1]?.filter((f) => {
      return (
        searchText.length == 0 ||
        f.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
};

export default TargetFormatDropdown;
