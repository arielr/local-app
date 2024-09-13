"use client";
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile, toBlobURL } from '@ffmpeg/util';
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

// src/app/utils/image_convertor
// import init, {read_file_as_array_buffer,initSync} from './worker/tax_webassembly.js';
// import { default as initXmlConvetor, convert_xml_to_json} from '../utils/xml2json/pkg/xml2json.js';
// import { default as initImageConvertor, convert_image} from '../utils/image_convertors/pkg/xml2json.js';

const FileUpload = ({ setFiles }) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file, index) => (file.id = index));
      setFiles(acceptedFiles);
    },
  });

  return (
    <>
      <div
        className="flex h-full w-full items-center justify-center text-base-content"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex h-full min-h-44 w-full flex-col items-center justify-center space-y-2 p-4">
          <AiOutlineUpload className="size-12" />

          <a
            href="#_"
            className="group relative inline-block rounded px-5 py-2.5 font-medium text-white"
          >
            <span className="absolute left-0 top-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 blur-sm filter"></span>
            <span className="absolute inset-0 ml-0.5 mt-0.5 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 filter group-active:opacity-0"></span>
            <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 shadow-xl filter transition-all duration-200 ease-out group-hover:blur-sm group-active:opacity-0"></span>
            <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-blue-500 to-purple-600 transition duration-200 ease-out"></span>
            <span className="relative">Select Files</span>
          </a>
          <p className="item-center flex justify-center font-bricolage-grotesque">
            Drag and drop files here
          </p>
        </div>

        <ul>
          {/* {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))} */}
        </ul>
      </div>
    </>
  );
};
export default FileUpload;
