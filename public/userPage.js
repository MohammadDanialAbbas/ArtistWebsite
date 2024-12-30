function followArtist() {
    const artistUsername = document.querySelector('#followButton').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/user/${artistUsername}/follow`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        console.log('Response:', xhr.responseText);

        try {
            const data = JSON.parse(xhr.responseText);
            console.log(data.message);
        } catch (error) {
            console.log('Non-JSON response:', xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error during following artist');
    };

    xhr.send(JSON.stringify({ artistUsername: artistUsername }));
}
//sends info from page to server, to unfollow artist upon button click
function unfollowArtist() {
    const artistUsername = document.querySelector('#unfollowButton').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/user/${artistUsername}/unfollow`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        console.log('Response:', xhr.responseText);

        try {
            const data = JSON.parse(xhr.responseText);
            console.log(data.message);
        } catch (error) {
            console.log('Non-JSON response:', xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error during unfollowing artist');
    };

    xhr.send(JSON.stringify({ artistUsername: artistUsername }));
}
function convertToPatreon() {
    const artistUsername = document.getElementById('ConvertToPatreon').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/convertToPatreon', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText); // Handle the server response as needed
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ artistUsername }));
}

function convertToArtist() {
    const artistUsername = document.getElementById('ConvertToArtist').getAttribute('data-artist');
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/convertToArtist', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText); // Handle the server response as needed
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ artistUsername }));
}