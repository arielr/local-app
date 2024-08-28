use std::fs::File;
use std::io::{prelude::*, BufWriter};
use std::path::Path;
use std::{error::Error};
use js_sys::{Array, ArrayBuffer, Uint8Array};
use quickxml_to_serde::xml_string_to_json;
use wasm_bindgen::prelude::*;
use wasm_bindgen_file_reader::WebSysFile;
use wasm_bindgen_futures::JsFuture;
use web_sys::*;
use std::io::prelude::*;
use std::io::Cursor;
use image::{DynamicImage, ImageEncoder, ImageFormat, ImageReader};
use std::convert::TryInto;
use webp::{Encoder, PixelLayout, WebPImage, WebPMemory}; // Using webp crate: https://github.com/jaredforth/webp

fn vector2array<T, const N: usize>(v: Vec<T>) -> [T; N] {
    v.try_into()
        .unwrap_or_else(|v: Vec<T>| panic!("Expected a Vec of length {} but it was {}", N, v.len()))
}

pub fn array_buffer_to_vec(array_buffer: &ArrayBuffer) -> Vec<u8> {

    let uint8_array = Uint8Array::new(array_buffer);
    let len = uint8_array.length() as usize;
    let mut vec = Vec::with_capacity(len);
    for i in 0..len {
        vec.push(uint8_array.get_index(i as u32) as u8);
    }
    vec
}

// pub fn vec_to_array_buffer(vec: Vec<u8>) -> ArrayBuffer {
//     let  collect:
    
//     ArrayBuffer::new(collect);

// //     let array = vector2array(vec);
// //     let buffer: JsValue = /* ... */;
// // let array = Uint8Array::new(&buffer);
// // let bytes: Vec<u8> = array.to_vec();
// //    let a=  Uint8Array::from(array.bytes().collect());
// //     let uint8_array = Uint8Array::from(a);
// //     let array_buffer = uint8_array.buffer();
// //     array_buffer
// }


#[wasm_bindgen]
pub async fn convert_image(file:  js_sys::Uint8Array) -> Result<Array, String> {
    
    wasm_logger::init(wasm_logger::Config::default());
    
    let byte_vector = file.to_vec();
    log::info!("Some info1");

    // let mut reader = ImageReader::new(Cursor::new(byte_vector))
    // .with_guessed_format()
    // .expect("Cursor io never fails");
    let image = ImageReader::new(Cursor::new(byte_vector)).decode().unwrap();

    // let image_format: Option<ImageFormat> = match image::guess_format(image.as_bytes()).unwrap() {
    //     ImageFormat::Png => Some(ImageFormat::Png),
    //     ImageFormat::Jpeg => Some(ImageFormat::Jpeg),
    //     _ => None,
    // };

    // Make webp::Encoder from DynamicImage
    let encoder: Encoder = Encoder::from_image(&image).unwrap();

    // Encode image into WebPMemory
    let encoded_webp: WebPMemory = encoder.encode(65f32);

log::info!("Some info1.1");
    // let image = match reader.decode() {
    //     Ok(image) => image,
    //     Err(err) => {
    //         log::info!("ariel error {}", err.);
    //         return Err("error".to_string());
    //     }
    // };
log::info!("Some info1.2");
    // let image = match image::load_from_memory(file.to_vec().as_slice()) {
    //     Ok(image) => image,
    //     Err(err) => {
    //         log::info!("{}", err);
    //         return Err("error".to_string());
    //     }
    // };
    log::info!("Some info2");
    let vec: Vec<_> = Vec::new();
    log::info!("Some info3");
    let buffer = BufWriter::new(vec);
    // let img2  = image.rotate90();
    log::info!("Some info4");

    let result_array = image.into_bytes();
    let result: Array = result_array.into_iter().map(JsValue::from).collect();

    return Ok(result);
    // image.write_to(&mut buffer, image::ImageFormat::Png);
    // let img2 = match ImageReader::new(Cursor::new(byte_vector)).with_guessed_format(){
    //     Ok(mut image_reader) =>{
    //         let mut bytes: Vec<u8> = Vec::new();
    //         image_reader.set_format( image::ImageFormat::Png);
         

    //         let fout = &mut File::create(Path::new(&format!("efsd.png"))).unwrap();
            
    //         // Write the contents of this image to the Writer in PNG format.
    //         img2.write_to(fout, ImageFormat::Png).unwrap();
    //         return Ok(js_sys::ArrayBuffer::new(length))

    //     }
    //         Err(error) =>{

    //         }
        
    // };

  
       
   

}

fn main() {
    println!("Hello, world!");
}
