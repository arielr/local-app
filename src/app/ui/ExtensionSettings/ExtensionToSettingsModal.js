import { FileFormat } from "../../entities/FileFormat";
import DefaultVideoSettings from "./DefaultVideoSettings";

const fileFormatToSettingsModal = new Map();
fileFormatToSettingsModal.set(FileFormat.GIF, (props) => (
  <DefaultVideoSettings {...props} />
));

export { fileFormatToSettingsModal };
