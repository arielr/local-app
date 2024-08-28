use std::fs::File;
use std::io::prelude::*;
use std::{error::Error};
use js_sys::{ArrayBuffer, Uint8Array};
use quickxml_to_serde::xml_string_to_json;
use wasm_bindgen::prelude::*;
use wasm_bindgen_file_reader::WebSysFile;
use wasm_bindgen_futures::JsFuture;
use web_sys::*;
use std::io::prelude::*;

pub fn array_buffer_to_vec(array_buffer: &ArrayBuffer) -> Vec<u8> {
    let uint8_array = Uint8Array::new(array_buffer);
    let len = uint8_array.length() as usize;
    let mut vec = Vec::with_capacity(len);
    for i in 0..len {
        vec.push(uint8_array.get_index(i as u32) as u8);
    }
    vec
}



#[wasm_bindgen]
pub async fn convert_xml_to_json(file:  js_sys::ArrayBuffer) -> Result<String, String> {
    wasm_logger::init(wasm_logger::Config::default());

    let array = array_buffer_to_vec(&file);
    

    let xml_content = match String::from_utf8(array) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
    };
    
    let json = match xml_string_to_json(xml_content, &quickxml_to_serde::Config::new_with_defaults()) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
    };
    return Ok(json.to_string());
    // return Ok(String::from(format!("file.length {}",)));
            //     match  xml_string_to_json(file, &quickxml_to_serde::Config::new_with_defaults()) {
            //     Ok(json) =>{
            //         return  Ok(String::from("Hello, world!"));//Ok(json.to_string());
            //     }
        
            //     Err(error) =>{
            //         return Err( String::new());
            //     }
            // }
    // match JsFuture::from(file.array_buffer()).await {
    //     Ok(byte_array) =>{
    //         let test = JsValue::int(byte_array);
    //         match  xml_string_to_json(test, &quickxml_to_serde::Config::new_with_defaults()) {
    //             Ok(json) =>{
    //                 return  Ok(String::from("Hello, world!"));//Ok(json.to_string());
    //             }
        
    //             Err(error) =>{
    //                 return Err( String::new());
    //             }
    //         }
    //     }
    //     Err(error) =>{}
    // };

//    match file.array_buffer() {
//         Ok(number) => {log::info!("The num of bytes read {number}'s ");}     

    // }
    // let mut file_reader = WebSysFile::new(file);
    // log::info!("Some info1");
    // let mut buffer = Vec::new();
    // log::info!("Some info2.2");
    // match file_reader.read_to_end(&mut buffer) {
    //     Ok(number) => {log::info!("The num of bytes read {number}'s ");}     
    //     Err(error) =>   { log::info!("error:!! {error}'s ");}
    // }
    log::info!("Some info3");
    return Ok(String::from("asdfa"));
   
    // convert the XML string into JSON with default config params
    // match  xml_string_to_json(xml_contents, &quickxml_to_serde::Config::new_with_defaults()) {
    //     Ok(json) =>{
    //         return  Ok(String::from("Hello, world!"));//Ok(json.to_string());
    //     }

    //     Err(error) =>{
    //         return Err( String::new());
    //     }
    // }


// json?
// let my_bytes: &[u8] = json.as_bytes();

}

fn main() {
    println!("Hello, world!");
}
