// Function to handle the convert button click
function convertButtonClick() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  // Read the file content
  const reader = new FileReader();
  reader.onload = function(e) {
    // Get the grid text from the file
    const gridText = e.target.result;

    // Perform any necessary processing or validation on the gridText

    // Convert the grid to image dynamically
    convertGridToImage(gridText);
  };
  reader.readAsText(file);
}

// Function to convert the grid to image dynamically
function convertGridToImage(gridText) {
  // Split the gridText into rows
  const rows = gridText.trim().split('\n');
  
  // Determine the dimensions of the grid
  const num_rows = rows.length;
  const num_cols = rows[0].trim().split(' ').length;

  // Set the size of the image (adjust as needed)
  const image_width = 800;
  const image_height = 600;

  // Calculate the size of each cell in the grid
  const cell_width = image_width / num_cols;
  const cell_height = image_height / num_rows;

  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = image_width;
  canvas.height = image_height;
  const context = canvas.getContext('2d');

  // Draw the grid
  for (let row = 0; row < num_rows; row++) {
    const cols = rows[row].trim().split(' ');
    for (let col = 0; col < num_cols; col++) {
      // Parse the coordinates from the cell (assuming they are comma-separated)
      const [x, y] = cols[col].split(',').map(Number);

      // Determine the position of the cell in the image
      const x_pixel = col * cell_width;
      const y_pixel = row * cell_height;

      // Draw a rectangle at the corresponding position
      context.fillStyle = 'black';
      context.fillRect(x_pixel, y_pixel, cell_width, cell_height);
    }
  }

  // Convert the canvas to data URL
  const dataURL = canvas.toDataURL('image/png');

  // Set the download link href and display it
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = dataURL;
  downloadLink.style.display = 'block';
}

// Attach event listener to the convert button
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', convertButtonClick);
