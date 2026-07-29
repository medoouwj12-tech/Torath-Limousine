/**
 * Torath Limousine - Main Interactive Application Script
 * Features:
 * - AR / EN i18n Internationalization Engine
 * - Dark / Light Theme Controller
 * - 30 Vehicle Fleet Grid Rendering & Filtering
 * - Interactive WhatsApp Booking Modal Payload Generator (+201035192651)
 */

// --- State Management ---
const state = {
  lang: localStorage.getItem('torath_lang') || 'ar',
  theme: localStorage.getItem('torath_theme') || 'dark',
  category: 'all',
  searchQuery: '',
  passengerFilter: 'all',
  selectedCarId: null,
  activeGalleryCarId: null,
  activeGalleryImageIndex: 0,
  cardImageIndexes: {}
};

// --- i18n Dictionary ---
const translations = {
  ar: {
    brandName: "تراث ليموزين",
    navHome: "الرئيسية",
    navFleet: "أسطول السيارات",
    navWhyUs: "لماذا نحن",
    navReviews: "تقييمات العملاء",
    navContact: "تواصل معنا",
    bookNow: "احجز الآن",
    
    heroBadge: "فخامة وأمان على مدار الساعة",
    heroTitle: "تجربة ليموزين فاخرة تناسب مقامك",
    heroSubtitle: "نوفر لك أرقى خدمات الليموزين وسيارات الزفاف وتنقلات المحافظات بأحدث أسطول وأعلى مستويات الرفاهية والدقة في المواعيد.",
    exploreFleet: "استكشف أسطولنا (30 سيارة)",
    quickBookTitle: "احجز رحلتك فوراً",
    selectServiceType: "اختر نوع الخدمة",
    serviceWedding: "عربيات زفاف العرايس",
    serviceTravel: "عربيات السفر للمحافظات",
    pickupCity: "مكان التحرك (المدينة)",
    destinationCity: "الوجهة / المحافظة",
    pickupDate: "تاريخ الرحلة",
    pickupTime: "وقت التحرك",
    searchCar: "ابحث عن سيارة...",

    fleetBadge: "أسطول تراث ليموزين",
    fleetTitle: "اختر سيارتك المفضلة من أسطولنا الملكي",
    fleetDesc: "أسطول مجهز بـ 30 سيارة حديثة ومصنفة خصيصاً لتلبية احتياجات الأفراح والمناسبات والسفر لجميع المحافظات.",
    
    filterAll: "الكل (30 سيارة)",
    filterWedding: "عربيات زفاف العرايس 🌸",
    filterTravel: "عربيات السفر لجميع المحافظات 🚗",

    passengers: "ركاب",
    luggage: "حقائب",
    automatic: "أوتوماتيك",
    bookThisCar: "احجز هذه السيارة",
    carDetails: "المواصفات والخدمات",

    whyUsBadge: "مميزات خدماتنا",
    whyUsTitle: "لماذا تراث ليموزين خيارك الأول؟",
    whyUsDesc: "نلتزم بأعلى معايير الجودة والرفاهية لضمان رحلة مريحة وآمنة في كل الأوقات.",
    feature1Title: "دقة متناهية بالمواعيد",
    feature1Desc: "نصلك قبل موعدك لضمان وصولك في الوقت المحدد تماماً بدون أي تأخير.",
    feature2Title: "سائقون محترفون VIP",
    feature2Desc: "نخبة من السائقين الخبراء بالطرق، بزي رسمي متميز وأخلاق عالية.",
    feature3Title: "أسطول حديث ومعقم",
    feature3Desc: "جميع السيارات موديلات حديثة ومجهزة بأحدث وسائل الراحة والترفيه.",
    feature4Title: "خدمة 24/7 ودعم مباشر",
    feature4Desc: "فريق خدمة العملاء متواجد على مدار الساعة لتلبية كافة طلباتكم.",

    reviewsBadge: "آراء عملائنا",
    reviewsTitle: "ماذا يقول عملاؤنا عن تراث ليموزين؟",
    review1: "أفضل شركة ليموزين تعاملت معها! سيارة الزفاف مرسيدس S-Class كانت قمة في الفخامة وتزيين الورد كان رائعاً والسائق قمة في الرقي.",
    review1Name: "أحمد ونهى",
    review1Role: "حجز سيارة زفاف",
    review2: "سافرت معهم من القاهرة للأسكندرية بسيارة تويوتا هايس VIP.. الرحلة كانت مريحة جداً والتكييف ممتاز والسائق محترف.",
    review2Name: "د. محمود العوضي",
    review2Role: "سفر عائلي للمحافظات",
    review3: "خدمة توصيل المطار كانت دقيقة جداً والسيارة نظيفة جداً. شكراً تراث ليموزين على الاحترافية.",
    review3Name: "مهندس شريف رفعت",
    review3Role: "تنقلات رجال أعمال",

    modalTitle: "تأكيد طلب الحجز",
    modalSubtitle: "سيتم إرسال كافة تفاصيل الحجز فوراً عبر الواتساب للتأكيد السريع",
    fullName: "الاسم بالكامل",
    phoneNumber: "رقم الهاتف / الواتساب",
    notes: "ملاحظات إضافية / طلبات خاصة",
    submitWhatsApp: "إرسال الحجز عبر الواتساب 💬",

    waTooltip: "تواصل معنا فوراً وحجز رحلتك 01035192651",
    footerAbout: "تراث ليموزين هي الشركة الرائدة في تقديم خدمات الليموزين الفاخرة، سيارات الأفراح والزفاف، وتنقلات السفر بين جميع المحافظات بأعلى جودة وأفضل أسعار.",
    quickLinks: "روابط سريعة",
    contactUs: "معلومات الاتصال",
    phone: "الهاتف / الواتساب: 01035192651",
    address: "جمهورية مصر العربية - خدمة تغطي جميع المحافظات",
    copyright: "جميع الحقوق محفوظة © 2026 تراث ليموزين (Torath Limousine). design & setup completed."
  },
  en: {
    brandName: "Torath Limousine",
    navHome: "Home",
    navFleet: "Car Fleet",
    navWhyUs: "Why Us",
    navReviews: "Reviews",
    navContact: "Contact Us",
    bookNow: "Book Now",
    
    heroBadge: "Luxury & Safety 24/7",
    heroTitle: "First-Class Limousine Experience Designed For You",
    heroSubtitle: "We provide top-tier limousine services, wedding VIP cars, and inter-city travel with a modern 30-car fleet and uncompromised punctuality.",
    exploreFleet: "Explore Fleet (30 Cars)",
    quickBookTitle: "Book Your Ride Instantly",
    selectServiceType: "Select Service Category",
    serviceWedding: "Wedding & VIP Cars",
    serviceTravel: "Inter-City Travel Cars",
    pickupCity: "Pickup City",
    destinationCity: "Destination Governorate",
    pickupDate: "Trip Date",
    pickupTime: "Pickup Time",
    searchCar: "Search car model...",

    fleetBadge: "Torath Limousine Fleet",
    fleetTitle: "Select Your Preferred Vehicle From Our Fleet",
    fleetDesc: "A premium 30-car inventory classified specifically for weddings, special VIP events, and long-distance inter-city travel.",
    
    filterAll: "All (30 Cars)",
    filterWedding: "Wedding & VIP Cars 🌸",
    filterTravel: "Inter-City Travel Cars 🚗",

    passengers: "Passengers",
    luggage: "Bags",
    automatic: "Automatic",
    bookThisCar: "Book This Car",
    carDetails: "Specs & Features",

    whyUsBadge: "Our Advantages",
    whyUsTitle: "Why Choose Torath Limousine?",
    whyUsDesc: "We adhere to the highest standards of luxury and safety to guarantee a smooth journey at all times.",
    feature1Title: "Absolute Punctuality",
    feature1Desc: "We arrive early to ensure you reach your destination on time without any delay.",
    feature2Title: "VIP Professional Chauffeurs",
    feature2Desc: "Experienced drivers in formal suits with top etiquette and route expertise.",
    feature3Title: "Sanitized Modern Fleet",
    feature3Desc: "All vehicles are modern models equipped with premium entertainment and comfort.",
    feature4Title: "24/7 Dedicated Support",
    feature4Desc: "Our customer service team is available around the clock to handle your inquiries.",

    reviewsBadge: "Customer Reviews",
    reviewsTitle: "What Our VIP Clients Say",
    review1: "The best limousine service I have ever used! The Mercedes S-Class wedding car was exceptionally elegant with stunning flower decor.",
    review1Name: "Ahmed & Noha",
    review1Role: "Wedding Car Booking",
    review2: "Traveled from Cairo to Alexandria in a Toyota HiAce VIP van. The ride was super comfortable with ice-cold AC and great driver.",
    review2Name: "Dr. Mahmoud El-Awady",
    review2Role: "Inter-City Family Trip",
    review3: "Airport pickup was prompt and seamless. Clean vehicle and polite driver. Thank you Torath Limousine!",
    review3Name: "Eng. Sherif Refaat",
    review3Role: "Corporate Transfer",

    modalTitle: "Confirm Reservation",
    modalSubtitle: "All trip details will be sent directly via WhatsApp (+201035192651) for immediate confirmation",
    fullName: "Full Name",
    phoneNumber: "Phone / WhatsApp Number",
    notes: "Special Requests / Notes",
    submitWhatsApp: "Send Booking Via WhatsApp 💬",

    waTooltip: "Contact us & book now: +201035192651",
    footerAbout: "Torath Limousine is Egypt's leading luxury transportation provider, specializing in wedding VIP cars and inter-city travel across all governorates.",
    quickLinks: "Quick Links",
    contactUs: "Contact Info",
    phone: "Phone / WhatsApp: +201035192651",
    address: "Egypt - Nationwide Coverage Across All Governorates",
    copyright: "All Rights Reserved © 2026 Torath Limousine."
  }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  applyLanguage(state.lang);
  renderFleetGrid();
  setupEventListeners();
  populateCarDropdown();
});

