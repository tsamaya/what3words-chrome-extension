// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "search with what3words";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "id": "context" + context
  });
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  // replace all _,;:\- /!@#$%&* by a .
  sText = sText.replace(/[_,;:\- \/!@#$%&*]/g, '.');
  // replace all .. by a .
  sText = sText.replace(/\.\.+/g, '.');
  // remove first string char if it is a .
  sText = sText.replace(/^\.+/, '');
  // remove trailling .
  sText = sText.replace(/\.$/, '');
  //if(sText.match(/^\p{L}+\.\p{L}+\.\p{L}+$/)) {
  if (sText.split('.').length === 3 && sText.split(' ').length === 1) {
    var url = "http://w3w.co/" + encodeURIComponent(sText);
    console.log('open url ' + url);
    window.open(url, '_blank');
  } else {
    console.log('can\'t open with ' + sText);
    // Center window on screen.
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 200;
    var height = 50;
    chrome.windows.create({
      'url': 'popup.html',
      'type': 'popup',
      'top': Math.round((screenHeight - height) / 2),
      'left': Math.round((screenWidth - width) / 2),
      'width': width,
      'height': height

    }, function(window) {});
  }
};
