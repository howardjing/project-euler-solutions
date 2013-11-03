// We shall say that an n-digit number is pandigital if it 
// makes use of all the digits 1 to n exactly once. For example, 
// 2143 is a 4-digit pandigital and is also prime.

// What is the largest n-digit pandigital prime that exists?

// NOTE: don't actually know go
// TODO: should probably implement my own ProbablyPrime (using Rabin Miller)

package main
import (
  "fmt"
  "math"
  "math/big"
)

func factorial(n int) int {
  if n == 0 { return 1 }
  fact := 1
  for i := 1; i <= n; i++ {
    fact *= i
  }
  return fact
}

func concat(a, b []int) []int {
  c := make([]int, 0, len(a) + len(b))
  c = append(c, a...)
  c = append(c, b...)
  return c
}

func permute(digits []int) [][]int {
  if len(digits) == 0 {
    return [][]int{[]int{}} // [[]]
  }

  permutations := make([][]int, 0, factorial(len(digits)))
  for i, digit := range digits {
    subproblem := concat(digits[0:i], digits[i+1:len(digits)])
    for _,permutation := range permute(subproblem) {
      permutations = append(permutations, concat([]int{digit}, permutation))
    }
  }
  return permutations
}

// pandigitals with n digits in descending order
// (only valid for n between the closed interval [1,9])
func pandigitals(n int) []*big.Int {
  array := make([]int, 0, n)
  for i := n; i >= 1; i-- {
    array = append(array, i)
  }
  permutations := permute(array)
  values := make([]*big.Int, 0, len(permutations))
  for _,permutation := range permutations {
    values = append(values, bigIntify(permutation))
  }
  return values
}

func bigIntify(digits []int) *big.Int {
  n := big.NewInt(0)
  for i, digit := range digits {
    exp := float64(len(digits) - i - 1)
    n.Add(n, big.NewInt(int64(float64(digit) * math.Pow(10.0, exp))))
  }
  return n
}

func largestPrimePandigital() *big.Int {
  for i := 9; i > 1; i-- {
    for _,pandigital := range pandigitals(i) {
      if pandigital.ProbablyPrime(20) {
        return pandigital
      }
    }
  }

  return big.NewInt(-1)
}

func main() {
  fmt.Println("The largest prime pandigital is", largestPrimePandigital())
}