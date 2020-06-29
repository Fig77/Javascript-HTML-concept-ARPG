ARPC concept
Contributors Issues

ARPG Concept

Explore the docs »

· Report Bug · Request Feature

Table of Contents
About the Project
Built With
Prerequisites
Credit
Screenshots
How To Play
Playing Locally
Testing
Live Version
Future Improvements
License
Contact
About The Project
An A-RPG concept, from a top-down perspective. Game is roguelike mode (means you start all over if you lose). Survive waves of enemies during each round in an arena. After each match, get points per enemy you kill that you can freely distribute among your character stats. (HP - Speed - Atk). The game will scale abruptly and a certain build my get you through more rounds.

Built With
This project was Phaser-3.js, a 2D game framework for making HTML5 games for desktop and mobile.

Prerequisites
Git
Node.js
NPM
Webpack
Jest
Screenshots
Starting Game
screenshot

Match
screenshot

Game Over
screenshot

How To Play
Move with your Arrow Keys. Pressing Shift will allow you to sprint (at a 2hp per sprint cost.)

Press A to attack your enemy. Abuse collision and their 'shortness of mind' to get through the -fair- difficulty.

Press spacebar in the lobby (AKA place where you can still die if you sprint too much.) to get access to the stat menu. You will need to spend 1 stat point after each match if you want to heal.

After game over you can click submit for uploading score and keep playing. Or going into the menu, and keep playing.

Bits of Advice
Since the game is very fair, but also enemies are not very smart, you can easily defeat the first enemy by canceling the A animation. For that, I recommend moving quickly. Do note, that damage effect only works after a certain frame of the animation. I can tell you "After frame 34" but that doesn't help in game.

After that, with more enemies the cheesy exploit to beat... the first round at least, is to pull them to a corner. Do not let them stack since damage will not be easy to deal with. To get this working, you need to 'trick' part of the group to start walking to the wrong position. This is how dumb Pacman (their minds when chasing) works:

Get on the player the same X-axis.
Get close enough to the player on the Y-axis.
If being block while 1), go on the Y-axis until you can move. (Now, on good Pacman, you try left top right down. Dumb Pacman, only picks one.)
Same for 2.
This is a concept game. But, a few things will be updated and patch. Therefore, this might not be useful depending when you read it if I forget to update it.

Playing Locally
Copy the following instructions sequentially into your terminal

git clone https://github.com/Fig77/new-repo-js/.git

Run npm install

Run npm start in your terminal to fire the Webpack server

Visit http://localhost:8000 on your browser.

TestingJavascript-Capstone
Run npm install

Run npm test to run the test suites.

If for some reason you are having "Jest not found" after install, it might be because it's installed in ./node_modules/.bin, and running ./node_modules/.bin/jest --updateSnapshot should work as a quick fix. But I would recommend deleting Jest from that folder and install it globally.

Live Version
You can view the app hosted online here.
Future Improvements
See the open issues for a list of proposed features (and known issues).

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Facundo Iglesias - Github profile

Project Link: Project repo

SPECIAL THANKS
The amazing and a bit butchered by myself, sprites were done by PixElthen

Thanks to Scott for his tutorials. Specially Project Template
