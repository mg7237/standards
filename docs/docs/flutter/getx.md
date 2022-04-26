# Getx State Management

GetX is not only a **state management** library, but instead, it is a **microframework** combined with **route management** and **dependency injection**. It aims to deliver top-of-the-line development experience in an extra lightweight but powerful solution for Flutter. <br><br>
GetX has three basic principles on which it is built:

1.  **Performance:** Focus on **minimum consumption** of memory and resources.
1.  **Productivity:** Intuitive and efficient tool combined with simplicity and straightforward syntax that ultimately **saves development time**.
1.  **Organization:** Provides total docoupling of views, business logic and dependency injection. You do not need context to navigate between routes, nor do you need **stateful widgets**

**Topics**

-   [UI Widgets](#ui-widgets)
-   [Controllers](#controllers)
-   [Get Navigation](#navigation)
-   [Other Features](#other-features)
-   [Complete Example](#complete-examples)
-   [References](#references)

### UI Widgets

Getx provides a clean way to separate views and business logic. The views contains UI design which at run-time creates UI Widget tree displayed to the user. All user triggered events should be mapped to respective Controller methods which perform business logic and update app state based on events triggered from the views. Any state change of controller data rebuilds the UI widget using updated state. <br>
To utilize Getx for UI design, follow below:

-   `GetMaterialApp()` instead of `MaterialApp()`.
-   Dendency injection and instantiation of the controller is done using syntax `final Controller c = Get.put(Controller())`.
-   All widgets in UI which are not constant and dependent on state will get updated on change of the respective state variable. For example `Obx(() => Text("${controller.name}"))` will update the Text content whenever there is change in the value of name property of the respective Controller.
-   All user triggered events such as tap, double tap etc. should invoke controller methods such as `c.updateName()`

### Controllers

The Controller encapsulate all business logic and update of state. To define Getx Controller, following below:

-   The controller class needs to extend GetxController such as
    `class Controller extends GetxController{}`
-   All state variables have a data type prefixed with Rx and initialized with a default value with postfix .obs such as: <br>

```
RxBool myBool = false.obs;
RxString myString = ''.obs;
RxInt myInt = 0.obs;
RxList<String> myList = [].obs;
RxMap<String, String> myMap = <String, String>{}.obs;
Rx<MyAwsomeObject> = MyAwsomeObject().obs;
...
```

### Get Navigation

Flutter provides Navigator.push method which requires context to move from one screen to another. Getx provides a simple Navigation mechanism as below

```
Get.to(Home());     // Navigate to Home Screen; equivalent of Navigator.push
Get.back();         // Move back to previous screen equivalent to Navigator.pop
Get.toNamed('/second'), // for named routes
Get.offAndToNamed('/second'), // to close, then navigate to named route

```

### Other Features

-   **Snackbars**

```
Get.snackbar(
   'title',
   'message',
   snackPosition: SnackPosition.BOTTOM,
colorText: Colors.white,
backgroundColor: Colors.black,
borderColor: Colors.white);
```

-   **Dialogs**

```
Get.defaultDialog(
   radius: 10.0,
   contentPadding: const EdgeInsets.all(20.0),
   title: 'title',
   middleText: 'content',
   textConfirm: 'Okay',
   confirm: OutlinedButton.icon(
     onPressed: () => Get.back(),
     icon: const Icon(
       Icons.check,
       color: Colors.blue,     ),
     label: const Text('Okay',
       style: TextStyle(color: Colors.blue),
     ),   ),
 cancel: OutlinedButton.icon(
     onPressed: (){},
     icon: Icon(),
     label: Text(),),);
```

**Bottom Sheets**

```
Get.bottomSheet(
   Container(
 height: 150,
 color: AppColors.spaceBlue,
 child: Center(
     child: Text(
   'Count has reached ${obxCount.value.toString()}',
   style: const TextStyle(fontSize: 28.0, color: Colors.white),
 )),
));
```

### Complete Examples

**Counter APP implemented using Getx**

```
// Update pubspec.yaml to include Getx plugin
$ flutter pub add get
...
// Add following import in all dart files using getx
import 'package:get/get.dart';

```

**Controller Options:**

```
// Option 1 Controller extends Getx Controller and uses update method
class Controller extends GetxController {
  var count = 0;
  void increment() {
    count++;
    update(); // Updates all dependent widgets
  }
}

// Option 2 controller extends Getx Controller and properties are marked observable
class Controller extends GetxController {
  var count = 0.obs;
  void increment() {
    count++;
  }
}

```

**UI Screen using Obx function and Navigation**

```
class Home extends StatelessWidget {
  final controller = Get.put(Controller());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("counter")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Obx(() => Text(
                      'clicks: ${controller.count}',    // Update to Text Value on change of count
                    )),
            ElevatedButton(
              child: Text('Next Route'),
              onPressed: () {
                Get.to(Second());   // Get Navigation without context
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: controller.increment(),
          ),
    );
  }
}
class Second extends StatelessWidget {
  final Controller ctrl = Get.find();
  // Both Home and Second use same conroller,
  // to get same instance of the controller, use Get.find() insteaad of Get.put()
  @override
  Widget build(context){
     return Scaffold(body: Center(child: Text("${ctrl.count}")));
  }
}
```

**UI Screen using GetBuilder function**

```

class Home extends StatelessWidget {
  final controller = Get.put(Controller());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("counter")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GetBuilder<Controller>(
                builder: (_) => Text(
                      'clicks: ${controller.count}', // Updates Text value whenever there is change in controller count value
                    )),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: controller.increment(), // Call controller increment method
          ),
    );
  }
}

```

### References

1.  [Getx Plugin](https://pub.dev/packages/get)
1.  [Blog: The ultimate guide to GetX state management in Flutter](https://blog.logrocket.com/ultimate-guide-getx-state-management-flutter/)
