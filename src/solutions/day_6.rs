use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_6(input: JsValue) -> usize {
    let stream: Vec<String> = serde_wasm_bindgen::from_value(input).unwrap();

    let mut characters = vec![];
    let mut count = 0;

    for (index, character) in stream.into_iter().enumerate() {
        count = index + 1;

        characters.push(character);

        if characters.len() % 14 == 0 {
            let mut characters_dedup = vec![];
            let mut is_match = true;

            for item in characters.iter() {
                if characters_dedup.contains(&item) {
                    is_match = false;

                    break;
                }

                characters_dedup.push(item)
            }

            if is_match {
                break;
            } else {
                characters.remove(0);
            }
        }
    }

    count
}
