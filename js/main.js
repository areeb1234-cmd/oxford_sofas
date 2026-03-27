document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    }, 2000);
  }

  // Update counters after components are rendered
  setTimeout(updateCounters, 100);

  // Scroll Progress Indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.id = 'scroll-progress';
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  // Add Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'back-to-top';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.title = 'Go to top';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll Effects (Navbar, Progress, Back to Top)
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Navbar solid on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';

    // Back to Top visibility
    if (scrollPos > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // 3D Tilt Effect for Hero Text
  const tiltBoxes = document.querySelectorAll('[id^="tilt-box-"]');
  tiltBoxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const tiltY = ((x - centerX) / centerX) * 10;
      
      box.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      box.style.transition = 'none';
    });
    
    box.addEventListener('mouseleave', () => {
      box.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      box.style.transition = 'transform 0.5s ease';
    });
  });

  // Mouse Parallax for Shop Hero
  const shopHero = document.querySelector('.shop-hero');
  if (shopHero) {
    shopHero.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 90;
      const y = (window.innerHeight - e.pageY * 2) / 90;

      const ff1 = document.querySelector('.ff-1 .parallax-img');
      const ff2 = document.querySelector('.ff-2 .parallax-img');
      const ff3 = document.querySelector('.ff-3 .parallax-img');

      if (ff1) ff1.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
      if (ff2) ff2.style.transform = `translate(${x * -1.5}px, ${y * -1.5}px)`;
      if (ff3) ff3.style.transform = `translate(${x * 1}px, ${y * 1}px)`;
    });
    
    shopHero.addEventListener('mouseleave', () => {
      const ffs = document.querySelectorAll('.parallax-img');
      ffs.forEach(ff => {
        ff.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  // Special Offers Countdown Timer
  const offerDays = document.getElementById('offer-days');
  const offerHours = document.getElementById('offer-hours');
  const offerMinutes = document.getElementById('offer-minutes');
  const offerSeconds = document.getElementById('offer-seconds');

  if (offerDays && offerHours && offerMinutes && offerSeconds) {
    // Set sale end date to 3 days from now for demo purposes
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 3);
    saleEndDate.setHours(saleEndDate.getHours() + 14);
    saleEndDate.setMinutes(saleEndDate.getMinutes() + 36);

    let prevDays = -1, prevHours = -1, prevMinutes = -1, prevSeconds = -1;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = saleEndDate.getTime() - now;

      if (distance < 0) {
        // Sale ended
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const formatTime = (time) => time < 10 ? `0${time}` : time;

      const updateUnit = (element, newValue, prevValue) => {
        if (newValue !== prevValue) {
          element.innerText = formatTime(newValue);
          element.classList.remove('flip-animate');
          void element.offsetWidth; // trigger reflow
          element.classList.add('flip-animate');
        }
      };

      updateUnit(offerDays, days, prevDays);
      updateUnit(offerHours, hours, prevHours);
      updateUnit(offerMinutes, minutes, prevMinutes);
      updateUnit(offerSeconds, seconds, prevSeconds);

      prevDays = days;
      prevHours = hours;
      prevMinutes = minutes;
      prevSeconds = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Reviews Carousel Logic
  const reviewsTrack = document.getElementById('reviewsTrack');
  if (reviewsTrack) {
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const dotsContainer = document.getElementById('reviewDots');
    const cards = Array.from(reviewsTrack.children);
    
    let currentIndex = 0;
    
    function getCardsPerView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 992) return 2;
      return 3;
    }

    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    
    // Create dots
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const numDots = Math.ceil(cards.length / cardsPerView);
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i * cardsPerView;
          if (currentIndex > maxIndex) currentIndex = maxIndex;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateCarousel() {
      const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20 is gap
      reviewsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      // Update dots
      if (dotsContainer) {
        const activeDotIndex = Math.floor(currentIndex / cardsPerView);
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeDotIndex);
        });
      }
    }
    
    window.addEventListener('resize', () => {
      const newCardsPerView = getCardsPerView();
      if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        maxIndex = Math.max(0, cards.length - cardsPerView);
        currentIndex = 0;
        createDots();
      }
      updateCarousel();
    });
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = maxIndex;
        updateCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > maxIndex) currentIndex = 0;
        updateCarousel();
      });
    }
    
    // Autoplay
    let autoplayInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex > maxIndex) currentIndex = 0;
      updateCarousel();
    }, 5000);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.reviews-carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
      carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
          currentIndex++;
          if (currentIndex > maxIndex) currentIndex = 0;
          updateCarousel();
        }, 5000);
      });
    }
    
    createDots();
    updateCarousel();
  }
});

function normalizeImagePath(src) {
  if (!src || typeof src !== 'string') return src;
  return src.startsWith('/images/') ? src.slice(1) : src;
}

function updateCounters() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const compare = JSON.parse(localStorage.getItem('compare')) || [];

  const cartCount = document.getElementById('cart-count');
  const wishlistCount = document.getElementById('wishlist-count');
  const compareCount = document.getElementById('compare-count');

  if(cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  if(wishlistCount) wishlistCount.innerText = wishlist.length;
  if(compareCount) compareCount.innerText = compare.length;
}

