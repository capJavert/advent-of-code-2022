use serde::Deserialize;
use wasm_bindgen::prelude::*;

use crate::console_log;

#[derive(Deserialize, Debug)]
struct Instruction {
    name: String,
    args: Vec<isize>,
    cycles: usize,
}

#[wasm_bindgen]
pub fn solve_day_10(input: JsValue) {
    let mut instructions: Vec<Instruction> = serde_wasm_bindgen::from_value(input).unwrap();
    instructions.reverse();

    let mut register_x = 1;
    let mut cycle = 0;
    let mut line = vec![];

    loop {
        cycle += 1;

        let print_cycle = (cycle - 1) % 40;
        let sprite = (register_x - 1)..(register_x + 2);

        if sprite.contains(&print_cycle) {
            line.push("#")
        } else {
            line.push(".")
        }

        if print_cycle == 39 {
            console_log!("{}", line.join(""));

            line.clear();
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
}
