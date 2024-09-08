import {
  AiOutlineFileImage,
  AiOutlineClose,
  AiOutlineRight,
  AiOutlineDownload,
  AiOutlineExclamationCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { ConversionTask, Status } from "../../entities/ConvertionTask.js";
import { FileFormat, FileCategory } from "../../entities/FileFormat.js";
import FilesUtils from "../../utils/filesUtils.js";
import DefaultVideoSettings from "../ExtensionSettings/DefaultVideoSettings.js";
import { fileFormatToSettingsModal } from "../ExtensionSettings/ExtensionToSettingsModal.js";
import TargetFormatDropdown from "./TargetFormatDropdown.js";

const ConversionTaskItem = ({ fileData, updateItem, removeItem }) => {
  const { status, id, targetFormat, file, converted } = fileData;
  const [sourceFormat, setSourceFormat] = useState("Unkown");
  const [progress, setProgress] = useState(0);

  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    fileData.onProgress = setProgress;
    if (fileData.file) {
      fileData.getSourceFileType().then((res) => {
        console.log("ssss", res);
        setSourceFormat(res);
      });
    }
  }, []);

  function downloadFile() {
    FilesUtils.downloadFile(converted);
  }

  function getSettingsButton() {
    if (targetFormat?.category == FileCategory.VIDEO) {
      const key = `settings_${fileData.id}_${fileData.targetFormat.name}`;
      return <DefaultVideoSettings key={key} {...fileData} />;
    }

    return (
      <button disabled={true} className="btn btn-sm sm:btn-md">
        <AiOutlineSetting className="size-6" />
      </button>
    );
  }

  function getButtonByStatus(isSmallScreen) {
    return (
      <div className={isSmallScreen ? "inline sm:hidden" : "hidden sm:inline"}>
        {status == Status.NONE && (
          <button
            className="btn btn-square btn-sm items-center justify-center sm:btn-md sm:flex"
            onClick={() => removeItem(fileData)}
          >
            <AiOutlineClose className="size-full p-2 hover:text-accent" />
          </button>
        )}
        {status === Status.PROCESSING && (
          <div
            className="radial-progress text-sm text-base-content"
            style={{ "--value": progress * 100, "--size": "3rem" }}
            role="progressbar"
          >
            {Math.round(progress * 100)}%
          </div>
        )}
        {status === Status.ERROR && (
          <div className="btn btn-square">
            <div
              className="tooltip-open tooltip-error hover:tooltip"
              data-tip={fileData.getErrorMessage()}
            >
              <AiOutlineExclamationCircle className="size-7 text-error" />
            </div>
          </div>
        )}

        {status == Status.DONE && (
          <button className="btn btn-square" onClick={downloadFile}>
            <AiOutlineDownload className="size-7" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-11/12 flex-col items-center justify-between rounded-xl border-2 border-base-300 bg-base-100 px-2 py-3 text-secondary-content shadow-md sm:flex-row sm:px-6">
      <div className="w-fill flex w-full flex-row items-center justify-between sm:justify-start">
        <AiOutlineFileImage className="hidden size-8 text-base-content sm:inline" />
        <div className="flex flex-col items-start justify-center pl-2 sm:pl-3 md:flex-row md:items-center">
          <p className="line-clamp-1 text-primary-content">{file?.name}</p>
          <div className="badge hidden sm:ml-2 sm:block">
            {FilesUtils.formatBytes(file?.size)}
          </div>
        </div>
        {getButtonByStatus(true)}
      </div>
      <div className="h-4 w-full sm:hidden"></div>
      <div className="flex w-full items-center justify-between space-x-2 sm:w-1/3 sm:flex-row sm:justify-end">
        <div className="badge badge-md sm:hidden">
          {FilesUtils.formatBytes(file?.size)}
        </div>
        <div className="px-2">
          <TargetFormatDropdown
            sourceFormat={sourceFormat}
            updateSelectedFormat={(newFileFormat) => {
              console.log("TargetFormatDropdown", newFileFormat);
              fileData.targetFormat = newFileFormat;
              updateItem(fileData);
            }}
          />
        </div>

        {getSettingsButton()}
        {getButtonByStatus(false)}
      </div>
    </div>
  );
};

export default ConversionTaskItem;
