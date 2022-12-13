use wasm_bindgen::prelude::*;

pub mod day_1;
pub mod day_10;
pub mod day_11;
pub mod day_12;
pub mod day_13;
pub mod day_2;
pub mod day_3;
pub mod day_4;
pub mod day_5;
pub mod day_6;
pub mod day_7;
pub mod day_8;
pub mod day_9;
pub mod utils;

#[wasm_bindgen]
pub fn merry_xmas(year: Option<i32>) {
    console_log!("Merry Xmas {}!", year.unwrap_or(2022))
}
