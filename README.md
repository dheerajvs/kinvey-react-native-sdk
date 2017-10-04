# Kinvey React-native SDK
Modified/ adapted from `kinvey-html5-sdk`, which consumes the `kinvey-js-sdk`. This repo was created to implement a different Cache Middleware, which utilizes `AsyncStorage` instead of `LocalStorage` for its caching store.

## Documentation
Refer to the [`kinvey-html5-sdk` Guides](https://devcenter.kinvey.com/html5/guides) for API usage.

## Getting started

`$ npm install kinvey-react-native-sdk --save`

### Mostly automatic installation

`$ react-native link kinvey-react-native-sdk`

### Manual installation
#### iOS
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `kinvey-react-native-sdk` and add `RNKinveyReactNativeSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNKinveyReactNativeSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android
1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNKinveyReactNativeSdkPackage;` to the imports at the top of the file
  - Add `new RNKinveyReactNativeSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':kinvey-react-native-sdk'
  	project(':kinvey-react-native-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/kinvey-react-native-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':kinvey-react-native-sdk')
  	```

## Usage
```javascript
import Kinvey from 'kinvey-react-native-sdk';
```

## ActiveUser management
One drawback of using this SDK is managing the ActiveUser. The `kinvey-js-sdk` utilizes `fast-memory-cache` to store the active user, which is cleared when the app is hard-closed. To mitigate this, the App must use `AsyncStorage` outside of the SDK to store the `ActiveUser`. There are two places you will have to write custom the logic for this:

#### 1. Get Active User
- Upon loading the app, check `AsyncStorage` for the `ActiveUser` key.
- If present, set in the Kinvey client. `Kinvey.client.setActiveUser(data)`.
- Fetch ActiveUser from Kinvey. `Kinvey.User.getActiveUser` will return as expected, and the SDK will have its reference in MemoryCache for the remainder of the current app lifecucle.

#### 2. Log Out
- Log out using the SDK
- Delete `ActiveUser` key in AsyncStorage

## Roadmap
- This repo needs tests. We plan on bringing in the root testing and test suite from the html5-sdk, and modifying appropriately
  