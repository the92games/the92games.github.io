// Function to handle the convert button click
function convertButtonClick() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  // Read the file content
  const reader = new FileReader();
  reader.onload = function(e) {
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

// Attach event listener to the convert button
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertButtonClick);
