import { useState, useEffect, useRef, useActionState } from "react";
import BaseSettings from "./BaseSetting";
import { AiOutlineSetting } from "react-icons/ai";
import FileFormat from "../../entities/FileFormat";
import classnames from "classnames";
import { file } from "jszip";

const NO_CHANGE = "No Change";

const DefaultVideoSettings = (fileData) => {
  const [frameRate, setFrameRate] = useState(null);
  const [videoResultion, setVideoResultion] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    //load previus settings if any
    const args = fileData.requestArguments?.get(fileData?.targetFormat);

    if (args) {
      console.log("fileData.requestArguments", args);
      console.log("fileData.requestArguments", args.has("frameRate"));
      if (args?.has("frameRate")) {
        setFrameRate(args.get("frameRate"));
      }

      if (args?.has("videoResultion")) {
        setVideoResultion(args.get("videoResultion"));
      }
    }
    setIsDirty((prev) => {
      console.log("setIsDirty((prev)", prev);
      return false;
    });
  }, []);

  //create the current arguments and compare to the previuse one
  useEffect(() => {
    const prevArgs = fileData.requestArguments.get(fileData.targetFormat);
    console.log("isDirty - 38", prevArgs, frameRate, videoResultion);
    if (prevArgs == undefined) {
      setIsDirty(frameRate || videoResultion);
    } else {
      const prevFrameRate = prevArgs.get("frameRate");
      const prevVideoResultion = prevArgs.get("videoResultion");
      console.log("isDirty", prevArgs);
      console.log("isDirty2", frameRate, videoResultion);

      setIsDirty(
        frameRate != prevFrameRate || videoResultion != prevVideoResultion,
      );
    }
  }, [frameRate, videoResultion]);

  function closeAndSaveCurrnetSettings() {
    console.log(fileData);
    fileData.requestArguments.set(
      fileData.targetFormat,
      new Map([
        ["frameRate", frameRate],
        ["videoResultion", videoResultion],
      ]),
    );
    setIsDirty(false);
    modalRef.current.close();
  }

  return (
    <div className="text-base-content">
      <button
        className="btn btn-sm sm:btn-md"
        onClick={() => modalRef.current.showModal()}
      >
        <AiOutlineSetting className="size-6" />
      </button>
      <dialog id="my_modal_3" ref={modalRef} className="modal">
        <div className="modal-box overflow-y-visible">
          <div className="flex w-full items-center">
            <AiOutlineSetting className="size-8" />
            <p className="pl-2 text-lg font-bold">Settings</p>
          </div>

          <table className="table-auto border-separate border-spacing-y-4 pt-8">
            <tbody>
              <tr>
                <td>
                  <p className="pr-2">Video Frame Rate</p>
                </td>
                <td>
                  <select
                    onChange={(e) => setFrameRate(e.target.value)}
                    value={frameRate}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value={null}>No Change</option>
                    {[1, 2, 5, 10, 12, 15, 20, 25, 30, 40, 50, 60].map(
                      (value) => {
                        return (
                          <option
                            key={`fps_${value}`}
                            className="p-2"
                            value={value}
                          >
                            {value}
                          </option>
                        );
                      },
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Resultion</td>
                <td>
                  <select
                    onChange={(e) => setVideoResultion(e.target.value)}
                    value={videoResultion}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value={null}>No Change</option>
                    <option value="3840x2160">2160p (4K): 3840x2160</option>
                    <option value="2560x1440">1440p (2k): 2560x1440</option>
                    <option value="1920x1080">1080p (HD): 1920x1080</option>
                    <option value="1280x720">720p (HD): 1280x720</option>
                    <option value="854x480">480p (SD): 854x480</option>
                    <option value="640x360">360p (SD): 640x360</option>
                    <option value="426x240">240p (SD): 426x240</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => modalRef.current.close()}
              className="btn m-4 mt-8"
            >
              Close
            </button>
            <button
              disabled={!isDirty}
              onClick={isDirty ? closeAndSaveCurrnetSettings : null}
              className="btn m-4 mt-8 bg-primary text-primary-content"
            >
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => modalRef.current.close()}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DefaultVideoSettings;
