import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import {FileFormat, FileCategory} from '../../entities/FileFormat'
import classNames from 'classnames';

const formats = [ FileFormat.getImageFormats(),FileFormat.getVideoFormats()];

const TargetFormatDropdown = ({ updateSelectedFormat  }) => {
  
  const imageFormats = FileFormat.getImageFormats()
  const [selectedFormat, setSelectedFormat] = useState(5)
  const [selectedFormatType,setSelectedFormatType] = useState(0);

  function updateFormat (index) {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }

    const targetFormat = formats[selectedFormatType][index]
    updateSelectedFormat(targetFormat)
    setSelectedFormat(index)
  }

  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn m-1 btn-sm sm:btn-md sm:btn-xl'
      >
        {selectedFormat == -1 ? '...' : imageFormats[selectedFormat].name}
        <AiOutlineDown />
      </div>
      <div tabIndex={0} className='flex flex-row justify-center dropdown-content  z-10 menu bg-base-100 rounded-box w-72 p-2 shadow'>
        <div className='w-1/5   h-fill flex flex-col items-center justify-start'>
          <ul  className='*:p-2 *:text-base-content *:rounded-l-md'>
            <li className={classNames('border-b-2 hover:bg-slate-200',{
              'bg-slate-200' : selectedFormatType == 0 
            })} onMouseEnter={()=>{
                setSelectedFormatType(0)
            }}>Image</li>
            <li className={classNames(' hover:bg-slate-200',{
              'bg-slate-200' : selectedFormatType == 1 
            })} onMouseEnter={()=>setSelectedFormatType(1)}>Video</li>
          </ul>
        </div>
        <div className='w-4/5'>
          <ul className='grid grid-cols-3 gap-2 overflow-auto menu'>
            {formats[selectedFormatType].map((f, index) => (
              <li className='text-neutral' key={index}>
                <a onClick={() => updateFormat(index)}>{f.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TargetFormatDropdown
