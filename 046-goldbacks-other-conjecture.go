/*
It was proposed by Christian Goldbach that every odd composite number
can be written as the sum of a prime and twice a square.

9 = 7 + 2×1^2
15 = 7 + 2×2^2
21 = 3 + 2×3^2
25 = 7 + 2×3^2
27 = 19 + 2×2^2
33 = 31 + 2×1^2

It turns out that the conjecture was false.

What is the smallest odd composite that cannot be written as the sum
of a prime and twice a square?
*/

package main
import (
  "fmt"
  "math"
)

// start must be < stop
func interval(start, stop int) []int {
  array := make([]int, 0, stop - start + 1)
  for i:=start; i<=stop; i++ {
    array = append(array, i)
  }
  return array
}

// sieve function translated from javascript version
func sieve(n int) map[int]bool {
  numbers := interval(2, n)
  numPrimes := 0

  for _, prime := range numbers {
    if prime == -1 { continue }
    
    nonprime := prime + prime
    numPrimes += 1
    for nonprime <= n {
      // mark number as nonprime
      numbers[nonprime - 2] = -1
      nonprime += prime
    }
  }

  primes := make(map[int]bool, numPrimes)
  for _, prime := range numbers {
    if prime == -1 { continue }
    
    primes[prime] = true
  }
  return primes
}

func isOdd(n int) bool {
  return n % 2 == 1
}

func isInt(n float64) bool {
  return math.Mod(n, 1.0) == 0.0
}

func isPerfectSquare(n float64) bool {
  return isInt(math.Sqrt(n)) 
}

func canSplit(n int, primes []int) bool {
  for _, prime := range primes {
    if prime > n { continue }
    difference := n - prime
    if isOdd(difference) { continue }

    if (isPerfectSquare(float64(difference) / 2.0)) {
      return true
    }
  }
  return false
}

func main() {
  n := 2000000
  primes := sieve(n)
  primesEncountered := make([]int, 0, len(primes))
  unsplittable := -1

  for i := 3; i<= n; i+=2 {
    if (primes[i]) {
      primesEncountered = append(primesEncountered, i)
    } else {
      if !canSplit(i, primesEncountered) {
        unsplittable = i
        break
      }
    }
  }

  fmt.Println("The first unsplittable number is:", unsplittable)
}