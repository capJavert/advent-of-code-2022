# Advent of Code 2022

### Some notes from the previous year:
* find better way of visualizing puzzles based in the 3D space
* use pen and paper more
* think about ranges and constraints for specific inputs for optimizing runtimes

### Update #1: It's that time of the year again.. So let's go!!
### Update #2: First AoC weekend done, got the grasp with wasm and ready for more! Also, this idea of parsing data with JavaScript and then running typed dataset in rust for performance seems to work good so far 👌
### Update #3: Ditched Rust for today... just look at this example of implementing cyclic tree data structure in Rust https://applied-math-coding.medium.com/a-tree-structure-implemented-in-rust-8344783abd75 ... I wonder if there is a better way.. or crate.
### Update #4: Today was hard for some reason. I think the main issue was that my initial "part 1" logic could not be applied to "part 2" because I implemented specific constraints that were not true for "part 2". Finally I solved it with minimal changes after re-reviewing constraints in the puzzle text. Lesson here is to avoid introducing any kind of artifical constraints, and if I need to introduce them then I need to re-review them when starting "part 2".
### Update #5: Today (day 10) lesson is: "don't overthink it" - solve the task, worry about other use cases on later days.
### Update #6: Day 11 Part 2 was requiring #math hacks.. [smarter people](https://www.reddit.com/r/adventofcode/comments/zifqmh/2022_day_11_solutions/) explain it better than me.
### Update #7: Half way there.. today I learned that calling wasm function multiple times can impact perfromance pretty bad. This is due to actual time being lost on JavaScript <-> Rust conversion when using `serde` as demonstrated in `day-12-wasm-test` branch.
### Update #8: When day 14 mentioned a [puzzle (day 17 @ AoC 2018) that broke me that year](https://github.com/capJavert/advent-of-code-2018#update-8-nope-this-week-is-even-harder-this-year-puzzles-really-have-some-complex-problems-its-starting-to-take-too-much-time-per-day-finished-day-18-though-barely-ohhh) I was kinda scared, won't lie... But today I managed to solve it pretty easily. I did not do any kind of logic in rust because I just wanted to be done with it and it was easier to debug from JavaScript eg. to print current state of the grid and such. :relieved:
### Update #9: Really busy this last few days (climbed the local mountain Sljeme 5 days in a row though).. missed days 15 and 16, and will miss most of the weekend. Solved day 15 part 1 and have plan for part 2. I'll try to backtrack all of this on sunday/monday when I get some free time 👐
### Update #10: Merry Xmas, this year caught up with me so did not manage to finish every day... still had a good time, learned some new stuff and especially in context of WASM and writing and integrating Rust more into JS and day to day job. Until next year! 
