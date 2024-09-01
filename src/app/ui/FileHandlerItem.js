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
import { FileData, Status } from '../entities/FileData.js'
import FileFormat from '../entities/FileFormat.js'
import FilesUtils from '../utils/filesUtils.js'
import GifSettings from "./ExtensionSettings/GifSettings.js"
import {fileFormatToSettingsModal} from "./ExtensionSettings/ExtensionToSettingsModal.js";

const target_formats = FileFormat.getImageFormats() //["png", "jpg", "jpeg",'ppm','webp    '];
const FileHandlerItem = ({ fileData, updateItem, removeItem }) => {
    const { status, id, targetFormat, file, converted } = fileData
    const [selectedFormat, setSelectedFormat] = useState(-1)
    const [sourceFormat, setSourceFormat] = useState('Unkown')

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

    function updateFormat(index) {
        const elem = document.activeElement
        if (elem) {
            elem?.blur()
        }
        console.log(target_formats[index])
        const targetFormat = target_formats[index]
        fileData.targetFormat = targetFormat
        setSelectedFormat(index)
        updateItem(fileData)
    }

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
            <div className='btn btn-square'>
                {' '}
                <span className='loading loading-spinner loading-md size-7'></span>
            </div>
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
        <div className='flex flex-wrap sm:flex-row bg-base-100 items-center justify-between w-11/12 rounded-xl px-4 sm:px-6 py-3 border-base-300 text-secondary-content border-2 shadow-md'>
            <div className='flex flex-row justify-between sm:justify-start items-center w-full sm:w-1/3  '>
                <AiOutlineFileImage className='size-8 text-base-content hidden sm:inline' />
                <div className='flex flex-col pl-3 md:flex-row items-start justify-center md:items-center'>
                    <p className=' text-primary-content'>
                        {file?.name}
                    </p>
                    <p className='text-md text-bold text-base-300 hidden sm:inlnie'>
                        ({FilesUtils.formatBytes(file?.size)})
                    </p>
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
                <p className='p-2 text-sm text-base-content bg-base-200 rounded-full sm:hidden '>
                    {FilesUtils.formatBytes(file?.size)}
                </p>
                <p className='hidden sm:inline text-base-content'>{sourceFormat}</p>
                <AiOutlineRight className='hidden sm:inline text-base-content' />
                <div className='dropdown'>
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
                </div>
                {/* <button
                    className='btn btn-square  btn-sm sm:btn-md items-center justify-center'
                    onClick={() => removeItem(fileData)}
                >
              
                </button> */}
               {getSettingsButton()}
            </div>
            {getButtonByStatus(false)}
        </div>
    )
}

export default FileHandlerItem
