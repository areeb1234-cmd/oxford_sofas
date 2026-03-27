// Brand Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Lightbox functionality for Masonry Gallery
  const masonryItems = document.querySelectorAll('.masonry-item');
  
  if (masonryItems.length > 0) {
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.lightbox')) {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <i class="fas fa-times lightbox-close"></i>
        <img src="" alt="Gallery Image" class="lightbox-img">
      `;
      document.body.appendChild(lightbox);
    }

    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    masonryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


});
