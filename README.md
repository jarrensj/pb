# Photo Booth

Photo Booth is a web application built with Next.js that allows users to take photos, add fun overlays including Nouns glasses and their ENS, and see all images uploaded by users from the same event. This project was created for ETHGlobal 2024.

## Features

- **Take a Photo**: Users can take a photo directly from the app.
- **Add and Drag Overlays**: Fun overlays, including Nouns glasses and their ENS, can be added and positioned over the photo.
- **Connect Wallet & ENS Overlay**: Users can connect their crypto wallet and drag an ENS overlay onto the photo.
- **Overlay Management**: Users can delete existing overlays.
- **User Feedback**: Notifications appear when users copy or download their photos.
- **Gallery Page**: A gallery (/gallery) shows all photos uploaded by users.

## Technologies Used

- **Next.js**: The primary framework used to build the app.
- **Nouns**: Incorporated as fun overlays.
- **Walrus**: Used for hosting images taken by users, the site is also hosted on Walrus.
- **Connect Kit**: Handles wallet connections for users.

## Demo

TODO: [Insert demo video link here]

## Future Improvements

Given more time, we would integrate the following features:
- **Resize and Rotate Overlays**: Allow users to resize the overlays. 
- **Wallet Integration for Sign-In**: Allow users to sign in with their wallets when taking photos, so that each image in the gallery can display the wallet (and ENS) that uploaded it.
- **Supabase Integration**: Use Supabase to record blob IDs to pull images from Walrus:
  - Blob IDs for images hosted on Walrus.
  - Wallet addresses / ENS names of users who uploaded photos.
  - Timestamps (`created_at`) for each uploaded image.
  - Event ID (`eth-global-sf-2024`).

## Known Issues

Our main issue during development was time constraints. Some features such as full wallet integration with signing and gallery organization could not be completed within the project timeline.