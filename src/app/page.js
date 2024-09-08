"use client";
import { useState, useRef, useEffect } from "react";

import FileUpload from "./ui/FileUploader";
import AppBar from "./ui/AppBar";
import AdvantageCards from "./ui/AdvantageCards";
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
            <div className="relative h-1/3 min-h-40 w-full cursor-pointer rounded-xl border-2 border-dashed border-base-300 bg-base-100 hover:border-purple-500 hover:shadow-xl focus:m-4 focus:p-20 sm:h-full sm:w-full">
              <FileUpload setFiles={(files) => setSelectedFiles(files)} />
            </div>
            <AdvantageCards />
          </div>
        ) : (
          <FilesConvertionScreen inputFiles={selectedFiles} />
        )}
      </div>
    </main>
  );
}
