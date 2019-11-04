
var d = new Date();
// var weekday = new Array(7);
// weekday[0] = "Sunday";
// weekday[1] = "Monday";
// weekday[2] = "Tuesday";
// weekday[3] = "Wednesday";
// weekday[4] = "Thursday";
// weekday[5] = "Friday";
// weekday[6] = "Saturday";

responseMessage = {
  'Bruin Café': {},
  'Rendezvous': {},
};

function fetchBCafe() {
  return fetch('http://menu.dining.ucla.edu/Menus/BruinCafe')
    .then(
      (response) =>
        response.text()
    )
    .then((data) => {
      var htmlObject = document.createElement('div');
      var bCafeHTML = htmlObject;
      htmlObject.innerHTML = data.replace(/<script(.|\s)*?\/script>|<link[^>]+>|<img[^>]+>/g, '');
      var today = d.getDay();
      if (today >= 1 && today <= 5) {
        bCafeHTML = htmlObject.getElementsByClassName("day-list")[0].getElementsByClassName('style-entree')[today - 1];
        responseMessage['Bruin Café'][0 + ' name'] = bCafeHTML.getElementsByClassName('menu-item-name')[0].innerText;
        responseMessage['Bruin Café'][0 + ' description'] = bCafeHTML.getElementsByClassName('menu-item-description')[0].innerText;
      }
    })
    .catch((error) => console.log(error))
}

function fetchRende() {
  return fetch('http://menu.dining.ucla.edu/Menus/Rendezvous')
    .then((response) =>
      response.text()
    )
    .then((data) => {
      var htmlObject = document.createElement('div');
      var rendeHTML;
      htmlObject.innerHTML = data.replace(/<script(.|\s)*?\/script>|<link[^>]+>|<img[^>]+>/g, '');
      for (i = 0; i < 2; i++) {
        rendeHTML = htmlObject.getElementsByClassName('style-entree style-2flow')[i];
        console.log(rendeHTML);
        var size = rendeHTML.getElementsByClassName('menu-item-name').length;
        for (j = 0; j < size; j++) {
          responseMessage['Rendezvous'][i + ' name' + j] = rendeHTML.getElementsByClassName('menu-item-name')[j].innerText;
          responseMessage['Rendezvous'][i + ' description' + j] = rendeHTML.getElementsByClassName('menu-item-description')[j].innerText;
        }
      }
    })
    .catch((error) => console.log(error))

}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  fetchBCafe()
    .then(fetchRende)
    .then(() => {
      if (message == "hi") {
        console.log(responseMessage);
        sendResponse(responseMessage);
        console.log('sent');
      }
    }
    )
  return true;
})

