# Content Moderation REST API
This is a **REST API** built with **Node JS** and **Express** part of the **Content Moderation** system for P:HC.
<br>

Currently, the entire system itself is unfinished. This REST API however, is 90% complete. All it needs is implementing further actions after the system has outputted a result.

This is one out of two APIs to be built for the system. This one is the Client-facing API which handles multiple clients. It gets called whenever a user from a p:hc platform reports a post. 

## Functionality:
It takes in a request body based on the schema designed (refer to documentation) and creates a new document in mongodb to track the status of the post. It then sends the post to the nightly worker API built in Python which does the detection, whether its transcribing audio with a library or passing a video/image to a trained model. Once the worker returns a result, it should take appropriate action (to be discussed).

## Architecture:
<br>
<img width="810" alt="system architecture" src="https://user-images.githubusercontent.com/78581216/228678822-40fca601-417c-4372-b712-9c4df728dd5a.png">
<br>
It connects to a **MongoDB** atlas database which you can access with your p:hc dev account. This API requires the URI to be declared in a .env file. 

Create a .env file in the root folder and name the variable ATLAS_URI

To run the server. Type
```
npm run dev
```

## Folder structure:
```
.
└── src/
    ├── models
    ├── routes/
    │   ├── report.js
    │   └── text.js
    ├── loadEnvironment.js
    └── server.js 
```
- loadEnvironment.js calls the dotenv library for environment variables.
- server.js contains express app initialization and connection to database.
- /models folder contains the entities from the schema exported in **Mongoose**.
- /routes folder contains the endpoint implementation for text and image/video.
