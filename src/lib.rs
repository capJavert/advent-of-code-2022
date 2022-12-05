use wasm_bindgen::prelude::*;

pub mod day_1;
pub mod day_2;
pub mod day_3;
pub mod day_4;
pub mod day_5;
pub mod utils;

#[wasm_bindgen]
pub fn merry_xmas(year: Option<i32>) {
    console_log!("Merry Xmas {}!", year.unwrap_or(2022))
}
