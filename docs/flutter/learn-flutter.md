# Learn Flutter

Flutter framework is a popular, multi-platform UI toolkit that’s powered by the Dart platform, and it provides tooling and UI libraries to build UI experiences that run on iOS, Android, macOS, Windows, Linux, and the web.

Topics:

-   [Test Drive](#test-drive)
-   [Widgets Overview](#widgets-overview)
-   [Your First App](#your-first-flutter-app)
-   [User Interface Layout](#user-interface-layout)
-   [User Interactions](#user-interactions)
-   [Assets and Images](#assets-and-images)
-   [Navigation](#navigation)
-   [State Management](#state-management)
-   [Http package](#http-package)
-   [Firebase](#firebase)
-   [Flutter Resources](#flutter-resources)

### Test Drive

Installation of Flutter and Dart is covered under [Learn Dart](/learn-dart) section. To get familiar with the process of creating a new project, running and debugging the project using your favourite IDE is explained [here](https://docs.flutter.dev/get-started/test-drive).<br>

### Widgets Overview

In Flutter everything including User Interface is a widget. A screen itself is a widget built by combining multiple widgets to build the functionality that you need to implement. There are two types of widgets

-   Stateless widgets are immutable, meaning that their properties can’t change—all values are final.
-   Stateful widgets maintain state that might change during the lifetime of the widget. Implementing a stateful widget requires at least two classes: - State class persists over the lifetime of the widget. - A StatefulWidget class that creates an instance of a State class. The StatefulWidget class is, itself, immutable and can be thrown away and regenerated, but the the State class persists over the lifetime of the widget.
-   Few basic widgets such as Container, Text, Row, Column, Stack etc. are explained [here](https://docs.flutter.dev/development/ui/widgets-intro).

### Your First Flutter App

Code lab for your first Flutter app is available [here](https://docs.flutter.dev/get-started/codelab). This is divided in two parts, with the first being a step by step process to create your app and second a challenge for you to build on your own. The code lab covers:

-   How to write a Flutter app that looks natural on iOS, Android, desktop (Windows, for example), and the web
-   Basic structure of a Flutter app
-   Finding and using packages to extend functionality
-   Using hot reload for a quicker development cycle
-   How to implement a stateful widget
-   How to create an infinite, lazily loaded list

### User Interface Layout

The core of Flutter’s layout mechanism is widgets. In Flutter, almost everything is a widget—even layout models are widgets. The images, icons, and text that you see in a Flutter app are all widgets. But things you don’t see are also widgets, such as the rows, columns, and grids that arrange, constrain, and align the visible widgets. To understand how to arrange widgets vertically & horizontally find detailed documentation and tutorial [here](https://docs.flutter.dev/development/ui/layout).

### User Interactions

All apps need to respond to user trigerred events such as button tap, double tap, drag, etc. Typcially such events will change application state resulting in updated UI view. Detailed documentation with examples of managing events and app state using Stateful widgets can be found [here](https://docs.flutter.dev/development/ui/interactive).

### Assets and Images

Displaying custom images, icons, audio, video or any type of media bundled with the application requires addition of reference in pubspec.yaml. Subsequently you can get access to such assets in your code. Additionally setup is required for app icon and splash screen. Detailed documentation can be found [here](https://docs.flutter.dev/development/ui/assets-and-images).

### Navigation

Flutter has an imperative routing mechanism, the Navigator widget and declarative routing using Router widget. Most commonly Navigator API is used to navigate from one screen to another, move back etc. There is often need to animate a widget across screens or pass data from one screen to another. All these scenarios are explained in detail [here](https://docs.flutter.dev/cookbook/navigation).

### State Management

To build further understanding of State Management, detailed documentation starting from introduction to complex state management techniques can be found [here](https://docs.flutter.dev/development/data-and-backend/state-mgmt/intro). The documentation covers conceptual details which are essential to build a sound understanding of managing state in Flutter apps. It explains how to lift state from a child widget to parent widget and using "Provider package and Change Notifiers" which are the most commonly used state management patterns. Refer the details [here](https://docs.flutter.dev/development/data-and-backend/state-mgmt/simple).

### Http package

In most apps you will need to do some find of network operations to fetch, create, update, or delete data which is residing on your backend servers. One of the most common ways is to interact with web services (REST API) hosted on your server. `http` package provides an easy interface to perform all HTTP operations such as Get, Post, Patch, Delete etc. Refer Networking [cook books](https://docs.flutter.dev/cookbook#networking) to understand how to invoke API and process the results returned from such call. The data exchange is typically performed using Json structure. The ways to serialize data to Json is explained [here](https://docs.flutter.dev/development/data-and-backend/json).

### Firebase

Firebase is growingly becoming popular compannion of Flutter applications. Firebase is used for:

-   Authentication (userid/password, oauth, Google, Facebook etc.)
-   NoSQL Databases: Firestore DB, Realtime DB
-   File Storage
-   Hosting Mobile and Web apps
-   Functions (node.js API's)
-   App Analytics
-   Cloud Messaging (device notifications)
-   Dynamic Links (Deep Links)
-   Admob (Google in-app advertisment framework)
    Documentation on these products is available [here](https://firebase.google.com/docs) and Flutter documentation to use Firebase plugin and examples can be found [here](https://firebase.google.com/docs) and Flutter documentation and video links can be found [here](https://docs.flutter.dev/development/data-and-backend/firebase).

### Flutter Resources

Flutter team has provided excellent API documentation, tutorials, cook-books, code-labs, videos etc. which will help you not only to learn Flutter but also act as reference for coding some of the common requirements and design patterns. https://docs.flutter.dev/ is the home of Flutter documentation with reference to all documentation and videos created by Flutter team. Key Reference materials and their links are below:

-   [Gallery](https://gallery.flutter.dev/#/): Primarily targeted to Beginners, it provides code and API usage for sample APPs, commonly used Widgets. The code for all the samples can be found at this git [repository](https://github.com/flutter/gallery)
-   [Samples](https://flutter.github.io/samples/): Provides reference to demo, cook-books, samples with step by step implementation approach, completed code and is a great place to look for when you need to implement a new functionality which may be a common use cases.
-   [Widget Catalog](https://docs.flutter.dev/development/ui/widgets): Provide reference to documentation of widgets which are categorized by their usage.
-   [API docs](https://api.flutter.dev/): Provides detailed documentation of all Dart and Flutter API's including documentation of public methods and properties expesed by each API
-   [Cookbooks](): Contains recipes that demonstrate how to solve common problems while writing Flutter apps.
-   [Code Labs](https://docs.flutter.dev/codelabs) & [Tutorials](https://docs.flutter.dev/reference/tutorials): The Flutter codelabs & tutorials provide a guided, hands-on coding experience.
-   [You Tube](https://www.youtube.com/flutterdev): Flutter team has built excellent library of Youtube videos on their [channel](https://www.youtube.com/flutterdev). They have developed a series under the name 'Widget of the week' which is a short 2-4 minutes videos explaining purpuse and usage of Flutter widgets
