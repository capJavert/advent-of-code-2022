use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Debug)]
struct Step {
    #[serde(rename(deserialize = "moveCount"))]
    move_count: usize,
    from: usize,
    to: usize,
}

#[wasm_bindgen]
pub fn solve_day_5(stacks_input: JsValue, steps_input: JsValue) -> JsValue {
    let mut stacks: Vec<Vec<String>> = serde_wasm_bindgen::from_value(stacks_input).unwrap();
    let steps: Vec<Step> = serde_wasm_bindgen::from_value(steps_input).unwrap();

    for step in steps {
        let from_stack = stacks.get_mut(step.from - 1).unwrap();

        let mut crates_for_move: Vec<String> = vec![];

        for _ in 0..step.move_count {
            match from_stack.pop() {
                Some(value) => crates_for_move.push(value),
                None => (),
            }
        }

        let to_stack = stacks.get_mut(step.to - 1).unwrap();

        for item in crates_for_move {
            to_stack.push(item);
        }
    }

    serde_wasm_bindgen::to_value(&stacks).unwrap()
}
