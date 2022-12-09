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

    let mut rope: Vec<Point> = vec![];
    let rope_len = 10;

    for _ in 0..rope_len {
        rope.push(Point { x: 0, y: 0 });
    }

    let mut tail_positions = HashSet::new();
    tail_positions.insert((0, 0));

    for motion in motions {
        for _ in 0..motion.amount {
            let mut head = rope.get_mut(0).unwrap();

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

            for index in 1..rope_len {
                let knot_head = rope[index - 1];
                let knot = rope.get_mut(index).unwrap();

                let distance = get_distance(knot_head, *knot);

                if distance > 1 {
                    if knot_head.x > knot.x {
                        knot.x += 1;
                    } else if knot_head.x < knot.x {
                        knot.x -= 1;
                    }

                    if knot_head.y > knot.y {
                        knot.y += 1;
                    } else if knot_head.y < knot.y {
                        knot.y -= 1;
                    }

                    if index == rope_len - 1 {
                        tail_positions.insert((knot.x, knot.y));
                    }
                }
            }
        }
    }

    tail_positions.len()
}
