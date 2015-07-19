$(function(){
  chrome.contextMenus.create({"title": "Search For This Music",
                                        "contexts":["selection"]});

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if (tab) {
          var containerRemove = 
            "if ($('#musicSearchContainer').length) { "
                + "$('#musicSearchContainer').remove();"
                + "}";

          var containerAdd = [
              'var d = document.createElement("div");',
              "d.setAttribute('style', '"
                  + "background-color: blue; "
                  + "width: 300px; "
                  + "height: 300px; "
                  + "position: fixed; "
                  + "top: 70px; "
                  + "left: 30px; "
                  + "overflow: auto;"
                  + "z-index: 9999; "
                  + "');",
              "d.setAttribute('id', 'musicSearchContainer');",
              'document.body.appendChild(d);'
          ].join("\n");

          var selection = info.selectionText;

          chrome.tabs.executeScript(tab.id, { code: containerRemove });
          chrome.tabs.executeScript(tab.id, { code: containerAdd });
          
          chrome.tabs.executeScript(tab.id, { file: "jquery-2.1.4.min.js" }, function(){});
          chrome.tabs.executeScript(tab.id, { file: "jquery-ui.js" }, function(){});
          chrome.tabs.executeScript(tab.id, {file: "musicSearch.js"}, function() {
          });
      }
  });

});