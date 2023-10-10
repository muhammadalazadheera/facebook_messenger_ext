// popup.js


let powerButton = document.getElementById('powerButton');
let powerImage = document.getElementById('powerImage');
let statusText = document.getElementById('status');

chrome.storage.sync.get('status', function(result){
    let status = result.status;
    if(status == 'on'){ // status:on
        powerButton.innerHTML = 'OFF';
        powerButton.classList.remove('button-bg-green')
        powerButton.classList.add('button-bg-red')
        
        powerImage.classList.remove('gray')
        statusText.innerHTML = status;
    }else{ // status : off
        powerButton.innerHTML = 'ON';

        powerButton.classList.remove('button-bg-red')
        powerButton.classList.add('button-bg-green')
        powerImage.classList.add('gray')
        statusText.innerHTML = status;
    }
})


powerButton.addEventListener('click', function(){
    chrome.storage.sync.get('status', function(result){
        if(result.status == 'off') { // status: off
            chrome.storage.sync.set({'status' : 'on'})
            powerButton.innerHTML = 'OFF';
            powerImage.classList.remove('gray')
            powerButton.classList.remove('button-bg-green')
            powerButton.classList.add('button-bg-red')
            // Reload the currently active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs && tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
                }
            });
            chrome.storage.sync.get('status', function(result){
                statusText.innerHTML = result.status; 
            })
        }else{ // Status: on
            chrome.storage.sync.set({'status' : 'off'})
            powerButton.innerHTML = 'ON';
            powerButton.classList.remove('button-bg-red')
            powerButton.classList.add('button-bg-green')
            powerImage.classList.add('gray')
            // Reload the currently active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs && tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
                }
            });
            chrome.storage.sync.get('status', function(result){
                statusText.innerHTML = result.status; 
            })
        }
    })
})