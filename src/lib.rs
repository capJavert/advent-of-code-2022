use std::collections::HashMap;

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

#[wasm_bindgen]
pub fn solve_day_3(input: JsValue) -> usize {
    let groups: Vec<Vec<Vec<usize>>> = serde_wasm_bindgen::from_value(input).unwrap();

    let common_properties: Vec<usize> = groups
        .into_iter()
        .map(|group| {
            let appereances =
                group
                    .into_iter()
                    .enumerate()
                    .fold(HashMap::new(), |mut acc, (index, items)| {
                        for item in items {
                            let appereance = acc.entry(item).or_insert(HashMap::new());

                            appereance.insert(index, true);
                        }

                        acc
                    });

            let badge = appereances
                .keys()
                .find(|item| appereances.get(*item).unwrap().len() == 3)
                .unwrap();

            return *badge;
        })
        .collect();

    let sum = common_properties.iter().fold(0, |acc, item| acc + item);

    sum
}
