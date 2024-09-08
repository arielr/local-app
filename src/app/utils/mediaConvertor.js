import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import FfMpegCommandBuilder from "./ffmpegCommandBuilder";

class MediaConvertor {
  async load() {
    console.log("start loading..");
    // const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    this.ffmpeg = new FFmpeg();

    this.ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    const coreUrlPromise = toBlobURL(
      `${baseURL}/ffmpeg-core.js`,
      "text/javascript",
    );
    const wasmUrlPromise = toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm",
    );
    const workerUrlPromise = toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript",
    );

    await Promise.all([coreUrlPromise, wasmUrlPromise, workerUrlPromise]);
    await this.ffmpeg.load({
      coreURL: await coreUrlPromise,
      wasmURL: await wasmUrlPromise,
      workerURL: await workerUrlPromise,
    });
  }

  async convert(fileData) {
    const { file, targetFormat, requestArguments } = fileData;

    this.ffmpeg.on("progress", (event) => {
      fileData?.onProgress(event.progress);
    });

    this.ffmpeg.on("log", (event) => {
      console.log("ERRRORRRRRRR", event);
    });

    const requestBuilder = new FfMpegCommandBuilder(fileData);
    var uint8Array = new Uint8Array(await file.arrayBuffer());
    await this.ffmpeg.writeFile(file.name, uint8Array);
    const args = requestBuilder.build();
    console.log(args);
    const errorCode = await this.ffmpeg.exec(requestBuilder.build());
    console.log("ERROR CODE", errorCode);
    // const sourceFileData =  await this.ffmpeg.exec(['-i', file.name,""]);
    // console.log('fileData',sourceFileData);

    const binaryRes = await this.ffmpeg.readFile(fileData.getOutputFileName());
    const blob = new Blob([binaryRes.buffer]);
    return new File([blob], fileData.getOutputFileName(), {
      type: `image/${fileData.targetFormat.extension}`,
    });
  }

  async getData(fileData) {
    const { file, targetFormat, requestArguments } = fileData;

    this.ffmpeg.on("progress", (event) => {
      fileData?.onProgress(event.progress);
    });

    var uint8Array = new Uint8Array(await file.arrayBuffer());
    await this.ffmpeg.writeFile(file.name, uint8Array);
    await this.ffmpeg.exec(["i", file.name, "output" + file.name]);
  }
}

export default MediaConvertor;
