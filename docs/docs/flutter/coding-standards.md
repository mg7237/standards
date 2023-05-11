# Coding Standards

Best practices are **professional standards** that are acceptable in a field and it’s very important for any programing language to improve code quality, readability, maintainability, and robustness. Refer [Effective Dart](https://dart.dev/guides/language/effective-dart) which details most of the standards suggested here.

Coding Standards to be used for Dart/Flutter code:

-   [Naming Conventions](#naming-conventions)
-   [Code Comments](#code-comments)
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
-   [Code Design](code-design)

### Naming Conventions

-   Classes, enums, typedefs, and extensions name should in `UpperCamelCase`.

-   Variables, constants, parameters, and named parameters should be in `lowerCamelCase`.

-   Libraries, packages, directories, and source files name should be in `snake_case(lowercase_with_underscores)`.

-   All private variables, constants should be prefixed with `_`.

```
import '../common_widgets/my_widget.dart' // snake case for folder and file name
Class MyClass(){ // UpperCamelCase for ClassName
    const _pie = 3.14; // private const
    String _textValue = "My Name"; // private Variable
    int? registrationId; // public property
    MyClass({this.registrationId}); // Class constructor
    ....
}
```

### Code Comments

Flutter team recommends to keep the comments short, in most cases it would be one liner unless you are describing a class or package<br>

Use inline commenting `//` instead of block comment `/* Lorem Ipsum */` and use `///` style which will automatically be picked up for generating code documentation. Guidelines:

-   All Primitive variables, constants, named parameters, lists, maps should have a brief one liner comment explaining purpose of the variable and where required elaborate on state event life of variable (must for Boolean).

-   All medium to high complexity methods must have a header comment block covering:

    -   **Method**: What & Why; not implementation logic.
    -   **Params**: Purpose and expectations if any.
    -   **Return Value**: If there is a return parameter then explain what to expect for the returned value and in case of Void also, document if there are significant state events during the execution.

-   Avoid commenting UI widgets as in most cases these are self explanatory.

```
/// Student class manages CRUD operations for Student Data.
/// It Uses studentData API to retreive and update db data
class Student{
    String studentId;
    _boolDataRetreived = false; // Used to dispay student widget after data retreived from API
    Student({this.studentId,this.studentName});
    /// GetStudentData Gets Student Data for a studentId.
    /// Returns Student model as return value if successful
    /// returns null is unsuccessful
    StudentModel _student = GetStudentData(studentId);
    if (_student != null) {
        _boolDataRetreived = true;
        setState({});
    }
    ....
}

```

### Imports

Use relative imports for files in `lib` consistently which is shorter than importing files within your project by including your package name.

```
import '../api/api_helper.dart';
import '../theme/style.dart';
```

### Null safe and Null aware

Prefer using `??` (if null) and `?.` (null aware) operators instead of null checks in conditional expressions. Avoid `late` and `!.` (not null assumption) which can cause run-time exceptions.
<br/>Don't initialize variables with `null`.

```
String? myString; // Do not use myString = null
MyClass myClass?;
late mySecondClass; // Avoid late keyword
if ((myString ?? '') == '') {
    // Do Something
}

if (myClass?.property == 0) {
    // Do Something
}

if (mySecondClass!.property == 0) { // Avoid !. usage
    // Do Something
}
```

### as vs is

Avoid using `as` instead, use `is` operator. The `as` cast operator throws an exception if the cast is not possible. To avoid an exception being thrown, one can perform check if cast is possible using `is` operator.

```
Map<String,dynamic> myMap = {'String Value' : 'My String Value', 'List Value' : <int>[0,1,2,3]}
for (int i = 0; i < myMap.length; i++) {
    if (myMap[i]['String Value'] is String) {
        String myString = myMap[i]['String Value'];
    } else if (myMap[i]['List Value'] is List<int>) {
        List<int> myList = myMap[i]['List Value'];
    }
}
```

### Avoid var

Always specify the type of member when its value type is known. Avoid using `var` when possible as it consumes higher memory.

`MyClass class = MyClass(); // Don't use: var MyClass = MyClass()`

### Reusable Widgets

-   Where possible try to keep UI widgets light and identify opportunities to reuse widgets within same screen or globally.

-   If the Widget is reusable within a UI screen then the common widget may be coded within the same file as the UI screen widget.

-   If the Widget is reusable across multiple UI then extract and create a seperate Widget file in a separate widgets folder.

### Cascade Operator

To perform a sequence of operations on the same object, use the Cascade(..) operator to keep the code concise and clean.

```
Path path = Path()
..lineTo(0, size.height)
..lineTo(size.width, size.height)
..lineTo(size.width, 0)
..close();
```

### Expression Functions

For functions that contain just one expression, you can use an expression function. The `=>` (arrow) notation is used for expression function which is more concise and cleaner implementation.

```
get width => right - left; // Instead of: get width () {right -left;}

```

### Avoid `Print()`

Use `debugPrint()` instead of `Print()` during development. Avoid both in production code.

### Avoid String `+`

Avoid `+` to concatenate long strings. Instead use interpolation i.e. $var or ${class.property} within the string to formulate the desired concatenated string.

```
// Don't use "My String Length is " + stringLength;
String myString = "My String Length is $stringLength";
```

### Asynchronous Calls

Use `async`/`await` over Future callback. It improves readability and maintenance.

```
String GetToken async {
    // Call API to get Token from server
}
...
token = await GetToken();s

```

### `Const` Widgets

If a widget will not change on `setState` call then we should define it as constant. It will prevent the widget to rebuild so it improves performance.

`const SizedBox(height: 20.h, width: 10.w);`

### Code Design

Guidelines for writing consistent, usable APIs for libraries can be found [here](https://dart.dev/guides/language/effective-dart/design)<br>
The page covers best practices for naming variables, classes, methods and writing readable and maintainable code. Below are the key rules that you can incorporate in your code.

```
// Use Terms Consistently & Avoid abbreviations
pageCount         // A field.
updatePageCount() // Consistent with pageCount.
toSomething()     // Consistent with Iterable's toList().
asSomething()     // Consistent with List's asMap().
Point             // A familiar concept.

// Prefer putting the most descriptive noun last.
pageCount             // A count (of pages).
ConversionSink        // A sink for doing conversions.
decorateBox           // A container to be decorated

// Consider making the code read like a sentence.
if (errors.isEmpty) ...

// "Hey, subscription, cancel!"
subscription.cancel();

// "Get the monsters where the monster has claws."
monsters.where((monster) => monster.hasClaws);

// PREFER a noun phrase for a non-boolean property or variable.
list.length
context.lineWidth
quest.rampagingSwampBeast

// PREFER a non-imperative verb phrase for a boolean property or variable.
isEmpty
hasElements
canClose
closesWindow
canShowPopup
hasShownPopup

// PREFER the “positive” name for a boolean property or variable.
if (socket.isConnected && database.hasData) {
  socket.write(database.read());
}

// AVOID starting a method name with get.
breakfastOrder // instead of getBreakfastOrder

// PREFER naming a method to___() if it copies the object’s state to a new object.
list.toSet();
stackTrace.toString();
dateTime.toLocal();

// PREFER naming a method as___() if it returns a different representation backed by the original object.
var map = table.asMap();
var list = bytes.asFloat32List();
var future = subscription.asFuture();

// AVOID describing the parameters in the function’s or method’s name.
list.add(element);
map.remove(key);

```
