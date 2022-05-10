# Android

## Configuration

1. **`.keystore` File :**
    - Keystore file is required to sign the app.
    - Path : anywhere on the device, do not add in git.
    - Example : `teacher-app.keystore`.
2. **`key.properties` File :**
    - `key.properties` file is required to pass appropriate credentials to sign the app with keystore.
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
2. To build **APK**, run `flutter build apk`.
3. To build appbundle, run `flutter build appbundle`.
4. Commit and push this version in Git, Create a **(In play store always upload appbundle)**.

## Versioning & Maintenance

1. In respective app, create **new version** in staging and production.
2. Mark it as active, latest, review should be on **(This is before live launch)**.
3. After live launch **(Approved on store)**.
    1. Mark the new version as latest and current and active.
    1. Turn off other current version.
    1. Disable review option if enabled.
    1. Change other versions latest & active status as per requirements.
4. If any version needs to be put under maintenance then mark specific version accordingly.
5. If whole app needs to be out under maintanance then mark whole app in maintenance.

## Launch on the Play Store

1. Make sure manual publishing is on.
2. Build **appbundle**, run `flutter build appbundle`.
3. Create new production release in play store.
4. Upload **appbundle** file in new release.
5. Enter Release note in the new release. If nothing significant then write **Minor Improvements**.

!> Enable **review** mode for that particular version in the maintanace panel and also make the same version entry on the staging maintanance panel (No need to enable review in staging maintanance, so keep it disbale).

?> Only enable review if major changes has been made to the app. For the patches and bug fixes check whether review option is needed or not.

6. Submit new release & Rollout **(check warnings)**.
7. Play store team will take their time to approve.
8. Once app is approved, go to "publishing overview" view the list of ready to publish.

!> Disable **review** mode for that particular version in the maintanace panel if enabled.

9. Then release the new version from there.
10. Update current, latest, and active version in maintanance panel.
11. If release shows, “Ready to Send for Review”.
12. Go to "Publishing overview & send for review" click.
