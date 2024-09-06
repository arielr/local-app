import ConversionTask from "../ui/ConversionTaskItem";

class FfMpegCommandBuilder {
  constructor(conversionTask) {
    this.conversionTask = conversionTask;
  }

  build() {
    const { file, targetFormat, requestArguments } = this.conversionTask;
    const args = requestArguments.get(targetFormat);

    var joinedArgs = [];
    if (args) {
      joinedArgs = Array.from(
        args[Symbol.iterator]()
          .filter((a) => a[1])
          .map((a) => a.join("=")),
      );
    }

    return [
      "-i",
      file.name,
      this.conversionTask.getOutputFileName(),
      "-filter:v",
    ].concat(joinedArgs);
  }
}

export default FfMpegCommandBuilder;
