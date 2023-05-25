// Function to handle the convert button click
function convertButtonClick() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  // Read the file content
  const reader = new FileReader();
  reader.onload = function (e) {
    const coordinateText = e.target.result;

    // Show status indicator
    setStatus('Converting...');

    // Perform the coordinate list to image conversion
    const imageData = convertCoordinateListToImage(coordinateText);

    // Create a data URL from the image data
    const dataURL = 'data:image/png;base64,' + imageData;

    // Set the download link href and display it
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = dataURL;
    downloadLink.style.display = 'block';

    // Trigger automatic download
    downloadLink.click();

    // Update status indicator
    setStatus('Conversion completed');
  };
  reader.readAsText(file);
}

// Function to set the status message
function setStatus(message) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
}

// Function to convert coordinate list to image
function convertCoordinateListToImage(coordinateText) {
  const lines = coordinateText.trim().split('\n');
  const num_rows = lines.length;
  const num_cols = lines[0].trim().split(',').length;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size based on grid dimensions
  const cell_width = 1;
  const cell_height = 1;
  canvas.width = num_cols * cell_width;
  canvas.height = num_rows * cell_height;

  // Set the default fill color to white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the fill color to black for the specified coordinates
  ctx.fillStyle = 'black';
  for (let row = 0; row < num_rows; row++) {
    const cols = lines[row].trim().split(',');
    for (let col = 0; col < num_cols; col++) {
      const coordinate = cols[col];
      if (coordinate !== '') {
        const x = col * cell_width;
        const y = row * cell_height;
        ctx.fillRect(x, y, cell_width, cell_height);
      }
    }
  }

  // Convert canvas to PNG image data
  const imageData = canvas.toDataURL('image/png').split(',')[1];
  return imageData;
}

// Attach event listener to the convert button
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertButtonClick);
