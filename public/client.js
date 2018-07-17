let after = Date.now();

const imageContainer = document.getElementById("image-container");

function fetchImages() {

fetch("http://localhost:3000/latest", {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/json"
    }),
    body: JSON.stringify({ after })
    }).then (response => response.json())
    .then(data => {
        after = data.timestamp;
        data.images.forEach(image => {
            const img = document.createElement("img");
            img.src = `/uploads/${image}`;
            imageContainer.prepend(img);
        });
    });

}

setInterval(fetchImages, 5000);