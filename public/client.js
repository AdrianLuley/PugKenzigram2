let after = Date.now();
var errors = 0;

function fetchImages() {

fetch("http://localhost:3000/latest", {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json"
    }),
    body: JSON.stringify({ after })
    }).then (response => response.json())
    .then(data => {

        let imageContainer = document.getElementById('image-container')
            data.latestImages.forEach((img) => {
                let newImg = document.createElement('img');
                newImg.src = img;
                imageContainer.appendChild(newImg);
            });
            after = data.timestamp;
            errors = 0;
        })
        .catch(response => {
            if (!response.ok) {
                errors++;
                console.log("Connection Timeout");
                if (errors == 2) {
                    clearTimeout(startPoll);
                    alert("Lost connection with server!");
                }
            }
            
        });
    }

    if(errors < 2) {
    fetchImages();
    };


startPoll = setInterval(fetchImages, 5000);
console.log(fetchImages());