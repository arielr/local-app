import {fileTypeFromStream} from 'file-type';

/**
 * Enum for common colors.
 * @readonly
 * @enum {{name: string}}
 */
const Status = Object.freeze({
    NONE:   { name: "none" },
    PROCESSING:  { name: "processing"},
    DONE: { name: "done" },
    ERROR: { name:"error"}
  });

class FileData {
    
    constructor({file, targetFormat, id}) {
        this.status = Status.NONE;
        this.file = file;
        this.targetFormat = targetFormat;
        this.sourceFormat = null;
        this.id = id;
        this.converted = null;
        this.fileType = null;
    }

    getOutputFileName(){
        const originalFileName = this.file.name;
        const pos = originalFileName.includes(".") ? originalFileName.lastIndexOf(".") : originalFileName.length
        const fileRoot = originalFileName.substr(0, pos);
        return `${fileRoot}.${this.targetFormat}`;
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
        if(this.sourceFormat || this.file == null) return this.sourceFormat;
        const result = await fileTypeFromStream(this.file.stream());
        this.sourceFormat = result;
        return result;
        
    }
    

}
export {
    FileData,
    Status
}
