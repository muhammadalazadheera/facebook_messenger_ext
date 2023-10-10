// Get the current URL
const currentUrl = window.location.href;

// Define the allowed URL patterns
const allowedPatterns = [
    /^https:\/\/www\.facebook\.com\/messages\/t$/, // Matches https://www.facebook.com/messages/t
    /^https:\/\/www\.facebook\.com\/messages\/t\/.*/ // Matches https://www.facebook.com/messages/t/ and any subpath
];

// Function to check if the current URL matches any allowed pattern
function isUrlAllowed(url) {
    return allowedPatterns.some(pattern => pattern.test(url));
}
// Attach the "load" event listener to the window
window.addEventListener("load", function(){
    document.querySelector('body').style.display = 'inherit'
});




chrome.storage.sync.get('status', function(result){
    if(result.status == 'on'){
        // Check if the current URL is allowed
        if (!isUrlAllowed(currentUrl)) {
            // Redirect to messanger
            window.location.href = "https://www.facebook.com/messages/t";
        }

        navigation.addEventListener("navigate", e => {
            // Check if the current URL is allowed
            if (!isUrlAllowed(currentUrl)) {
                // Redirect to messanger
                window.location.href = "https://www.facebook.com/messages/t";
            }
            //alert(e.destination.url)
            if (!isUrlAllowed(e.destination.url)) {
                // Redirect to messanger
                window.location.href = "https://www.facebook.com/messages/t";
            }
        });

    }
})