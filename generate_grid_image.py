import subprocess

# Install Pillow library
subprocess.call(['pip', 'install', 'Pillow'])

# Import required libraries
from PIL import Image

# Read the text file
with open('grid.txt', 'r') as file:
    lines = file.read().splitlines()

# Determine the dimensions of the grid
num_rows = len(lines)
num_cols = len(lines[0].split())

# Set the size of the image (adjust as needed)
image_width = 480
image_height = 360

# Calculate the size of each cell in the grid
cell_width = image_width // num_cols
cell_height = image_height // num_rows

# Create a new blank image
image = Image.new('RGB', (image_width, image_height), 'white')

# Draw the grid
for row, line in enumerate(lines):
    cols = line.split()
    for col, cell in enumerate(cols):
        # Parse the coordinates from the cell (assuming they are comma-separated)
        x, y = map(int, cell.split(','))

        # Determine the position of the cell in the image
        x_pixel = col * cell_width
        y_pixel = row * cell_height

        # Draw a pixel at the corresponding position
        for i in range(x_pixel, x_pixel + cell_width):
            for j in range(y_pixel, y_pixel + cell_height):
                image.putpixel((i, j), (0, 0, 0))  # Set the pixel color to black

# Save the image as PNG
image.save('grid.png')
