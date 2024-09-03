/**
 * Enum for file category
 * @readonly
 * @enum {{category: string}}
 */
const FileCategory = Object.freeze({
  IMAGE: { category: "image" },
  VIDEO: { category: "video" },
  DOCUMENT: { category: "document" },
});

/**
 * Enum for files
 * @readonly
 * @enum {{name: string, extension: string, category: FileCategory}}
 */
const FileFormat = Object.freeze({
  PDF: { name: "PDF", extension: "pdf", category: FileCategory.IMAGE },
  YUV: { name: " .Y.U.V", extension: "", category: "image" },
  AliasPIX: { name: "Alias Pix", extension: "", category: FileCategory.IMAGE },
  GIF: { name: "GIF", extension: "gif", category: FileCategory.IMAGE },
  APNG: { name: "APNG", extension: "", category: FileCategory.IMAGE },
  BMP: { name: "BMP", extension: "bmp", category: FileCategory.IMAGE },
  DPX: { name: "DPX", extension: "dpx", category: FileCategory.IMAGE },
  FITS: { name: "FITS", extension: "fits", category: FileCategory.IMAGE },
  HDR: { name: "HDR", extension: "", category: FileCategory.IMAGE },
  JPEG: { name: "JPEG", extension: "jpeg", category: FileCategory.IMAGE },
  JPEG2000: {
    name: "JPEG2000",
    extension: "jpeg",
    category: FileCategory.IMAGE,
  },
  JPEG_LS: { name: "JPEG-LS", extension: "", category: FileCategory.IMAGE },
  LJPEG: { name: "LJPEG", extension: "ljpeg", category: FileCategory.IMAGE },
  PAM: { name: "PAM", extension: "pam", category: FileCategory.IMAGE },
  PBM: { name: "PBM", extension: "pbm", category: FileCategory.IMAGE },
  PCX: { name: "PCX", extension: "pcx", category: FileCategory.IMAGE },
  PFM: { name: "PFM", extension: "pfm", category: FileCategory.IMAGE },
  PGM: { name: "PGM", extension: "pgm", category: FileCategory.IMAGE },
  PGMYUV: { name: "PGMYUV", extension: "pgmyuv", category: FileCategory.IMAGE },
  PHM: { name: "PHM", extension: "phm", category: FileCategory.IMAGE },
  PNG: { name: "PNG", extension: "png", category: FileCategory.IMAGE },

  // VIDEO FORMATS
  THREEGP: { name: "3GP", extension: "3gp", category: FileCategory.VIDEO },
  AVI: { name: "AVI", extension: "avi", category: FileCategory.VIDEO },
  MKV: { name: "MKV", extension: "mkv", category: FileCategory.VIDEO },
  MP4: { name: "MP4", extension: "mp4", category: FileCategory.VIDEO },
  OGV: { name: "OGV", extension: "ogv", category: FileCategory.VIDEO },
  WEBM: { name: "WEBM", extension: "webm", category: FileCategory.VIDEO },
  WMV: { name: "WMV", extension: "wmv", category: FileCategory.VIDEO },
  // PNG: {name: "", extension: "", category: FileCategory.VIDEO},

  // PPM: {name: , extension:, category: FileCategory.IMAGE},
  // QOI: {name: , extension:, category: FileCategory.IMAGE},
  // SGI: {name: , extension:, category: FileCategory.IMAGE},
  // SunRasterfile: {name: , extension:, category:  FileCategory.IMAGE},
  // TIFF: {name: , extension:, category:  FileCategory.IMAGE},
  // Truevision Targa: {name: , extension:, category:  FileCategory.IMAGE},
  // VBN: {name: , extension:, category:  FileCategory.IMAGE},
  // WBMP: {name: , extension:, category:  FileCategory.IMAGE},
  // XBM: {name: , extension:, category:  FileCategory.IMAGE},
  // XFace: {name: , extension:, category:  FileCategory.IMAGE},
  // XWD: {name: , extension:, category:  FileCategory.IMAGE},
  //     3GP
  // AVI
  // FLV
  // MKV
  // MOV
  // MP4
  // OGV
  // WEBM
  // WMV

  // AAC
  // AIFF
  // ALAC
  // AMR
  // FLAC
  // M4A
  // MP3
  // OGG
  // WAV
  // WMA

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
});

export { FileFormat, FileCategory };
