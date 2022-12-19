use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Debug)]
struct Cube {
    x: isize,
    y: isize,
    z: isize,
    sides: Vec<Cube>,
}

#[wasm_bindgen]
pub fn solve_day_18(input: JsValue) -> usize {
    let cubes: Vec<Cube> = serde_wasm_bindgen::from_value(input).unwrap();

    let mut covered_sides_count = 0;

    for cube in cubes.iter() {
        covered_sides_count += cube.sides.iter().fold(0, |acc, side| {
            match cubes
                .iter()
                .find(|item| item.x == side.x && item.y == side.y && item.z == side.z)
            {
                Some(_) => acc + 1,
                None => acc,
            }
        });
    }

    cubes.len() * 6 - covered_sides_count
}
