import { FFmpeg, } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import FfMpegCommandBuilder from './ffmpegCommandBuilder';

class ImageConvertor {

    async load() {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        //const baseURL =  "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
        this.ffmpeg = new FFmpeg();

        this.ffmpeg.on('log', ({ message }) => {
            console.log(message);
        });
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await this.ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
        });
      }

    async convert(fileData) {
        const {file, targetFormat,requestArguments} = fileData;
        
        this.ffmpeg.on("progress", (event)=>{
            fileData?.onProgress(event.progress);
        });

        const requestBuilder = new FfMpegCommandBuilder(fileData);
        var uint8Array =  new Uint8Array(await file.arrayBuffer());
        await this.ffmpeg.writeFile(file.name, uint8Array); 
        await this.ffmpeg.exec(requestBuilder.build());
        // const sourceFileData =  await this.ffmpeg.exec(['-i', file.name,""]);
        // console.log('fileData',sourceFileData);

        const binaryRes = await this.ffmpeg.readFile(fileData.getOutputFileName());
        const blob = new Blob([binaryRes.buffer]);
        return new File([blob], fileData.getOutputFileName(), { type: `image/${fileData.targetFormat.extension}` });
        
  }

}

export default ImageConvertor;