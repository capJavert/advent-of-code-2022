use std::collections::{HashMap, VecDeque};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_12(input: JsValue) -> JsValue {
    let (map, start, end): (HashMap<String, Vec<String>>, String, String) =
        serde_wasm_bindgen::from_value(input).unwrap();

    let mut frontier = VecDeque::new();
    frontier.push_back(&start);
    let mut came_from = HashMap::new();
    came_from.insert(&start, String::from("x-x"));

    // bfs, breadth first search
    while !frontier.is_empty() {
        let current = frontier.pop_front().unwrap();

        if current == &end {
            break;
        }

        for next in map.get(current).unwrap() {
            if !came_from.contains_key(next) {
                frontier.push_back(next);
                came_from.insert(next, current.to_string());
            }
        }
    }

    let mut current = &end;
    let mut path = vec![];

    // find traversed path
    while current != &start {
        path.push(current);
        current = came_from.get(&current).unwrap();
    }

    path.push(&start);
    path.reverse();

    serde_wasm_bindgen::to_value(&path).unwrap()
}
