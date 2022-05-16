# Flutter Cheat Sheet

The Flutter cheat sheet covers common implementation patterns to be used across Flutter apps. Developers can use this as reference when implementing similar requirements

-   [Flutter Command Line](#command-line)
-   [Understand Example App](#understand-example-app)
-   [Safe Area](#safe-area)
-   [Handling Widget Size](#handling-widget-size)
-   [Handling Color And Text Style](#handling-color-and-text-style)
-   [Handling `Date` Type](#handling-date-type)
-   [Show Toast Message](#show-toast-message)
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
// Cleans workspace, requires pub get to ag maain get all resources.
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

### Handling Widget Size

Use `flutter_screenutil` package to define relative sizes i.e. height, width, padding, margin, font size, % of screen width, % of screen height etc. **No Hard Coding** of any attributes to be done in UI widget design.

```
import 'package:flutter_screenutil/flutter_screenutil.dart';
....
Container(
    padding: EdgeInsets.all(10.w), // 10 points
    width: 0.5.sw, // 50% of screen width
    height: 200.h, // 200dp Adapated to screen height
    color: Colors.red,
    child: Text(
    'My actual width: ${0.5.sw}dp \n\n'
    'My actual height: ${200.h}dp',
    style: TextStyle(
        color: Colors.white,
        fontSize: 12.sp, // Adaptor font
    ),
    ),
)
```

### Handling Color And Text Style

`theme` folder under `lib` contains `colors.dart` and `style.dart` which define standard colors and text styles to be used across application. **No Hard Coding** of `TextStyle` or `Colors` should be done within UI widget design.

```
import '../../theme/colors.dart'
...
Container(color: colorSky, child: Text('Text on skyBlue', style: TextStyle(color: colorText)));
...
Text('Use textFormTitleStyle',style: textFormTitleStyle);
...
```

### Handling Date Type

To send/receive data of type **date** across API's, dates should be converted to string representing date-time in **UTC** (Zulu Time). For example date value is represented as `"2022-03-08T05:07:21.858Z"` which implies UTC date time equivalent to 08-March-2022, 05H:07M:21S and 858ms. Use `dateVariable.toUtc().toIso8601String()` to convert date to String and `DateTime.parse(dateVariable).toLocal()` to convert to string to local date time object.

```
Date myDate = DateTime.parse("2022-03-08T05:07:21.858Z").toLocal();
String dateValue = myDate.toUtc().toIso8601String();
```

### Show Toast Message

Use `fluttertoast` plugin for displaying toast messages. Follow simple synatx as below:

```
import 'package:fluttertoast/fluttertoast.dart';
...
Fluttertoast.showToast(msg: 'My custom message');

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

An end to end APP covering key Flutter features (listed below). The objective is to get practice by impletementing the end to end solution. The complete app in Git is available [here](#api-calls). Please follow along with the instructions and snippets provided to help you along. Do give it a go before you get tempted to clone the app and work backwards which always seems very easy and logical in hindsight.

1.  **Profile UI:** Picture, Name, email-id, contact number (store country and the number separately), pin-code, date of birth.
1.  **Create, Update, Delete Profile:** Seach profiles based on search criteria entered by user and show the list of user profiles in card form.
1.  **Search Profile:** Seach profiles based on search criteria entered by user and show the list of user profiles in card form.
1.  **Getx:** State Management, Routing and Dependency injection
1.  **drop-down:** with country flags to select contact country "Country Code" i.e IN for India, SG for Singapore etc.
1.  **Date Picker and Date Time Picker:** for profile date of birth
1.  **Image Upload:** for user profile image
1.  **Toasts & Popups:** for information and errors display
1.  **Form Validation:** individual field as well as entire form validations
1.  **REST API calls with Dio:** to store/receive data from server
1.  **SQLite Local DB:** To store reference data

Let's get started!!!

-   **Create new project and update pubspec.yaml**

```
// Create a new project from commandline
$ flutter create first  // Name the project as first

// Open pubspec.yaml and remove all comments and add required dependencies
$ flutter pub add dio // API calls
$ flutter pub add fluttertoast // Toast messages
$ flutter pub add get // Note: get here refers to getx package
$ flutter pub add get sqflite
$ flutter pub add flutter_spinkit
$ flutter pub add date_time_picker
$ flutter pub add image_picker


$ flutter pub get // Pub get implies downloading the dependencies


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
  fluttertoast: ^8.0.9
  sqflite: ^2.0.2+1
  shared_preferences: ^2.0.13
  flutter_spinkit: ^5.1.0
  date_time_picker: ^2.1.0
  image_picker: ^0.8.5+3

dev_dependencies:
  flutter_test:
    sdk: flutter

  flutter_lints: ^1.0.0

flutter:
  uses-material-design: true

```

-   **Remove sample app comments and code in main.dart to return scaffold with Stateless Widget named AppHome which takes title as parameter**

```
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
      home: const AppHome(title: 'My First Flutter App'),
    );
  }
}
```

-   **Create User Profile Model class, refer field list above**

```
// UserProfile model class
class UserProfileModel {
  // Define class attributes required in UI and stored in DB
  int? id;
  String? userName; // email id of the user
  String? imagePath; // user image location
  String? contactCountry; // ISIN country codes
  String? contactNumber; // Mobile Number
  String? pinCode; // Pin Code or Zip Code
  DateTime? dateOfBirth; // dateOfBirth
  DateTime? passwordExpiryDateTime;

  // Define class constructor
  UserProfileModel({
    this.id,
    this.userName,
    this.imagePath,
    this.contactCountry,
    this.contactNumber,
    this.pinCode,
    this.dateOfBirth,
    this.passwordExpiryDateTime,
  });

// Create factory class which will create model instance using the json (Map)
// as input parameter

  factory UserProfileModel.fromJson(Map<String, dynamic>? json) =>
      UserProfileModel(
        id: json?["id"] ?? 0,
        userName: json?["user_name"] ?? '',
        imagePath: json?["image_path"] ?? '',
        contactCountry: json?["contact_country"] ?? '',
        contactNumber: json?["contact_number"] ?? '',
        pinCode: json?["pin_code"] ?? '',
        dateOfBirth: DateTime.parse(json?["date_of_birth"] ?? ''),
        passwordExpiryDateTime:
            DateTime.parse(json?["password_expiry_date_time"] ?? ''),
      );

// Convert the Model object to json (Map)
  Map<String, dynamic> toJson() => {
        "id": id ?? '',
        "user_name": userName ?? '',
        "image_path": imagePath ?? '',
        "contact_country": contactCountry ?? '',
        "contact_number": contactNumber ?? '',
        "pin_code": pinCode ?? '',
        "date_of_birth": dateOfBirth?.toUtc().toIso8601String(),
        "password_expiry_date_time": passwordExpiryDateTime?.toIso8601String(),
      };
}
```

-   **Create AppHome Statefull widget with one text field for user to enter search criteria and FloatingActionButton with + icon. Search will result in a list of cards representing profiles searched and + icon takes to create profile page. Include the logic for creation of DB, refresh of DB data**

```
// API helper class implements Get, Post, Patch, Delele methods
// Define base url constant (ideally kept in separate constants file)
// ignore: constant_identifier_names
// Postman mock server - refer first-app collection
const baseURL = 'https://7e3291e9-4aa7-495f-a1af-542793814083.mock.pstmn.io';

class ApiHelper {
  static final ApiHelper _apihelper = ApiHelper._internal();

  factory ApiHelper() {
    return _apihelper;
  }
  ApiHelper._internal();
  // Common headers to be used across API methods
  Map<String, String> header = {
    "content-type": "application/json",
    "api_key": "xxxxx"
  };
  final dio = Dio(); // Single instance var used across multiple calls

  // Path is expected to contain the complete url including parameters if any
  // for example http://abc.com/profile?id=123
  Future<dynamic> get(String path) async {
    dynamic returnData;
    try {
      Response response =
          await dio.get(path, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnData = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot get requested data, please try later');
    }
    return returnData;
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
          msg: 'Cannot create requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
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
          msg: 'Cannot update requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
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
          msg: 'Cannot delete requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return returnMap;
  }
}

```

-   **Create Get Controller, with properties required in UI and CRUD methods**

```
enum ProfileMode { create, update }

// Create UserProfile controller class which extends Getx controller
class UserProfileController extends GetxController {
  // Instantiate ProfileModel model class
  Rx<UserProfileModel> profileModel = UserProfileModel().obs;
  Rx<ProfileMode> profileMode = ProfileMode.create.obs;
  RxString countrySelected = 'IN'.obs;
  RxInt id = 0.obs;
  RxString imagePath = ''.obs;
  Rx<DateTime> dob = DateTime(2000).obs;
  RxDouble screenWidth = 0.0.obs;
  TextEditingController nameController = TextEditingController();
  TextEditingController contactNumberController = TextEditingController();
  TextEditingController pincodeController = TextEditingController();
  final formKey = GlobalKey<FormState>().obs;
  final ImagePicker _picker = ImagePicker();

  // Takes care of Saving user profile in case of new record or
  // updates to existing data
  Future<void> createOrUpdateUserProfile() async {
    // Check if form validation is success
    if (formKey.value.currentState!.validate()) {
      dynamic response;
      ApiHelper apiHelper = ApiHelper();
      profileModel.value = UserProfileModel(
          id: null,
          userName: nameController.text,
          contactCountry: countrySelected.value,
          contactNumber: contactNumberController.text,
          pinCode: pincodeController.text,
          dateOfBirth: dob.value,
          imagePath: profileModel.value.imagePath,
          passwordExpiryDateTime: DateTime.now().add(const Duration(days: 30)));
      // Update id if user is updating a record and call post or patch mathods
      // depending on the mode
      if (profileMode.value == ProfileMode.update) {
        response = await apiHelper.post(
            path: '$baseURL/profile', postData: profileModel.toJson());
      } else {
        profileModel.value.id = id.value;
        response = await apiHelper.patch(
            path: '$baseURL/profile', patchData: profileModel.toJson());
      }
      // If a valid response is received, show toast with success message
      if (response != {}) {
        if (response["status"]) {
          profileModel.value.id = response["id"];
          Fluttertoast.showToast(
              msg: (profileMode.value == ProfileMode.create)
                  ? "Profile Created!"
                  : "Profile Updated",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.blue,
              textColor: Colors.white,
              fontSize: 16.0);
        } else {
          Fluttertoast.showToast(
              msg: "API Failed: ${response["message"] ?? ''}",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
        }
      } else {
        Fluttertoast.showToast(
            msg: "API failed: ${response["message"] ?? ''}",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
      }
      formKey.value.currentState?.reset();
      Get.back();
    }
  }

  // Deletes a user profile
  Future<bool> deleteUserProfile() async {
    bool status = false;
    ApiHelper apiHelper = ApiHelper();
    var response =
        await apiHelper.delete('$baseURL/profile?id=${profileModel.value.id}');
    if (response != {}) {
      if (response['status']) {
        Fluttertoast.showToast(
            msg: "Profile Deleted",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.blue,
            textColor: Colors.white,
            fontSize: 16.0);
        status = true;
        Get.back();
      } else {
        Fluttertoast.showToast(
            msg: "Profile Deletion Failed. Please try later",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
      }
    } else {
      Fluttertoast.showToast(
          msg: "Profile Deletion Failed. Please try later",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return status;
  }

  // Helper to select the image file
  Future<String?> getPicture(ImageSource imageOption) async {
    XFile? xFile;
    try {
      if (imageOption == ImageSource.camera) {
        xFile = await _picker.pickImage(source: ImageSource.camera);
        if (xFile != null) {
          return xFile.path;
        } else {
          Fluttertoast.showToast(
              msg: 'Image not selected',
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
        }
      } else {
        xFile = await _picker.pickImage(source: ImageSource.gallery);
        if (xFile != null) {
          return xFile.path;
        } else {
          Fluttertoast.showToast(
              msg: 'Image not selected',
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
        }
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Exception while picking image',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return null;
  }

  // Helper to select the image file calls getPicture to get the image file
  Future<void> selectAvatarPicture() async {
    await Get.bottomSheet(
        SizedBox(
          height: 100,
          child: Column(
            children: [
              InkWell(
                onTap: () async {
                  imagePath.value = await getPicture(ImageSource.camera) ?? '';
                  Get.back();
                },
                child: const Padding(
                  padding: EdgeInsets.all(10),
                  child: Text(
                    'Picture From Camera',
                    style: TextStyle(fontSize: 18.0, color: Colors.white),
                  ),
                ),
              ),
              const Divider(
                color: Colors.white,
                thickness: 1,
              ),
              InkWell(
                onTap: () async {
                  imagePath.value = await getPicture(ImageSource.gallery) ?? '';
                  Get.back();
                },
                child: const Padding(
                  padding: EdgeInsets.all(5),
                  child: Text(
                    'Picture From Gallery',
                    style: TextStyle(fontSize: 18.0, color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
        ),
        backgroundColor: Colors.blue);
  }
}


```

-   **API helper for all API method implementation**

```
// API helper class implements Get, Post, Patch, Delele methods
// Define base url constant (ideally kept in separate constants file)
// ignore: constant_identifier_names
// Postman mock server - refer first-app collection
const baseURL = 'https://7e3291e9-4aa7-495f-a1af-542793814083.mock.pstmn.io';

class ApiHelper {
  static final ApiHelper _apihelper = ApiHelper._internal();

  factory ApiHelper() {
    return _apihelper;
  }
  ApiHelper._internal();
  // Common headers to be used across API methods
  Map<String, String> header = {
    "content-type": "application/json",
    "api_key": "xxxxx"
  };
  final dio = Dio(); // Single instance var used across multiple calls

  // Path is expected to contain the complete url including parameters if any
  // for example http://abc.com/profile?id=123
  Future<dynamic> get(String path) async {
    dynamic returnData;
    try {
      Response response =
          await dio.get(path, options: Options(headers: header));
      if (response.statusCode == 200) {
        returnData = response.data;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Cannot get requested data, please try later');
    }
    return returnData;
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
          msg: 'Cannot create requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
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
          msg: 'Cannot update requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
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
          msg: 'Cannot delete requested data, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return returnMap;
  }
}
```

-   **Add DB helper for all db interactions**

```
// These are SQL's executed first time database creation when app is installed
const createTableList = <String>[
  'CREATE TABLE table_versions(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, table_name TEXT, version_number INTEGER)',
  'CREATE TABLE user_types(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, type TEXT, description TEXT)',
  'CREATE TABLE country_data(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, alpha2Code TEXT, callingCode TEXT, flag TEXT)',
];
// These are SQL's executed first time database creation when app is installed
// Subsquent updates to reference data is implemented as part of reference_data.dart
const refreshDBTables = <String>[
  "Insert into table_versions (table_name,version_number) values ( 'table_versions', 1 )",
  "Insert into table_versions (table_name,version_number) values ( 'user_types', 1 )",
  "Insert into user_types (type,description) values ('USER','APP User')",
  "Insert into user_types (type,description) values ('ADMIN','Admin User')"
];

const dbName = 'local.db';

class DBHelper {
  static final DBHelper _dbhelper = DBHelper._internal();

  factory DBHelper() {
    return _dbhelper;
  }

  DBHelper._internal();

  Database? database;
  // Creates DB when app is installed
  Future<bool> createDB() async {
    bool createStatus = false;
    // Get a location using getDatabasesPath
    try {
      var databasesPath = await getDatabasesPath();
      String path = join(databasesPath, dbName);
      // Delete the database if any
      databaseExists(String pathParam) =>
          databaseFactory.databaseExists(pathParam);
      if (await databaseExists(path)) {
        // Delete db if it exists
        await deleteDatabase(path);
      }

      // Create the database
      database = await openDatabase(path, version: 1,
          onCreate: (Database db, int version) async {
        // When creating the db, create all tables
        for (String sql in createTableList) {
          await db.execute(sql);
        }
      });
      createStatus = true;
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Creation of local DB failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }

    return createStatus;
  }

  // Opens the SQL db (doesnot run on first install)
  Future<bool> openDB() async {
    bool openStatus = false;

    try {
      if (database == null) {
        // Get a location using getDatabasesPath
        var databasesPath = await getDatabasesPath();
        String path = join(databasesPath, dbName);
        // open the database
        database = await openDatabase(path);
      }
      openStatus = true;
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Database not available, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return openStatus;
  }

  // Executes Select statement on the provided table, whereParams, whereArgsParam
  Future<List<Map<String, dynamic>>> executeSelect(String tableName,
      String? whereParam, List<Object?>? whereArgsParam) async {
    List<Map<String, dynamic>> returnValue = [];
    try {
      if (database == null) await openDB();

      returnValue = await database!
          .query(tableName, where: whereParam, whereArgs: whereArgsParam);
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Select on local DB failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return returnValue;
  }

  // Inserts a row in the provided table and map containing data to be inserted
  Future<bool> executeInsert(
      String tableName, Map<String, Object?> values) async {
    int result;
    bool success = false;

    try {
      if (database == null) openDB();

      result = await database!.insert(
        tableName,
        values,
        conflictAlgorithm: ConflictAlgorithm.replace,
      );

      if (result != 0) {
        success = true;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Insert into local DB failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return success;
  }

  // Use for raw inserts, this is primarily used to populate reference data tables
  Future<bool> rawInsert(String sql) async {
    int result;
    bool success = false;

    try {
      if (database == null) openDB();

      result = await database!.rawInsert(sql);
      if (result > 0) {
        success = true;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Insert into local DB failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return success;
  }
}

```

-   **Form widget with input fields in top to down CRUD view**

```

// Mockserver URL
const avatarURL =
    'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=';

// Note Profile is a Stateless widget, all vars and logic is delegated to the respective Controller
class Profile extends StatelessWidget {
  Profile({Key? key, required this.userProfileModel}) : super(key: key);
  final UserProfileModel userProfileModel;

  final profileController = Get.put(UserProfileController());

  @override
  Widget build(BuildContext context) {
    // Decide the mode based on if userProfile id exists or not
    // Update the profileController vars with the passed userProfile data
    profileController.profileModel.value = userProfileModel;
    if ((userProfileModel.id ?? '') == '') {
      profileController.profileMode = ProfileMode.create.obs;
    } else {
      profileController.nameController.text = userProfileModel.userName ?? '';
      profileController.contactNumberController.text =
          userProfileModel.contactNumber ?? '';
      profileController.pincodeController.text = userProfileModel.pinCode ?? '';
      profileController.dob.value =
          userProfileModel.dateOfBirth ?? DateTime(2000);
      profileController.countrySelected.value =
          userProfileModel.contactCountry ?? 'IN';
      profileController.profileMode = ProfileMode.update.obs;
    }
    // Get the screen width to align and size Widgets
    profileController.screenWidth.value = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'User Profile',
          style: TextStyle(fontSize: 14),
        ),
        actions: [
          if (profileController.profileMode.value == ProfileMode.update)
            IconButton(
                onPressed: () {
                  profileController.deleteUserProfile();
                },
                icon: const Icon(Icons.delete))
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: SingleChildScrollView(
          child: Center(
              child: Form(
            key: profileController.formKey.value,
            child: Obx(
              () => Column(children: [
                InkWell(
                  child: (profileController.imagePath.value == '' ||
                          (profileController.imagePath.value
                                  .substring(0, 4)
                                  .toLowerCase() ==
                              'http'))
                      ? CircleAvatar(
                          radius: 50.0,
                          backgroundImage:
                              //  FileImage(io.File(profileController.imagePath.value)),
                              (profileController.imagePath.value == '')
                                  ? const NetworkImage(avatarURL)
                                  : NetworkImage(
                                      profileController.imagePath.value),
                          backgroundColor: Colors.transparent,
                        )
                      : CircleAvatar(
                          radius: 50.0,
                          backgroundImage: FileImage(
                              io.File(profileController.imagePath.value)),
                          backgroundColor: Colors.transparent,
                        ),
                  onTap: () => profileController.selectAvatarPicture(),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: profileController.screenWidth * 90 / 100,
                  height: 30,
                  child: TextFormField(
                      validator: (value) {
                        if ((value ?? '') == '') {
                          return 'Please enter full name';
                        }
                        return null;
                      },
                      controller: profileController.nameController,
                      decoration: const InputDecoration(
                          hintText: 'Full Name',
                          hintStyle: TextStyle(fontSize: 14))),
                ),
                const SizedBox(height: 5),
                CountryDropdown(
                    value: userProfileModel.contactCountry ?? 'IN',
                    valueSelected: profileController.countrySelected),
                const SizedBox(height: 5),
                SizedBox(
                    child: TextFormField(
                  controller: profileController.contactNumberController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                      hintText: 'Contact Number',
                      hintStyle: TextStyle(fontSize: 14)),
                  validator: (value) {
                    if ((value ?? '') == '') {
                      return 'Please enter contact number';
                    }

                    int? contact = int.tryParse(value ?? '');
                    if (contact == null) {
                      return 'Please enter numbers only';
                    }

                    return null;
                  },
                )),
                const SizedBox(height: 5),
                SizedBox(
                    child: TextFormField(
                  controller: profileController.pincodeController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                      hintText: 'Pin Code', hintStyle: TextStyle(fontSize: 14)),
                  validator: (value) {
                    return null;
                  },
                )),
                const SizedBox(height: 5),
                SizedBox(
                    child: DateTimePicker(
                  initialValue:
                      profileController.dob.value.toLocal().toString(),
                  style: const TextStyle(fontSize: 14),
                  initialDate: profileController.dob.value,
                  firstDate: DateTime(1920),
                  lastDate: DateTime(2020),
                  dateLabelText: 'Date of Birth',
                  onChanged: (val) => profileController.dob.value =
                      DateTime.parse(val).toLocal(),
                  validator: (val) {
                    var now = DateTime.now();
                    if ((val ?? '') == '') {
                      return 'Please enter date of birth';
                    }
                    if (DateTime.parse(val ?? '').toLocal().isAfter(now)) {
                      return 'Please enter date earlier than 2021';
                    }
                    return null;
                  },
                  onSaved: (val) => profileController.dob.value =
                      DateTime.parse(val ?? '').toLocal(),
                )),
                const SizedBox(height: 50),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    InkWell(
                        child: Container(
                          height: 50,
                          width: 150,
                          decoration: const BoxDecoration(color: Colors.blue),
                          child: Container(
                              height: 50,
                              width: 150,
                              decoration:
                                  const BoxDecoration(color: Colors.blue),
                              child: const Center(
                                child: Text('Save',
                                    style: TextStyle(
                                        fontSize: 16, color: Colors.white)),
                              )),
                        ),
                        onTap: () async => await profileController
                            .createOrUpdateUserProfile()),
                    InkWell(
                        child: Container(
                          height: 50,
                          width: 150,
                          decoration: const BoxDecoration(color: Colors.blue),
                          child: const Center(
                              child: Text('Cancel',
                                  style: TextStyle(
                                      fontSize: 16, color: Colors.white))),
                        ),
                        onTap: () => Get.back())
                  ],
                )
              ]),
            ),
          )),
        ),
      ),
    );
  }
}

```

-   **Add Reference data refresh class which implements methods related to reference data creation and refresh**

```
const newTableList = <Map<String, String>>[
  // Uncomment below to test addition of new reference data table named test_table
  // {
  //   'test_table':
  //       'Create table test_table (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,column_text TEXT, column_int INTEGER)'
  // }
];

// Manages reference data creation and updates when the data changes on backend
class ReferenceData {
  //
  Future<bool> firstTimeInsert() async {
    bool result = false;
    try {
      for (String insertSQL in refreshDBTables) {
        result = await DBHelper().rawInsert(insertSQL);
        if (!result) {
          break;
        }
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Insert into local DB failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      result = false;
    }
    return result;
  }

  // Refreshes local DB table data
  Future<bool> updateNewTableVersions() async {
    bool status = true;

    try {
      await createNewTables();

      List<Map<String, dynamic>> dbData =
          await DBHelper().executeSelect("table_versions", null, null);
      if (dbData.isNotEmpty) {
        //print('dbData : $dbData');
        var apiData = await ApiHelper().get(baseURL + '/table_versions');
        if ((apiData['status'] ?? false) && apiData['data'] is List<dynamic>) {
          for (var dbTableRow in dbData) {
            String tableName = dbTableRow['table_name'];
            for (var apiDataRow in apiData['data']) {
              if (apiDataRow['table_name'] == tableName) {
                if (apiDataRow['version_number'] !=
                    dbTableRow['version_number']) {
                  if (status) {
                    status = await refreshTable(tableName);
                    break;
                  }
                }
              }
            }
          }
        }
      } else {
        Fluttertoast.showToast(
            msg: 'Refresh of table_versions failed, please try later',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
        status = false;
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Refresh of table_versions failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      status = false;
    }
    return status;
  }

  Future<bool> refreshTable(String tableName) async {
    bool returnValue = true;
    var result = await ApiHelper().get(baseURL + '/' + tableName);
    if (result is Map<String, dynamic>) {
      if (result['status'] ?? false) {
        try {
          DBHelper().database?.rawDelete('Delete from $tableName');
          if (result['data'] is List<dynamic>) {
            for (var row in result['data']) {
              String end = '';
              String insert = 'Insert into $tableName (';
              row.forEach((key, value) {
                insert += '$key,';
                end += "'$value',";
              });
              insert = insert.substring(0, insert.length - 1);
              end = end.substring(0, end.length - 1);
              insert = '$insert) values ($end)';

              if ((await DBHelper().database?.rawInsert(insert) ?? 0) < 0) {
                returnValue = false;
                break;
              }
            }
          }
        } catch (e) {
          Fluttertoast.showToast(
              msg: 'Refresh of table failed, please try later',
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
          returnValue = false;
        }
      }
    }
    return returnValue;
  }

  // Checks if there any new table added to reference data list.
  // Creates the new table as well inserts row in table_versions with version number 1
  Future<void> createNewTables() async {
    var dbHelper = DBHelper();

    if (newTableList.isNotEmpty) {
      if (await dbHelper.openDB()) {
        for (Map table in newTableList) {
          table.forEach((key, value) async {
            // Create new table
            await dbHelper.database?.execute(value);
            // Insert row in table versions table
            await dbHelper.executeInsert(
                'table_versions', {'table_name': key, 'version_number': 1});
          });
        }
      }
    }
  }
}

```

-   **Add Country Manager which provides Country Data**

```
// Country Model
const flagCDN = 'https://flagcdn.com/w20';

// Holds country data.
class CountryModel {
  String name;
  String alpha2Code;
  String callingCode;
  String flag;
  CountryModel(
      {required this.alpha2Code,
      required this.callingCode,
      required this.flag,
      required this.name});
  factory CountryModel.fromJson(Map<String, dynamic>? json) => CountryModel(
      alpha2Code: json?["alpha2Code"],
      callingCode: (json?["callingCodes"] ?? ['0']).first ?? '0',
      flag: "$flagCDN/${json?['alpha2Code'].toLowerCase()}.jpg",
      name: json?["name"]);

  Map<String, dynamic> toJson() => {
        "alpha2code": alpha2Code,
        "callingCode": callingCode,
        "flag": flag,
        "name": name
      };
}


// Country Manager
// API that provides country data in JSON format
const countryURL = 'https://restcountries.com/v2/all';

class CountryManager {
  List<CountryModel> countryList = <CountryModel>[];

  // Calls Country API and populates countryList var and
  // inserts data in Country table. Expected to be executed on first run only
  Future<bool> fetchCountryData() async {
    bool status = false;
    ApiHelper apiHelper = ApiHelper();
    try {
      var data = await apiHelper.get(countryURL);
      if (data != null) {
        if (data is List<dynamic>) {
          // Clear countryList var
          countryList = [];
          for (var countryData in data) {
            countryList.add(CountryModel.fromJson(countryData));
            // Adding the last entry each time as the new element
            // is added to the last of the list in above statement

            status = await DBHelper()
                .executeInsert('country_data', countryList.last.toJson());
            if (!status) return false;
          }
        }
      }
    } catch (e) {
      Fluttertoast.showToast(
          msg: 'Fetch country data failed, please try later',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
    return status;
  }

  // Retrieves the country data from the SQL db and populates countryData var
  Future<bool> getCountryData() async {
    bool status = true;

    DBHelper dbHelper = DBHelper();
    if (countryList.isEmpty) {
      try {
        var countryData =
            await dbHelper.executeSelect('country_data', null, null);

        for (var country in countryData) {
          countryList.add(CountryModel(
            alpha2Code: country["alpha2Code"],
            callingCode: country["callingCode"],
            flag: country["flag"],
            name: country["name"],
          ));
        }
      } catch (e) {
        Fluttertoast.showToast(
            msg: 'Get country data failed, please try later',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
        status = false;
      }
    }
    return status;
  }

  // Returns the country list from local cache if available else
  // queries the db to get the data
  Future<List<CountryModel>> getCountryList() async {
    if (countryList.isEmpty) {
      await getCountryData();
    }
    return countryList;
  }
}

```

-   **Create Country Drop Down widget**

```
// Common Coountry drop down widget which could be re-used across app
class CountryDropdown extends StatefulWidget {
  // Parent method to be called on update of Country
  final Function valueSelected;
  // Prexisting value (in update mode) to be selected
  final String? value;

  const CountryDropdown({
    Key? key,
    required this.valueSelected,
    this.value,
  }) : super(key: key);

  @override
  _CountryDropdownState createState() => _CountryDropdownState();
}

class _CountryDropdownState extends State<CountryDropdown> {
  // Prexisting value (in update mode) to be selected
  String _value = '';
  bool dataLoaded = false;
  List<CountryModel> countries = [];
  List<DropdownMenuItem<String>> menuItemList = [];

  CountryManager countryManager = CountryManager();
  @override
  void initState() {
    super.initState();

    buildMenuItems();

    _value = widget.value ?? 'IN';
  }

  void buildMenuItems() async {
    if (await countryManager.getCountryData()) {
      countries = await countryManager.getCountryList();
    } else {
      Fluttertoast.showToast(
          msg: "Get Country Data failed",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }

    for (var country in countries) {
      menuItemList.add(
        DropdownMenuItem(
          value: country.alpha2Code,
          child: SizedBox(
            width: MediaQuery.of(context).size.width * .8,
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      SizedBox(
                          height: 30,
                          width: 30,
                          child: Image(image: NetworkImage(country.flag))),
                      const SizedBox(width: 10),
                      Text(
                        (country.name.length > 28)
                            ? country.name.substring(0, 25) + '...'
                            : country.name,
                        style: const TextStyle(fontSize: 14),
                      ),
                    ],
                  ),
                  Text(
                    country.callingCode,
                    style: const TextStyle(fontSize: 14),
                  ),
                ]),
          ),
        ),
      );
    }
    dataLoaded = true;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return (dataLoaded)
        ? Container(
            width: MediaQuery.of(context).size.width * .9,
            child: DropdownButton<String>(
              items: menuItemList,
              onChanged: (value) {
                if (mounted) {
                  setState(() {
                    if (_value != value) {
                      _value = value ?? '';
                      widget.valueSelected(_value);
                    }
                  });
                }
              },
              value: _value,
            ),
            padding: const EdgeInsets.symmetric(vertical: 5),
          )
        : const SpinKitFadingCircle(color: Colors.black);
  }
}

```

**That's it folks!!!**
