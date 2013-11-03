# The nth term of the sequence of triangle numbers is given by, t_n = ½n(n+1); 
# so the first ten triangle numbers are:

# 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

# By converting each letter in a word to a number corresponding to its 
# alphabetical position and adding these values we form a word value. For 
# example, the word value for SKY is 19 + 11 + 25 = 55 = t_10. If the word 
# value is a triangle number then we shall call the word a triangle word.

# Using words.txt (right click and 'Save Link/Target As...'), a 16K text file 
# containing nearly two-thousand common English words, 
# how many are triangle words?

letters = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)
scores = letters.each_with_index.map { |_, i| i + 1 }
@letter_scores = Hash[letters.zip(scores)]

def value(string)
  # compute the value of a word (ignoring things that are not letters)
  string.split("")
    .reduce(0) { |score, letter| score + (@letter_scores[letter.downcase] || 0) }
end

def integer?(n, epsilon = 0)
  n % 1 <= epsilon
end

def odd?(n, epsilon = 0)
  (n % 2) - 1 <= epsilon
end

def discriminant(a,b,c)
  (b ** 2) - (4*a*c)
end

# t = n(n+1) / 2
# => 2t = n^2 + n
# => n^2 + n - 2t = 0
# => t triangular <=> there exists exists a root i s.t. i is a natural number
# => discriminant must be an odd perfect square
def triangle?(number)
  x = Math.sqrt(discriminant(1,1, -2 * number))
  integer?(x) && odd?(x)
end

puts "Word value for sky: #{value('"SKY"')}"
puts "Is it a triangle word? #{triangle?(value('"SKY"'))}"

words = File.read('data/words.txt').split(",")
triangular_words = words.find_all { |w| triangle?(value(w)) }
puts "There are #{triangular_words.length} triangular words in the textfile"
