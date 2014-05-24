Audio_web_player
================

A very simple HTML5 audio web player.

You don't find your music on Grooveshark/Deezer/Spotify/.. ?
You don't want to install/configure your own web based audio/video streaming like Subsonic or Ampache ?
You are alone to use it ?

There's no database, one mono playlist and no user account. A simple page that lists the mp3 of a directory.

It uses JQuery and List.js and requires PHP5.
You should put an .htaccess to protect your data.

With this you can :
- Sort and search
- Random / prev / next
- History

You may change :

@index.php
- The directory to scan $source = "sounds/";
- The Regex scan extension '/^.+\.mp3$/i' to scan everything you want (like .ogg)

@main.js
- The maximum number of music to show per pages // page: 9999
- History max // this.historyMax = 30;
