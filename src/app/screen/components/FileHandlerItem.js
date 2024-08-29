
import { AiOutlineFileImage, AiOutlineDown, AiOutlineClose, AiOutlineRight, AiOutlineDownload,AiOutlineExclamationCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { FileData, Status } from "../../entities/FileData";
import FileFormat from "../../entities/FileFormat.js";
import FilesUtils from '../../utils/filesUtils.js';
const target_formats = FileFormat.getImageFormats();//["png", "jpg", "jpeg",'ppm','webp    '];
const FileHandlerItem = ({ fileData,  updateItem, removeItem }) => {
    const {status, id, targetFormat,file, converted,} = fileData;
    const [selectedFormat, setSelectedFormat] = useState(-1);
    const [sourceFormat, setSourceFormat] = useState("Unkown");
    
    
    useEffect(()=>{
        if(fileData.file){
            fileData.getSourceFileType().then((res)=>{
                console.log("getSourceFileType", res);
                if(res?.mime){
                    setSourceFormat(res.mime);
                }
          
            });
        }
    }, [file]);

    function downloadFile()  {
        FilesUtils.downloadFile(converted);
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
            <p className="inline text-base-content">{sourceFormat}</p>
            <AiOutlineRight className="inline text-base-content" />
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{selectedFormat == -1 ? "..." : target_formats[selectedFormat].name}<AiOutlineDown /></div>
                <ul tabIndex={0} className="dropdown-content z-10 bg-base-100 menu rounded-box w-72 p-2 shadow grid grid-cols-3">
                    {target_formats.map((f,index)=> <li className="text-neutral" key={index}><a onClick={()=>updateFormat(index)}>{f.name}</a></li>)}
                </ul>
            </div>
        </div>
        {status == Status.NONE && <button className="btn btn-square" onClick={()=>removeItem(fileData)}> <AiOutlineClose className="size-7" /></button>}
        {status === Status.PROCESSING && <div className="btn btn-square" > <span className="loading loading-spinner loading-md size-7"></span></div>}
        {status === Status.ERROR  && <div className="btn btn-square "  >
            <div className="hover:tooltip tooltip-open tooltip-error " data-tip={fileData.error}>
            <AiOutlineExclamationCircle className="size-7 text-error"/>
            </div>
            
             </div>}

        {status == Status.DONE && <button className="btn btn-square" onClick={downloadFile}> <AiOutlineDownload className="size-7" /></button>}


    </div>
}

export default FileHandlerItem;