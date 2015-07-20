$(function(){

    var audioObj = null;

    createUI();

    function createUI(){
        $( "#musicSearchContainer" ).draggable();

        $('<div>', {id:'closeMusicSearchContainer'}).appendTo('#musicSearchContainer');
        $( "#closeMusicSearchContainer" ).text("Close");
        $( "#closeMusicSearchContainer" ).click(function() {
            $('#musicSearchContainer').remove();
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
                        }).appendTo('#'+albumId);

                        $( ".album" ).hover(function() {
                            $( '#albumTitle' ).text("HI!");
                        }, function() {
                            $( '#albumTitle' ).text("");
                        });

        			});
                }
            }
        });
    }

});