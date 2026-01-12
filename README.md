# REST/WebSocket Chat App
Realisation of Chat, that have the same view, and can have different backends.


## Functionality
Chats that generate messages with random symbols, up to 10 words in response to an each message entered by the user.  
Chats are empty by default - type something to see messages.  
Each chat has the own history. History of each chat is saved in local storage.  
Deleting of chats history - via local storage browser ui.  


## Running
npm install  
npm run dev:all


UI will be available on http://localhost:5173/


## Structure
Frontend part is in src dir.  
Backend part is in server dir.  

Both chats has the same view - Chat.vue component.  

Handlers of backend connection are in composables dir.  
If backend responce be changed - handlers can be modified accordingly.  
If chats need to have different displaying of messages - it is possible to move this displaying in separate components inside of Chat comp via slots.  
