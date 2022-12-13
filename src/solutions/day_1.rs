use wasm_bindgen::prelude::*;

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
