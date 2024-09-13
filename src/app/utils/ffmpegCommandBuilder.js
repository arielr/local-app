import { FileCategory, FileFormat } from "../entities/FileFormat";
import ConversionTask from "../ui/ConversionTaskItem";

class FfMpegCommandBuilder {
  constructor(conversionTask) {
    this.conversionTask = conversionTask;
  }

  build() {
    const { file, targetFormat, requestArguments, sourceFormat } =
      this.conversionTask;
    const args = requestArguments.get(targetFormat);

    var joinedArgs = [];
    if (args) {
      joinedArgs = Array.from(
        args[Symbol.iterator]()
          .filter((a) => a[1])
          .map((a) => a.join("=")),
      );
    }

    if (joinedArgs.length > 0) {
      joinedArgs = ["-vf", ...joinedArgs];
    }

    if (
      sourceFormat.category == FileCategory.VIDEO &&
      targetFormat.category == FileCategory.IMAGE &&
      targetFormat != FileFormat.GIF &&
      targetFormat != FileFormat.WebP
    ) {
      joinedArgs.push("-ss 00:00:01");
    }

    return [
      "-i",
      file.name,
      //   "-c",
      //   "copy",
      this.conversionTask.getOutputFileName(),
    ].concat(joinedArgs);
  }
}

export default FfMpegCommandBuilder;
