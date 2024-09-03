import {
    AiOutlineFileImage,
    AiOutlineDown,
    AiOutlineClose,
    AiOutlineRight,
    AiOutlineDownload,
    AiOutlineExclamationCircle,
    AiOutlineSetting
} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { ConversionTask, Status } from '../../entities/ConvertionTask.js'
import FileFormat from '../../entities/FileFormat.js'
import FilesUtils from '../../utils/filesUtils.js'
import DefaultVideoSettings from "../ExtensionSettings/DefaultVideoSettings.js";
import {fileFormatToSettingsModal} from "../ExtensionSettings/ExtensionToSettingsModal.js";
import TargetFormatDropdown from './TargetFormatDropdown.js';

const ConversionTaskItem = ({ fileData, updateItem, removeItem }) => {
    const { status, id, targetFormat, file, converted } = fileData
    const [sourceFormat, setSourceFormat] = useState('Unkown')
    const [progress, setProgress] = useState(0);

    useEffect(()=>{
        fileData.onProgress = setProgress;
    },[]);

    useEffect(() => {
        if (fileData.file) {
            fileData.getSourceFileType().then(res => {
                console.log('getSourceFileType', res)
                if (res?.mime) {
                    setSourceFormat(res.mime)
                }
            })
        }
    }, [file])

    function downloadFile() {
        FilesUtils.downloadFile(converted)
    }

    // function updateFormat(index) {
    //     const elem = document.activeElement
    //     if (elem) {
    //         elem?.blur()
    //     }
    //     console.log(target_formats[index])
    //     const targetFormat = target_formats[index]
    //     fileData.targetFormat = targetFormat
    //     setSelectedFormat(index)
    //     updateItem(fileData)
    // }

    function getSettingsButton(){
        const settingsDiv = fileFormatToSettingsModal.get(targetFormat);
        console.log(settingsDiv);
        console.log(file);
        if(settingsDiv != undefined){
            
            return settingsDiv(fileData);
        }
        return <button
        disabled={true}
        className='btn btn-sm sm:btn-md'
      >
        <AiOutlineSetting className='size-6' />
      </button>
    }
    
    function getButtonByStatus(isSmallScreen) {
      return  (<div className={isSmallScreen ? "inline sm:hidden" : "hidden sm:inline"}>
      {status == Status.NONE && (
            <button
                className='btn btn-sm sm:btn-md btn-square  sm:flex items-center justify-center'
                onClick={() => removeItem(fileData)}
            >
                <AiOutlineClose className='size-full p-2 hover:text-accent' />
            </button>
        )}
        {status === Status.PROCESSING && (
            <div className="radial-progress text-base-content text-sm" style={{"--value": progress*100,"--size": "3rem"}} role="progressbar">
            {Math.round(progress*100)   }%
          </div>
            // <div className='btn btn-square'>
                
            //     <span className='loading loading-spinner loading-sm sm:loading-md size-7'></span>
            // </div>
        )}
        {status === Status.ERROR && (
            <div className='btn btn-square '>
                <div
                    className='hover:tooltip tooltip-open tooltip-error '
                    data-tip={fileData.error}
                >
                    <AiOutlineExclamationCircle className='size-7 text-error' />
                </div>
            </div>
        )}

        {status == Status.DONE && (
            <button className='btn btn-square' onClick={downloadFile}>
                <AiOutlineDownload className='size-7' />
            </button>
        )}</div>)
    }

    return (
        <div className='flex flex-col sm:flex-row bg-base-100 items-center justify-between w-11/12 rounded-xl px-2 sm:px-6 py-3 border-base-300 text-secondary-content border-2 shadow-md'>
            <div className='flex flex-row justify-between sm:justify-start items-center w-fill '>
                <AiOutlineFileImage className='size-8 text-base-content hidden sm:inline' />
                <div className='flex flex-col pl-3 md:flex-row items-start justify-center md:items-center'>
                    <p className='text-primary-content line-clamp-1'>
                        {file?.name}
                    </p>
                    <div className="badge hidden sm:block sm:ml-2">{FilesUtils.formatBytes(file?.size)}</div>
                    {/* <p className='text-md text-bold text-base-300 hidden sm:inlnie'>
                      
                    </p> */}
                </div>
                {/* <button
                    className='btn btn-square btn-sm sm:hidden bg-base-100 border-0'
                    onClick={() => removeItem(fileData)}
                >
                    <AiOutlineClose className='size-4' />
                </button> */}
              {getButtonByStatus(true)}
            </div>
            <div className='w-full h-4 sm:hidden'></div>
            <div className='flex flex-row justify-between  w-full sm:w-auto items-center space-x-2'>
            <div className="sm:hidden badge badge-md">  {FilesUtils.formatBytes(file?.size)}</div>

                <p className='hidden sm:inline text-base-content'>{sourceFormat}</p>
                <AiOutlineRight className='hidden sm:inline text-base-content' />
                <TargetFormatDropdown updateItem={(newFileFormat)=>{
                    fileData.targetFormat = newFileFormat;
                    updateItem(fileData);
                }}/>
                {/* <div className='dropdown'>
                    <div tabIndex={0} role='button' className='btn m-1 btn-sm sm:btn-md sm:btn-xl'>
                        {selectedFormat == -1
                            ? '...'
                            : target_formats[selectedFormat].name}
                        <AiOutlineDown />
                    </div>
                    <ul
                        tabIndex={0}
                        className='dropdown-content z-10 menu bg-base-100 rounded-box w-72 p-2 shadow grid grid-cols-3'
                    >
                        {target_formats.map((f, index) => (
                            <li className='text-neutral' key={index}>
                                <a onClick={() => updateFormat(index)}>{f.name}</a>
                            </li>
                        ))}
                    </ul>
                </div> */}

               {getSettingsButton()}
            </div>
            {getButtonByStatus(false)}
        </div>
    )
}

export default ConversionTaskItem
