// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// // import init, {read_file_as_array_buffer,initSync} from './worker/tax_webassembly.js';
// import { default as initXmlConvetor, convert_xml_to_json} from '../utils/xml2json/pkg/xml2json.js';
// import { default as initImageConvertor, convert_image} from '../utils/image_convertors/pkg/xml2json.js';



// //convert_image

// const FileUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       if(acceptedFiles && acceptedFiles.length > 0)
//         console.log('aa');
//         fileData = new Blob([selectedFile]);
//         acceptedFiles[0].arrayBuffer().then((f)=>{
//         console.log('bb');

//           console.log(f);
//           console.log(acceptedFiles[0]);
//           convert_image(f).then((res)=>{
//             console.log("start");
//             console.log(f);
//             console.log(new Blob([res]));
//             const file = new File(res, acceptedFiles[0].name, { type: "jpeg" });

//             const url = URL.createObjectURL(new Blob([res]));

//             var img = new Image;
//             img.onload = function() {
//                 console.log('adding image')
//                 document.getElementById("image_div").appendChild(img);
//                 console.log('adding done')

//             };

//             img.src = url;//"http://img.zohostatic.com/discussions/v1/images/defaultPhoto.png";
//             // elem.setAttribute("src", "http://img.zohostatic.com/discussions/v1/images/defaultPhoto.png");
//             // elem.setAttribute("height", "30");
//             // elem.setAttribute("width", "30");
   
//             // console.log(url);
//             // window.open(url);
//             console.log("end");
//           });
  
//           // initSync('./worker/tax_webassembly_bg.wasm');
//           // const a = read_file_as_array_buffer(acceptedFiles[0]).then((res)=>{
//           //   console.log(res);
//           // });
      
//       })
     
//       setUploadedFiles(acceptedFiles);
//       // Call your backend API endpoint to upload files
//     },
//   });

//   useEffect(() => {
//     initXmlConvetor().then(()=>{
//       console.log('init initXmlConvetor!!');
//     })

//     initImageConvertor().then(()=>{
//       console.log('init initImageConvertor!!');
//     })
//   },[]);

//   return (
//     <div className='w-full h-full' {...getRootProps()}>
//       <input {...getInputProps()} />
//       <p>Drag and drop files here or click to browse.</p>
//       <ul>
//         {uploadedFiles.map((file) => (
//           <li key={file.name}>{file.name}</li>
//         ))}
//       </ul>

//     </div>
//   );
// };
// export default FileUpload;
