 ______   _______ ______ 
|  ____/\|__   __|  ____|
| |__ /  \  | |  | |__   
|  __/ /\ \ | |  |  __|  
| | / ____ \| |  | |____ 
|_|/_/    \_\_|  |______|
                         
                         
 __  __            _        _         _                
|  \/  |          | |      | |       | |               
| \  / | __ _ _ __| | _____| |_ _ __ | | __ _  ___ ___ 
| |\/| |/ _` | '__| |/ / _ \ __| '_ \| |/ _` |/ __/ _ \
| |  | | (_| | |  |   <  __/ |_| |_) | | (_| | (_|  __/
|_|  |_|\__,_|_|  |_|\_\___|\__| .__/|_|\__,_|\___\___|
                               | |                     
                               |_|                     


This is a dual purpose application - a project to help me work on my MEAN stack development and an attempt to satisfy what I see as a need in the FATE Tabletop RPG space.

## Why?
I started playing FATE with some friends recently, mostly interested in the Dresden Files flavor.  After reading the very well made books, we knew how to play, but we didn't know how to start. What characters to make, what locations to use, what settings to create.  Now, the D&D history of the members in my group vary, but most of us are RPG beginners. We spend most of our time playing tabletop board and card games, so perhaps this isn't as much of a challenge for others. 

That said, I wanted to design an application that allowed users to create and store their resources [Characters, Locations, Settings], for easy reference, while also making those resources publicly consumable by others in the community.  Making a sort of open marketplace (no fees at this point, so maybe not the best label), where people can go to reference their GM's resources, and also start new games based on resources created by others.

## Live Game Session Tools 

To sweeten the pot for the content creators, I also am working on live game tools.  When you create a 'Story', you can create chapters on the fly or ahead of time, filling them with the resources you will want your players to interact with. When you 'play' a chapter in your story, everyone can go to the link created, and join the session.  From there they can see all resources the GM has made public, along with any notes, private or public. Using the application, plays can pull up character sheets at any time, rather than passing around a single copy of a book or notebook.  They can do this with locations and settings as well.

The players (and the GM) will be able to add Aspects to resources, allowing them to be seen by everyone.

The game session will be running in real-time over websockets so there will also be a Chat feature, that will not only allow the GM to communicate with the players (including a whisper function), but it will also display the actions as they are triggered by the GM (new characters, adding of aspects, invoking of aspects, etc). 

## Chapter and Session Recaps and Journals
Another feature in this application is the ability for the GM to use the game log to create recaps of the session for viewing by the players and the public, if allowed.

It is my vision that everything can be cloned, not just the basic resources, but chapters and entire stories, making getting started with FATE as easy as possible, for everyone. 

## Running It On Dev

1) install grunt-cli `npm install -g grunt-cli` to run the grunt watch and build tasks

2) install nodemon `npm install -g grunt-cli` to run the server and monitor it for changes

3) run `npm install`

4) run `bower install`

5) run `grunt watch`

6) start `mongod`  or  `mongod --smallfiles` if you are on Cloud9 and space is tight

7) start the server `nodemon server.js`


5) `grunt watch` will create a *dev* directory in views, which the server.js is currently pointing to to run the application

2) Alternatively you can launch the app from the Terminal:

    $ node server.js

Once the server is running, open the project in the shape of 'https://projectname-username.c9.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.
