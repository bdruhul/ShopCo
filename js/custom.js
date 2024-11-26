// header top js section start
function headerTop() {
    const headerTop = document.querySelector(".h_top");
    if (headerTop) {
        headerTop.classList.add("h_top_click");
    }
  }
// header top js section End
// navbar js part start
// Toggle the visibility of the mobile navigation item
function toggleNav() {
  const navItem = document.querySelector(".mobile_nav_content");
  if (navItem) {
    navItem.classList.toggle("show");
    playClickAudio(); // Play sound on toggle
  }
}

// Close the mobile navigation item
function closeNav() {
  const navItem = document.querySelector(".mobile_nav_content");
  if (navItem) {
    navItem.classList.remove("show");
    playClickAudio(); // Play sound on close
  }
}

// Remove the 'show' class from the navigation item on scroll
window.addEventListener("scroll", () => {
  const navItem = document.querySelector(".mobile_nav_content");
  if (navItem) {
    navItem.classList.remove("show");
  }
});

// Remove the 'show' class on click outside the navigation or the toggle button
document.addEventListener("click", (event) => {
  const navItem = document.querySelector(".mobile_nav_content");
  const toggler = document.querySelector(".mobile_toggle");

  if (navItem && toggler && !navItem.contains(event.target) && !toggler.contains(event.target)) {
    navItem.classList.remove("show");
  }
});

// Sticky Header Functionality
document.addEventListener("scroll", () => {
  // Select both desktop and mobile navigation elements
  const navDesktop = document.querySelector(".desktop_nav");
  const navMobile = document.querySelector(".mobile_nav");

  // Function to add/remove sticky class
  const toggleSticky = (nav) => {
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    }
  };

  // Apply the sticky functionality to both navigation elements
  toggleSticky(navDesktop);
  toggleSticky(navMobile);
});
// navbar js part End
// counting project js part start
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");

        const updateCounter = () => {
            const current = +counter.innerText;
            const increment = target / speed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + "+";
            }
        };

        updateCounter();
    });
});

// counting project js part End
// slider part js section start
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let itemsPerView = 4;
const totalItems = document.querySelectorAll('.slide').length;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

// Function to move the slider
const moveSlider = () => {
  slider.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
};

// Move to the next slide
const nextSlide = () => {
  if (currentIndex < totalItems - itemsPerView) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the beginning
  }
  moveSlider();
};

// Move to the previous slide
const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalItems - itemsPerView; // Jump to the last set of items
  }
  moveSlider();
};

// Event Listeners for Buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Adjust itemsPerView on window resize
window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 480) {
    itemsPerView = 2;
  } else if (screenWidth <= 768) {
    itemsPerView = 3;
  } else {
    itemsPerView = 4;
  }
  moveSlider();
});

// Drag Functionality
slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  slider.style.transition = 'none';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentX = e.pageX;
  const movementX = currentX - startX;
  currentTranslate = prevTranslate + movementX;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('mouseup', (e) => {
  isDragging = false;
  const endX = e.pageX;
  if (endX < startX - 50) {
    // Dragged left
    nextSlide();
  } else if (endX > startX + 50) {
    // Dragged right
    prevSlide();
  } else {
    // No significant movement, reset position
    moveSlider();
  }
  prevTranslate = -currentIndex * (slider.offsetWidth / itemsPerView);
  slider.style.transition = 'transform 0.4s ease-in-out';
});

slider.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    moveSlider();
  }
});

// Touch events for mobile
slider.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  slider.style.transition = 'none';
});

slider.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const movementX = currentX - startX;
  currentTranslate = prevTranslate + movementX;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('touchend', (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) {
    // Swiped left
    nextSlide();
  } else if (endX > startX + 50) {
    // Swiped right
    prevSlide();
  } else {
    moveSlider();
  }
  prevTranslate = -currentIndex * (slider.offsetWidth / itemsPerView);
  slider.style.transition = 'transform 0.4s ease-in-out';
});

// Auto-Slide every 3 seconds
let autoSlide = setInterval(nextSlide, 3000);

// Pause auto-slide on hover
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

// Resume auto-slide when hover ends
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 3000);
});

// slider part js section end