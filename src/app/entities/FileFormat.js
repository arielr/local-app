/**
 * Enum for files
 * @readonly
 * @enum {{name: string, extension: string, fileCategory: string}}
 */

const FileFormat  = Object.freeze({
    PDF:   { name: "PDF", extension: "pdf", fileCategory: "document"},
    YUV: {name: " .Y.U.V", extension:"", category:"image" },
    AliasPIX: {name: "Alias Pix", extension:"", category: "image"},
    GIF: {name: "GIF", extension:"", category: "image"},
    APNG: {name: "APNG", extension:"", category:"image" },
    BMP: {name: "BMP", extension: "bmp", category:"image" },
    DPX: {name: "DPX", extension: "dpx", category:"image"},
    FITS: {name: "FITS", extension: 'fits', category: "image"},
    HDR: {name: "HDR", extension:"", category: "image"},
    JPEG: {name: "JPEG", extension: "jpeg", category:"image"},
    JPEG2000: {name: "JPEG2000", extension: "jpeg",  category:"image" },
    JPEG_LS: {name: 'JPEG-LS', extension:"", category:"image" },
    LJPEG: {name: "LJPEG", extension: "", category: "image"},
    PAM: {name: "PAM", extension: "pam", category: "image"},
    PBM: {name: "PBM", extension: "pbm", category:"image" },
    PCX: {name: "PCX", extension: "pcx", category: "image"},
    PFM: {name: "PFM", extension: "pfm", category: "image"},
    PGM: {name: "PGM", extension: "pgm", category: "image"},
    PGMYUV: {name: "PGMYUV", extension: "pgmyuv", category:"image"},
    PHM: {name: "PHM", extension: "phm", category: "image"},
    // PNG: {name: , extension:, category: "image"},
    // PPM: {name: , extension:, category: "image"},
    // QOI: {name: , extension:, category: "image"},
    // SGI: {name: , extension:, category: "image"},
    // SunRasterfile: {name: , extension:, category:  "image"},
    // TIFF: {name: , extension:, category:  "image"},
    // Truevision Targa: {name: , extension:, category:  "image"},
    // VBN: {name: , extension:, category:  "image"},
    // WBMP: {name: , extension:, category:  "image"},
    // XBM: {name: , extension:, category:  "image"},
    // XFace: {name: , extension:, category:  "image"},
    // XWD: {name: , extension:, category:  "image"},
  });

  export default FileFormat;