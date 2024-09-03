import JSZip from "jszip";

class FilesUtils {
  static async zipFiles(fileDataArray, outputFileName) {
    var zip = new JSZip();
    await Promise.all(
      fileDataArray.map(async (fileData) => {
        var arrayBuffer = await fileData.converted.arrayBuffer();
        var res = zip.file("aa.jpg", arrayBuffer);
      }),
    );

    var content = await zip.generateAsync({ type: "blob" });
    FilesUtils.downloadFile(new File([content], outputFileName));
  }
  static downloadFile(file) {
    console.log(file);
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }
  static formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}

export default FilesUtils;
