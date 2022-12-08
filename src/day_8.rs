use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_8(input: JsValue) -> usize {
    let grid: Vec<Vec<usize>> = serde_wasm_bindgen::from_value(input).unwrap();

    let mut best_score = 0;

    let directions = vec!["top", "right", "down", "left"];

    for (y, row) in grid.iter().enumerate() {
        for (x, tree) in row.iter().enumerate() {
            let mut score = 1;

            for direction in directions.to_vec().into_iter() {
                let mut cy = x;
                let mut cx = y;
                let mut direction_score = 0;

                loop {
                    if cy == 0 || cy == (grid.len() - 1) || cx == 0 || cx == (row.len() - 1) {
                        break;
                    }

                    match direction {
                        "top" => {
                            cy -= 1;
                        }
                        "right" => {
                            cx += 1;
                        }
                        "down" => {
                            cy += 1;
                        }
                        "left" => {
                            cx -= 1;
                        }
                        _ => (),
                    }

                    direction_score += 1;

                    let check_tree = grid[cx][cy];

                    if check_tree >= *tree {
                        break;
                    }
                }

                score *= direction_score;
            }

            if score > best_score {
                best_score = score;
            }
        }
    }

    best_score
}
