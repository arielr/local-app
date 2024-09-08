/**
 * Enum for file category
 * @readonly
 * @enum {{category: string}}
 */
const FileCategory = Object.freeze({
  IMAGE: { category: "image" },
  VIDEO: { category: "video" },
  AUDIO: { category: "audio" },

  DOCUMENT: { category: "document" },
});

/**
 * Enum for files
 * @readonly
 * @enum {{name: string, extension: string, category: FileCategory}}
 */
const FileFormat = Object.freeze({
  // PDF: { name: "PDF", extension: "pdf", category: FileCategory.IMAGE },
  //IMAGE FORMATS
  YUV: { name: " .Y.U.V", extension: "", category: "image" },
  AliasPIX: {
    name: "Alias Pix",
    extension: "pix",
    exExtension: ["img", "als", "pix"],
    category: FileCategory.IMAGE,
  },
  GIF: { name: "GIF", extension: "gif", category: FileCategory.IMAGE },
  APNG: {
    name: "APNG",
    extension: "png",
    exExtension: ["apng"],
    category: FileCategory.IMAGE,
  },
  BMP: { name: "BMP", extension: "bmp", category: FileCategory.IMAGE },
  DPX: { name: "DPX", extension: "dpx", category: FileCategory.IMAGE },
  FITS: { name: "FITS", extension: "fits", category: FileCategory.IMAGE },
  // HDR: { name: "HDR", extension: "hdr", category: FileCategory.IMAGE },
  JPEG: {
    name: "JPEG",
    extension: "jpeg",
    exExtension: ["jpg"],
    category: FileCategory.IMAGE,
  },
  JPEG2000: {
    name: "JP2",
    extension: "jpeg",
    category: FileCategory.IMAGE,
  },
  JPEG_LS: { name: "JPEG-LS", extension: "jls", category: FileCategory.IMAGE },
  LJPEG: { name: "LJPEG", extension: "ljpeg", category: FileCategory.IMAGE },
  PAM: { name: "PAM", extension: "pam", category: FileCategory.IMAGE },
  PBM: { name: "PBM", extension: "pbm", category: FileCategory.IMAGE },
  PCX: { name: "PCX", extension: "pcx", category: FileCategory.IMAGE },
  PFM: { name: "PFM", extension: "pfm", category: FileCategory.IMAGE },
  PGM: { name: "PGM", extension: "pgm", category: FileCategory.IMAGE },
  PGMYUV: { name: "PGMYUV", extension: "pgmyuv", category: FileCategory.IMAGE },
  PHM: { name: "PHM", extension: "phm", category: FileCategory.IMAGE },
  PNG: { name: "PNG", extension: "png", category: FileCategory.IMAGE },
  WebP: { name: "WebP", extension: "webp", category: FileCategory.IMAGE },

  // VIDEO FORMATS
  THREEGP: { name: "3GP", extension: "3gp", category: FileCategory.VIDEO },
  AVI: { name: "AVI", extension: "avi", category: FileCategory.VIDEO },
  MKV: { name: "MKV", extension: "mkv", category: FileCategory.VIDEO },
  MP4: { name: "MP4", extension: "mp4", category: FileCategory.VIDEO },
  OGV: { name: "OGV", extension: "ogv", category: FileCategory.VIDEO },
  WEBM: { name: "WEBM", extension: "webm", category: FileCategory.VIDEO },
  WMV: { name: "WMV", extension: "wmv", category: FileCategory.VIDEO },
  AAC: { name: "AAC", extension: "aac", category: FileCategory.AUDIO },

  //VIDEO FORMATS
  AIFF: { name: "AIFF", extension: "aiff", category: FileCategory.AUDIO },
  ALAC: { name: "ALAC", extension: "alac", category: FileCategory.AUDIO },
  AMR: { name: "AMR", extension: "amr", category: FileCategory.AUDIO },
  FLA: { name: "FLA", extension: "fla", category: FileCategory.AUDIO },
  M4A: { name: "M4A", extension: "m4a", category: FileCategory.AUDIO },
  MP3: { name: "MP3", extension: "mp3", category: FileCategory.AUDIO },
  OGG: { name: "OGG", extension: "ogg", category: FileCategory.AUDIO },
  WAV: { name: "WAV", extension: "wav", category: FileCategory.AUDIO },
  WMA: { name: "WMA", extension: "wma", category: FileCategory.AUDIO },

  getImageFormats() {
    return Object.values(FileFormat).filter(
      (obj) => obj.category == FileCategory.IMAGE,
    );
  },
  getVideoFormats() {
    return Object.values(FileFormat).filter(
      (obj) => obj.category == FileCategory.VIDEO,
    );
  },
  getAudioFormats() {
    return Object.values(FileFormat).filter(
      (obj) => obj.category == FileCategory.AUDIO,
    );
  },
  getAllValues() {
    return Object.values(FileFormat);
  },
});

export { FileFormat, FileCategory };
