$(function(){
    $( "#musicSearchContainer" ).draggable();
    $('<div>', {id:'searchedTerm'}).appendTo('#musicSearchContainer');

    //$('<h2>').appendTo('#searchedTerm').append(chrome.extension.getBackgroundPage().selectedText);
    $('<h2>').appendTo('#searchedTerm').append("Swans");

    searchForAlbums("Swans");

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
                var count = 0;
    			$.each(response["albums"]["items"], function(key, value){
    				//document.write("Check console logs for response");
    			    console.log(key, value);

                    var album = response["albums"]["items"][count];

                    var container = $('<div>', 
                        {
                            class:'album',
                            id: response["albums"]["items"][count]["id"]
                        });
                    container.appendTo('#albumList');

                    $('<h3>').appendTo('.album').append(album["name"]);
                    $('<img />', {
                        src: album['images'][1]['url'],
                    }).appendTo('.album');

                    $( ".album" ).hover(function() {
                        $( '#albumTitle' ).text("HI!");
                    }, function() {
                        $( '#albumTitle' ).text("");
                    });


                    count++;
    			});
            }
        });
    }

});