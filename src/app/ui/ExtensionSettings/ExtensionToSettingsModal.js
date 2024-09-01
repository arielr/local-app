import FileFormat from "../../entities/FileFormat";
import GifSettings from "./GifSettings";

const fileFormatToSettingsModal = new Map();
fileFormatToSettingsModal.set(FileFormat.GIF,(props) =>  <GifSettings {...props} />);


export {fileFormatToSettingsModal};