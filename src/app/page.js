"use client";
import { useState, useRef, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { IoInfinite } from "react-icons/io5";

import FileUpload from "./ui/FileUploader";
import AppBar from "./ui/AppBar";
import ConversionTaskItem from "./ui/ConversionTaskItem/index.js";
import { ConversionTask, Status } from "./entities/ConvertionTask";
import ImageConvertor from "./utils/imageConvertor.js";
import FilesUtils from "./utils/filesUtils";
import FilesConvertionScreen from "./screen/FilesConvertionScreen";
/**
 * 1) Split the class to real home page and the seocond one to ConvertionScreen?
 * */
export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // function handleSelectedFiles(files) {
  //   const fileDataList = files.map((file, index) => {
  //     return new ConversionTask({ file: file, fileFormat: null, id: index });
  //   });
  //   setSelectedFiles(files);
  // }

  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-start bg-base-200 font-bricolage-grotesque">
      <AppBar />
      <div className="h-20">
        <h1 className="p-4 pb-12 pt-8 text-2xl font-bold text-base-content">
          Online file converter
        </h1>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {selectedFiles.length == 0 ? (
          <div className="flex flex-col items-center justify-between p-8">
            <div className="relative m-2 h-1/3 min-h-40 w-full rounded-xl border-2 border-dashed border-base-300 bg-base-100 sm:h-full sm:w-full">
              <FileUpload setFiles={(files) => setSelectedFiles(files)} />
            </div>
            <div className="mt-16 flex w-full flex-col space-y-4 p-8 text-base-content *:rounded-xl *:bg-base-300 *:p-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0 sm:*:h-52 sm:*:h-full sm:*:w-1/3 sm:*:max-w-64">
              <div className="flex flex-col items-center justify-start space-y-4">
                <AiOutlineLock className="size-10" />
                <h1 className="font-bold">Privacy</h1>
                <p>
                  All conversions take place in your browser so no one has
                  access to your files
                </p>
              </div>
              <div className="flex flex-col items-center justify-start space-y-4">
                <IoInfinite className="size-10" />
                <h1 className="font-bold">No Limits</h1>
                <p>Convert as much as you want for free without limitations</p>
              </div>
              <div className="flex flex-col items-center justify-start space-y-4">
                <AiOutlineLock className="size-10" />
                <h1 className="font-bold">Privacy</h1>
                <p>All files are processd localy</p>
              </div>
            </div>
          </div>
        ) : (
          <FilesConvertionScreen inputFiles={selectedFiles} />
        )}
      </div>
    </main>
  );
}