// --- Theme Controller ---
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('torath_theme', theme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// --- Language Controller ---
function applyLanguage(lang) {
  state.lang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('torath_lang', lang);

  const langBtnText = document.getElementById('langBtnText');
  if (langBtnText) {
    langBtnText.textContent = lang === 'ar' ? 'English' : 'عربي';
  }

  // Translate all DOM elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Re-render fleet grid for translated names & badges
  renderFleetGrid();
}

function toggleLanguage() {
  const newLang = state.lang === 'ar' ? 'en' : 'ar';
  applyLanguage(newLang);
}

// --- Fleet Grid Renderer ---
function renderFleetGrid() {
  const fleetGrid = document.getElementById('fleetGrid');
  const fleetCounter = document.getElementById('fleetCounter');
  if (!fleetGrid) return;

  const isAr = state.lang === 'ar';
  
  // Filter logic
  let filteredCars = FLEET_DATA.filter(car => {
    // Category filter
    if (state.category !== 'all' && car.category !== state.category) {
      return false;
    }
    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = (isAr ? car.name_ar : car.name_en).toLowerCase().includes(q);
      const matchCat = (car.category).toLowerCase().includes(q);
      if (!matchName && !matchCat) return false;
    }
    // Passenger filter
    if (state.passengerFilter !== 'all') {
      const cap = parseInt(state.passengerFilter);
      if (cap === 4 && car.passengers > 4) return false;
      if (cap === 7 && (car.passengers < 5 || car.passengers > 8)) return false;
      if (cap === 14 && car.passengers < 9) return false;
    }
    return true;
  });

  if (fleetCounter) {
    fleetCounter.textContent = `${filteredCars.length} / 30 ${isAr ? 'سيارات متاحة' : 'Cars Available'}`;
  }

  if (filteredCars.length === 0) {
    fleetGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
        <i class="fas fa-car-side" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem;"></i>
        <h3>${isAr ? 'لا توجد سيارات متطابقة مع البحث الحالي' : 'No vehicles match your criteria'}</h3>
        <p style="color: var(--text-muted);">${isAr ? 'يرجى مراجعة خيارات التصفية والبحث' : 'Please adjust your filter or search query'}</p>
      </div>
    `;
    return;
  }

  fleetGrid.innerHTML = filteredCars.map(car => {
    const isWedding = car.category === 'wedding';
    const badgeText = isWedding 
      ? (isAr ? '🌸 زفاف العرايس VIP' : '🌸 Wedding VIP')
      : (isAr ? '🚗 سفر المحافظات' : '🚗 Inter-City Travel');

    const name = isAr ? car.name_ar : car.name_en;
    const trans = isAr ? car.transmission_ar : car.transmission_en;
    const price = isAr ? car.price_ar : car.price_en;
    const features = isAr ? car.features_ar : car.features_en;
    const images = car.images && car.images.length > 0 ? car.images : [car.image];
    const hasMultiple = images.length > 1;

    return `
      <div class="car-card" id="car-card-${car.id}">
        <div class="car-image-box" onclick="openGalleryModal(${car.id})">
          <img src="${images[0]}" id="main-img-${car.id}" alt="${name}" loading="lazy" onError="this.src='assets/images/logo.jpg'">
          <span class="car-badge ${car.category}">${badgeText}</span>
          ${hasMultiple ? `
            <span class="gallery-count-badge" onclick="event.stopPropagation(); openGalleryModal(${car.id})">
              <i class="fas fa-camera"></i> ${images.length} ${isAr ? 'صور متوفرة' : 'Photos'}
            </span>
            <button class="gallery-card-arrow prev" onclick="event.stopPropagation(); changeCardImage(${car.id}, -1)">&rsaquo;</button>
            <button class="gallery-card-arrow next" onclick="event.stopPropagation(); changeCardImage(${car.id}, 1)">&lsaquo;</button>
          ` : ''}
        </div>

        ${hasMultiple ? `
          <div class="car-thumbs-bar">
            ${images.map((imgUrl, idx) => `
              <img src="${imgUrl}" 
                   class="car-thumb ${idx === 0 ? 'active' : ''}" 
                   onclick="selectCardImage(${car.id}, ${idx})" 
                   alt="Angle ${idx + 1}">
            `).join('')}
          </div>
        ` : ''}

        <div class="car-content">
          <h3 class="car-title">${name}</h3>
          <div class="car-specs">
            <div class="spec-item"><i class="fas fa-user-friends"></i> <span>${car.passengers} ${isAr ? 'ركاب' : 'Passengers'}</span></div>
            <div class="spec-item"><i class="fas fa-suitcase"></i> <span>${car.luggage} ${isAr ? 'حقائب' : 'Bags'}</span></div>
            <div class="spec-item"><i class="fas fa-cog"></i> <span>${trans}</span></div>
            <div class="spec-item"><i class="fas fa-shield-alt"></i> <span>VIP Service</span></div>
          </div>
          <div class="car-features-list">
            ${features.slice(0, 4).map(f => `<span class="feature-tag">${f}</span>`).join('')}
          </div>
          <div class="car-footer">
            <span class="car-price">${price}</span>
            <div style="display: flex; gap: 0.5rem;">
              ${hasMultiple ? `
                <button class="btn-outline-gold icon-only-btn" title="معرض الصور" onclick="openGalleryModal(${car.id})">
                  <i class="fas fa-images"></i>
                </button>
              ` : ''}
              <button class="btn-gold" onclick="openBookingModalWithCar(${car.id})">
                <span>${isAr ? 'احجز الآن' : 'Book Now'}</span>
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach swipe gesture listeners to car cards
  filteredCars.forEach(car => {
    const box = document.querySelector(`#car-card-${car.id} .car-image-box`);
    if (box) {
      setupTouchSwipe(
        box,
        () => changeCardImage(car.id, 1),
        () => changeCardImage(car.id, -1)
      );
    }
  });
}


// --- Event Listeners Setup ---
function setupEventListeners() {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Language Toggle
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // Mobile Menu Toggle & Overlay
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        navLinks.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenu);
    }

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Category Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.category = target.getAttribute('data-category');
      renderFleetGrid();
    });
  });

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderFleetGrid();
    });
  }

  // Capacity Filter Select
  const capacityFilter = document.getElementById('capacityFilter');
  if (capacityFilter) {
    capacityFilter.addEventListener('change', (e) => {
      state.passengerFilter = e.target.value;
      renderFleetGrid();
    });
  }

  // Quick Bar Form Submit
  const quickBookForm = document.getElementById('quickBookForm');
  if (quickBookForm) {
    quickBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceType = document.getElementById('quickServiceType')?.value || 'wedding';
      const carSelect = document.getElementById('quickCarSelect')?.value || '';
      openBookingModal(serviceType, carSelect);
    });
  }

  // Modal Form Submit -> WhatsApp API Trigger
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleFormWhatsAppSubmit);
  }

  // Setup Gallery Modal Touch Swipe
  const galleryMainView = document.querySelector('.gallery-main-view');
  if (galleryMainView) {
    setupTouchSwipe(
      galleryMainView,
      () => navigateGallery(1),
      () => navigateGallery(-1)
    );
  }

  // Scroll Handler for Mobile Bottom Nav Highlight
  window.addEventListener('scroll', updateActiveMobileNavItem);
}

