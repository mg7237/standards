# Flutter Cheat Sheet

The Flutter cheat sheet covers common implementation patterns to be used across Flutter apps. Developers can use this as reference when implementing similar requirements

-   [Flutter Command Line](#command-line)
-   [Understand Example App](#understand-example-app)
-   [Understand Example App](#understand-example-app)
-   [Safe Area](#safe-area)
-   [Define Constants](#define-constants)
-   [Navigation](#navigation)
-   [Local Persistence](#local-persistence)
-   [Model Definition](#model-definition)
-   [API Calls](#api-calls)
-   [Develop User Profile App](#develop-user-profile-app)

### Flutter Command Line

-   **Prerequisite:** Completion of Flutter installation and IDE setup.
-   **Common CLI Commands:**

```
// Verify the status, version of your flutter environment
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 2.10.4, on macOS 12.2.1 21D62 darwin-arm, locale en-IN)
[✓] Android toolchain - develop for Android devices (Android SDK version 31.0.0-rc3)
[✓] Xcode - develop for iOS and macOS (Xcode 13.3.1)
[✓] Chrome - develop for the web
[✓] Android Studio (version 2020.3)
[✓] VS Code (version 1.66.2)
[✓] Connected device (1 available)
[✓] HTTP Host Availability

• No issues found!
...
// Below reads the pubspec.yaml file and downloads all network
// dependent resources such as plugins, icons resources.
$ flutter pub get
...
// Cleans workspace, requires pub get to again get all resources.
$ flutter clean
...
// Creates a new Flutter project in current directory.
$ flutter create <project-name>
...
// Runs the flutter application in project root directory.
$ flutter run
...
// Creates Android, iOS Or web build files in android, ios, Or web folder.
$ flutter build apk/ipa/web
```

### Understand Example App

Everytime you create a new flutter project, it comes with a simple counter app. It would be a good place to start understanding a basic Flutter app structure and how it relates to any programming languages that you may have worked with in past.

-   **pubspec.yaml:** Defines all dependencies for the project including 3rd party plugins, assets - icons, images, audio, video, fonts, any other build dependency.
-   **assets:** Typically a asset folder is created under project root which gets included in the build process
-   **android/ios/web/windows:** Folders containing OS specific build and configuration files generated when you compile or run a flutter app during development process
-   **build:** Binary files generated from build process are stored in this folder. This folder must be included on .gitignore file.
-   **lib:** Home of all your dart code. Below is walkthough of main.dart in example app.

```
// import dependencies for the current dart file.
// imports include local project files as well as external plugins such as Material below.
import 'package:flutter/material.dart';
import 'package:flutter_windowmanager/flutter_windowmanager.dart';

// Application entry point
void main() {
  runApp(MyApp()); // Start with MyApp widget
}

// MyApp widget is the root of your application and is implemented as a stateless widget.
// A stateless widget as the name suggest, it doesn't hold any application state
// information. Such widgets are fastest to rebuild whenever there is change in
// Widget Tree, hence prefer stateless widgets where feasible.
class MyApp extends StatelessWidget {
  // Override the Widget build method to build and return your custom Widget
  @override
  Widget build(BuildContext context) {
    // MaterialApp is A convenience widget that wraps a number of widgets that are
    // commonly required for material design applications. It builds upon a WidgetsApp
    // by adding material-design specific functionality.
    return MaterialApp(
      title: 'Flutter Demo',    // Title of the APP
      theme: ThemeData(         // Define Theme for the app. You can define dark theme and many more options supported by this class
        primarySwatch: Colors.blue, many more options supported by this class
      ),
      // home paramter defines the home of MaterialApp which is the next Widget under it
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

// MyHomePage is a stateful widget so it can hold state information in form of variables, class objects etc.
class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  // title is required property in constructor so the widget on instantiation gets
  // title value received from parent.
  // As it cannot change over the life of widget, it is marked as final
  final String title;
  // Create State _MyHomePageState() which implements the widget and related logic
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  // Define a variable _counter which will keep track of number of times user clicks a
  // button on UI. Note since this is a prive variable, it variable name precedes
  // with '_' as per dart convention
  int _counter = 0;
  // Simple method to increment counter value by 1. It just updates counter
  // and has no return value hence marked void
  void _incrementCounter() {
    // Setstate method is used to rebuild or refresh the user interface.
    // By wrapping the increment operator (++), the impact of incrementing the counter will be reflected in the UI
    setState(() {
      _counter++;
    });
  }

  // initState() method is part of Flutter widget lifecycle which runs before the Widget build method. Similarly dispose() method is called when Flutter exists a widget
  @override
  void initState() {
    super.initState();
    // Below is an example of utilizing FlutterWindowManager plugin
    // You will find the dependency defined in pubspec.yaml
    // and the relevant plugi n class is imported in start
    // If we wished to disable screenshots for specific screens, rather than across
    // the entire application lifecycle. This can now be accomplished by simply calling:
    FlutterWindowManager.addFlags(FlutterWindowManager.FLAG_SECURE);
  }

  // Build method return custom widget as designed by developer
  @override
  Widget build(BuildContext context) {
    // Saffold is used almost in all UI screens which provides a basic structure to UI screen
    // by providing Bar on top, body area with the main content of the widget, additionally
    // you can also add hamburger menu (left or right drawer), bottom menu bar,
    // floating action and much more.
    return Scaffold(
      // AppBar defines the contents of the top bar that you commonly see in any app ui
      appBar: AppBar(
        title: Text(widget.title), // Title displyed as Text widget within AppBar
      ),
      // Main body area
      body: Center( // Widget that Centers the child
        child: Column( // // Widget that arranges multiple children widgets horizontally
          mainAxisAlignment: MainAxisAlignment.center, // How to arrang widgets horizontally
          children: <Widget>[   // children widgets under the column
            Text(
              'You have pushed the button this many times:', // Text widget which prinyts label on ui
            ),
            Text(
              '$_counter', // Interpolate value of _counter and show in a text widget
              style: Theme.of(context).textTheme.headline4, // style for text ex. size, font color, bold etc.
            ),
          ],
        ),
      ),
      // A cicular button which appears floating on top of the body content area.
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter, // call _incrementCounter function on click of the button
        tooltip: 'Increment', // Define tool tip
        child: Icon(Icons.add), // Button comes with '+' icon
      ),
    );
```

### Safe Area

A widget that insets its child by sufficient padding to avoid intrusions by the operating system. For example, this will indent the child by enough to avoid the status bar at the top of the screen. It will also indent the child by the amount necessary to avoid The Notch on the iPhone X, or other similar creative physical features of the display. Usage:

```
// Most commonly this is used along with Scaffold but it could be applied as top
// widget of any app screen without Scaffold.
Scaffold(
body: SafeArea(
child: ....
)
)

```

### Define Constants

All system wide constants should be defined in the file helper/constants.dart. Example:

```

const imageAssets = 'lib/assets/images/';
enum byClassworkTypes { topic, concept, chapter }

```

### Navigation

-   To Navigate from one screen to another and back, use Navigator class. Following are examples of Navigator usage:

```

// To navigate from one screen to another use Navigator.push method.
Navigator.push(context,MaterialPageRoute(builder: (context) => const SecondRoute());

// To navigate back to previous screen.
Navigator.pop(context);

// To navigate back to screen with index 1
Navigator.of(context).popUntil((route) => route.isFirst);

//
Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => const BottomFooterNavigation()), (route) => false);

...
Navigator.pushNamed(context, '/second');

```

-   Define named routes by providing additional properties to the MaterialApp constructor: the initialRoute and the routes themselves. The initialRoute property defines which route the app should start with. The routes property defines the available named routes and the widgets to build when navigating to those routes.

```

MaterialApp(
title: 'Named Routes Demo',
// Start the app with the "/" named route. In this case, the app starts
// on the first screen.
initialRoute: '/',
routes: {
// When navigating to the "/" route, build the FirstScreen widget.
'/': (context) => const FirstScreen(),
// When navigating to the "/second" route, build the SecondScreen widget.
'/second': (context) => const SecondScreen(),
},
)
...
Navigator.pushNamed(context, '/second');

```

-   Passing Parameters while navigation to second screen

```

class ArgumentsScreen extends StatelessWidget {
final String myString;
final int myInt;
ArgumentsScreen({this.myString, this.myInt});
...
}

// Call the ArgumentsScreen
Navigator.push(context,MaterialPageRoute(builder: (context) => const ArgumentsScreen('String Value', 10)));

```

### Local Persistence

Many times there is requirement to persist user & device specific information locally on the device. Examples of such cases include user authorization token, FCM (Firebase Notifications) token or any other information which may be needed to be stored locally and retrived as and when needed. "Shared Preferences" plugin provides ability to store primitive data type. Supported data types are int, double, bool, String and List<String>.

```

// Create instance of shared preferences class
SharedPreferences prefs = await SharedPreferences.getInstance();

// Save Shared Preferences
await prefs.setInt('counter', 10);
await prefs.setBool('repeat', true);

// Read Shared Preferences,
// note it returns null if there is no data for the requested key
final int? counter = prefs.getInt('counter');
final bool? repeat = prefs.getBool('repeat');

```

### Model Definition

Model classes are used as data containers used by Controllers & UI screens extensively. Typically these are aligned with data structure held in backend. Most commonly use case include:

-   Getting API data and instantiating/updating model classes based on data retreived
-   Call Post/Put methods to create/update DB data based on model data

```

// Define Class with all properties
class Topic {
Chapter? topic;
String? type;
String? id;
// Create constructor which will initialize class properties
Topic({
this.topic,
this.type,
this.id,
});
// Create factory class which will create model instance using the json (Map)
// as input parameter. Typically used once you get json data from API and
// the same needs to be converted to Flutter Model
factory Topic.fromJson(Map<String, dynamic>? json) => Topic(
topic: Chapter.fromJson(json?["topic"]),
type: json?["type"],
id: json?["_id"],
);

// Convert the Model object to json (Map) typically used to create json data
// which will be passed to API Put and Patch methods
Map<String, dynamic> toJson() => {
"topic": topic?.toJson() ?? "",
"type": type,
"\_id": id,
};
}

```

### API Calls

Fetching and Updating data residing on remote servers using REST API's is a common pattern that is needed for development of almost all screens. Flutter plugin "Dio" is used for implementing API calls.

```

// Check urls.dart (helper folder) for Base URL and path lists
// if the path required is already listed then move to next step, else create a new
// entry for the new path within APIUrls() class. Example:
marskUrl = baseUrl + "marks/";

// network.dart (helper folder) provides interface to interact with API's and this should be used
// for all API operations. There should not be any code directly calling dio plugin.
// APIClient() methods to call from your code are as below.

Future getData({required String url}) async {}
// Implements HTTP GET method, use it to make Get calls to retrive data from APIs
// url paramater should be complete url including any url query parameters. Example:

dio.Response response = await apiClient.getData(url: APIUrls().classUrl +
"$classId/ section/$sectionId?subject=$subject");

Future postData({required String url,required dynamic data}) async {}
// Implements HTTP POST method, use it to make POST calls to create data in remote DB
// Example:

dio.Response response = await apiClient.postData(url: APIUrls().classUrl + "$classId/section/$sectionId/subject",data: jsonEncode({"\_id": id, "type": type, "status": status}));

Future putData({required String url,required dynamic data}) async {}
// Implements HTTP PUT method, use it to make PUT calls to update data in remote DB. Example:
dio.Response response = await apiClient.putData(url: APIUrls().classUrl + "$classId/section/$sectionId/subject",data: jsonEncode({"\_id": id, "type": type, "status": status}));

Future deleteData({required String url}) async {}
// Implements HTTP DELETE method, use it to call API which deleted data from DB. Example:
dio.Response response = await apiClient.getData(url: APIUrls().classUrl +
"$classId/ section/$sectionId?subject=$subject");

// Exception Handling: apiClient takes responsibility of showing toast message depending on the exception type.
// It will rethrow exception which needs to be handled in caller code

```

### Develop User Profile App

An end to end, exhaustive APP covering key Flutter features (listed below). The objective is to get practise by impletementing the end to end solution. The complete app in Git is available [here](#api-calls). Please follow along with the instructions and snippets provided to help you along. Do give it a go before you get tempted to clone the app and work backwards which always seems very easy and logical in hindsight.

1.  **UI:** Picture, Name, email-id, contact number (store country and the number separately as strings), pin-code
1.  **Getx:** based State Management, Routing and Dependency injection
1.  **drop-down:** with country flags to select contact country "Country Code" i.e +91 for India, +65 for Singapore, +001 US/Canada and so on.
1.  **Date Picker and Date Time Picker:** for profile create data
1.  **Image Upload:** for user profile image
1.  **File Upload:** for user documentation with restricted file types
1.  **Toasts & Popups:** for information and errors display
1.  **Form Validation:** individual field as well as entire form validations
1.  **REST API calls with Dio:** to store/receive data from server

Let's get started!!!

-   **Create new project and update pubspec.yaml**

```
// Create a new project from commandline
$ flutter create first  // Name the project as first

// Open pubspec.yaml and remove all comments and add required dependencies
$ flutter pub add dio // API calls
$ flutter pub add fluttertoast // Toast messages
$ flutter pub add get // Note: get here refers to getx package

$ flutter pub get // while pub get implies downloading the dependencies


// Now your pubspec.yaml should look like

name: first
description: A new Flutter project.

publish_to: "none"

version: 1.0.0+1

environment:
  sdk: ">=2.16.2 <3.0.0"

dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^1.0.2
  dio: ^4.0.6
  fluttertoast: ^8.0.8
  get: ^4.6.1

dev_dependencies:
  flutter_test:
    sdk: flutter

  flutter_lints: ^1.0.0

flutter:
  uses-material-design: true

```

-   **Remove sample app comments and code in main.dart to return scaffold with empty body (Center Widget)**

```
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My First Flutter App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: const Center(child: Text('')));
  }
}


```

-   **Create User Profile Model class**

```
// UserProfile model class
class UserProfileModel {
  // Define class attributes required in UI and stored in DB
  String? id;
  String? userName; // email id of the user
  String? imagePath; // user image location
  String? contactCountry; // ISIN country codes
  String? contactNumber; // Mobile Number
  String? pinCode; // Pin Code or Zip Code
  DateTime? dateOfBirth; // dateOfBirth
  DateTime? passwordExpiryDateTime;
  List<String?>? documents = [];
  // Define class constructor
  UserProfileModel(
      {this.id,
      this.userName,
      this.imagePath,
      this.contactCountry,
      this.contactNumber,
      this.pinCode,
      this.dateOfBirth,
      this.passwordExpiryDateTime,
      this.documents});

// Create factory class which will create model instance using the json (Map)
// as input parameter

  factory UserProfileModel.fromJson(
          Map<String, dynamic>? json) =>
      UserProfileModel(
          id: json?["id"] ?? '',
          userName: json?["user_name"] ?? '',
          imagePath: json?["image_path"] ?? '',
          contactCountry: json?["contact_country"] ?? '',
          contactNumber: json?["contact_number"] ?? '',
          pinCode: json?["pin_code"] ?? '',
          dateOfBirth: DateTime.parse(json?["date_of_birth"] ?? ''),
          passwordExpiryDateTime:
              DateTime.parse(json?["password_expiry_date_time"] ?? ''),
          documents: json?["documents"]);

// Convert the Model object to json (Map)
  Map<String, dynamic> toJson() => {
        "id": id ?? '',
        "user_name": userName ?? '',
        "image_path": imagePath ?? '',
        "contact_country": contactCountry ?? '',
        "contact_number": contactNumber ?? '',
        "pin_code": pinCode ?? '',
        "date_of_birth": dateOfBirth,
        "password_expiry_date_time": passwordExpiryDateTime,
        "documents": documents
      };
}

```

-   **Create Get Controller, with CRUD methods**

```
import 'package:get/get.dart';
import './profile_model.dart';

// Create UserProfile controller class which extends Getx controller
class UserProfileController extends GetxController {
  // Instantiate Getx model class
  Rx<UserProfileModel> profileModel = UserProfileModel().obs;
  // Define a boolean which is used to track if the async calls are in process
  RxBool loading = false.obs;

  // Define empty CRUD methods for now
  Future<bool> createUserProfile(UserProfileModel userProfile) async {
    return true;
  }

  Future<bool> updateUserProfile(UserProfileModel userProfile) async {
    return true;
  }

  Future<bool> searchUserProfile(
      {required Map<String, String> profileData}) async {
    return true;
  }

  Future<bool> deleteUserProfile(
      {required Map<String, String> profileData}) async {
    return true;
  }
}
```

-   **API helper for all API method implementation**

```
// API helper class implements Get, Post, Patch, Delele, File Upload, File Download
import 'package:dio/dio.dart';
import 'package:fluttertoast/fluttertoast.dart';

// Define base url constant (ideally kept in separate constants file)
// ignore: constant_identifier_names
const BASE_URL = 'https://abc.com';

class ApiHelper {
  // common headers to be used across API methods
  Map<String, String> header = {
    "content-type": "application/json",
    "api_key": "xxxxx"
  };
  // Header, specifically for file upload/download
  Map<String, String> filesHeader = {
    "content-type": "application/x-www-form-urlencoded",
    "api_key": "xxxxx"
  };
  final dio = Dio(); // Single instance var used across multiple calls

  // path is expected to contain the complete url including parameters if any
  // for example http://abc.com/profile?id=123
  Future<Map<String, dynamic>> get(String path) async {
    Map<String, dynamic> returnMap = {};
    try {
      Response response =
          await dio.get(path, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnMap = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot get requested data, please try later');
    }
    return returnMap;
  }

  // Use to create data by calling respective dio method.
  // postData is the complete data set to be created by API
  Future<Map<String, dynamic>> post(
      {required String path, required Map<String, dynamic> postData}) async {
    Map<String, dynamic> returnMap = {};
    try {
      Response response = await dio.post(path,
          data: postData, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnMap = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot create requested data, please try later');
    }
    return returnMap;
  }

  // Use to update data by calling respective dio method.
  // patchData is the complete data set to be updated by API
  Future<Map<String, dynamic>> patch(
      {required String path, required Map<String, dynamic> patchData}) async {
    Map<String, dynamic> returnMap = {};
    try {
      Response response = await dio.patch(path,
          data: patchData, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnMap = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot update requested data, please try later');
    }
    return returnMap;
  }

  // Path contains parameters to uniqely identify the data to be deleted by API
  Future<Map<String, dynamic>> delete(String path) async {
    Map<String, dynamic> returnMap = {};
    try {
      Response response =
          await dio.delete(path, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnMap = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot delete requested data, please try later');
    }
    return returnMap;
  }
}
```

-   **Form widget with input fields in top to down CRUD view**

```
// Form helps keep all related user input fields together as a form which can be validated as
// a single entity and if all well then initiate controller method which encapsulates server communication
```
