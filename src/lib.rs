use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn merry_xmas(year: Option<i32>) {
    console_log!("Merry Xmas {}!", year.unwrap_or(2022))
}

#[wasm_bindgen]
pub fn solve_day_1(input: Vec<i32>) -> i32 {
    let mut elfs = input.iter().fold(vec![0], |mut acc, item| {
        if item.eq(&0) {
            acc.push(0)
        } else {
            let elf = acc.last_mut().unwrap();
            *elf += *item;
        }

        acc
    });

    elfs.sort_by(|a, b| b.cmp(a));

    elfs[0..3].to_vec().iter().sum::<i32>()
}
