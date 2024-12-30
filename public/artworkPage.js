function like() {
    const artworkTitle = document.getElementById('like').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/like', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText); 
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ artworkTitle }));
}
function unlike() {
    const artworkTitle = document.getElementById('unlike').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/unlike', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText); 
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ artworkTitle }));
}