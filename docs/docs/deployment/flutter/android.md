# Android

## Configuration Files

1. **`.keystore` File :**
    - Keystore file is required to sign the app
    - Path : anywhere on the device, do not add in git.
    - Example : `teacher-app.keystore`
1. **`key.properties` File :**
    - `key.properties` file is required to pass appropriate credentials to sign the app with keystore
    - Path : `project_root/android/`
    - This file contains following values :
        ```
        storePassword=
        keyPassword=
        keyAlias=
        storeFile=
        ```

!> Do not check-in these configuration files in Git/Source Control.

## Build

1. Verify that you have added valid [configuration files](#configuration-files).
2.
