use std::collections::HashSet;

use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Debug)]
struct Motion {
    direction: String,
    amount: isize,
}

#[derive(Debug, Clone, Copy)]
struct Point {
    x: isize,
    y: isize,
}

#[wasm_bindgen]
pub fn solve_day_9(input: JsValue) -> usize {
    let motions: Vec<Motion> = serde_wasm_bindgen::from_value(input).unwrap();

    let get_distance = |a: Point, b: Point| -> isize {
        (((a.x - b.x).pow(2) + (a.y - b.y).pow(2)) as f32)
            .sqrt()
            .round() as isize
    };

    let mut head = Point { x: 0, y: 0 };
    let mut tail = Point { x: 0, y: 0 };

    let mut tail_positions = HashSet::new();
    tail_positions.insert((0, 0));

    for motion in motions {
        for _ in 0..motion.amount {
            let last_head = head.clone();

            match motion.direction.as_str() {
                "up" => {
                    head.y += 1;
                }
                "right" => {
                    head.x += 1;
                }
                "down" => {
                    head.y -= 1;
                }
                "left" => {
                    head.x -= 1;
                }
                _ => (),
            }

            let distance = get_distance(head, tail);

            if distance > 1 {
                tail = last_head.clone();

                tail_positions.insert((tail.x, tail.y));
            }
        }
    }

    tail_positions.len()
}
