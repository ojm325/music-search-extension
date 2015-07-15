chrome.contextMenus.create({"title": "Search For This Music",
                                      "contexts":["selection"]});

chrome.contextMenus.onClicked.addListener(genericOnClick);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else
      sendResponse({}); 
});


function genericOnClick(info, tab) {
  selectedText = info.selectionText;


  chrome.tabs.create({url: "popup.html"}, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "musicSearch.js"}, function() {
    });
  });
  
}
