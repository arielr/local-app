import { useState, useEffect, useRef } from 'react'
import BaseSettings from './BaseSetting'
import { AiOutlineSetting } from 'react-icons/ai'
import FileFormat from '../../entities/FileFormat'
import classnames from 'classnames'

const resultions = [
 {name:"No Change", value: null, category: ""},
 {name:"2160p (4K): 3840x2160", value:"3840x2160", category: "Youtube"},
 {name:"1440p (2k): 2560x1440", value:"2560x1440", category: "Youtube"},
 {name:"1080p (HD): 1920x1080", value:"1920x1080", category: "Youtube"},
 {name:"720p (HD): 1280x720", value:"1280x720", category: "Youtube"},
 {name:"480p (SD): 854x480", value:"854x480", category: "Youtube"},
 {name:"360p (SD): 640x360", value:"640x360", category: "Youtube"},
 {name:"240p (SD): 426x240", value:"426x240", category: "Youtube"},
];

const DefaultVideoSettings = (fileData) => {
  const [frameRate, setFrameRate] = useState(-1)
  const [isDirty, setIsDirty] = useState(false)
  const [originalState, setOriginalState] = useState(null);
  const [changeFpsInput, setChangeFpsInput] = useState(false)
  const [videoResultion, setVideoResultion] = useState(null)
  const modalRef = useRef()

  useEffect(() => {

    //load previus settings if any
    const args = fileData.requestArguments.get(fileData.targetFormat);
    if(args){

      if(args.has('frameRate')){
        setFrameRate(args.get('frameRate'))
      }

      if(args.has('videoResultion')){
        setVideoResultion(args.get('videoResultion'));
      }
    }
  }, [])

  useEffect(() => {
    console.log('setIsDirty', originalState, frameRate, originalState)
    if (originalState == null) {
  
      setIsDirty(frameRate != -1 || originalState );
    }else{
      const args = fileData.requestArguments.get(fileData.targetFormat);

    }
  }, [frameRate, originalState])

  function closeAndSaveCurrnetSettings () {
    setOriginalState({ frameRate: frameRate,videoResultion:videoResultion });

    if(targetFormat && frameRate)
      fileData.requestArguments.get(targetFormat).set('frameRate', frameRate);
    if(targetFormat && videoResultion)
      fileData.requestArguments.get(targetFormat).set('videoResultion', videoResultion);

    // fileData.requestArguments[FileFormat.GIF].push(`-filter_complex ${frameRate}`)
    if(changeFpsInput){
      console.log('changeFpsInput',changeFpsInput)
      fileData.requestArguments.get(fileData.targetFormat).set('fps', frameRate)
    }

    if(videoResultion){
      fileData.requestArguments.get(fileData.targetFormat).set('videoResultion', videoResultion)
    }

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
        <div className='modal-box overflow-y-visible'>
          <h3 className='font-bold text-lg'>Settings</h3>
          <div class='flex flex-col p-2 space-y-3 *:border-base-200 *:border-2 *:py-3 *:rounded-md *:p-2'>
            <div className=''>
              <div className='label w-full flex justify-between'>
                <span className='label-text'>Frames per second</span>
                <input
                  type='checkbox'
                  className='toggle'
                  checked={changeFpsInput}
                  onChange={() => setChangeFpsInput(prevValue => !prevValue)}
                />
              </div>
              <div className='flex w-full justify-between p-2'>
              <input
                type='range'
                min='1'
                max='60'
                value={frameRate}
                onChange={e => setFrameRate(e.target.value)}
                className={classnames('range', { hidden: !changeFpsInput })}
                step='1'
              />
              <input className={classnames('pl-4 w-10', { hidden: !changeFpsInput })} type="text" value={frameRate}/>
              </div>

            </div>
            <div className='label w-full flex justify-between'>
              <span className='label-text'>Resultion</span>
              <div className='dropdown'>
              <div tabIndex={0} role='button' className='btn m-1 '>
              {videoResultion == null ? "No Change" : videoResultion}
              </div>

              <ul
                tabIndex={0}
                className='dropdown-content menu  bg-base-100 rounded-box z-[100] w-52   p-2 shadow'
              >
            {resultions.map((f, index) => (
              <li className='text-neutral' key={f.id}>
               
                <a onClick={() => setVideoResultion(f.value)}>{f.name}</a>
              </li>
            ))}
            </ul>
            </div>
            </div>
            {/* 12,15,24,25 */}

          </div>
          <div className='w-full flex items-center justify-center'>
            <button
              onClick={() => modalRef.current.close()}
              className='btn m-4 mt-8'
            >
              Close
            </button>
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
          <button onClick={() => modalRef.current.close()}>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default DefaultVideoSettings
