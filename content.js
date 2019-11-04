

chrome.runtime.sendMessage("hi",
    function (response) {
        console.log(response);
        var innerArray = document.getElementsByClassName("unit-name");
        for (i = 0; i < innerArray.length; i++) {
            var responseArray = Object.keys(response);
            for (j = 0; j < responseArray.length; j++){
                var element = document.createElement('div');
                if (innerArray[i].innerText == responseArray[j]) {
                    for (let props in response[responseArray[j]]){
                        var innerParagraph = document.createElement('span');
                        innerParagraph.style.display = 'inline';
                        innerParagraph.style.fontSize = '75%';
                        if (props.includes('description')){
                            innerParagraph.style.fontWeight = 'normal';
                            innerParagraph.style.fontStyle = 'italic';
                        }
                        response[responseArray[j]][props] = response[responseArray[j]][props].replace(/\n/,'');
                        innerParagraph.innerText += response[responseArray[j]][props];
                        element.appendChild(innerParagraph);
                    }
                }
                innerArray[i].appendChild(element);
            }
        }
    })


