use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_day_8(input: JsValue) -> usize {
    let grid: Vec<Vec<usize>> = serde_wasm_bindgen::from_value(input).unwrap();

    let mut visible_trees = 0;

    let directions = vec!["top", "right", "down", "left"];

    for (y, row) in grid.iter().enumerate() {
        for (x, tree) in row.iter().enumerate() {
            let mut visible = 4;

            for direction in directions.to_vec().into_iter() {
                let mut cy = x;
                let mut cx = y;
                let mut visible_in_direction = true;

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

                    let check_tree = grid[cx][cy];

                    if check_tree >= *tree {
                        visible_in_direction = false;

                        break;
                    }
                }

                if !visible_in_direction {
                    visible -= 1;
                }
            }

            if visible > 0 {
                visible_trees += 1;
            }
        }
    }

    visible_trees
}
