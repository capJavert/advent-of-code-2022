use std::cmp::Ordering;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Debug, Serialize)]
#[serde(untagged)]
enum Pair {
    Multi(Vec<Pair>),
    Single(usize),
}

fn compare(a: &Pair, b: &Pair) -> isize {
    match a {
        Pair::Multi(pair_a) => match b {
            Pair::Multi(pair_b) => {
                let mut result_list = vec![];

                let size = if pair_a.len() > pair_b.len() {
                    pair_a.len()
                } else {
                    pair_b.len()
                };

                for index in 0..size {
                    let sub_pair_a = pair_a.get(index);
                    let sub_pair_b = pair_b.get(index);

                    if sub_pair_a.is_none() {
                        result_list.push(1);

                        break;
                    }

                    if sub_pair_b.is_none() {
                        if result_list.iter().all(|result| *result == 0) {
                            result_list.push(-1);
                        }

                        break;
                    }

                    let result = compare(sub_pair_a.unwrap(), sub_pair_b.unwrap());
                    result_list.push(result);

                    if result == -1 {
                        break;
                    }
                }

                if result_list.iter().any(|result| *result == 1) {
                    1
                } else if result_list.iter().any(|result| *result == -1) {
                    -1
                } else {
                    0
                }
            }
            Pair::Single(pair_b) => compare(a, &Pair::Multi(vec![Pair::Single(*pair_b)])),
        },
        Pair::Single(pair_a) => match b {
            Pair::Multi(_) => compare(&Pair::Multi(vec![Pair::Single(*pair_a)]), b),
            Pair::Single(pair_b) => {
                if pair_a < pair_b {
                    1
                } else if pair_a > pair_b {
                    -1
                } else {
                    0
                }
            }
        },
    }
}

#[wasm_bindgen]
pub fn solve_day_13(input: JsValue) -> JsValue {
    let mut pairs: Vec<Pair> = serde_wasm_bindgen::from_value(input).unwrap();
    pairs.sort_by(|a, b| match compare(&a, &b) {
        1 => Ordering::Less,
        -1 => Ordering::Greater,
        0 => Ordering::Equal,
        _ => panic!("Uknown sort order"),
    });

    serde_wasm_bindgen::to_value(&pairs).unwrap()
}
