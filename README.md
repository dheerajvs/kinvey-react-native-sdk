# Kinvey React-native SDK
Modified/ adapted from `kinvey-html5-sdk`, which consumes the `kinvey-js-sdk`. This repo was created to implement a different Cache Middleware, which utilizes `AsyncStorage` instead of `LocalStorage` for its caching store.

## Documentation
Refer to the [`kinvey-html5-sdk` Guides](https://devcenter.kinvey.com/html5/guides) for API usage.

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
