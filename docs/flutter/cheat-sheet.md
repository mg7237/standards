# Flutter Cheat Sheet

The Flutter cheat sheet covers common implementation patterns to be used across Flutter apps. Developers can use this as reference when implementing similar requirements

-   [Safe Area](#safe-area)
-   [Define Constants](#define-constants)
-   [Navigation](#navigation)
-   [Local Persistence](#local-persistence)
-   [Model Definition](#model-definition)
-   [API Calls](#api-calls)

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
        "_id": id,
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

dio.Response response = await apiClient.postData(url: APIUrls().classUrl + "$classId/section/$sectionId/subject",data: jsonEncode({"_id": id, "type": type, "status": status}));

Future putData({required String url,required dynamic data}) async {}
// Implements HTTP PUT method, use it to make PUT calls to update data in remote DB. Example:
dio.Response response = await apiClient.putData(url: APIUrls().classUrl + "$classId/section/$sectionId/subject",data: jsonEncode({"_id": id, "type": type, "status": status}));

Future deleteData({required String url}) async {}
// Implements HTTP DELETE method, use it to call API which deleted data from DB. Example:
dio.Response response = await apiClient.getData(url: APIUrls().classUrl +
    "$classId/ section/$sectionId?subject=$subject");

// Exception Handling: apiClient takes responsibility of showing toast message depending on the exception type.
// It will rethrow exception which needs to be handled in caller code

```
