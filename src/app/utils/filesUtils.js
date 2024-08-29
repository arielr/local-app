import JSZip from "jszip";

class FilesUtils {
    
    static async zipFiles(fileDataArray, outputFileName){
        var zip = new JSZip();
        await Promise.all(fileDataArray.map(async (fileData)=> {     
            // fileData.getOutputFileName();
            var arrayBuffer = await fileData.converted.arrayBuffer();
            var res=  zip.file("aa.jpg", arrayBuffer);
            console.log("zip1", res);
        }));
        console.log("aaaaaaa");
        var content = await zip.generateAsync({type:"blob"});
        console.log("aaaabbbbaaa", content);
            // see FileSaver.js
        FilesUtils.downloadFile(new File([content], outputFileName));
    }
    static downloadFile(file) {
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    }
}

export default FilesUtils;