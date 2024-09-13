import { fileTypeFromStream } from "file-type";
import { FileFormat } from "./FileFormat";
/**
 * Enum for common conversion status.
 * @readonly
 * @enum {{name: string}}
 */
const ConversionStatus = Object.freeze({
  NONE: { name: "none" },
  PROCESSING: { name: "processing" },
  DONE: { name: "done" },
  ERROR: { name: "error" },
});

class ConversionTask {
  constructor({ file, targetFormat, id }) {
    this.id = id;
    this.status = ConversionStatus.NONE;
    this.file = file;
    this.targetFormat = targetFormat;
    this.sourceFormat = null;
    this.outputFile = null;
    this.fileType = null;
    this.onProgress = null;
    this.requestArguments = new Map();
    this.logs = [];
  }

  updateFileFormat(newTargetFormat) {
    if (this.targetFormat) {
      this.logs = [];
      this.status = ConversionStatus.NONE;
      this.converted = null;
      this.requestArguments = new Map();
    }
    this.targetFormat = newTargetFormat;
  }

  getOutputFileName() {
    const originalFileName = this.file.name;
    const pos = originalFileName.includes(".")
      ? originalFileName.lastIndexOf(".")
      : originalFileName.length;
    const fileRoot = originalFileName.substr(0, pos);
    return `${fileRoot}_output.${this.targetFormat.extension}`;
  }

  iteratorToStream(iterator) {
    return new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();

        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      },
    });
  }

  async getSourceFileType() {
    if (this.sourceFormat || this.file == null) return this.sourceFormat;

    const allFileFormats = FileFormat.getAllValues();
    const result = await fileTypeFromStream(this.file.stream());
    var ext = this.file.name.split(".").pop();

    if (!result) {
      //in case we couldn't get the file type using mime
      // we will try to find its extension.
      if (ext) {
        const fileFormatByExtension = allFileFormats.find(
          (f) => f.extension == ext || f.exExtension?.includes(result?.ext),
        );
        if (fileFormatByExtension) {
          this.sourceFormat = fileFromat;
          return fileFormatByExtension;
        }
      }
    } else if (!result.ext && result.mime) {
      if (result.mime.includes("image")) {
        this.sourceFormat = FileFormat.UNKNOWN_IMAGE;
      } else if (result.mime.includes("video")) {
        this.sourceFormat = FileFormat.UNKNOWN_VIDEO;
      } else if (result.mime.includes("audio")) {
        this.sourceFormat = FileFormat.UNKNOWN_AUDIO;
      } else {
        this.sourceFormat = FileFormat.UNKNOWN;
      }

      return this.sourceFormat;
    }
    if (result?.ext) {
      ext = result.ext;
    }
    const fileFromat = allFileFormats.find((f) => {
      return f.extension == ext || f.exExtension?.includes(ext);
    });
    this.sourceFormat = fileFromat;

    return fileFromat;
  }

  isFileHasSettings() {
    return this.targetFormat == FileFormat.GIF;
  }

  getErrorMessage() {
    const errorLastIndex = this.logs.findIndex((event) => {
      return event.message.includes("Aborted()");
    });
    if (!errorLastIndex || errorLastIndex < 2) {
      return this.logs.join(",");
    }
    console.log("errorLastIndex", this.logs[errorLastIndex]);

    return `${this.logs[errorLastIndex - 2]?.message} \n ${this.logs[errorLastIndex - 1]?.message}`;
  }
}
export { ConversionTask, ConversionStatus };
