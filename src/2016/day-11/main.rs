use std::env;
use regex::Regex;
use std::io::{self, BufRead};
use std::collections::{HashMap, HashSet, VecDeque};

type Floors = [Vec<i32>; 4];

#[derive(Clone)]
struct SimulatorState {
    floors: Floors,
    elevator: usize,
    moves: usize,
}

fn backtracking_up_to_k<T: Clone>(
    result: &mut Vec<Vec<T>>,
    stack: &mut Vec<T>,
    idx: isize,
    candidates: &[T],
    k: usize
) {
    if stack.len() > k {
        return;
    }
    if !stack.is_empty() {
        result.push(stack.clone());
    }
    for i in (idx + 1) as usize..candidates.len() {
        stack.push(candidates[i].clone());
        backtracking_up_to_k(result, stack, i as isize, candidates, k);
        stack.pop();
    }
}

fn get_id(mut num: i32) -> i32 {
    let mut id = 0;
    while num > 1 {
        num >>= 1;
        id += 1;
    }
    id
}

fn get_bit(num: i32) -> i32 {
    let (is_gen, num) = if num < 0 {
        (1, !num)
    } else {
        (0, num)
    };
    let id = get_id(num);
    1 << (2 * id + is_gen)
}

fn stringify_state(state: &SimulatorState) -> String {
    let floors: Vec<String> = state
        .floors
        .iter()
        .map(|floor| {
            floor.iter().fold(0, |bit, &curr| bit | get_bit(curr)).to_string()
        })
        .collect();
    format!("{},{}", state.elevator, floors.join(","))
}

fn is_complete(state: &SimulatorState) -> bool {
    state.floors.iter().take(3).all(Vec::is_empty)
}

fn is_legal_floor(floor: &Vec<i32>) -> bool {
    let chips: Vec<_> = floor.iter().filter(|&&x| x < 0).collect();
    let gens: Vec<_> = floor.iter().filter(|&&x| x > 0).collect();

    if chips.is_empty() || gens.is_empty() {
        return true;
    }

    chips.iter().all(|&chip| gens.iter().any(|&&gen| gen == !chip))
}

fn is_legal_state(state: &SimulatorState) -> bool {
    state.floors.iter().all(|floor| is_legal_floor(floor))
}

fn gen_next_states(state: &SimulatorState) -> Vec<SimulatorState> {
    let mut candidates = Vec::new();
    let current_floor = &state.floors[state.elevator];

    let mut possible_combinations = Vec::new();
    let mut stack = Vec::new();
    backtracking_up_to_k(&mut possible_combinations, &mut stack, -1, current_floor, 2);

    for &dest in &[state.elevator + 1, state.elevator.wrapping_sub(1)] {
        if dest >= state.floors.len() {
            continue;
        }

        for combo in &possible_combinations {
            let mut next_state = state.clone();
            next_state.elevator = dest;
            next_state.moves += 1;

            for &item in combo {
                let idx = next_state.floors[state.elevator]
                    .iter()
                    .position(|&x| x == item)
                    .unwrap();
                next_state.floors[state.elevator].remove(idx);
                next_state.floors[dest].push(item);
            }

            if is_legal_state(&next_state) {
                candidates.push(next_state);
            }
        }
    }

    candidates
}

fn minimum_moves(data: &str, part: u8, debug_enabled: bool) -> usize {
    let mut lines: Vec<String> = data.lines().map(String::from).collect();
    if part == 2 {
        lines[0].push_str(" elerium generator, elerium-compatible microchip, dilithium generator, dilithium-compatible microchip");
    }

    let mut id = 0;
    let mut id_map = HashMap::new();

    let re_g = Regex::new(r"(\w+) generator").unwrap();
    let re_m = Regex::new(r"(\w+)-compatible microchip").unwrap();

    let floors: Floors = lines
        .iter()
        .map(|line| {
            let mut cfg = vec![];
            for cap in re_g.captures_iter(line) {
                let name = cap[1].to_string();
                if !id_map.contains_key(&name) {
                    id_map.insert(name.clone(), id);
                    id += 1;
                }
                cfg.push(1 << id_map[&name]);
            }

            for cap in re_m.captures_iter(line) {
                let name = cap[1].to_string();
                if !id_map.contains_key(&name) {
                    id_map.insert(name.clone(), id);
                    id += 1;
                }
                cfg.push(!(1 << id_map[&name]));
            }

            cfg.sort();
            cfg
        })
        .collect::<Vec<_>>()
        .try_into()
        .expect("Input should have exactly 4 floors");

    let initial_state = SimulatorState {
        floors,
        elevator: 0,
        moves: 0,
    };

    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();
    queue.push_back(initial_state);

    let mut count = 0;
    let mut last_time = std::time::Instant::now();

    while let Some(state) = queue.pop_front() {
        if debug_enabled {
            if count % 10_000 == 0 {
                let elapsed = last_time.elapsed();
                println!(
                    "[DEBUG] {} iterations - elapsed: {:.2?} - visited: {}",
                    count,
                    elapsed,
                    visited.len()
                );
                last_time = std::time::Instant::now();
            }
            count += 1;
        }

        if is_complete(&state) {
            return state.moves;
        }

        let state_key = stringify_state(&state);
        if visited.contains(&state_key) {
            continue;
        }
        visited.insert(state_key);

        for next_state in gen_next_states(&state) {
            queue.push_back(next_state);
        }
    }

    usize::MAX
}

fn main() {
    let stdin = io::stdin();
    let lines: Vec<String> = stdin.lock().lines().filter_map(Result::ok).collect();
    let debug_enabled = env::var("DEBUG").is_ok();
    let input = lines.join("\n");

    let result = minimum_moves(&input, 1, debug_enabled);
    println!("Minimum moves: {}", result);

    let result = minimum_moves(&input, 2, debug_enabled);
    println!("Minimum moves: {}", result);
}

