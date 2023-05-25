// Function to handle the convert button click
function convertButtonClick() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  // Read the file content
  const reader = new FileReader();
  reader.onload = function(e) {
    const coordinateText = e.target.result;

    // Perform the coordinate list to image conversion
    const imageData = convertCoordinateListToImage(coordinateText);

    // Create a data URL from the image data
    const dataURL = 'data:image/png;base64,' + imageData;

    // Set the download link href and display it
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = dataURL;
    downloadLink.style.display = 'block';
  };
  reader.readAsText(file);
}

// Attach event listener to the convert button
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertButtonClick);

// Function to convert coordinate list to image
function convertCoordinateListToImage(coordinateText) {
  const lines = coordinateText.trim().split('\n');
  const imageWidth = 480;
  const imageHeight = 360;

  // Create a canvas element to draw the image
  const canvas = document.createElement('canvas');
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, imageWidth, imageHeight);

  // Draw black pixels for each specified coordinate
  for (let i = 0; i < lines.length; i++) {
    const coords = lines[i].trim().split(',');
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);
    context.fillStyle = 'black';
    context.fillRect(x, y, 1, 1);
  }

  // Convert the canvas to image data URL
  const imageData = canvas.toDataURL('image/png').split(',')[1];

  return imageData;
}
