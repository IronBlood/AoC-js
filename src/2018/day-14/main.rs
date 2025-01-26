use std::io::{self, BufRead};

pub fn first_appear(data: &str) -> usize {
    let mut arr: Vec<u8> = vec![3, 7];
    let n = data.len();

    let mut idx: usize = 0;
    let mut ptr_0: usize = 0;
    let mut ptr_1: usize = 1;
    let mut found = false;

    let data_digits: Vec<u8> = data.chars().map(|c| c.to_digit(10).unwrap() as u8).collect();

    loop {
        let num_0 = arr[ptr_0];
        let num_1 = arr[ptr_1];
        let sum = num_0 + num_1;
        if sum < 10 {
            arr.push(sum);
        } else {
            arr.push(1);
            arr.push(sum - 10);
        }

        ptr_0 = (ptr_0 + (num_0 as usize) + 1) % arr.len();
        ptr_1 = (ptr_1 + (num_1 as usize) + 1) % arr.len();
        while idx + n <= arr.len() {
            let slice = &arr[idx..idx + n];
            if slice == data_digits.as_slice() {
                found = true;
                break;
            }
            idx += 1;
        }

        if found {
            break;
        }
    }

    idx
}

fn main() {
    let stdin = io::stdin();
    let lines: Vec<String> = stdin.lock().lines().filter_map(Result::ok).collect();

    let input = lines.join("\n");

    let result = first_appear(&input);
    println!("First appear: {}", result);
}

