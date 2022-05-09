# Android Play Store

1. **Verify** key store and key.properties file are added in Android project.
2. To build **APK**, run `flutter build apk`.
3. To build appbundle, run `flutter build appbundle`
4. Commit and push this version in Git, Create a **(In aplay store always upload appbundle)**.

# Versioning in maintanance panel
1. In respective app, create **new version** in staging and production
2. Mark it as active, latest, in review should be on **(This is before live launch)**
3. After live launch **(Approved on store)**
    1. Mark the new version as latest and current and active
    1. Turn off other current version
    1. Disable in-review option
    1. Change other versions latest & active status as per requirements
4. If any version needs to be put under maintenance then mark specific version accordingly.
5. If whole app needs to be out under maintanance then mark whole app in maintenance.

# Launch on the play store
1. Make sure manual publishing is on
2. Build **appbundle**, run `flutter build appbundle`
3. Create new production release in play store.
4. Upload **appbundle** file in new release.
5. Enter Release note in the new release. If nothing significant then write **Minor Improvemetns**

!> Enable **review** mode for that particular version in the maintanace panel and also make the same version entry on the staging maintanance panel(No need to enable review in staging maintanance, so keep it disbale).

6. Submit new release & Rollout **(check warnings)**.
7. Play store team will take their time to approve.
8. Once app is approved, go to "publishing overview" view the list of ready to publish.

!> Disable **review** mode for that particular version in the maintanace panel.

9. Then release the new version from there.
10. update current, latest, and active version in maintanance panel
11. If release shows, “Ready to Send for Review”
12. Go to "Publishing overview & send for review" click 
