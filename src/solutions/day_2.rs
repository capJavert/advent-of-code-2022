use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_2(input: JsValue) -> usize {
    let elements: Vec<Vec<String>> = serde_wasm_bindgen::from_value(input).unwrap();
    let choices = vec!["Rock", "Paper", "Scissors"];

    let score = elements.iter().fold(0, |acc, item| {
        let me = item.get(1).unwrap();
        let him = item.get(0).unwrap();

        let choice1 = choices.iter().position(|item| item == me).unwrap();
        let choice2 = choices.iter().position(|item| item == him).unwrap();

        let play_round = || -> usize {
            if choice1 == choice2 {
                return 3;
            } else if choice1 == choices.len() - 1 && choice2 == 0 {
                return 0;
            }
            if choice2 == choices.len() - 1 && choice1 == 0 {
                return 6;
            }
            if choice1 > choice2 {
                return 6;
            } else {
                return 0;
            }
        };

        acc + play_round() + (choice1 + 1)
    });

    score
}
