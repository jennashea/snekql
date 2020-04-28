# Snekql

![SnekQL Logo](docs/images/snekQLLogoOff.png)

## GitHub Page : https://imani-martin.github.io/snekql/

## [Checkout the Grammar](https://github.com/jennashea/snekql/blob/master/grammar/snekql.ohm)

## Introduction

SnekQL is a multi-paradigm query language oriented towards data science. Pragmatic and intuitive, our language is intended to provide a simple yet powerful way of manipulating (representing &amp; visualizing) data.

SnekQL's development group includes **Jenna Berlinberg, Brandon Golshirazian, Alvin Lai, Imani Martin, Qiyue Aixinjueluo, and Jared Rebuyon.**

## Features

-   Dynamically Typed
-   Optional Parameters
-   Pass-by-reference Values
-   No Pointers
-   Weakly Typed

## Types, Variables, and Declarations

### Booleans: `boo`

`truthy = true`

`falsy = false`

### Doubles: `dub`

`doubleValue = 5.0`

### Integers: `int`

`integerValue = 42`

### Strings: `str`

`stringValue = "Hello, There!"`

### Arrays: `arr`

```python
array = [2, 3, 4]
array[1]  # 3
```

### Functions: `fnc`

```python
fnc helloWorld():
    hiss("Hello World")
```

### Rules: `rul`

```python
rule1 = @ > 0  # @ represents the variable to be passed in.
rule2 = @ == "Jenna"
```

### Columns: `col`

```python
firstName = column("name", ["Jenna", "Jared"], true, false)
firstName.name  # 'name'
firstName.value  # ["Jenna", "Jared"]
firstName.notNull  # true
firstName.unique  # false
firstName.addRow("Brandon")  # ["Jenna", "Jared", "Brandon"]
firstName.addRule(@ != "Jenna")  # Rule 1 not satisfied for row 1.
```

### Tables `tbl`

```python
groupName = tabulate(firstName, lastName)
groupName.columns   # [firstName, lastName]
groupName.addColumn(middleName) # [firstName, lastName, middleName]
groupName.addRow(["Jenna", "Berlinberg", "Shea"])
groupName.dropColumn(lastName)  # [firstName, middleName]
groupName.addRule(firstName, @ != "Jared")
groupName.addRow(["Jared", "Matthew"])  # Rule 1 not satisfied for new row
```

## Operators

### Additive Operators: `+, -, +=, -=`

```python
addition = 9 + 10  # 19
subtraction = 5 - 1  # 4
subtraction += 1.0  # 5.0
addition -= 3  # 16
greeting = "Hi"
let = 't'
please = greeting + let  # 'Hit'
please += ' me'  # 'Hit me'
```

### Multiplicative Operators: `*, /, %, *=, /=, **`

```python
multiplication = 7 * 81  # 567
division = 54 / 6  # 9
modulus =  79 % 11  # 2
division *= 3  # 27
multiplication /= 21  # 27
batman = "Na" * 20  # "NaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNa"
```

### Relational Operators and Reference Equality: `<, >, <=, >=, ==, !=`

```python
22 > 1
5.2 != 4.9
```

### Logic and Prefix Operators: `and, or, not, !`

```python
truthy = true and true
falsy = not true
```

## Control Flow

### `for` Loop

```python
uni = "Loyola Marymount"
arr = [1, 2, 3, 4, 5, 6]

for i in uni:
    hiss(i)

for i in range(4):
    hiss(i)

for i in arr:
    hiss(i)
```

### `while` Loop

```python
j = 10
naught = 0.0

while true:
    naught += 2.7
    j -= 1
```

### `if/else` Loop

```python
k = 100
l = 62

if k == l:
    hiss("Values are Equal")
else
    someEqualizerFunc(k, l)

if k - l == 38:
    hiss("Values are Equal")

hiss("Values are Equal") if k -l == 38 else anotherEqualizerFunc(k, l)
```

## Example Programs

### Area of a Circle:

```python
fnc areaOfACircle(radius):
    pi = 3.14
    return pi * radius ** 2  # Precendence follows PEMDAS
```

### Fibonacci + Load to Column Object:

```python
numberOfTerms = 10
array = []
fibonacciNumbers = column("Numbers", array, True, True)

fnc fibonacci(n):
   if n <= 1:
       return n
   else:
       return(fibonacci(n-1) + fibonacci(n-2))

fnc addValuesToColumn():
    for i in range(numberOfTerms):
       array.add(fibonacci(i))
```

### Table Creation for Pythagorean Triples:

```python
legAValues = []
legBValues = []
hypotenuseValues = []

legsA = column("Legs", legAValues, True, True)
legsB = column("Legs", legbValues, True, True)
hypotenuses = column("Hyptonuses", hypotenuseValues, True, True)

pythagoreanTriples = tabulate(legsA, legsB, hypotenuses)

fnc pythagoreanTriplets(limit):
    hypotenuse = 0
    two = 2

    while hypotenuse < limit:
        for i in range(1, two) :
            legA = two * two - i * i
            legB = 2 * two * i
            hypotenuse = two * two + i * i

            if hypotenuse > limit:
                break
            legsA.addRow(legA)
            legsB.addRow(legB)
            hypotenuses.addRow(hypotenuse)
        two += 1

pythagoreanTriplets(20)
```

### Rule Creation for Tables:

```python
array = [32, 7, 60, 100, 5]
digits = column("Double Digits", array, True, True)
fnc removeSingleDigitValues(oldColumn):
    parsedColumn = oldColumn
    i = 0

    for i in oldColumn:
        parsedColumn.addRow(oldColumn[i])

    return parsedColumn

removeSingleDigitValues(digits)
```

### Sorting Column with Bubble Sort Algorithm:

```python
values = column("List of Numbers", [22, 23434, 2332, 7543, 10132], True, True)

fnc bubbleSort(column):
    length  = 0
    switch  = true

    for i in column:
        length += 1

    while switch:
        switch = false
        for i in range(length - 1):
            if column[i] > column[i + 1]:
                temp = column[i]
                column[i] = column[i + 1]
                column[i + 1] = temp
                switch  = true

bubbleSort(values)
```

### Semantic Error Checks

-   use of undeclared variable
-   redeclaration of declared variable
-   non boolean while condition
-   non integer boolean condition
-   non integer in add
-   non integer in subtract
-   types do not match in inequality test
-   too many function arguments
-   too few function arguments
-   wrong type of function argument
-   member of nonrecord
-   subscript of nonarray
-   call of nonfunction
-   not iterable type
-   array not all same type
-   return must be inside a function
-   break must be inside a function
-   Rule not proper expression type
