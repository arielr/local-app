
import { AiOutlineFileImage, AiOutlineDown, AiOutlineClose, AiOutlineRight, AiOutlineDownload,AiOutlineExclamationCircle } from "react-icons/ai";
import { useState } from "react";
import { FileData, Status } from "../../entities/FileData";
import FileFormat from "../../entities/FileFormat.js";

const target_formats = Object.keys(FileFormat);//["png", "jpg", "jpeg",'ppm','webp    '];
const FileHandlerItem = ({ fileData,  updateItem }) => {
    const {status, id, targetFormat,file, converted,} = fileData;
    const [selectedFormat, setSelectedFormat] = useState(-1);
    
    function downloadFile() {
        const url = URL.createObjectURL(converted);
        const a = document.createElement("a");
        a.href = url;
        a.download = converted.name;
        a.click();
        URL.revokeObjectURL(url);
    }

    function updateFormat(index) {
        const elem = document.activeElement;
        if (elem) {
          elem?.blur();
        }
        console.log(target_formats[index]);
        const targetFormat = target_formats[index];
        fileData.targetFormat = targetFormat;
        setSelectedFormat(index);
        updateItem(fileData);
    }

    return <div className="rounded-full px-6 py-2 w-full border-base-300 text-secondary-content border-2 shadow-md flex items-center justify-between">
        <div className="flex-row justify-start items-center w-1/3 ">
            <AiOutlineFileImage className="size-8 inline " />
            <p className="inline text-primary-content">{file?.name}</p>
        </div>
        <div className="flex-row justify-center space-x-2">
            <p className="inline text-base-content">{file?.extension}</p>
            <AiOutlineRight className="inline text-base-content" />
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{selectedFormat == -1 ? "..." : target_formats[selectedFormat]}<AiOutlineDown /></div>
                <ul tabIndex={0} className="dropdown-content bg-base-100 menu rounded-box w-72 p-2 shadow grid grid-cols-3">
                    {target_formats.map((f,index)=> <li className="text-neutral" key={f}><a onClick={()=>updateFormat(index)}>{f}</a></li>)}
                </ul>
            </div>
        </div>
        {status == Status.NONE && <button className="btn btn-square"> <AiOutlineClose className="size-7" /></button>}
        {status === Status.PROCESSING && <div className="btn btn-square" > <span className="loading loading-spinner loading-md size-7"></span></div>}
        {status === Status.ERROR  && <div className="btn btn-square" > <AiOutlineExclamationCircle className="size-7"/></div>}

        {status == Status.DONE && <button className="btn btn-square" onClick={downloadFile}> <AiOutlineDownload className="size-7" /></button>}


    </div>
}

export default FileHandlerItem;