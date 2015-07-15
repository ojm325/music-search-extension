document.write("You searched for: " +chrome.extension.getBackgroundPage().selectedText);
searchForAlbums(chrome.extension.getBackgroundPage().selectedText);

function searchForAlbums(query){
	$.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
			$.each(response["albums"], function(key, value){
				document.write("Check console logs for response");
			    console.log(key, value);
			});
        }
    });
}