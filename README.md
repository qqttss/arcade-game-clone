Classic Arcade game clone -- Frogger
===============================
The porject is a clone of classic arcade game Frogger based on the art assets and game engine provided by Udacity. I coded player, enemies, and other game entities in JavaScript's object-oriented pseudo-classical style, created enemy subclasses with different movement patterns and sprites.

The project is hosted at : http://qqttss.github.io/arcade-game-clone/

How to play?

In this game you have a Player and two Enemies (Bugs). The goal of the player is to reach the water,
without colliding into any one of the enemies. The player can move left, right, up and down.
The enemies move in varying speeds on the paved block portion of the scene.

The life value of the Player is set as 3 when the game starts. Once the player collides with an enemy,
the player moves back to the start square and its life value decreases by one. If the life value is reduced
to zero, the game is reset and you need to restart the game.

Once the player reaches the water, the Player score 1 and a start is added at top of the screen.

There is a diamond on the paved block and it can be picked up by colliding with it. Once it is picked up,
a new one is put on the paved block.

