use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Debug)]
struct Instruction {
    name: String,
    args: Vec<isize>,
    cycles: usize,
}

#[wasm_bindgen]
pub fn solve_day_10(input: JsValue) -> Vec<isize> {
    let mut instructions: Vec<Instruction> = serde_wasm_bindgen::from_value(input).unwrap();
    instructions.reverse();

    let mut register_values = vec![];
    let mut register_x = 1;
    let mut cycle = 0;

    loop {
        cycle += 1;

        if (cycle - 20) % 40 == 0 {
            let signal_strength = cycle * register_x;
            register_values.push(signal_strength);
        }

        let instruction = instructions.last_mut().unwrap();

        instruction.cycles -= 1;

        if instruction.cycles == 0 {
            match instruction.name.as_str() {
                "addx" => {
                    register_x += instruction.args[0];
                }
                "noop" => (),
                _ => (),
            };

            instructions.pop();
        }

        if instructions.is_empty() {
            break;
        }
    }

    register_values
}
