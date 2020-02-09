# Snekql

![SnekQL Logo](docs/images/snekQLLogoOff.png)

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

### Booleans: `boo`

`truthy = true`

`falsy = false`

### Doubles: `dub`

`doubleValue = 5.0`

### Integers: `int`

`integerValue = 42`

### Strings: `str`

`stringValue = "Hello, There!"`

### Characters: `char`

`charValue = 'z'`

### Arrays: `arr`

````python
array = [2, 3, 4]
array[1]  # 3
````

### Functions: `def`

````python
    def helloWorld():
        print("Hello World)
````

### Rules: 'rul'

````python
    rule1 = @ > 0  # @ represents the variable to be passed in.
    rule2 = @ == "Jenna"
````

### Columns: 'col'

````python
    firstName = column('name', ["Jenna", "Jared"], True, True)
    firstName.name  # 'name'
    firstName.value  # ["Jenna", "Jared"]
    firstName.notNone  # True
    firstName.unique  # True
    firstName.addRow("Brandon")  # ["Jenna", "Jared", "Brandon"]
    firstName.addRule(@ != "Jenna")  # Rule 1 not satisfied for row 1.
````

### Tables 'tbl'

````python
    groupName = tabulate(firstName, lastName)
    groupName.columns   # [firstName, lastName]
    groupName.addColumn(middleName) # [firstName, lastName, middleName]
    groupName.addRow(["Jenna", "Berlinberg", "Shea"])
    groupName.dropColumn(lastName)  # [firstName, middleName]
    groupName.addRule(firstName, @ != "Jared")
    groupName.addRow(["Jared", "Matthew"])  # Rule 1 not satisfied for new row
````

## Operators

### Additive Operators: `+, -, +=, -=`

````python
int addition = 9 + 10  # 19
int subtraction = 5 - 1  # 4
subtraction += 1  # 5
addition -= 3  # 16
string greeting = "Hi"
char let = 't'
string please = greeting + let  # 'Hit'
please += ' me'  # 'Hit me'
````

### Multiplicative Operators: `*, /, %, *=, /=, **`

````python
int multiplication = 7 * 81  # 567
int division = 54 / 6  # 9
int modulus =  79 % 11  # 2
division *= 3  # 27
multiplication /= 21  # 27
string batman = "Na" * 20  # "NaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNa"
````

### Relational Operators and Reference Equality: `<, >, <=, >=, ==, !=`

````python
    22 > 1
    5.2 != 4.9  
````

### Logic and Prefix Operators: `and, or, not, !`

````python
    bool truthy = true and true
    bool falsy = not true
````

## Control Flow

### `for` Loop

````python
    uni = "Loyola Marymount"
    arr = [1, 2, 3, 4, 5, 6]

    for i in uni:
        print(i)

    for i in range(4):
        print(i)

    for i in arr:
        print(i)
````

### `while` Loop

````python
    j = 10
    naught = 0.0

    while true:
        naught += 2.7
        j -= 1
````

### `if/else` Loop

````python
    k = 100
    l = 62

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
