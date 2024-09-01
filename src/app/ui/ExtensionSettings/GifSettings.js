import { useState, useEffect, useRef } from 'react'
import BaseSettings from './BaseSetting'
import { AiOutlineSetting } from 'react-icons/ai'
import FileFormat from '../../entities/FileFormat'

const GifSettings = (fileData) => {
  const [frameRate, setFrameRate] = useState(5)
  const [isDirty, setIsDirty] = useState(false)
  const [originalState, setOriginalState] = useState({ frameRate: 5 })
  const modalRef = useRef();

  useEffect(()=>{
    const fps = fileData.requestArguments.get(FileFormat.GIF).get('fps');
    setFrameRate(fps);
    setOriginalState({ frameRate: fps });
  },[])

  useEffect(() => {
    if (originalState != null) {
      setIsDirty(frameRate != originalState.frameRate)
    }

  }, [frameRate,originalState])

  function onClickOpenModal () {
    setOriginalState({ frameRate: frameRate })
  }

  function closeAndSaveCurrnetSettings () {
    setOriginalState({ frameRate: frameRate });
    // fileData.requestArguments[FileFormat.GIF].push(`-filter_complex ${frameRate}`)
    fileData.requestArguments.get(FileFormat.GIF).set('fps', frameRate);
    modalRef.current.close()
  }

  return (
    <div className='text-base-content'>
      <button
        className='btn btn-sm sm:btn-md'
        onClick={() => modalRef.current.showModal()}
      >
        <AiOutlineSetting className='size-6' />
      </button>
      <dialog id='my_modal_2' ref={modalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Settings</h3>
          <div class='flex flex-col p-2'>
            <div className='label'>
              <span className='label-text'>Frames per second</span>
            </div>
            <input
              type='number'
              value={frameRate}
              onChange={e => setFrameRate(e.target.value)}
              label='Type here'
              className='input input-bordered w-40 max-w-xs text-base-content'
            />
          </div>
          <div className='w-full flex items-center justify-center'>
            <button 
            onClick={()=>modalRef.current.close()}
            className='btn m-4 mt-8'>Close</button>
            <button
              disabled={!isDirty}
              onClick={closeAndSaveCurrnetSettings}
              className='btn bg-primary text-primary-content m-4 mt-8'
            >
              Save
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={()=>modalRef.current.close()}>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default GifSettings
