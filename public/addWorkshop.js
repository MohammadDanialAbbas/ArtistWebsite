function addArtwork() {
    const title = document.getElementById('Title').value;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/addWorkshop`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Artwork added successfully');
        } else {
            console.error('Error adding artwork:', xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error during adding artwork');
    };

    xhr.send(JSON.stringify({
        Title: title
    }));
}