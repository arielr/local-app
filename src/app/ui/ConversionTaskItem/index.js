import {
  AiOutlineFileImage,
  AiOutlineClose,
  AiOutlineRight,
  AiOutlineDownload,
  AiOutlineExclamationCircle,
  AiOutlineSetting,
  AiOutlineDelete,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  ConversionTask,
  ConversionStatus,
} from "../../entities/ConvertionTask.js";
import { FileFormat, FileCategory } from "../../entities/FileFormat.js";
import FilesUtils from "../../utils/filesUtils.js";
import DefaultVideoSettings from "../ExtensionSettings/DefaultVideoSettings.js";
import { fileFormatToSettingsModal } from "../ExtensionSettings/ExtensionToSettingsModal.js";
import TargetFormatDropdown from "./TargetFormatDropdown.js";

const ConversionTaskItem = ({ fileData, updateItem, removeItem }) => {
  const { status, id, targetFormat, file, converted } = fileData;
  const [sourceFormat, setSourceFormat] = useState("Unkown");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fileData.onProgress = setProgress;
    if (fileData.file) {
      fileData.getSourceFileType().then((res) => {
        setSourceFormat(res);
      });
    }
  }, []);

  function downloadFile() {
    FilesUtils.downloadFile(converted);
  }

  function getSettingsButton() {
    if (
      (targetFormat?.category == FileCategory.VIDEO ||
        targetFormat == FileFormat.GIF ||
        targetFormat == FileFormat.WebP) &&
      status != ConversionStatus.PROCESSING &&
      !converted
    ) {
      const key = `settings_${fileData.id}_${fileData.targetFormat.name}_${targetFormat?.status}`;
      return <DefaultVideoSettings key={key} {...fileData} />;
    }

    return (
      <button
        disabled={true}
        className="btn btn-sm h-full bg-red-200 sm:btn-md"
      >
        <AiOutlineSetting className="size-5" />
      </button>
    );
  }

  // function getSettingsButton() {
  //   const key = `settings_${fileData.id}_${fileData?.targetFormat?.name}`;
  //   const enableSettings =
  //     targetFormat?.category == FileCategory.VIDEO && !targetFormat?.converted;
  //   return (
  //     <DefaultVideoSettings
  //       key={key}
  //       {...fileData}
  //       isDisabled={!enableSettings}
  //     />
  //   );
  // }

  function getButtonByStatus(isSmallScreen) {
    return (
      <div
        className={
          isSmallScreen ? "w-fill inline p-2 sm:hidden" : "hidden sm:inline"
        }
      >
        {status == ConversionStatus.NONE && (
          <button
            className="items-center justify-center bg-base-100 sm:flex"
            onClick={() => removeItem(fileData)}
          >
            <AiOutlineDelete className="size-6 text-base-300 hover:text-accent" />
          </button>
        )}
        {status === ConversionStatus.PROCESSING && (
          <div
            className="radial-progress text-sm text-base-content"
            style={{ "--value": progress * 100, "--size": "3rem" }}
            role="progressbar"
          >
            {Math.round(progress * 100)}%
          </div>
        )}
        {status === ConversionStatus.ERROR && (
          <div className="btn btn-square">
            <div
              className="tooltip-open tooltip-error hover:tooltip"
              data-tip={fileData.getErrorMessage()}
            >
              <AiOutlineExclamationCircle className="size-7 text-error" />
            </div>
          </div>
        )}

        {status == ConversionStatus.DONE && (
          <button
            className="btn btn-square btn-sm aspect-square sm:btn-md"
            onClick={downloadFile}
          >
            <AiOutlineDownload className="size-6" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-11/12 flex-col items-center justify-between rounded-xl border-2 border-base-300 bg-base-100 p-4 text-secondary-content shadow-md sm:flex-row sm:px-6 sm:py-4">
      <div className="flex w-full flex-row items-center justify-between sm:w-fit sm:justify-between">
        <div className="flex flex-row items-center justify-center space-x-2 sm:pl-3 md:items-center">
          <AiOutlineFileImage className="hidden size-8 text-base-content sm:inline" />
          <p className="line-clamp-1 text-primary-content">{file?.name}</p>
          <div className="text-sm text-gray-400">
            {FilesUtils.formatBytes(file?.size)}
          </div>
        </div>

        {getButtonByStatus(true)}
      </div>
      <div className="h-fill mt-4 flex w-full justify-between space-x-4 px-2 sm:mt-0 sm:w-fit">
        <TargetFormatDropdown
          disabled={status == ConversionStatus.PROCESSING}
          sourceFormat={sourceFormat}
          updateSelectedFormat={(newFileFormat) => {
            console.log("TargetFormatDropdown", newFileFormat);
            fileData.updateFileFormat(newFileFormat);
            updateItem(fileData);
          }}
        />
        {getSettingsButton()}
      </div>
      {/* <div className="h-4 w-full sm:hidden"></div> */}
      {/* <div className="flex h-full items-center justify-between space-x-2 px-2 sm:flex-row sm:justify-between">
        <div className="hidden text-gray-400">
          {FilesUtils.formatBytes(file?.size)}
        </div>
      </div> */}
      {getButtonByStatus(false)}
    </div>
  );
};

export default ConversionTaskItem;
