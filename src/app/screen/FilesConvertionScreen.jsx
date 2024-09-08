"use client";
import { useState, useRef, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineDownload,
  AiOutlineSync,
} from "react-icons/ai";
import FileUpload from "../ui/FileUploader";
import AppBar from "../ui/AppBar";
import ConversionTaskItem from "../ui/ConversionTaskItem/index.js";
import { ConversionTask, Status } from "../entities/ConvertionTask";
import ImageConvertor from "../utils/mediaConvertor.js/index.js";
import FilesUtils from "../utils/filesUtils";

/**
 * 1) Split the class to real home page and the seocond one to ConvertionScreen?
 * */
export default function FilesConvertionScreen({ inputFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputFileRef = useRef(null);
  const imageConvertor = useRef(new ImageConvertor());

  useEffect(() => {
    imageConvertor.current.load().then(() => {
      console.log("loaded!!");
    });
    handleSelectedFiles(inputFiles);
  }, []);

  function handleSelectedFiles(files) {
    const fileDataList = files.map((file, index) => {
      return new ConversionTask({ file: file, fileFormat: null, id: index });
    });
    setSelectedFiles(fileDataList);
  }

  function updateItem(fileData) {
    const newFiles = [...selectedFiles];
    newFiles[fileData.id] = fileData;
    setSelectedFiles(newFiles);
  }

  function removeItem(fileData) {
    setSelectedFiles((prevList) => {
      return prevList.filter((item) => item.id != fileData.id);
    });
  }

  function downloadAll() {
    selectedFiles.length == 1
      ? FilesUtils.downloadFile(selectedFiles[0].file)
      : FilesUtils.zipFiles(selectedFiles, "converted.zip");
  }

  const files_list = selectedFiles.map((file, index) => {
    console.log("selectedFiles", selectedFiles);
    return (
      <ConversionTaskItem
        key={file.id}
        fileData={file}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    );
  });

  async function convertFiles() {
    for (let index = 0; index < selectedFiles.length; index++) {
      const fileData = selectedFiles[index];
      if (!fileData.targetFormat || fileData.outputFile) {
        console.log("skipping", fileData);
        continue;
      }

      fileData.status = Status.PROCESSING;
      setSelectedFiles((prevState) => [...prevState]);
      const result = await imageConvertor.current
        .convert(fileData)
        .catch((error) => {
          console.error(error);
          fileData.status = Status.ERROR;
          fileData.error = error;
        });
      if (result) {
        selectedFiles[index].converted = result;
        fileData.status = Status.DONE;
      }

      setSelectedFiles((prevState) => [...prevState]);
    }
  }

  function addMoreFiles(e) {
    const files = inputFileRef.current.files;
    // console.log(files);
    // console.log(inputFileRef.current);
    const fileDataList = Array.from(files).map((file, index) => {
      return new ConversionTask({ file: file, fileFormat: null, id: index });
    });
    setSelectedFiles((prevList) => prevList.concat(fileDataList));
  }

  const isFilesConverted = (files) => files.some((f) => f.converted != null);
  return (
    <div className="flex w-full justify-center">
      {selectedFiles.length == 0 && (
        <div className="flex h-full w-full items-start justify-center">
          {/* File updalder */}
          <div className="border-12 h-1/3 rounded-xl border-dashed border-base-300 bg-base-100 hover:border-green-200 sm:w-1/2">
            <FileUpload setFiles={handleSelectedFiles} />
          </div>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="flex h-full w-full max-w-screen-xl flex-col items-center space-y-4">
          {files_list}
          {!isFilesConverted(selectedFiles) && (
            <div className="mt-8 flex h-full w-full justify-center">
              <input
                onChange={addMoreFiles}
                type="file"
                id="file"
                ref={inputFileRef}
                className="hidden"
                multiple="multiple"
              />
              <button
                onClick={() => inputFileRef.current.click()}
                className="btn m-4 bg-base-300 lg:btn-lg"
              >
                <AiOutlinePlus className="size-7" />
                Add files
              </button>

              <button
                onClick={convertFiles}
                className="btn btn-secondary m-4 lg:btn-lg"
              >
                {selectedFiles.some((f) => f.status == Status.PROCESSING) ? (
                  <>
                    <span className="loading loading-spinner loading-md" />
                    <p>Converting</p>
                  </>
                ) : (
                  "Convert"
                )}
              </button>
            </div>
          )}
          {isFilesConverted(selectedFiles) && (
            <div className="mt-8 flex w-full max-w-screen-xl justify-center">
              <button
                className="btn m-4 bg-base-300 lg:btn-lg"
                onClick={() => setSelectedFiles([])}
              >
                <AiOutlineSync className="size-7" />
                Restart
              </button>
              <button
                onClick={downloadAll}
                className="btn m-4 bg-primary lg:btn-lg"
              >
                <AiOutlineDownload className="size-7" />
                Download All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
