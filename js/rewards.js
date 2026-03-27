// Rewards System Logic - Premium Redesign

document.addEventListener('DOMContentLoaded', () => {
  initWheel();
  initScratchCard();
  initDailyTimer();
  initWinnersTicker();
  initLuckyBox();
  initProgressBar();
});

// --- 1. SPIN THE WHEEL ---
const segments = [
  { label: '5% OFF', color: '#FF595E', code: 'SAVE5' },
  { label: '10% OFF', color: '#FFCA3A', code: 'SAVE10' },
  { label: '15% OFF', color: '#8AC926', code: 'SAVE15' },
  { label: '20% OFF', color: '#1982C4', code: 'SAVE20' },
  { label: 'FREE SHIP', color: '#6A4C93', code: 'FREESHIP' },
  { label: 'TRY AGAIN', color: '#6c757d', code: null }
];

let isSpinning = false;
let currentRotation = 0;

function initWheel() {
  const wheel = document.getElementById('spinWheel');
  const spinBtn = document.getElementById('spinBtn');
  if (!wheel || !spinBtn) return;

  const numSegments = segments.length;
  const anglePerSegment = 360 / numSegments;

  // Generate segments
  wheel.innerHTML = '';
  segments.forEach((segment, index) => {
    const el = document.createElement('div');
    el.className = 'wheel-segment-premium';
    
    // Calculate rotation for each segment
    const rotateAngle = index * anglePerSegment;
    
    // Use conic-gradient for the background of the wheel itself instead of complex clip-paths for segments
    el.style.transform = `rotate(${rotateAngle}deg)`;
    el.innerHTML = `<span style="transform: rotate(${anglePerSegment/2}deg); display: inline-block; width: 100px; text-align: right;">${segment.label}</span>`;
    
    // We'll apply the background colors using a conic gradient on the parent wheel
    wheel.appendChild(el);
  });

  // Apply conic gradient to wheel
  let gradientStops = [];
  segments.forEach((seg, i) => {
    const startAngle = i * anglePerSegment;
    const endAngle = (i + 1) * anglePerSegment;
    gradientStops.push(`${seg.color} ${startAngle}deg ${endAngle}deg`);
  });
  wheel.style.background = `conic-gradient(${gradientStops.join(', ')})`;

  spinBtn.addEventListener('click', spinWheelPremium);
}

function spinWheelPremium() {
  if (isSpinning) return;
  
  const wheel = document.getElementById('spinWheel');
  const spinBtn = document.getElementById('spinBtn');
  const resultText = document.getElementById('spinResult');
  
  isSpinning = true;
  spinBtn.disabled = true;
  resultText.innerHTML = '<span class="text-muted">Spinning...</span>';
  wheel.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 30px rgba(212, 175, 55, 0.8)';
  
  const minSpins = 5;
  const numSegments = segments.length;
  const anglePerSegment = 360 / numSegments;
  
  // Random segment to win
  const randomSegmentIndex = Math.floor(Math.random() * numSegments);
  
  // Calculate the exact angle to stop at the center of the winning segment
  // The pointer is at 0 degrees (top).
  // If we want segment N to be at the top, we need to rotate the wheel backwards by N * anglePerSegment + anglePerSegment/2
  const targetAngle = 360 - (randomSegmentIndex * anglePerSegment + anglePerSegment / 2);
  
  // Add spins
  const totalRotation = currentRotation + (minSpins * 360) + targetAngle - (currentRotation % 360);
  currentRotation = totalRotation;
  
  wheel.style.transform = `rotate(${totalRotation}deg)`;
  
  setTimeout(() => {
    isSpinning = false;
    spinBtn.disabled = false;
    wheel.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.3), 0 0 15px rgba(212, 175, 55, 0.5)';
    
    const result = segments[randomSegmentIndex];
    
    if (result.code === null) {
      resultText.innerHTML = `<span class="text-danger">Better luck next time!</span>`;
    } else {
      resultText.innerHTML = `<span class="text-success">You won ${result.label}!</span>`;
      triggerConfetti();
      localStorage.setItem('coupon', result.code);
      if(typeof showToast === 'function') {
        showToast(`Coupon ${result.code} applied!`);
      }
    }
  }, 5000); // 5s transition
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }
}

// --- 2. SCRATCH CARD ---
let isScratched = false;

function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  const container = document.querySelector('.scratch-card-wrapper');
  const resetBtn = document.getElementById('resetScratchBtn');
  
  if (!canvas || !container) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = container.offsetWidth - 10; // padding
  canvas.height = container.offsetHeight - 10;
  
  // Fill with premium silver texture
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add noise/texture
  for (let i = 0; i < 1000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#A9A9A9' : '#D3D3D3';
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }
  
  // Add text overlay
  ctx.font = 'bold 20px Inter, sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
  
  canvas.style.opacity = '1';
  if(resetBtn) resetBtn.style.display = 'none';
  isScratched = false;
  
  // Setup scratch rewards
  const rewards = [
    { text: '10% OFF', code: 'SAVE10' },
    { text: '15% OFF', code: 'SAVE15' },
    { text: 'FREE DELIVERY', code: 'FREESHIP' }
  ];
  const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
  const resultTextEl = document.getElementById('scratchResultText');
  const codeEl = document.getElementById('scratchCode');
  if(resultTextEl) resultTextEl.innerText = randomReward.text;
  if(codeEl) codeEl.innerText = randomReward.code;
  
  // Scratching logic
  let isDrawing = false;
  
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }
  
  function scratch(e) {
    if (!isDrawing || isScratched) return;
    e.preventDefault();
    
    const pos = getMousePos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    checkScratchCompletion();
  }
  
  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);
  
  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
  canvas.addEventListener('touchmove', scratch, {passive: false});
  canvas.addEventListener('touchend', () => isDrawing = false);
  
  function checkScratchCompletion() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    
    const totalPixels = pixels.length / 4;
    const percentage = (transparentPixels / totalPixels) * 100;
    
    if (percentage > 50 && !isScratched) {
      isScratched = true;
      canvas.style.opacity = '0';
      setTimeout(() => {
        if(resetBtn) resetBtn.style.display = 'inline-block';
        triggerConfetti();
        localStorage.setItem('coupon', randomReward.code);
        if(typeof showToast === 'function') {
          showToast(`Coupon ${randomReward.code} applied!`);
        }
      }, 500);
    }
  }
  
  if(resetBtn) {
    resetBtn.onclick = initScratchCard;
  }
}

