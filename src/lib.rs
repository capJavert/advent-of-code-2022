use wasm_bindgen::prelude::*;

pub mod utils;

#[allow(dead_code)]
pub mod solutions {
    automod::dir!("src/solutions");
}

#[wasm_bindgen]
pub fn merry_xmas(year: Option<i32>) {
    console_log!("Merry Xmas {}!", year.unwrap_or(2022))
}
