/*****************************************
 * WARNING this code is based on my input,
 * DO NOT use it directly.
 *****************************************/

#include <stdio.h>

int main() {
	int r0 = 1;
	int r1 = 0;
	int r2 = 0;
	int r3 = 0;
	int r4 = 0;
	int r5 = 0;

	r3 = 17;        // addi 3 16 3
	r1 += 2;  r3++; // addi 1 2 1
	r1 *= r1; r3++; // mulr 1 1 1
	r1 *= r3; r3++; // mulr 3 1 1
	r1 *= 11; r3++; // muli 1 11 1
	r2 += 4;  r3++; // addi 2 4 2
	r2 *= r3; r3++; // mulr 2 3 2
	r2 += 19; r3++; // addi 2 19 2
	r1 += r2; r3++; // addr 1 2 1
	r3 += r0; r3++; // addr 3 0 3
	r2 = r3;  r3++; // setr 3 2 2
	r2 *= r3; r3++; // mulr 2 3 2
	r2 += r3; r3++; // addr 3 2 2
	r2 *= r3; r3++; // mulr 3 2 2
	r2 *= 14; r3++; // muli 2 14 2
	r2 *= r3; r3++; // mulr 2 3 2
	r1 += r2; r3++; // addr 1 2 1
	r0 = 0;   r3++; // seti 0 1 0
	r3 = 0;   r3++; // seti 0 5 3

	r5 = 1;   r3++; // seti 1 8 5

	do {
		if (r1 % r5 == 0) {
			r0 += r5;
		} else {
		}
		r5++;
	} while (r5 <= r1);

	printf("register_0: %d\n", r0);
	return 0;
};

