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

    var getWikiPage = function (query, callback) {
        $.ajax({
            url: "https://en.wikipedia.org/wiki/"+query,
            dataType: 'text',
            success: function (response) {
                callback(response);
            }
        });
    };

    function createUI(){
        // Get the text that was highlighted
        var sel = window.getSelection();
        var selectedText = sel.toString();

        $( "#musicSearchContainer" ).draggable();

        // Close Button and Functionality
        $('<div>', {id:'closeMusicSearchContainer'}).appendTo('#musicSearchContainer');
        $( "#closeMusicSearchContainer" ).text("Close");
        $( "#closeMusicSearchContainer" ).click(function() {
            $('#musicSearchContainer').remove();

            if (audioObj) {
                audioObj.pause();
            }

        });

        // Display the term that the user highlighted in the extension's window
        $('<div>', {id:'searchedTerm'}).appendTo('#musicSearchContainer');
        $('<h2>').appendTo('#searchedTerm').append("You searched for: " +selectedText);

        // Display album information
        $('<div>', {id:'musicSearchContainer_bottom'}).appendTo('#musicSearchContainer');
        $('<div>', {id:'albumTitle'}).appendTo('#musicSearchContainer');
        $('<div>', {id:'albumList'}).appendTo('#musicSearchContainer_bottom');
        searchForAlbums(selectedText);

        // Display details of the highlighted term from its Wikipedia article
        $.ajax({
            success: function(response){
                getWikiPage(selectedText, function (data) {
                    var elements = $(data).find('#mw-content-text p').slice(0, 2).text();
                    //console.log("WIKI " +elements);

                    $('<div>', {id:'wikiInfo'}).appendTo('#musicSearchContainer_bottom').text(elements);
                });
            }
        });

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

                        //$('<h3>').appendTo('#'+albumId).append(album["name"]);
                        $('<img />', {
                            src: album['images'][2]['url'],
                            class:"albumCover",
                            id: album["name"]
                        }).appendTo('#'+albumId);

                        $( ".album" ).hover(function() {
                            $( '#albumTitle' ).text($(this).find('img').attr('id'));
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