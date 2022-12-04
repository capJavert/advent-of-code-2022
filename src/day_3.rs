use std::collections::HashMap;

use wasm_bindgen::prelude::*;

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
