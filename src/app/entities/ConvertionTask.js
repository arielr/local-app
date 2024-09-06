import { fileTypeFromStream } from "file-type";
import { FileFormat } from "./FileFormat";
/**
 * Enum for common colors.
 * @readonly
 * @enum {{name: string}}
 */
const Status = Object.freeze({
  NONE: { name: "none" },
  PROCESSING: { name: "processing" },
  DONE: { name: "done" },
  ERROR: { name: "error" },
});

class ConversionTask {
  constructor({ file, targetFormat, id }) {
    this.id = id;
    this.status = Status.NONE;
    this.file = file;
    this.targetFormat = targetFormat;
    this.sourceFormat = null;
    this.outputFile = null;
    this.fileType = null;
    this.onProgress = null;
    this.requestArguments = new Map();
  }

  getOutputFileName() {
    const originalFileName = this.file.name;
    const pos = originalFileName.includes(".")
      ? originalFileName.lastIndexOf(".")
      : originalFileName.length;
    const fileRoot = originalFileName.substr(0, pos);
    return `${fileRoot}.${this.targetFormat.extension}`;
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
    console.log(this.file);
    if (this.sourceFormat || this.file == null) return this.sourceFormat;
    const result = await fileTypeFromStream(this.file.stream());
    this.sourceFormat = result;
    return result;
  }

  isFileHasSettings() {
    return this.targetFormat == FileFormat.GIF;
  }
}
export { ConversionTask, Status };
