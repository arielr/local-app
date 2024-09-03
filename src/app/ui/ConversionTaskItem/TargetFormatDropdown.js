import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import FileFormat from '../../entities/FileFormat'

const imageFormats = FileFormat.getImageFormats();
const videoFormats = FileFormat.getVideoFormats();

const TargetFormatDropdown = ({ updateItem }) => {
  
  const imageFormats = FileFormat.getImageFormats()
  const [selectedFormat, setSelectedFormat] = useState(-1)
  const [selectedFormatType,setSelectedFormatType] = useState(0);

  const formats = [imageFormats,videoFormats];

  function updateFormat (index) {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }

    const targetFormat = formats[selectedFormatType][index]
    updateItem(targetFormat)
    setSelectedFormat(index)
  }

  function handleClickDropdown(e) {
    console.log(e)
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
      <div tabIndex={0} className='flex flex-row dropdown-content  z-10 menu bg-base-100 rounded-box w-72 p-2 shadow'>
        <div className='w-1/5   h-fill flex flex-col items-center justify-start'>
          <ul  className='*:p-2 *:text-base-content *:rounded-none'>
            <li className='border-b-2 hover:bg-slate-200' onMouseEnter={()=>{
                console.log('aa');
                setSelectedFormatType(0)
            }}>Image</li>
            <li className='hover:bg-slate-200' onMouseEnter={()=>setSelectedFormatType(1)}>Video</li>
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

// {targetFormats.map((f, index) => (
//     <li className='text-neutral' key={index}>
//       <a onClick={() => updateFormat(index)}>{f.name}</a>
//     </li>
//   ))}
export default TargetFormatDropdown
