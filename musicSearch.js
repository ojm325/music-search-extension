$(function(){
    $( "#musicSearchContainer" ).draggable();
    $('<div>', {id:'searchedTerm'}).appendTo('#musicSearchContainer');

    var sel = window.getSelection();
    var selectedText = sel.toString();

    $('<h2>').appendTo('#searchedTerm').append(selectedText);
    //$('<h2>').appendTo('#searchedTerm').append("Swans");

    searchForAlbums(selectedText);

    function searchForAlbums(query){

        $('<div>', {id:'albumTitle'}).appendTo('#musicSearchContainer');
        $('<div>', {id:'albumList'}).appendTo('#musicSearchContainer');

    	$.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            success: function (response) {
    			$.each(response["albums"]["items"], function(key, value){
    				//document.write("Check console logs for response");
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
        });
    }

});