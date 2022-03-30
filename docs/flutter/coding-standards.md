# Coding Standards

Best practices are **professional standards** that are acceptable in a field and it’s very important for any programing language to improve code quality, readability, maintainability, and robustness.

Coding Standards to be used for Dart/Flutter code:

-   [Naming Conventions](#naming-conventions)
-   [Code Comments](#code-comments)
-   [Date Type](#date-type)
-   [Imports](#imports)
-   [Null safe and Null aware](#null-safe-and-null-aware)
-   [as vs is](#as-vs-is)
-   [Avoid var](#avoid-var)
-   [Reusable Widgets](#reusable-widgets)
-   [Cascade Operator](#cascade-operator)
-   [Expression Functions](#expression-functions)
-   [Avoid Print](#avoid-print)
-   [Avoid String `+`](#avoid-string-+)
-   [Asynchronous Calls](#asynchronous-calls)
-   [`Const` Widgets](#const-widgets)

### Naming Conventions

-   Classes, enums, typedefs, and extensions name should in `UpperCamelCase`.

-   Variables, constants, parameters, and named parameters should be in `lowerCamelCase`.

-   Libraries, packages, directories, and source files name should be in `snake_case(lowercase_with_underscores)`.

-   All private variables, constants should be prefixed with `_`.

### Code Comments

-   All Primitive variables, constants, named parameters, lists, maps should have a brief one liner comment explaining purpose of the variable and where required elaborate on state event life of variable (must for Boolean).

-   All medium to high complexity methods must have a header comment block covering:

    -   **Method**: What & Why; not implementation logic.
    -   **Params**: Purpose and expectations if any.
    -   **Return Value**: If there is a return parameter then explain what to expect for the returned value and in case of Void also, document if there are significant state events during the execution.

-   Avoid commenting UI widgets as in most cases these are self explanatory.

### Date Type

To send/receive data of type **date** across API's, dates should be converted to string representing date-time in **UTC** (Zulu Time). For example date value is represented as `"2022-03-08T05:07:21.858Z"` which implies UTC date time equivalent to 08-March-2022, 05H:07M:21S and 858ms. Use `dateVariable.toUtc().toIso8601String()` to convert date to String and `DateTime.parse(dateVariable).toLocal()` to convert to string to local date time object.

### Imports

Use relative imports for files in `lib` consistently which is shorter than importing files within your project by including your package name.

### Null safe and Null aware

Prefer using `??` (if null) and `?.` (null aware) operators instead of null checks in conditional expressions. Avoid `late` and `!.` (not null assumption) which can cause run-time exceptions.
<br/>Don't initialize variables with `null`.

### as vs is

Avoid using `as` instead, use `is` operator. The `as` cast operator throws an exception if the cast is not possible. To avoid an exception being thrown, one can perform check if cast is possible using `is` operator.

### Avoid var

Always specify the type of member when its value type is known. Avoid using `var` when possible as it consumes higher memory.

### Reusable Widgets

-   Where possible try to keep UI widgets light and identify opportunities to reuse widgets within same screen or globally.

-   If the Widget is reusable within a UI screen then the common widget may be coded within the same file as the UI screen widget.

-   If the Widget is reusable across multiple UI then extract and create a seperate Widget file in a separate widgets folder.

### Cascade Operator

To perform a sequence of operations on the same object, use the Cascade(..) operator to keep the code concise and clean.

### Expression Functions

For functions that contain just one expression, you can use an expression function. The `=>` (arrow) notation is used for expression function which is more concide and cleaner implementation.

### Avoid `Print()`

Use `debugPrint()` instead of `Print()` during development. Avoid both in production code. For production logging use `dart:developer log()`.

### Avoid String `+`

Avoid `+` to concatenate long strings. Instead use interpolation i.e. $var or ${class.property} within the string to formulate the desired concatenated string.

### Asynchronous Calls

Use `async`/`await` over Future callback. It improves readability and maintenance.

### `Const` Widgets

If a widget will not change on `setState` call then we should define it as constant. It will prevent the widget to rebuild so it improves performance.