// --- 3. DAILY BONUS TIMER ---
function initDailyTimer() {
  const timerEl = document.getElementById('dailyTimer');
  if (!timerEl) return;
  
  // Set to end of current day
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  
  function updateTimer() {
    const currentTime = new Date();
    const diff = endOfDay - currentTime;
    
    if (diff <= 0) {
      timerEl.innerText = "00:00:00";
      return;
    }
    
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    
    timerEl.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- 4. WINNERS TICKER ---
function initWinnersTicker() {
  const ticker = document.getElementById('winnersTicker');
  if (!ticker) return;

  const winners = [
    { name: "Sarah J.", prize: "15% Off Coupon", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Michael T.", prize: "Free Shipping", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Emma W.", prize: "10% Off Coupon", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "David L.", prize: "20% Off Coupon", avatar: "https://i.pravatar.cc/150?img=8" },
    { name: "Jessica M.", prize: "Free Shipping", avatar: "https://i.pravatar.cc/150?img=9" },
    { name: "Chris P.", prize: "15% Off Coupon", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Amanda K.", prize: "10% Off Coupon", avatar: "https://i.pravatar.cc/150?img=16" },
    { name: "Ryan B.", prize: "25% Off Coupon", avatar: "https://i.pravatar.cc/150?img=33" }
  ];

  let tickerHTML = '<div class="ticker-content">';
  
  const generateItems = () => {
    let html = '';
    winners.forEach(winner => {
      html += `
        <div class="winner-item">
          <img src="${winner.avatar}" alt="${winner.name}" class="winner-avatar" referrerPolicy="no-referrer">
          <div class="winner-info">
            <span class="winner-name">${winner.name}</span>
            <span class="winner-prize"><i class="fas fa-gift text-accent me-1"></i> ${winner.prize}</span>
          </div>
        </div>
      `;
    });
    return html;
  };

  // Add items twice for seamless loop
  tickerHTML += generateItems();
  tickerHTML += '</div><div class="ticker-content">';
  tickerHTML += generateItems();
  tickerHTML += '</div>';

  ticker.innerHTML = tickerHTML;
}

// --- 5. LUCKY BOX ---
function initLuckyBox() {
  const box = document.getElementById('luckyBox');
  const rewardText = document.getElementById('boxRewardText');
  const statusText = document.getElementById('boxStatusText');
  let isOpened = false;

  if (!box) return;

  const rewards = [
    { text: '10% OFF', code: 'SAVE10' },
    { text: 'Free Shipping', code: 'FREESHIP' },
    { text: '500 Points', code: null },
    { text: '15% OFF', code: 'SAVE15' }
  ];

  box.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;
    
    // Add open class to trigger CSS animation
    box.querySelector('.lucky-box').classList.add('open');
    statusText.innerHTML = '<span class="text-muted">Opening...</span>';
    
    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      rewardText.innerText = randomReward.text;
      rewardText.style.opacity = '1';
      rewardText.style.transform = 'translate(-50%, -150%) scale(1)';
      
      statusText.innerHTML = `<span class="text-success fw-bold">You won ${randomReward.text}!</span>`;
      
      triggerConfetti();
      
      if (randomReward.code) {
        localStorage.setItem('coupon', randomReward.code);
        if(typeof showToast === 'function') {
          showToast(`Coupon ${randomReward.code} applied!`);
        }
      } else {
        if(typeof showToast === 'function') {
          showToast(`500 Points added to your account!`);
        }
      }
    }, 800); // Wait for lid to open
  });
}

// --- 6. REWARD PROGRESS BAR ---
function initProgressBar() {
  const fill = document.getElementById('rewardProgressFill');
  const currentText = document.getElementById('currentSpendText');
  const nextText = document.getElementById('nextTierText');
  const milestones = document.querySelectorAll('.milestone');
  
  if (!fill) return;

  // Simulate fetching user spend data
  // In a real app, this would come from a backend or localStorage
  let currentSpend = 350; // Example value
  const maxSpend = 1000;
  
  // Animate progress bar fill
  setTimeout(() => {
    const percentage = Math.min((currentSpend / maxSpend) * 100, 100);
    fill.style.width = `${percentage}%`;
    
    // Animate numbers
    let start = 0;
    const duration = 1500;
    const increment = currentSpend / (duration / 16); // 60fps
    
    const counter = setInterval(() => {
      start += increment;
      if (start >= currentSpend) {
        start = currentSpend;
        clearInterval(counter);
      }
      currentText.innerText = `$${Math.floor(start)}`;
    }, 16);
    
    // Update milestones and next tier text
    let nextTier = maxSpend;
    milestones.forEach((milestone, index) => {
      const target = parseInt(milestone.getAttribute('data-target'));
      if (currentSpend >= target) {
        milestone.classList.add('active');
      } else if (target < nextTier) {
        nextTier = target;
      }
    });
    
    nextText.innerText = `$${nextTier}`;
    
  }, 500); // Small delay for effect
}



