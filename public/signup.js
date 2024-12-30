//sends info from page to server
function signin() {
    var form = document.getElementById('signupForm');
    var formData = new FormData(form);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    var jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
        console.error(value, xhr.responseText);
    });
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                window.location.href = '/'; 
            } else if (xhr.status === 401) {
                console.error('Invalid credentials');
            } else {
                console.error('Error during login:', xhr.responseText);
            }
        }
    };
    console.log(jsonData);
    xhr.send(JSON.stringify(jsonData));
}