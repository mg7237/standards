# Versions & Manintenance

The Maintenance Web Panel is used to manage the **Versioning** and **Maintenance** of All the **User Platforms** (Web and Mobile Apps). It allows to put any user platform into **maintenance** and manage **latest** and **active** **versions**.

?> The Applications and Versions maintained in the Maintenance Panel are centrally shared between all micro-services (API servers). API services use the maintenance and versions data to authenticate and handle the API requests coming from all the User Platforms.

Link to Web Panel : https://maintenance.saarthipedagogy.com

!> Don't **abuse** the **maintenance** & **versioning** features. It is very important that we handle all platforms without affecting live users.

## Apps

1. Create and Manage All Apps (User Platforms - Web and Mobile Apps) of the system.
1. An App will contain following information :
    - Name (used by the backend service for validating API calls)
1. Carefully create App with appropriate information to avoid issues.

![App Management Image](assets/apps.png)

## Versions

1. Apps will have multiple versions.
1. Create and Manage App Versions from App Details Page.
1. A Version will contain following information :
    - Name (Version Name - used by the backend service for validating API calls)
    - Code (Version Code)
    - Description
1. Carefully create Version with appropriate information to avoid issues.

![App Versions Image](assets/versions.png)

## Maintenance

1. Specific **User Platforms** can be put **In** and **Out** of **Maintenance Mode** as per the requirements.
1. In Addition, **Specific Versions** of Specific User Platforms can also be put in Maintenance Mode.
1. Reasons of putting Platforms in Maintenance can be as following :
    - Putting Updates with Breaking Changes in the Applications.
    - Maintenance of Servers or Infrastructures are going on.
    - Some critical bugs are found and we want to prevent users from accessing the applications.
    - We want to prevent users from accessing the platform for any other reasons.
    - A singe Version has some critical bug and we want to prevent users from using that version only.

### App Maintenance

Turn Specific Application's Maintenance Mode On/Off by clicking the Switch in front of Application Name, in Apps List Screen.

<img src="flutter/assets/app-maintenance.png" alt="App Maintenance" width="300px" style="border: 1px solid lightgray;  vertical-align: middle;" />

### Version Maintenance

Turn Specific Application's Specific Version's Maintenance Mode On/Off by clicking the Switch in front of version Name, in Versions List Screen.

![Version Maintenance Image](assets/version-maintenance.png)

## Version Status Change
