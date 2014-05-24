function MusicPlayer() {
    this.version = 0.1;
    // core
    this.currentIdPlaying = -1;
    this.isPlaying = false;
    // gui, do not cache list cause dom change
    this.$player = $('#player');
    this.$btnRandom = $('#btnRandom');
    this.$btnNext = $('#btnNext');
    this.$btnPrev = $('#btnPrev');
    this.$btnHistory = $('#btnHistory');
    // list
    this.list = new List('full_list', {
        valueNames: ['title', 'album', 'artist'],
        page: 9999
    });
    // history
    this.history = [ /*{id:0, artist:'', album:'',title:''}*/ ];
    this.historyMax = 30;
    this.historyList = new List('history_list', {
        valueNames: ['id', 'title', 'album', 'artist'],
        item: '<li><a class="id"></a><a class="artist"></a><a class="album"></a><a class="title"></a></li>',
        page: this.historyMax
    });
}
MusicPlayer.prototype = {
    init: function () {
        _m.initListener();
    },

    initListener: function () {
        $('#full_list li').on('click', _m.onClickItemListMusic);
        $('#history_list').on('click', 'li', _m.onClickHistoryItemListMusic);
        _m.$player.on('playing', _m.onPlayingMusic);
        _m.$player.on('ended', _m.onEndMusic);
        _m.$btnNext.on('click', _m.playNextSong);
        _m.$btnPrev.on('click', _m.playPrevSong);
        _m.$btnRandom.on('click', _m.changeRandomState);
        _m.$btnHistory.on('click', _m.viewHistory);
        _m.$player.on('pause', _m.pauseThis);
        _m.$player.on('play playing', _m.playingThis);
    },

    onClickItemListMusic: function () {
        _m.playThis($(this));
        return false;
    },
    onClickHistoryItemListMusic: function(){
        // vide les possibles filtres du champs de recherche
        _m.list.search();
        // genere un click sur l'element de la liste
        $('#full_list li[data-id="'+$(this).find('a.id').text()+'"]').trigger('click');
        $('#history_list').removeClass('opened');
    },

    onPlayingMusic: function () {
        //console.log('on.playing..');
        _m.isPlaying = true;
    },

    onEndMusic: function () {
        //console.log('on.ended..');
        _m.isPlaying = false;
        _m.playNextSong();
    },

    changeRandomState: function () {
        if (_m.$btnRandom.hasClass('on')) {
            _m.$btnRandom.removeClass('on');
        } else {
            _m.$btnRandom.addClass('on');
        }
    },

    playRandomSong: function () {
        var $listAvailable = $('#full_list li');
        var $neo = $($listAvailable[Math.floor(Math.random() * $listAvailable.length)]);
        _m.playThis($neo);
    },

    playNextSong: function () {

        if (_m.$btnRandom.hasClass('on')) {
            _m.playRandomSong();
            return;
        }

        var $listAvailable = $('#full_list li');
        var $current = $('#full_list li[data-id=' + _m.currentIdPlaying + ']');
        var nextToPlay = $listAvailable[0];
        if ($current.next('li').length > 0) {
            nextToPlay = $current.next('li')[0];
        }
        _m.playThis($(nextToPlay));
    },

    playPrevSong: function () {
        var $listAvailable = $('#full_list li');
        var $current = $('#full_list li[data-id=' + _m.currentIdPlaying + ']');
        var prevToPlay = $listAvailable[0];
        if ($current.prev('li').length > 0) {
            prevToPlay = $current.prev('li')[0];
        }
        _m.playThis($(prevToPlay));
    },

    playThis: function ($neo) {
        $('li.playing').removeClass('playing');
        $neo.addClass('playing');
        _m.currentIdPlaying = parseInt($neo.attr('data-id'));
        // title of page
        document.title = "d(ಠ_ಠ)b ▶ "+$neo.find('a.artist').text()+" - "+$neo.find('a.title').text();
        // history push
        _m.history.push({
            id: _m.currentIdPlaying,
            artist: $neo.find('a.artist').text(),
            album: $neo.find('a.album').text(),
            title: $neo.find('a.title').text()
        });
        if (_m.history.length > _m.historyMax) {
            _m.history.shift();
        }
        _m.buildHistory();
        // player
        _m.$player.attr('src', $neo.attr('data-src'));
        _m.$player[0].pause();
        _m.$player[0].load(); //suspends and restores all audio element
        _m.$player[0].play();
    },
    
    pauseThis: function(){
        // title of page
        document.title = "d(ಠ_ಠ)b";
    },
    
    playingThis: function(){
        var $neo = $('li.playing');
        // title of page
        document.title = "d(ಠ_ಠ)b ▶ "+$neo.find('a.artist').text()+" - "+$neo.find('a.title').text();
    },

    buildHistory: function () {
        _m.historyList.clear();
        _m.historyList.add(_m.history);
    },
    viewHistory: function () {
        if ($('#history_list').hasClass('on')) {
            $('#history_list').removeClass('on');
            _m.$btnHistory.removeClass('on');
        } else {
            $('#history_list').addClass('on');
            _m.$btnHistory.addClass('on');
        }
    }
}

var _m = new MusicPlayer();
_m.init();