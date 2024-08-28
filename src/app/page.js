'use client';
import { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus} from "react-icons/ai";
import FileUpload from "./ui/FileUploader";
import FileHandlerItem from './screen/components/FileHandlerItem';
import { FileData, Status } from './entities/FileData';
import ImageConvertor from './utils/image_convertor.js';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const imageConvertor = useRef(new ImageConvertor());

  useEffect(() => {
    imageConvertor.current.load().then(() => { console.log('loaded!!') });
  }, []);

  function handleSelectedFiles(files) {
    const fileDataList = files.map((file, index) => {
      return new FileData({ file: file, fileFormat: null, id: index });
    });
    setSelectedFiles(fileDataList);
  }

  function updateItem(fileData) {
    const newFiles = [...selectedFiles];
    newFiles[fileData.id] = fileData;
    setSelectedFiles(newFiles);
  }

  function removeItem(fileData){
    setSelectedFiles((prevList)=>{
      console.log(fileData);
      console.log(prevList.filter((item)=>item.id != fileData.id))
      return prevList.filter((item)=>item.id != fileData.id);
    });

  }

  const files_list = selectedFiles.map((file) => {
    return <FileHandlerItem key={file.id} fileData={file} updateItem={updateItem} removeItem={removeItem} />
  });

  async function convertFiles() {
    for (let index = 0; index < selectedFiles.length; index++) {
      const fileData = selectedFiles[index];
      fileData.status = Status.PROCESSING;
      setSelectedFiles((prevState)=> [...prevState]);
      const result = await imageConvertor.current.convert(fileData).catch((error)=> {
        console.error(error);
        fileData.status = Status.ERROR;
      });
      if(result){
        selectedFiles[index].converted = result;
        fileData.status = Status.DONE;
      }

      setSelectedFiles((prevState)=>  [...prevState]);

    }
  }
  
  const isFilesConverted = (files) => files.some((f)=>f.converted != null);
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-start bg-base-100">
      {/* Toolbar */}
      <div className="flex w-full p-4 px-8 bg-base-200">
        <div className="size-16 rounded-full bg-blue-300"></div>
        <h1 className="pl-4 font-bold  text-xl flex items-center">RunLocaly</h1>
      </div>
      {/* Main Screen*/}
      <div><h1 className="text-base-content text-4xl font-bold p-4 pt-8">Online file converter</h1></div>
      {selectedFiles.length == 0 && <div className="w-full h-full  flex items-center justify-center">
        {/* File updalder */}
        <div className="w-1/2 h-1/4 rounded-xl border-dashed border-base-300 bg-base-100 border-2">
          <FileUpload setFiles={handleSelectedFiles} />
        </div>
      </div>}
      {selectedFiles.length > 0 && <div className="h-full w-full max-w-screen-xl space-y-4">
        {files_list}
        <div className="w-full mt-8 max-w-screen-xl flex justify-center">
       <button disabled={isFilesConverted(selectedFiles) ? "disabled" : ""} onClick={()=>{}} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-4 "><AiOutlinePlus className='size-7'/>Add files</button>
       <button disabled={isFilesConverted(selectedFiles) ? "disabled" : ""} onClick={convertFiles} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-4 ">Convert</button>

        </div>

      </div>}

    </main>
  );
}
