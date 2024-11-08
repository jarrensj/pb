# Photo Booth

Photo Booth is a web application built with Next.js that allows users to take photos, add fun overlays including Nouns glasses and their ENS, and see all images uploaded by users from the same event. This project was created for ETHGlobal 2024.

Walrus aggregator and publisher was down during development, so we couldn't store the images taken by the users and show the images in the gallery. 

## Features

- **Take a Photo**: Users can take a photo directly from the app.
- **Add and Drag Overlays**: Fun overlays, including Nouns glasses and their ENS, can be added and positioned over the photo.
- **Connect Wallet & ENS Overlay**: Users can connect their crypto wallet and drag an ENS overlay onto the photo.
- **Overlay Management**: Users can view and delete existing overlays.
- **Gallery Page**: A gallery page (/gallery) shows all photos uploaded by users.

## Technologies Used

- **Next.js**: The primary framework used to build the app.
- **Nouns**: Incorporated as fun overlays.
- **Walrus**: Used for hosting images taken by users, the site is also hosted on Walrus.
- **Connect Kit**: Handles wallet connections for users.

## Demo

TODO: https://www.loom.com/share/fe2a1243a92044f38e15646d6e6ba98f?sid=96087e60-e8d7-46bc-88e1-f2b4a10799a3

## Future Improvements

Given more time, we would integrate the following features:
- **Resize and Rotate Overlays**: Allow users to resize and rotate the overlays. 
- **Supabase Integration**: Use Supabase to record blob IDs to pull images from Walrus for the gallery page:
  - Blob IDs for images hosted on Walrus.
  - Wallet addresses / ENS names of users who uploaded photos.
  - Timestamps (`created_at`) for each uploaded image.
  - Event ID (`eth-global-sf-2024`).

## Known Issues

Our main issue during development was time. 