// --- Populate Car Dropdowns ---
function populateCarDropdown() {
  const modalCarSelect = document.getElementById('modalCarSelect');
  const quickCarSelect = document.getElementById('quickCarSelect');
  const isAr = state.lang === 'ar';

  const options = FLEET_DATA.map(car => {
    const name = isAr ? car.name_ar : car.name_en;
    return `<option value="${car.id}">${name} (${car.passengers} ${isAr ? 'ركاب' : 'Seats'})</option>`;
  }).join('');

  if (modalCarSelect) modalCarSelect.innerHTML = `<option value="">${isAr ? '-- اختر السيارة المطلوب حجزها --' : '-- Select Car --'}</option>` + options;
  if (quickCarSelect) quickCarSelect.innerHTML = `<option value="">${isAr ? 'أي سيارة متاحة' : 'Any Available Car'}</option>` + options;
}

// --- Booking Modal Logic ---
function openBookingModal(category = 'wedding', carId = null) {
  const backdrop = document.getElementById('bookingModalBackdrop');
  if (!backdrop) return;

  populateCarDropdown();

  const serviceSelect = document.getElementById('modalServiceType');
  const carSelect = document.getElementById('modalCarSelect');

  if (serviceSelect) serviceSelect.value = category;
  if (carSelect && carId) carSelect.value = carId;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openBookingModalWithCar(carId) {
  const car = FLEET_DATA.find(c => c.id === carId);
  if (car) {
    openBookingModal(car.category, car.id);
  } else {
    openBookingModal();
  }
}

function closeBookingModal() {
  const backdrop = document.getElementById('bookingModalBackdrop');
  if (!backdrop) return;
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// --- Form Submit via WhatsApp API (+201035192651) ---
function handleFormWhatsAppSubmit(e) {
  e.preventDefault();

  const isAr = state.lang === 'ar';
  const phoneTarget = "201035192651";

  const carId = document.getElementById('modalCarSelect')?.value;
  const car = FLEET_DATA.find(c => c.id == carId);
  const carName = car ? (isAr ? car.name_ar : car.name_en) : (isAr ? 'لم يتم تحديد سيارة معينة' : 'Not specified');

  const serviceTypeVal = document.getElementById('modalServiceType')?.value;
  const serviceTypeName = serviceTypeVal === 'wedding' 
    ? (isAr ? 'عربيات زفاف العرايس 🌸' : 'Wedding & VIP Cars 🌸')
    : (isAr ? 'عربيات السفر لجميع المحافظات 🚗' : 'Inter-City Travel Cars 🚗');

  const name = document.getElementById('customerName')?.value || '';
  const phone = document.getElementById('customerPhone')?.value || '';
  const pickup = document.getElementById('pickupLocation')?.value || '';
  const destination = document.getElementById('destinationLocation')?.value || '';
  const date = document.getElementById('tripDate')?.value || '';
  const time = document.getElementById('tripTime')?.value || '';
  const notes = document.getElementById('customerNotes')?.value || '';

  // Construct formatted message
  let msg = "";
  if (isAr) {
    msg = `*طلب حجز جديد من موقع تراث ليموزين 🚗✨*\n\n` +
          `👤 *الاسم:* ${name}\n` +
          `📞 *رقم التواصل:* ${phone}\n` +
          `🏷️ *نوع الخدمة:* ${serviceTypeName}\n` +
          `🚘 *السيارة المختارة:* ${carName}\n` +
          `📍 *مكان التحرك:* ${pickup}\n` +
          `🏁 *الوجهة / المحافظة:* ${destination}\n` +
          `📅 *التاريخ:* ${date}\n` +
          `⏰ *الوقت:* ${time}\n` +
          (notes ? `📝 *ملاحظات خاصة:* ${notes}\n` : '') +
          `\n_يرجى تأكيد الحجز وحساب السعر كود #TORATH-LIMOUSINE_`;
  } else {
    msg = `*New Booking Request - Torath Limousine 🚗✨*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `🏷️ *Service:* ${serviceTypeName}\n` +
          `🚘 *Car:* ${carName}\n` +
          `📍 *Pickup:* ${pickup}\n` +
          `🏁 *Destination:* ${destination}\n` +
          `📅 *Date:* ${date}\n` +
          `⏰ *Time:* ${time}\n` +
          (notes ? `📝 *Notes:* ${notes}\n` : '') +
          `\n_Please confirm availability and price quote #TORATH-LIMOUSINE_`;
  }

  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${phoneTarget}?text=${encodedMsg}`;

  closeBookingModal();
  window.open(waUrl, '_blank');
}

// --- Card Direct Image Change ---
function changeCardImage(carId, direction) {
  const car = FLEET_DATA.find(c => c.id === carId);
  if (!car) return;

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  let currentIndex = state.cardImageIndexes[carId] || 0;
  currentIndex = (currentIndex + direction + images.length) % images.length;
  state.cardImageIndexes[carId] = currentIndex;

  const mainImgEl = document.getElementById(`main-img-${carId}`);
  if (mainImgEl) mainImgEl.src = images[currentIndex];

  // Update thumbs active state on card
  const cardEl = document.getElementById(`car-card-${carId}`);
  if (cardEl) {
    const thumbs = cardEl.querySelectorAll('.car-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
  }
}

function selectCardImage(carId, index) {
  state.cardImageIndexes[carId] = index;
  const car = FLEET_DATA.find(c => c.id === carId);
  if (!car) return;

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  const mainImgEl = document.getElementById(`main-img-${carId}`);
  if (mainImgEl) mainImgEl.src = images[index];

  const cardEl = document.getElementById(`car-card-${carId}`);
  if (cardEl) {
    const thumbs = cardEl.querySelectorAll('.car-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
  }
}

// --- Lightbox Gallery Modal Functions ---
function openGalleryModal(carId) {
  const car = FLEET_DATA.find(c => c.id === carId);
  if (!car) return;

  state.activeGalleryCarId = carId;
  state.activeGalleryImageIndex = state.cardImageIndexes[carId] || 0;

  const backdrop = document.getElementById('galleryModalBackdrop');
  const titleEl = document.getElementById('galleryCarTitle');
  const badgeEl = document.getElementById('galleryCategoryBadge');

  const isAr = state.lang === 'ar';
  if (titleEl) titleEl.textContent = isAr ? car.name_ar : car.name_en;
  if (badgeEl) {
    badgeEl.textContent = car.category === 'wedding'
      ? (isAr ? '🌸 زفاف العرايس VIP' : '🌸 Wedding VIP')
      : (isAr ? '🚗 سفر المحافظات' : '🚗 Inter-City Travel');
  }

  updateGalleryModalView();

  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function updateGalleryModalView() {
  const car = FLEET_DATA.find(c => c.id === state.activeGalleryCarId);
  if (!car) return;

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  const idx = state.activeGalleryImageIndex;

  const mainImg = document.getElementById('galleryMainImg');
  const counterText = document.getElementById('galleryCounterText');
  const thumbsTrack = document.getElementById('galleryThumbsTrack');

  const isAr = state.lang === 'ar';

  if (mainImg) {
    mainImg.style.opacity = '0.4';
    mainImg.src = images[idx];
    setTimeout(() => { mainImg.style.opacity = '1'; }, 50);
  }

  if (counterText) {
    counterText.textContent = isAr
      ? `صورة ${idx + 1} من ${images.length}`
      : `Photo ${idx + 1} of ${images.length}`;
  }

  if (thumbsTrack) {
    thumbsTrack.innerHTML = images.map((imgUrl, i) => `
      <div class="gallery-thumb-item ${i === idx ? 'active' : ''}" onclick="selectGalleryImage(${i})">
        <img src="${imgUrl}" alt="Thumbnail ${i + 1}">
      </div>
    `).join('');

    // Auto scroll active thumbnail into view
    const activeThumb = thumbsTrack.children[idx];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}

function navigateGallery(direction) {
  const car = FLEET_DATA.find(c => c.id === state.activeGalleryCarId);
  if (!car) return;

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  const total = images.length;
  state.activeGalleryImageIndex = (state.activeGalleryImageIndex + direction + total) % total;
  updateGalleryModalView();
}

function selectGalleryImage(index) {
  state.activeGalleryImageIndex = index;
  updateGalleryModalView();
}

function closeGalleryModal() {
  const backdrop = document.getElementById('galleryModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function bookFromGallery() {
  const carId = state.activeGalleryCarId;
  closeGalleryModal();
  if (carId) {
    openBookingModalWithCar(carId);
  } else {
    openBookingModal();
  }
}

// --- Touch Swipe Helper ---
function setupTouchSwipe(element, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let startY = 0;

  element.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }, { passive: true });

  element.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const endY = e.changedTouches[0].screenY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Ensure horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (diffX > 0) {
        isRtl ? onSwipeLeft() : onSwipeRight();
      } else {
        isRtl ? onSwipeRight() : onSwipeLeft();
      }
    }
  }, { passive: true });
}

// --- Mobile Bottom Nav Active Link Handler ---
function updateActiveMobileNavItem() {
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item[href]');
  const scrollPos = window.scrollY + 200;

  mobileNavItems.forEach(item => {
    const targetId = item.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const section = document.querySelector(targetId);
    if (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        mobileNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    }
  });
}

