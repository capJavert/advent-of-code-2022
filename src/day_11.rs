use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone)]
struct Note {
    monkey: usize,
    items: Vec<usize>,
    operation: String,
    #[serde(rename(deserialize = "operationValue"))]
    operation_value: usize,
    test: usize,
    #[serde(rename(deserialize = "testTrue"))]
    test_true: usize,
    #[serde(rename(deserialize = "testFalse"))]
    test_false: usize,
}

#[wasm_bindgen]
pub fn solve_day_11(input: JsValue) -> Vec<usize> {
    let mut notes: Vec<Note> = serde_wasm_bindgen::from_value(input).unwrap();
    let mut monkeys: Vec<usize> = notes.iter().map(|_| 0).collect();
    let special_monkey = monkeys.len() - 2;
    let monkey_count = monkeys.len();

    for _ in 1..21 {
        for index in 0..monkey_count {
            let items = notes.get(index).unwrap().items.to_vec();

            for item in items {
                let note = notes.get(index).unwrap();
                monkeys[note.monkey] += 1;

                let value = if note.monkey == special_monkey {
                    item
                } else {
                    note.operation_value
                };

                let mut new_value = item;

                match note.operation.as_str() {
                    "+" => {
                        new_value += value;
                    }
                    "*" => {
                        new_value *= value;
                    }
                    _ => panic!("Unknown operation"),
                }

                new_value = new_value / 3;

                let test_result = if new_value % note.test == 0 {
                    note.test_true
                } else {
                    note.test_false
                };

                let next_monkey = notes.get_mut(test_result).unwrap();
                next_monkey.items.push(new_value);
            }

            let monkey = notes.get_mut(index).unwrap();
            monkey.items.clear()
        }
    }

    monkeys
}
