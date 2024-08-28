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
        this.id = id;
        this.converted = null;
    }

    getOutputFileName(){
        const originalFileName = this.file.name;
        const pos = originalFileName.includes(".") ? originalFileName.lastIndexOf(".") : originalFileName.length
        const fileRoot = originalFileName.substr(0, pos);
        return `${fileRoot}.${this.targetFormat}`;
    }

}
export {
    FileData,
    Status
}
