use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_6(input: JsValue) -> usize {
    let stream: Vec<String> = serde_wasm_bindgen::from_value(input).unwrap();

    let mut characters = vec![];
    let mut count = 0;

    for (index, character) in stream.into_iter().enumerate() {
        count = index + 1;

        characters.push(character);

        if characters.len() % 4 == 0 {
            let mut characters_dedup = characters.clone();
            characters_dedup.sort();
            characters_dedup.dedup();

            if characters.len() == characters_dedup.len() {
                break;
            } else {
                characters.remove(0);
            }
        }
    }

    count
}
