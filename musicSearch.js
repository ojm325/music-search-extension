$(function(){

    var audioObj = null,
    musicEventClass = 'playing';

    createUI();

    var fetchTracks = function (albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function (response) {
                callback(response);
            }
        });
    };

    function createUI(){
        $( "#musicSearchContainer" ).draggable();

        $('<div>', {id:'closeMusicSearchContainer'}).appendTo('#musicSearchContainer');
        $( "#closeMusicSearchContainer" ).text("Close");
        $( "#closeMusicSearchContainer" ).click(function() {
            $('#musicSearchContainer').remove();

            if (audioObj) {
                audioObj.pause();
            }

        });
        $('<div>', {id:'searchedTerm'}).appendTo('#musicSearchContainer');

        var sel = window.getSelection();
        var selectedText = sel.toString();

        $('<h2>').appendTo('#searchedTerm').append("You searched for: " +selectedText);

        $('<div>', {id:'albumTitle'}).appendTo('#musicSearchContainer');
        $('<div>', {id:'albumList'}).appendTo('#musicSearchContainer');

        searchForAlbums(selectedText);
    }

    function searchForAlbums(query){

    	$.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            success: function (response) {
                if(response["albums"]["items"].length == 0){
                    $("#albumTitle").text("No Results Found.");
                }else{
        			$.each(response["albums"]["items"], function(key, value){
        			    console.log(key, value);

                        var album = response["albums"]["items"][key];
                        var albumId = response["albums"]["items"][key]["id"];

                        var container = $('<div>', 
                            {
                                class:'album',
                                id: albumId
                            });
                        container.appendTo('#albumList');

                        $('<h3>').appendTo('#'+albumId).append(album["name"]);
                        $('<img />', {
                            src: album['images'][1]['url'],
                            class:"albumCover"
                        }).appendTo('#'+albumId);

                        $( ".album" ).hover(function() {
                            $( '#albumTitle' ).text("HI!");
                        }, function() {
                            $( '#albumTitle' ).text("");
                        });

                        $('#'+albumId).click(function (e) {
                            var target = e.target;

                            if (target.classList.contains(musicEventClass)) {
                                audioObj.pause();
                            } else {
                                if (audioObj) {
                                    audioObj.pause();
                                }
                                fetchTracks(albumId, function (data) {
                                    audioObj = new Audio(data.tracks.items[0].preview_url);

                                    audioObj.play();

                                    $(target).addClass(musicEventClass)

                                    audioObj.addEventListener('ended', function () {
                                        $(target).removeClass(musicEventClass)
                                    });
                                    audioObj.addEventListener('pause', function () {
                                        $(target).removeClass(musicEventClass)
                                    });
                                });
                            }
                        });
        			});
                }
            }
        });
    }
});