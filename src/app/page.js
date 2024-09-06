"use client";
import { useState, useRef, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineDownload,
  AiOutlineSync,
} from "react-icons/ai";
import FileUpload from "./ui/FileUploader";
import ConversionTaskItem from "./ui/ConversionTaskItem/index.js";
import { ConversionTask, Status } from "./entities/ConvertionTask";
import ImageConvertor from "./utils/imageConvertor.js";
import FilesUtils from "./utils/filesUtils";
import { CgTerrain } from "react-icons/cg";
export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const imageConvertor = useRef(new ImageConvertor());

  useEffect(() => {
    imageConvertor.current.load().then(() => {
      console.log("loaded!!");
    });
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

  const isFilesConverted = (files) => files.some((f) => f.converted != null);
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-start bg-base-200 font-bricolage-grotesque">
      {/* Toolbar */}
      <div className="ml-2 mt-4 flex w-full items-center rounded-l-full bg-base-100 p-4">
        <div className="size-16 overflow-visible rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <CgTerrain className="size-full text-base-100" />
        </div>
        <h1 className="font-sans-serif ml-2 flex items-center text-2xl font-bold text-primary-content">
          Terrapps
        </h1>
      </div>
      {/* Main Screen*/}
      <div>
        <h1 className="p-4 pb-12 pt-8 text-2xl font-bold text-base-content">
          Online file converter
        </h1>
      </div>
      {selectedFiles.length == 0 && (
        <div className="flex h-full w-full items-start justify-center">
          {/* File updalder */}
          <div className="h-1/3 w-10/12 rounded-xl border-2 border-dashed border-base-300 bg-base-100 sm:w-1/2">
            <FileUpload setFiles={handleSelectedFiles} />
          </div>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="flex h-full w-full max-w-screen-xl flex-col items-center space-y-4">
          {files_list}
          {!isFilesConverted(selectedFiles) && (
            <div className="mt-8 flex w-full justify-center">
              <button className="btn m-4 bg-base-300 lg:btn-lg">
                <AiOutlinePlus className="size-7" />
                Add files
              </button>
              <button
                onClick={convertFiles}
                className="btn btn-secondary m-4 lg:btn-lg"
              >
                Convert
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
    </main>
  );
}
