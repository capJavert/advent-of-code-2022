use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_4(input: JsValue) -> usize {
    let elf_pairs: Vec<Vec<Vec<usize>>> = serde_wasm_bindgen::from_value(input).unwrap();

    let is_range_overlap = |range1: &Vec<usize>, range2: &Vec<usize>| -> bool {
        range1.first() <= range2.last() && range2.first() <= range1.last()
    };

    let inefficient_pair_count = elf_pairs.into_iter().fold(0, |acc, pair| {
        let range1 = &pair[0];
        let range2 = &pair[1];

        if is_range_overlap(range1, range2) {
            acc + 1
        } else {
            acc
        }
    });

    inefficient_pair_count
}
