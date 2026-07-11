# Emergency & Life-Saving Guide - Mobile App

A cross-platform mobile app built with Capacitor (Android + iOS).

## Prerequisites

### Android
- [Android Studio](https://developer.android.com/studio)
- Android SDK (API 34+)
- Java JDK 17+
- Set `ANDROID_HOME` environment variable to your SDK path

### iOS (macOS only)
- Xcode 15+
- CocoaPods (`sudo gem install cocoapods`)

## Quick Start

```bash
# Install dependencies
npm install

# Copy web assets to native projects
npx cap copy

# Sync native projects
npx cap sync
```

## Building for Android

```bash
# Sync latest web changes
npx cap sync android

# Open in Android Studio
npx cap open android

# Or build directly
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

For Play Store upload, generate a signed AAB:
```bash
cd android
./gradlew bundleRelease
```
AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## Building for iOS (macOS required)

```bash
# Sync latest web changes
npx cap sync ios

# Open in Xcode
npx cap open ios

# In Xcode:
# 1. Set your Team in Signing & Capabilities
# 2. Build -> Archive
# 3. Upload to App Store Connect
```

## Updating Web Content

After modifying `www/index.html`:
```bash
npx cap copy
```

## App Icons & Splash Screens

Default Capacitor icons are used. To customize:
1. Replace `android/app/src/main/res/mipmap-*/ic_launcher.png`
2. Replace iOS icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
3. Run `npx cap copy` to refresh

## Versioning

Update version in:
- `package.json` (version field)
- `android/app/build.gradle` (versionName)
- iOS: Xcode project settings

## App Details

- **Package/Bundle ID**: `com.emergency.lifesaving`
- **App Name**: Emergency & Life-Saving
- **Min Android SDK**: 23 (Android 6.0)
- **Target**: Android 14+ / iOS 16+

## GitHub Actions (CI/CD)

The repo includes automated builds via GitHub Actions.

### What it does

| Trigger | Android | iOS |
|---|---|---|
| Push to `main` | ✅ Builds AAB | ✅ Builds IPA |
| Pull request | ✅ Builds AAB | ❌ (skips to save macOS minutes) |
| Manual (`workflow_dispatch`) | ✅ Builds AAB | ✅ Builds IPA |
| Manual + upload flags | ✅ + Play Store | ✅ + App Store |

### Android works immediately

1. Push your code to GitHub
2. The workflow builds an Android AAB automatically
3. Download it from the **Actions** tab → Artifacts

### iOS needs setup first

iOS builds require Apple Developer credentials. Add these **GitHub Secrets**:

1. Go to your repo → Settings → Secrets and variables → Actions
2. Add the following:

| Secret name | What to put |
|---|---|
| `APPLE_DEVELOPER_TEAM_ID` | Your Apple Developer Team ID (10 chars, like `A1B2C3D4E5`) |
| `IOS_DISTRIBUTION_CERTIFICATE_BASE64` | Your distribution cert `.p12` file encoded as base64 |
| `IOS_DISTRIBUTION_CERTIFICATE_PASSWORD` | The password you set when exporting the `.p12` |

To generate these on a Mac:
```bash
# From a Mac with Xcode (borrow one, or use cloud Mac):
security find-identity -v -p ios
# Export distribution cert:
security export -k login.keychain -t certs -f pkcs12 -o dist.p12
# Base64 encode:
base64 -i dist.p12 | pbcopy
# Paste the result as IOS_DISTRIBUTION_CERTIFICATE_BASE64
```

### One-click deploy to stores

Once secrets are set, run the workflow manually with:
- **"Upload Android AAB to Play Store"** — checked
- **"Upload iOS IPA to App Store"** — checked

This needs extra secrets:

| Secret | For |
|---|---|
| `PLAY_STORE_SERVICE_ACCOUNT_JSON` | Android — Google Play Console → Service Account JSON |
| `APPLE_ID` | iOS — your Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | iOS — generate at appleid.apple.com → App-Specific Passwords |
