# ChatPat
A simple Real Time chat App using socket.io and node js, express. It's only having group chat functionality so anyone with the link will join same channel. It also support Image previews, multimedia files including audio and video files. Moreover filetypes are mp4, mkv, ogg, mp3, wav, aac, all image format including gifs.

# Files Included In the Project:
This project includes a HTML template(index.html), a basic css file(style.css) to design the template. Before user do chatting he/she will have to submit a username
and then only user will be allowed to enter the chatroom. This is done in index.html itself by running js script inside it.
The main socket server is coded as index.js file which makes socket connectins whenever a new user enters into the chatroom. This js file handles all the two way
socket responses and events such as broadcasting, emitting etc.
Moreover package-lock.json and package.json holds information on the dependencies or packages installed for a the project, including their exact version numbers.

# Dependencies of the Project:
"dependencies": {
"browser-image-compression": "^1.0.12",
"express": "^4.17.1",
"jquery": "^3.5.1",
"nodemon": "^2.0.4",
"socket.io": "^2.5.0"
}



  
