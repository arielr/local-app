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
          <button className="bg-transparent-20 btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white opacity-75 hover:-translate-x-1 hover:-translate-y-1">
            Select Files
          </button>
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
