# Snekql

![SnekQL Logo](SnekqlLogoPlaceholder.jpg)

## Introduction

SnekQL is a multi-paradigm query language oriented towards data science. Pragmatic and intuitive, our language is intended to provide a simple yet powerful way of manipulating (representing &amp; visualizing) data.

SnekQL's development group includes **Jenna Berlinberg, Brandon Golshirazian, Alvin Lai, Imani Martin, Qiyue, and Jared Rebuyon.**

## Features

* Dynamically Typed
* Optional Parameters
* Pass-by-reference Values
* No Pointers
* Weakly Typed

## Types, Variables, and Declarations

### Booleans: `bool`

`bool truthy = true`

`bool falsy = false`

### Doubles: `dub`

`dub doubleValue = 5.0`

### Integers: `int`

`int integerValue = 42`

### Strings: `string`

`string stringValue = "Hello, There!"`

### Characters: `char`

`char charValue = z`

### Matrices: `matrix`

````
matrix matrixExample = [ 1, 2, 3,
                         4, 5, 6,
                         7, 8, 9 ]
````

### Functions: `def`

````
    def helloWorld():
        print("Hello World)
````

## Operators

### Additive Operators: `+, -`

````
int addition = 9 + 10
int subtraction = 5 - 1
````

### Multiplicative Operators: `*, /, %`

````
int multiplication = 7 * 81
int division = 54 / 6
int modulus =  79 % 11
````

### Relational Operators and Reference Equality: `<, >, <=, >=, ==, !=, =`

````
    22 > 1
    5.2 != 4.9
````

### Logic and Prefix Operators: `and, or, not, !`

````
    bool truthy = true and true
    bool falsy = not true
````

## Control Flow

### `for` Loop

````
    int i = 0
    string uni = "Loyola Marymount"

    for i in uni:
        print(i)
````

### `while` Loop

````
    int j = 10
    double naught = 0.0

    while true:
        naught = naught + 2.7
        j--
````

### `if/else` Loop

````
    int k = 100
    int l = 62

    if k == l: 
        print("Values are Equal")
    else
        someEqualizerFunc(k, l)

    if k - l == 38:
        print("Values are Equal")

    print("Values are Equal") if k -l == 38 else anotherEqualizerFunc(k, l)
````

## Example Programs

TBD
