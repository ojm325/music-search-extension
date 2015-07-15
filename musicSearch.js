//document.write("You searched for: " +chrome.extension.getBackgroundPage().selectedText);
$(function(){
    $('<h2>').appendTo('#searchedTerm').append(chrome.extension.getBackgroundPage().selectedText);
});

searchForAlbums(chrome.extension.getBackgroundPage().selectedText);

function searchForAlbums(query){
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
                $(function(){
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
                });

                count++;
			});
        }
    });
}