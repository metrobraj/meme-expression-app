# meme-expression-app
Analyzes your hand gestures and shows you your meme equivalent. 
This is a light-weight application that uses Google's MediaPipe Hands to track the user's hand real-time and analyze the gestures based on pre-programmed metrics. Currently IN PROGRESS.  
## Features

* **Real-Time Hand Tracking:** Utilizes MediaPipe Hands to detect 21 key hand landmarks.
* **Canvas Overlay:** Displays a synchronized, custom visual skeleton overlay directly on top of the webcam feed.
* **Dynamic Image & GIF Display:** Smooth update on reaction media based on specific gesture conditions without frame-reset looping bugs.
* **Responsive Layout:** CSS-built side-by-side comparison view with structured layout boxes and custom themes.

---

## How It Works

1. **Video & Canvas Alignment:** The app captures the local user webcam stream and renders it inside a relative container. A transparent `<canvas>` element sits on top to draw connection lines between detected hand joints.
2. **Landmark Analysis:** The `detect()` function evaluates normalized relative coordinates $(x, y)$ of key landmarks (e.g., fingertips vs. knuckles, hand height relative to frame).
3. **State Management:** When a gesture condition is met, a helper function checks if the requested media source is already active. If not, it updates the `src` attribute—allowing animated GIFs to play continuously without resetting each frame.

---

## Gestures Currently Supported

| **Salute** | Hand raised high in top frame + Index, Middle, and Ring fingers extended - triggers a Indian Independence Day-themed GIF meme.  
| **Nerd Point** | Index finger extended UP + Middle finger curled DOWN - triggers a nerd cat meme.  
| **Default Stare** | No active gesture or hand off-camera - triggers a default cat stare image.  

---

## Tech Stack

* **Front-end:** HTML5, CSS3, JavaScript(ES6+)
* **Computer Vision:** Google MediaPipe Hands SDK, MediaPipe Drawing Utilities
* **Version Control:** Git, GitHub

---

## Future Scope  
This project was built using a pre-trained model via API. Expect a project clone using a self-trained AI model in the future.

---

## Disclaimer
*While this project was built with AI assistance and guidance, no AI-written code exists in this project.*
