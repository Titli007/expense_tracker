# Expense Tracker App

An Expense Tracker app built using **React Native** and **Expo** to help users manage their expenses efficiently.

## Features
- Add, edit, and delete expenses
- View expense history
- Categorize expenses
- Visualize spending trends
- User authentication (if implemented)

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Install Dependencies
```sh
yarn install
```
OR
```sh
npm install
```

### 3️⃣ Start the Expo Development Server
```sh
expo start
```
This will launch the Metro Bundler. You can scan the QR code using the Expo Go app or run it on an emulator.

### 4️⃣ Running on a Specific Device
- **Android:** `expo run:android`
- **iOS:** `expo run:ios` (Mac & Xcode required)

## Environment Variables
Create a `.env` file in the root directory and add the required keys:
```
API_URL=https://your-api-endpoint.com
EXPO_PUBLIC_KEY=your-expo-public-key
```

## Build & Deployment
To build the app for production:
```sh
expo build:android   # For Android APK
expo build:ios      # For iOS (requires Apple Developer account)
```

To publish the app:
```sh
expo publish
```

## Troubleshooting
- If you face issues with dependencies, try:
  ```sh
  expo doctor
  expo r -c
  yarn start --reset-cache
  ```
- For permission errors, ensure `expo-permissions` is correctly configured.
- For crashes, check logs using:
  ```sh
  expo diagnostics
  expo logs
  ```

## Contributing
Pull requests are welcome. Please open an issue first to discuss changes.

## License
This project is licensed under the MIT License.

---
Made with ❤️ using React Native & Expo 🚀

