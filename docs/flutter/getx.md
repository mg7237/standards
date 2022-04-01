# Getx State Management

GetX is not only a **state management** library, but instead, it is a **microframework** combined with **route management** and **dependency injection**. It aims to deliver top-of-the-line development experience in an extra lightweight but powerful solution for Flutter. <br><br>
GetX has three basic principles on which it is built:

1.  **Performance:** Focus on **minimum consumption** of memory and resources.
1.  **Productivity:** Intuitive and efficient tool combined with simplicity and straightforward syntax that ultimately **saves development time**.
1.  **Organization:** Provides total docoupling of views, business logic and dependency injection. You do not need context to navigate between routes, nor do you need **stateful widgets**

**Topics**

-   [UI Widgets](#ui-widgets)
-   [Controllers](#controllers)
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

### References

1.  [Getx Plugin](https://pub.dev/packages/get)
1.  [Blog: The ultimate guide to GetX state management in Flutter](https://blog.logrocket.com/ultimate-guide-getx-state-management-flutter/)
