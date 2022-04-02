# Learn Dart

Dart is a client-optimized language for developing fast apps on any platform. Its goal is to offer the most productive programming language for multi-platform development, paired with a flexible execution runtime platform for app frameworks.<br>
Flutter framework uses Dart programming language. Dart is easy to learn language with similarities with major programming languages which makes it easy to for beginnerss as well as experienced developers moving from other programming languages. So let's get started

Topics:

-   [Dart Language Features](#dart-language-features)
-   [DartPad](#dartpad)
-   [Installation](#installation)
-   [Dart Language Tour](dart-language-tour)
-   [Dart Libraries](#dart-libraries)
-   [Code Labs](#code-labs)
-   [Packages](#packages)
-   [Command Line Tools](#command-line-tools)

### Dart Language Features

-   **Type Safety:** Dart is type safe, which implies that a variable value always matches it's static type. Hence there is no possibility of run time exception due to incorrect assignment of values to a variable. More details [here](https://dart.dev/guides/language/type-system).

-   **Sound Null Safety:** Values can’t be null unless you define so while declaring a variable. With sound null safety, Dart can protect the code from null exceptions at runtime through static code analysis. Details [here](https://dart.dev/null-safety).

-   **JIT and AOT Compilation:** Dart supports _Just In Time_ compilation at development time hence it is able to provide **Hot Reload** capability and rich development experience while the production release versions are compiled _Ahead Of Time_ by building the compiled executable for target platforms.

-   **Web Support:** For apps targeting the web, Dart includes both a development time compiler (dartdevc) and a production time compiler (dart2js). Both compilers translate Dart into JavaScript.

-   **Core Libraries:** For apps targeting the web, Dart includes both a development time compiler (dartdevc) and a production time compiler (dart2js). Both compilers translate Dart into JavaScript.<br>
    More details available at [**Dart Oveview**](https://dart.dev/overview)

### DartPad

DartPad is an online tool https://dartpad.dev/ which doesn't require any local installation or environment setup. This is a great way to get started with learning Dart & Flutter programming language concepts. This is also useful for developers to quickly test and verify small snippets of code without having to create a new project or making changes to existing projects.

### Installation

Flutter SDK comes with Dart bundled within the same package. Hence separate installation of Dart is not required (although it is passible to install dart only as a seperate sdk). The Flutter SDK package and installation steps are available at https://docs.flutter.dev/get-started/install<br>
You can choose any one of the IDE's i.e Android Studio, VS Code or Emacs. Our recommendation would be to use VS Code which is light weight IDE with linter support for static code analysis while you write code.

### Dart Language Tour

Dart team has done an excellent job in creating a language tour which introduces all basic features & syntax that you will need to develop any Dart/Flutter application. The tour starts with basic program and introduces dart key concepts, keywords, variables, built in types, functions, operators, control flow statements, exceptions, classes. <br>
More details available [here](https://dart.dev/guides/language/language-tour)

### Dart Libraries

Dart comes with rich set of core libraries which are catagorized as below:

-   Multi-platform libraries: Libraries which provide features that are commonly applicable to all supported platforms such as: core, collection, convert, async, math etc.
-   Native Platform libraries: Platform libraries such as io, ffi, isolate, mirrors etc.
-   Web platform labraries: Labraries that work on Dart web platform such as htmnl, jsm js_util etc.

    Details & Examples of all commonly used libraries are available at [**Dart Library Tour**](https://dart.dev/guides/libraries/library-tour)

### Code Labs

Dart language samples and code labs are available [here](https://dart.dev/samples). This provides cook books for commonly used code/design patterns such as Asynchronous Programming, Using Collections,Language cheatsheet etc.

### Packages

The Dart ecosystem uses packages to manage shared software such as libraries and tools. To get Dart packages, you use the pub package manager. You can find publicly available packages on the [pub.dev site](https://pub.dev/), or you can load packages from the local file system or elsewhere, such as Git repositories. To use a package:

-   Create a pubspec.yaml file under project root folder
-   Use `dart pub get` to retrieve package dependencies
-   Import the library files in your dart code<br>

    More details available [here](https://dart.dev/guides/libraries/useful-libraries).

### Command Line Tools

The dart tool (bin/dart) is a command-line interface to the Dart SDK. List of Dart commands can be found [here](https://dart.dev/tools/dart-tool)
