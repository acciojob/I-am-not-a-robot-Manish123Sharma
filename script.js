//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const header = document.getElementById('h');

let selectedImages = [];
let tiles = [];

// Shuffle helper
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Load random images with one duplicate
function loadImages() {
  let images = [...imageClasses];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate); // Add a duplicate
  shuffle(images);

  container.innerHTML = '';
  selectedImages = [];

  images.forEach((imgClass, index) => {
    const img = document.createElement('img');
    img.classList.add(imgClass);
    img.setAttribute('data-class', imgClass);
    img.setAttribute('data-index', index);
    img.addEventListener('click', () => handleClick(img));
    container.appendChild(img);
    tiles.push(img);
  });
}

function handleClick(img) {
  const className = img.getAttribute('data-class');

  // Prevent double click on the same image
  if (selectedImages.find(i => i.index === img.dataset.index)) return;

  img.classList.add('selected');
  selectedImages.push({ className, index: img.dataset.index });

  resetBtn.style.display = 'inline-block';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  } else if (selectedImages.length > 2) {
    // Prevent more than 2 selections
    selectedImages.forEach(i => {
      document.querySelector(`img[data-index='${i.index}']`).classList.remove('selected');
    });
    selectedImages = [];
    verifyBtn.style.display = 'none';
  }
}

resetBtn.addEventListener('click', () => {
  selectedImages.forEach(i => {
    document.querySelector(`img[data-index='${i.index}']`).classList.remove('selected');
  });
  selectedImages = [];
  verifyBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  message.textContent = '';
  header.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
});

verifyBtn.addEventListener('click', () => {
  if (selectedImages.length === 2) {
    const [first, second] = selectedImages;
    if (first.className === second.className) {
      message.textContent = 'You are a human. Congratulations!';
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = 'none';
});

window.onload = loadImages;
