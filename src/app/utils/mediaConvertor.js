import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import FfMpegCommandBuilder from "./ffmpegCommandBuilder";
import { ConversionStatus } from "../entities/ConvertionTask";
import { get, set } from "idb-keyval";
const FFMPEG_SUCCESS = 0;

/**
 * Enum for common colors.
 * @readonly
 * @enum {{name: string}}
 */
const MediaConvertorStatus = Object.freeze({
  NOT_READY: { name: "not_ready" },
  LOADING: { name: "loading" },
  LOADED: { name: "loaded" },
  ERROR: { name: "error" },
});

class MediaConvertor {
  constructor() {
    this.controller = new AbortController();
    this.status = MediaConvertorStatus.NOT_READY;
    this.loadingPromise = null;
  }

  async getFromCacheOrDownload(key, blobGetter) {
    return get(key).then((res) => {
      console.log(res);
      if (res == undefined) {
        return blobGetter().then((wasm) => {
          console.log(blob);
          set(key, blob);
          return URL.createObjectURL(
            new Blob([wasm], { type: "application/wasm" }),
          );
        });
      } else {
        return res;
      }
    });
  }

  async load() {
    if (this.status != MediaConvertorStatus.NOT_READY) return;

    this.status = MediaConvertorStatus.LOADING;

    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    this.ffmpeg = new FFmpeg();

    const coreUrlPromise = toBlobURL(
      `${baseURL}/ffmpeg-core.js`,
      "text/javascript",
    );

    const wasmUrlPromise = get("ffmpeg-core.wasm").then((res) => {
      if (!res) {
        return fetchFile(`${baseURL}/ffmpeg-core.wasm`).then((res) => {
          set("ffmpeg-core.wasm", res);
          return URL.createObjectURL(
            new Blob([res], { type: "application/wasm" }),
          );
        });
      }
      console.log("loading from cache");
      return URL.createObjectURL(new Blob([res], { type: "application/wasm" }));
    });

    const workerUrlPromise = toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript",
    );

    await Promise.all([coreUrlPromise, wasmUrlPromise, workerUrlPromise]);
    var result = this.ffmpeg.load({
      coreURL: await coreUrlPromise,
      wasmURL: await wasmUrlPromise,
      workerURL: await workerUrlPromise,
    });

    console.log(await wasmUrlPromise);
    this.status = MediaConvertorStatus.LOADED;
    this.loadingPromise = result;
    return await result;
  }

  terminateCurrentJobs() {
    this.controller?.abort();
  }

  async convert(fileData) {
    console.log(this.ffmpeg);
    console.log(this.loadingPromise);
    console.log(await this.loadingPromise);

    const signal = this.controller.signal;
    const { file, targetFormat, requestArguments } = fileData;

    this.ffmpeg.on("progress", (event) => {
      fileData?.onProgress(event.progress);
    });

    this.ffmpeg.on("log", (event) => {
      fileData.logs.push(event);
    });

    const requestBuilder = new FfMpegCommandBuilder(fileData);
    var uint8Array = new Uint8Array(await file.arrayBuffer());
    await this.ffmpeg.writeFile(file.name, uint8Array);
    const args = requestBuilder.build();
    fileData.status = ConversionStatus.PROCESSING;
    const errorCode = await this.ffmpeg.exec(requestBuilder.build(), -1, {
      signal,
    });
    if (errorCode != FFMPEG_SUCCESS) {
      fileData.status = ConversionStatus.ERROR;
      fileData.error = fileData.getErrorMessage();
      console.log(fileData);
      return null;
    }
    // const sourceFileData =  await this.ffmpeg.exec(['-i', file.name,""]);
    // console.log('fileData',sourceFileData);
    console.log(fileData);
    const binaryRes = await this.ffmpeg.readFile(fileData.getOutputFileName());
    const blob = new Blob([binaryRes.buffer]);
    fileData.status = ConversionStatus.DONE;
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
