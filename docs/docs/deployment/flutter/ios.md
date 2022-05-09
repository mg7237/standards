# iOS APP STORE

1. **Verify** development team and automatic singin settings.
2. To build **ipa**, run `flutter build ipa`.
3. It will build **ipa**  assets and give path of build output.
4. Open the Output file, it will open Xcode archive window.
5. **Validate** the archive
6. After validation, export ipa using **Distribute App**
7. Select auto signing & select **Export** in the popups.
8. After processing export by giving app, it will export ipa file

# Release on App store

1. Generate ipa then drag and drop or upload this file in the "transporter" app.
2. Verify the upload progree first in **transporter** app and then in **AppSstoreConnect** portal's **Testflight** page.
3. After successful app avaible on testflight, create new release in the application
4. In manage compliance, select **No Encryption** and save
5. After this, the version will be available in testflight
6. Testing group will be auto selected, if selected in previous build or select by yourself.
7. Add promotional text.
8. Add what's new
9. Add/Update sign-in info
10. Select new version in **Build**
11. Make sure to select **Mannually Release this version**.

!> Enable **review** mode for that particular version in the maintanace panel and also make the same version entry on the staging maintanance panel(No need to enable review in staging maintanance, so keep it disbale).

12. Save and submit the release
13. After app store team review, app will be available for "pending developer release"

!> Disable **review** mode for that particular version in the maintanace panel

14. To release click on **Release this version**
15. Update current, latest, and verify acive version in maintance panel
16. if want to skip an approved release, then **cancel release** and update information and select new version build and submit again.