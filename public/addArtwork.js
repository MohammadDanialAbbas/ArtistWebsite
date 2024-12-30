function addArtwork() {
    const title = document.getElementById('Title').value;
    const category = document.getElementById('Category').value;
    const medium = document.getElementById('Medium').value;
    const description = document.getElementById('Description').value;
    const poster = document.getElementById('Poster').value;
    const year  = document.getElementById('Year').value;

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/addArtwork`, true);
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
        Title: title,
        Category: category,
        Medium: medium,
        Description: description,
        Poster: poster,
        Year: year
    }));
}