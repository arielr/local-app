import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class ImageConvertor {

    async load() {
        console.log('ariel');
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        this.ffmpeg = new FFmpeg();
        this.ffmpeg.on('log', ({ message }) => {
            // messageRef.current.innerHTML = message;
            console.log(message);
        });
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await this.ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
      }

    async convert(fileData) {
        console.log(fileData);
        const {file, targetFormat} = fileData;
        var uint8Array =  new Uint8Array(await file.arrayBuffer());
        await this.ffmpeg.writeFile(file.name, uint8Array); 
        await this.ffmpeg.exec(['-i', file.name, fileData.getOutputFileName()]);
        
        const binaryRes = await this.ffmpeg.readFile(fileData.getOutputFileName());
        const blob = new Blob([binaryRes.buffer]);
        return new File([blob], fileData.getOutputFileName(), { type: `image/${fileData.targetFormat}` });
        
  }

}

export default ImageConvertor;