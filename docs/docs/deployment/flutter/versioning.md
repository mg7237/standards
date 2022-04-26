# Versioning

## Update

1. **Merge** the desired code into `release` branch in Git.
1. Run and **Test** the before versioning.
1. **Update** Version in `pubspec.yaml` file. <br/>
    - **Format :** `version: XX.YY.ZZZ+xyyzzz`
    - **Example :** `version: 1.1.2+101002`
1. Commit and push this version in Git, Create a **release commit**. <br />
    - **Format :** `Release [version]`
    - **Example :** `Release 1.1.1`
1. Tag and push this version in Git, Create a **tag**. <br />
    - **Format :** `[version]`
    - **Example :** `1.1.1`
1. **Update** the environment variable values in `.env` file according to **Release Target** (Debug / Staging / Production).

!> Don't forget to :<br>1. Update the Environment Variable Values in `.env` file.<br>2. Push the release commit and the version tag in Git.<br>

## Format

-   `XX.YY.ZZZ` - **Version**
-   `xyyzzz` - **Version Code**
-   `XX` - Major Version
-   `YY` - Minor Version
-   `ZZZ` - Patch Version
-   `x` - Major Version
-   `yy` - Minor Version (padded)
-   `zzz` - Patch Version (padded)
-   **Padding :** Pad the version number with `0` in front if the number is less then the required length.<br/>

## Examples

-   `0.0.0+0`
-   `0.0.1+1`
-   `0.0.10+10`
-   `0.1.0+1000`
-   `0.1.1+1001`
-   `0.1.10+1010`
-   `0.10.0+10000`
-   `0.10.1+10001`
-   `0.10.10+10010`
-   `1.0.0+100000`
-   `1.0.1+100001`
-   `1.0.10+100010`
-   `1.1.0+101001`
-   `1.1.1+101001`
-   `1.1.10+101010`
-   `1.10.0+110000`
-   `1.10.1+110001`
-   `1.10.10+110010`
-   `10.0.0+1000000`
-   `10.0.1+1000001`
-   `10.0.10+1000010`
-   `10.1.0+1001000`
-   `10.1.1+1001001`
-   `10.1.10+1001010`
-   `10.10.0+1010000`
-   `10.10.1+1010001`
-   `10.10.10+1010010`
-   `10.10.99+1010099`
-   `10.10.100+1010100`
