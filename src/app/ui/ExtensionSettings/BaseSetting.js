import { useRef } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'

const BaseSettings = ({ children, onOpenModal, isDirty }) => {
  const toggleRef = useRef();

  function closeModal() {
    toggleRef.current.close();
  }
  return (
    <>
      <label htmlFor='gif_settings_modal' onClick={onOpenModal} className='btn'>
        <AiOutlineSetting className='size-6' />
      </label>

      <input value={false} type='checkbox' id='gif_settings_modal' className='modal-toggle' />
      {/* <button className='btn btn-sm sm:btn-md' onClick={onClickOpenModal}>
        <AiOutlineSetting className='size-6' />
      </button> */}
      {/* Put this part before </body> tag */}
      <div className='modal' role='dialog'>
        <div className='modal-box'>
          {children}
          <div className='w-full flex space-x-2 items-center justify-center '>
        
            <div className="modal-action">
            <label htmlFor="gif_settings_modal"  className='btn' disabled={!isDirty}>Save</label>

            <label htmlFor="gif_settings_modal" className="btn">Close!</label>
    </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BaseSettings