function renderProductCard(product) {
  const badgeHTML = product.isNew ? `<div class="product-badge animated-badge">New</div>` : '';
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="product-card h-100 d-flex flex-column">
        <div class="product-img-wrapper">
          <div class="product-img-inner">
            <img src="${normalizeImagePath(product.image)}" class="product-img" alt="${product.name}">
          </div>
          ${badgeHTML}
          <div class="product-actions-overlay">
            <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist"><i class="fas fa-heart"></i></button>
            <button class="action-btn" onclick="addToCompare(${product.id})" title="Compare"><i class="fas fa-exchange-alt"></i></button>
            <button class="action-btn" onclick="quickView(${product.id})" title="Quick View"><i class="fas fa-eye"></i></button>
          </div>
        </div>
        <div class="product-info flex-grow-1 d-flex flex-column">
          <p class="text-muted mb-1 small text-uppercase tracking-wider">${product.brand}</p>
          <h5 class="product-title flex-grow-1"><a href="product.html?id=${product.id}" class="text-decoration-none text-reset">${product.name}</a></h5>
          <div class="product-rating">
            ${getStars(product.rating)}
          </div>
          <div class="product-price mb-3">$${product.price.toLocaleString()}</div>
          <button class="add-to-cart-btn mt-auto ripple" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function getStars(rating) {
  let stars = '';
  for(let i=1; i<=5; i++) {
    if(i <= rating) stars += '<i class="fas fa-star"></i>';
    else if(i - 0.5 === rating) stars += '<i class="fas fa-star-half-alt"></i>';
    else stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

function quickView(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let modalEl = document.getElementById('quickViewModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'quickViewModal';
    modalEl.className = 'modal fade';
    modalEl.tabIndex = -1;
    modalEl.innerHTML = `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content qv-modal-content">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0 px-4 pb-4">
            <div class="row g-4">
              <div class="col-md-6">
                <div id="qvCarousel" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner" id="qv-carousel-inner">
                    <!-- Images injected here -->
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#qvCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#qvCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="col-md-6 d-flex flex-column justify-content-center">
                <h3 id="qv-name" class="font-playfair fw-bold mb-2" style="color: var(--heading-color);"></h3>
                <p id="qv-brand" class="text-muted text-uppercase tracking-wider small mb-3"></p>
                <div class="mb-3 d-flex align-items-center">
                  <span id="qv-price" class="fw-bold fs-3" style="color: var(--accent-color);"></span>
                  <span id="qv-rating" class="ms-3 text-warning"></span>
                </div>
                <p id="qv-desc" class="mb-4" style="color: var(--text-color); opacity: 0.8;"></p>
                <div class="d-flex gap-3 mb-4">
                  <button id="qv-add-cart" class="btn btn-gold flex-grow-1 ripple btn-glow py-3 rounded-pill fw-bold">Add to Cart</button>
                  <button id="qv-add-wishlist" class="btn btn-outline-dark-custom rounded-circle d-flex align-items-center justify-content-center" style="width: 54px; height: 54px;"><i class="fas fa-heart"></i></button>
                </div>
                <a id="qv-view-details" href="#" class="text-decoration-none text-center d-block w-100" style="color: var(--text-color); opacity: 0.7;"><small>View Full Details <i class="fas fa-arrow-right ms-1"></i></small></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
  }

  const carouselInner = document.getElementById('qv-carousel-inner');
  
  // Use product.images array if available, otherwise fallback to product.image
  const images = product.images && product.images.length > 0 
    ? product.images.map(normalizeImagePath)
    : [product.image, product.image, product.image].map(normalizeImagePath);

  carouselInner.innerHTML = images.map((img, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="qv-image-container">
        <img src="${img}" class="qv-image d-block w-100" alt="${product.name}">
      </div>
    </div>
  `).join('');

  document.getElementById('qv-name').innerText = product.name;
  document.getElementById('qv-brand').innerText = product.brand;
  document.getElementById('qv-price').innerText = `$${product.price.toLocaleString()}`;
  document.getElementById('qv-rating').innerHTML = `<i class="fas fa-star"></i> ${product.rating}`;
  document.getElementById('qv-desc').innerText = `Experience the ultimate comfort with our ${product.name}. Crafted with premium ${product.material} and finished in a beautiful ${product.color} tone. Perfect for any modern ${product.category} setting.`;

  document.getElementById('qv-add-cart').onclick = () => {
    addToCart(product.id);
    bootstrap.Modal.getInstance(modalEl).hide();
  };
  
  document.getElementById('qv-add-wishlist').onclick = () => {
    addToWishlist(product.id);
  };

  document.getElementById('qv-view-details').href = `product.html?id=${product.id}`;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

function initFeaturedCarousel() {
  const container = document.getElementById('featuredCarouselContainer');
  const items = document.querySelectorAll('.featured-carousel-item');
  const dots = document.querySelectorAll('.featured-dot');
  const prevBtn = document.getElementById('featuredPrev');
  const nextBtn = document.getElementById('featuredNext');
  
  if (!container || items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;
  let autoSlideInterval;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.remove('active', 'prev', 'next', 'hidden');
      
      if (index === currentIndex) {
        item.classList.add('active');
      } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
        item.classList.add('prev');
      } else if (index === (currentIndex + 1) % totalItems) {
        item.classList.add('next');
      } else {
        item.classList.add('hidden');
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      stopAutoSlide();
      startAutoSlide();
    });
  });

  const wrapper = document.querySelector('.featured-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
  }

  updateCarousel();
  startAutoSlide();
}
