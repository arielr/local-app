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

  // const transcode = async (file) => {
  //   const ffmpeg = ffmpegRef.current;
  //   var uint8Array =  new Uint8Array(await file.arrayBuffer());
  //   var write_status = await ffmpeg.writeFile(file.name, uint8Array);
  //   var result_status = await ffmpeg.exec(['-i', file.name, 'output1.png']);
  //   console.log(`3 status ${result_status}`);

  //   const data = await ffmpeg.readFile('output1.png');

  //   console.log(data);

  // }

  // const load = async () => {
  //   console.log('ariel');
  //   const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  //   const ffmpeg = ffmpegRef.current;
  //   ffmpeg.on('log', ({ message }) => {
  //       // messageRef.current.innerHTML = message;
  //       console.log(message);
  //   });
  //   // toBlobURL is used to bypass CORS issue, urls with the same
  //   // domain can be used directly.
  //   await ffmpeg.load({
  //       coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
  //       wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  //   });
  // }

  return (
    <>
      <div
        className="flex h-full w-full items-center justify-center text-base-content"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center justify-center space-y-2">
          <AiOutlineUpload className="size-12" />
          <p className="item-center flex justify-center font-bricolage-grotesque">
            Drag and drop files here or click to browses.
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
