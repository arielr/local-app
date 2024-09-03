'use client'
import { useState, useRef, useEffect } from 'react'
import { AiOutlinePlus,AiOutlineDownload,AiOutlineSync } from 'react-icons/ai'
import FileUpload from './ui/FileUploader'
import ConversionTaskItem from './ui/ConversionTaskItem/index.js'
import { ConversionTask, Status } from './entities/ConvertionTask'
import ImageConvertor from './utils/imageConvertor.js'
import FilesUtils from './utils/filesUtils'
import { CgTerrain } from "react-icons/cg";
export default function Home () {

  const [selectedFiles, setSelectedFiles] = useState([])
  const imageConvertor = useRef(new ImageConvertor())

  useEffect(() => {
    imageConvertor.current.load().then(() => {
      console.log('loaded!!')
    })
  }, [])

  function handleSelectedFiles (files) {
    const fileDataList = files.map((file, index) => {
      return new ConversionTask({ file: file, fileFormat: null, id: index })
    })
    setSelectedFiles(fileDataList)
  }

  function updateItem (fileData) {
    const newFiles = [...selectedFiles]
    newFiles[fileData.id] = fileData
    setSelectedFiles(newFiles)
  }

  function removeItem (fileData) {
    setSelectedFiles(prevList => {
      return prevList.filter(item => item.id != fileData.id)
    })
  }


  function downloadAll(){
    selectedFiles.length == 1 ? 
    FilesUtils.downloadFile(selectedFiles[0].file) :
     FilesUtils.zipFiles(selectedFiles, 'converted.zip');

  }

  const files_list = selectedFiles.map((file,index) => {
    console.log('selectedFiles', selectedFiles);
    return (
      <ConversionTaskItem
        key={file.id}
        fileData={file}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    )
  })

  async function convertFiles () {
    for (let index = 0; index < selectedFiles.length; index++) {
      const fileData = selectedFiles[index]
      fileData.status = Status.PROCESSING
      setSelectedFiles(prevState => [...prevState])
      const result = await imageConvertor.current
        .convert(fileData)
        .catch(error => {
          console.error(error)
          fileData.status = Status.ERROR
          fileData.error = error
        })
      if (result) {
        selectedFiles[index].converted = result
        fileData.status = Status.DONE
      }

      setSelectedFiles(prevState => [...prevState])
    }
  }


  const isFilesConverted = files => files.some(f => f.converted != null)
  return (
    <main className='flex min-h-screen font-bricolage-grotesque h-screen flex-col items-center justify-start bg-base-200'>
      {/* Toolbar */}
      <div className='flex items-center shadow-md w-full p-4 bg-base-100'>
        <div className='rounded-full size-16 overflow-visible bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <CgTerrain className='size-full text-base-100'/>
        </div>
        <h1 className='ml-2 font-bold text-2xl flex items-center font-sans-serif text-primary-content '>Terrapps</h1>

      </div>
      {/* Main Screen*/}
      <div>
        <h1 className='text-base-content text-2xl font-bold p-4 pt-8 pb-12'>
          Online file converter
        </h1>
      </div>
      {selectedFiles.length == 0 && (
        <div className='w-full h-full  flex items-start justify-center'>
          {/* File updalder */}
          <div className='w-10/12 sm:w-1/2 h-1/3 rounded-xl border-dashed border-base-300 bg-base-100 border-2'>
            <FileUpload setFiles={handleSelectedFiles} />
          </div>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className='h-full w-full max-w-screen-xl space-y-4 flex flex-col items-center'>
          {files_list}
          {!isFilesConverted(selectedFiles) &&  <div className='w-full mt-8 flex justify-center'>
            <button
              className='btn lg:btn-lg m-4 bg-base-300'
            >
              <AiOutlinePlus className='size-7' />
              Add files
            </button>
            <button
              onClick={convertFiles}
              className='btn lg:btn-lg m-4 btn-secondary'
            >
              Convert
            </button>
          </div>}
          {isFilesConverted(selectedFiles) &&  <div className='w-full mt-8 max-w-screen-xl flex justify-center '>
            <button
              className='btn lg:btn-lg m-4  bg-base-300'
              onClick={()=>setSelectedFiles([])}
            >
              <AiOutlineSync className='size-7' />
              Restart
            </button>
            <button
              onClick={downloadAll}
              className='btn lg:btn-lg m-4 bg-primary'
            >
              <AiOutlineDownload className='size-7'/>Download All
            </button>
          </div>}
        </div>
      )}
    </main>
  )
}
