<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>d(ಠ_ಠ)b</title>
    <link rel='stylesheet' href='css/main.css' type='text/css' media='all' />
</head>

<body>

    <audio id="player" controls>Your browser does not support the audio element.</audio>
    
    <div id="controlBar">
        <button id="btnHistory">History</button>
        <button id="btnRandom">Random</button>
        <button id="btnPrev">Prev</button>
        <button id="btnNext">Next</button>
    </div>
    
    <div id="container_list">

        <div id="history_list">
            <!--<input class="search" placeholder="Search" />-->
            <!--<div class="titleCol">
                <span class="sort" data-sort="artist">Artist</span>
                <span class="sort" data-sort="album">Album</span>
                <span class="sort" data-sort="title">Title</span>
            </div>
            -->
            <ul class="list"></ul>
        </div>

        <div id="full_list">
            <input class="search" placeholder="Search" />
            <div class="titleCol">
                <span class="sort" data-sort="artist">Artist</span>
                <span class="sort" data-sort="album">Album</span>
                <span class="sort" data-sort="title">Title</span>
            </div>

            <ul class="list">
<?php
$source = "sounds/";
$Directory = new RecursiveDirectoryIterator($source);
$Iterator = new RecursiveIteratorIterator($Directory);
$Regex = new RegexIterator($Iterator, '/^.+\.mp3$/i', RecursiveRegexIterator::GET_MATCH);
$i = 0;
foreach( $Regex as $d ){
	
	$chemin = str_replace("\\", "/", $d[0]);
	$cheminExploded = explode("/", $chemin);
    
    $artist = $cheminExploded[1];
	$album = $cheminExploded[2];
	
	$title = $cheminExploded[count($cheminExploded)-1];
	
	echo '<li data-id="'.$i.'" data-src="'.$chemin. '"><a class="artist">'.$artist.'</a><a class="album">'.$album.'</a><a class="title">'.$title.'</a></li>';
    $i++;
}
?>
            </ul>
        </div>
    </div>
</body>
<script src="js/jquery/jquery-2.1.1.min.js"></script>
<script src="js/listjs/list.min.js"></script>
<script src="js/main.js"></script>

</html>