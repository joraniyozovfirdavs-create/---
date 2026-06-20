// ====== HEADER ======

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');
    if (!header) return;

    // --- IKKI TOMONLAMA SKROL VA SAHIFANI KUZATISH ---
    const handleHeaderAnimation = () => {
        // window.scrollY === 0 degani foydalanuvchi eng tepada turibdi degani
        if (window.scrollY < 50) {
            // Sayt ochilganda yoki foydalanuvchi eng tepaga qaytib chiqqanda
            header.classList.add('animated');
        } else {
            // Foydalanuvchi pastga skrol qilib tushib ketganda holatni qayta tiklaymiz (reset)
            header.classList.remove('animated');
        }
    };

    // 1. Sayt birinchi marta yuklanganda darhol ishga tushadi
    setTimeout(handleHeaderAnimation, 100);

    // 2. Skrol bo'layotgan jarayonni tinimsiz kuzatib boradi
    window.addEventListener('scroll', handleHeaderAnimation);
});

// ====== /HEADER ======

const dropdown = document.querySelector('.location-dropdown');
const trigger = document.getElementById('locationTrigger');
const currentCityText = document.getElementById('currentCity');
const items = document.querySelectorAll('.dropdown-item');

// Menyu bosilganda ochilishi va yopilishi
trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
});

// Ro'yxatdan shahar tanlanganda ishlaydigan funksiya
items.forEach(item => {
    item.addEventListener('click', () => {
        // Faol (active) klassni yangilash
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Matnni o'zgartirish
        const selectedCity = item.getAttribute('data-city');
        currentCityText.textContent = selectedCity;

        // Menyuni yopish
        dropdown.classList.remove('open');
    });
});

// Ekran bo'sh joyi bosilganda menyuni avtomatik yopish
document.addEventListener('click', () => {
    dropdown.classList.remove('open');
});



// ====== INPUT ====== ANIMATSIYA

document.addEventListener("DOMContentLoaded", () => {
    const searchWrapper = document.querySelector('.search-field-wrapper');
    const searchInput = searchWrapper ? searchWrapper.querySelector('input') : null;

    if (searchInput && searchWrapper) {
        // HTML ichidagi placeholder matnini o'qib, o'rniga yangi span yaratamiz
        const placeholderText = searchInput.getAttribute('placeholder');
        searchInput.removeAttribute('placeholder'); // Asl nusxasini tozalaymiz

        const label = document.createElement('span');
        label.classList.add('dynamic-placeholder');
        label.textContent = placeholderText;
        searchWrapper.appendChild(label);

        // Ichida matn bor-yo'qligini tekshirish funksiyasi
        const checkValue = () => {
            if (searchInput.value.trim() !== "") {
                searchWrapper.classList.add('has-value');
            } else {
                searchWrapper.classList.remove('has-value');
            }
        };

        searchInput.addEventListener('input', checkValue);
        searchInput.addEventListener('blur', checkValue);
    }
});

// ====== /INPUT ====== ANIMATSIYA



// ====== HERO ====== ANIMATSIYA

document.addEventListener("DOMContentLoaded", () => {
    const heroContainer = document.querySelector('.hero .container');

    if (heroContainer) {
        // Har safar ekranga kirganda va chiqqanda kuzatadigan observer yaratamiz
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Agar element ko'rinayotgan bo'lsa (tepadan tushsa ham, pastdan chiqsa ham)
                    heroContainer.classList.add('loaded');
                } else {
                    // Element ekrandan chiqib ketishi bilan klassni olib tashlaymiz
                    heroContainer.classList.remove('loaded');
                }
            });
        }, {
            threshold: 0.1 // Konteynerning 10% qismi ko'rinishi bilan animatsiya ishlaydi
        });

        // Kuzatishni boshlaymiz
        observer.observe(heroContainer);
    }
});

// ====== /HERO ====== ANIMATSIYA



// ====== HERO --- DATA-TARGET === ANIMATSIYASI

document.addEventListener("DOMContentLoaded", () => {
    // .hero_end ichidagi barcha reyting qiymatlarini olamiz
    const ratingValues = document.querySelectorAll('.hero_end .rating-value');

    if (ratingValues.length === 0) return;

    // Raqamlarni noldan boshlab o'sib borishini ta'minlovchi funksiya
    const animateRating = (element) => {
        const target = parseFloat(element.getAttribute('data-target')); // Masalan: 4.9 yoki 5.0
        let start = 0.0;
        const duration = 3000; // Animatsiya davomiyligi (3 soniya)
        const stepTime = 30; // Har bir qadam oralig'i (millisaniya)
        const steps = duration / stepTime;
        const increment = target / steps;
        let currentStep = 0;

        const counter = setInterval(() => {
            currentStep++;
            start += increment;

            if (currentStep >= steps) {
                clearInterval(counter);
                element.textContent = target.toFixed(1); // Oxirida aniq qiymatni yozish (4.9)
            } else {
                element.textContent = start.toFixed(1); // Kasr qismini 1 ta raqam bilan ko'rsatish
            }
        }, stepTime);

        // Taymerni elementning o'zida saqlab qo'yamiz (kerak bo'lsa tozalash uchun)
        element.activeCounter = counter;
    };

    // --- SKROLNI KUZATISH (UP & DOWN) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;

            if (entry.isIntersecting) {
                // Agar eski taymer ishlab turgan bo'lsa, uni to'xtatamiz
                if (element.activeCounter) clearInterval(element.activeCounter);

                // Element ekranga kelganda animatsiyani boshlaymiz
                animateRating(element);
            } else {
                // Element ekrandan chiqib ketganda (tepaga yoki pastga) qiymatni qayta 0.0 qilamiz
                if (element.activeCounter) clearInterval(element.activeCounter);
                element.textContent = "0.0";
            }
        });
    }, { threshold: 0.1 }); // Elementning 10% qismi ko'rinsa ham ishga tushadi

    // Har bir reyting raqamini kuzatuvga olamiz
    ratingValues.forEach(val => observer.observe(val));
});

// ====== /HERO --- DATA-TARGET === ANIMATSIYASI



// ====== SECTION_1 ====== ANIMATSIYA

document.addEventListener("DOMContentLoaded", () => {
    // 1. Sarlavhani kuzatish
    const topObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show'); // Qayta scroll bo'lganda ishlashi uchun
            }
        });
    }, { threshold: 0.2 });

    const sectionTop = document.querySelector('.section_1--top');
    if (sectionTop) topObserver.observe(sectionTop);


    // 2. Kartochkalarni ketma-ket (delay bilan) chiqarish
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Har bir kartochka sal kechikib chiqadi (0ms, 150ms, 300ms...)
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150);
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1 // Kartochkaning 10% qismi ko'rinishi bilan animatsiya boshlanadi
    });

    const cards = document.querySelectorAll('.end_card');
    cards.forEach(card => cardsObserver.observe(card));
});

// ====== /SECTION_1 ====== ANIMATSIYA



// ====== SECTION_2 ====== ANIMATSIYA

document.addEventListener("DOMContentLoaded", () => {
    // 1. Section_2 sarlavhasini kuzatish
    const section2TopObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.2 });

    const section2Top = document.querySelector('.section_2--top');
    if (section2Top) section2TopObserver.observe(section2Top);


    // 2. Ichki kartochkalarni (1 dan 5 gacha) ketma-ket chiqarish
    const wrapperObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // wrapper ichidagi barcha kartochkalarni topamiz
                const innerCards = entry.target.querySelectorAll('.card_1, .card_2, .card_3, .card_4, .card_5');

                innerCards.forEach((card, index) => {
                    // Har bir karta tartib raqamiga qarab 150ms kechikish bilan chiqadi
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 150);
                });
            } else {
                // Foydalanuvchi qaytib tepaga chiqib ketganda klasslarni tozalash
                const innerCards = entry.target.querySelectorAll('.card_1, .card_2, .card_3, .card_4, .card_5');
                innerCards.forEach(card => card.classList.remove('show'));
            }
        });
    }, {
        threshold: 0.15
    });

    // Kartochkalarni o'rab turgan asosiy konteynerni kuzatamiz
    const cardWrapper = document.querySelector('.section_2 .card_wrapper');
    if (cardWrapper) wrapperObserver.observe(cardWrapper);
});

// ====== /SECTION_2 ====== ANIMATSIYA



// ====== SECTION_3 ====== ANIMATSIYA

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.section_3');
    if (!section) return;

    const container = section.querySelector('.container');
    const wrapper = container.querySelector('.section_3--end_cards_wrapper');
    const buttons = container.querySelectorAll('.cards_btn button');

    let pauseTimeout;
    let isTransitioning = false;

    // --- 1. SKROLNI KUZATISH (UP & DOWN) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('animated');
                wrapper.classList.add('start-floating');
                animateNumbers();
            } else {
                section.classList.remove('animated');
                wrapper.classList.remove('start-floating');
            }
        });
    }, { threshold: 0.15 });

    observer.observe(section);

    // --- 2. QARAMA-QARSHI TRANSITSIYA MANTIQI ---
    function moveCards(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        wrapper.classList.add('paused-floating');
        clearTimeout(pauseTimeout);

        const cards = wrapper.querySelectorAll('.card');
        if (cards.length === 0) return;

        const cardWidth = cards[0].getBoundingClientRect().width + 20;

        cards.forEach(card => {
            card.style.animation = 'none'; // Suzishni vaqtincha to'xtatish
        });

        if (direction === 'next') {
            // O'NG TUGMA: Kartalar silliq CHAPGA yuradi (1-karta oxiriga o'tadi)
            cards.forEach(card => {
                card.style.transition = 'transform 0.3s ease-out';
                card.style.transform = `translateX(-${cardWidth}px) `;
            });

            setTimeout(() => {
                wrapper.appendChild(cards[0]); // 1-kartani oxiriga qo'shish
                resetStyles(wrapper.querySelectorAll('.card'));
            }, 300);

        } else if (direction === 'prev') {
            // CHAP TUGMA: Kartalar silliq O'NGGA yuradi (Oxirgi karta boshiga o'tadi)
            const lastCard = cards[cards.length - 1];
            wrapper.insertBefore(lastCard, cards[0]); // Oxirgi kartani darhol boshiga qo'shish

            const updatedCards = wrapper.querySelectorAll('.card');

            // Sakrash effekti ko'rinmasligi uchun boshlang'ich pozitsiyani chapga surib turamiz
            updatedCards.forEach(card => {
                card.style.transition = 'none';
                card.style.transform = `translateX(-${cardWidth}px)`;
            });

            // Ketidan 0.3s ichida o'ngga qarab o'z joyiga (0 pozitsiyasiga) qaytaramiz
            setTimeout(() => {
                updatedCards.forEach(card => {
                    card.style.transition = 'transform 0.3s ease-out';
                    card.style.transform = 'translateX(0)';
                });
            }, 35);

            setTimeout(() => {
                resetStyles(updatedCards);
            }, 340);
        }

        // --- 3. 2 SONIYADAN KEYIN DOIMIY SUZISHNI TIKLASH ---
        pauseTimeout = setTimeout(() => {
            wrapper.classList.remove('paused-floating');
            const currentCards = wrapper.querySelectorAll('.card');
            currentCards.forEach(card => {
                card.style.animation = ''; // SCSS dagi floatLeftScroll animatsiyasi qaytadi
                card.style.transition = '';
                card.style.transform = '';
            });
            isTransitioning = false;
        }, 2000);
    }

    function resetStyles(elements) {
        elements.forEach(el => {
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
        isTransitioning = false;
    }

    // --- 4. TUGMALAR HODISASI ---
    if (buttons.length >= 2) {
        buttons[0].addEventListener('click', () => moveCards('prev')); // Chap o'q -> Kartalar o'ngga yuradi
        buttons[1].addEventListener('click', () => moveCards('next')); // O'ng o'q -> Kartalar chapga yuradi
    }

    // --- 5. RAQAMLARNI SANASH ---
    function animateNumbers() {
        const dataElements = container.querySelectorAll('.top_data-target_box .data span');
        const targets = [2004, 2, 30000];
        const suffixes = ['г', ' из 100', '+'];

        dataElements.forEach((el, index) => {
            let start = 0;
            let end = targets[index];
            let duration = 1500;
            let steps = 40;
            let currentStep = 0;
            let increment = end / steps;

            let counter = setInterval(() => {
                currentStep++;
                start += increment;

                if (currentStep >= steps) {
                    clearInterval(counter);
                    if (index === 1) el.textContent = `2${suffixes[index]}`;
                    else el.textContent = Math.floor(end).toLocaleString('ru-RU') + suffixes[index];
                } else {
                    if (index === 1) el.textContent = `${Math.floor(start)} из 100`;
                    else el.textContent = Math.floor(start).toLocaleString('ru-RU') + suffixes[index];
                }
            }, duration / steps);
        });
    }
});

// ====== /SECTION_3 ====== ANIMATSIYA



// ====== SECTION_4 ====== 

document.addEventListener("DOMContentLoaded", () => {
    const section4 = document.querySelector('.section_4');

    if (!section4) return;

    // Ikki tomonlama skrolni mukammal kuzatish (Up & Down)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Sayt yuklanib, skrol qilib kelganda Yoki pastdan tepaga qaytganda
                section4.classList.add('animated');
            } else {
                // Blok ekrandan butunlay chiqib ketganda animatsiyani qayta tiklaymiz (reset)
                section4.classList.remove('animated');
            }
        });
    }, {
        // 0.15 qiymati effektning juda aniq va sezgir ishlashini ta'minlaydi
        threshold: 0.15
    });

    observer.observe(section4);
});

// ====== SECTION_4 ======



// ====== SECTION_5 ======

document.addEventListener("DOMContentLoaded", () => {
    const section5 = document.querySelector('.section_5');

    if (!section5) return;

    // Element ekranga kirganini va chiqqanini kuzatish (Up & Down)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Sahifa skrol qilib kelganda yoki pastdan qayta tepaga chiqilganda
                section5.classList.add('animated');
            } else {
                // Ekrandan butunlay chiqib ketganda effektni qayta tushiramiz (reset)
                section5.classList.remove('animated');
            }
        });
    }, {
        // Blokning 15% qismi ekranda ko'rinsa, harakat darhol boshlanadi
        threshold: 0.15
    });

    observer.observe(section5);
});

// ====== /SECTION_5 ======



//  ====== SECTION_6 ======

document.addEventListener("DOMContentLoaded", () => {
    const section6 = document.querySelector(".section_6");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section6.classList.add("visible");
            } else {
                section6.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.15
    });

    if (section6) {
        observer.observe(section6);
    }
});

// ====== SECTION_6 ======



// ====== SECTION_7 ======

document.addEventListener("DOMContentLoaded", () => {
    const section7 = document.querySelector(".section_7");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section7.classList.add("visible");
            } else {
                section7.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.15 // Blokning 15% qismi ko'rinsa animatsiya ishlaydi
    });

    if (section7) {
        observer.observe(section7);
    }
});

// ====== /SECTION_7 ======



// ====== SECTION_8 ======

document.addEventListener("DOMContentLoaded", () => {
    // === 1. SKROLL KUZATUVCHISI ===
    const section8 = document.querySelector(".section_8");

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.15 });

    if (section8) scrollObserver.observe(section8);


    // === 2. KARTALAR SLIDERI ===
    const cards = document.querySelectorAll(".section_8_right--cards_wrapper .card");
    const btnPrev = document.querySelector(".left_bottom .btn_1");
    const btnNext = document.querySelector(".left_bottom .btn_2");
    let currentIndex = 0;

    if (cards.length > 0) {
        cards[0].classList.add("active-card");
    }

    function showCard(index) {
        cards.forEach(card => card.classList.remove("active-card"));
        cards[index].classList.add("active-card");
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            currentIndex++;
            if (currentIndex >= cards.length) currentIndex = 0;
            showCard(currentIndex);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = cards.length - 1;
            showCard(currentIndex);
        });
    }
});

// ====== /SECTION_8 ======



// ====== SECTION_9 ======

document.addEventListener("DOMContentLoaded", () => {
    // Asosiy section_9 elementini tanlab olamiz
    const section9 = document.querySelector(".section_9");

    // Skrollni kuzatish uchun observer yaratamiz
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element ekranga kirganda .animated klassi qo'shiladi
                entry.target.classList.add("animated");
            } else {
                // Element ekrandan chiqib ketganda klass o'chiriladi (qayta animatsiya bo'lishi uchun)
                entry.target.classList.remove("animated");
            }
        });
    }, {
        // Blokning kamida 15% qismi ekranda ko'rinsa animatsiya ishga tushadi
        threshold: 0.15
    });

    // Kuzatuvni boshlaymiz
    if (section9) {
        observer.observe(section9);
    }
});

// ====== /SECTION_9 ======



// ====== SECTION_10 ======

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Ekran maydoniga kirganda animatsiya klassi qo'shiladi
            entry.target.classList.add('animated');
        } else {
            // Ekrandan chiqib ketganda klass o'chiriladi (qayta kirganda animatsiya takrorlanishi uchun)
            entry.target.classList.remove('animated');
        }
    });
}, {
    threshold: 0.1 // Blokning 10% qismi ko'rinishi bilan ishga tushadi
});

// Kuzatishni boshlash
document.querySelectorAll('.section_10').forEach((section) => {
    observer.observe(section);
});

// ====== /SECTION_10 ======



// ====== SECTION_11 ====== 

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".section_11");

    const observerOptions = {
        root: null,
        // 0.2 -> 20% ko'rinsa kiradi, 0.8 -> 80% ko'rinsa ham tekshiradi
        threshold: [0.2, 0.8]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Seksiyaning kamida 20% qismi ekranda ko'rinib turgan bo'lsa, animatsiyani saqlab qoladi
            if (entry.intersectionRatio >= 0.2) {
                section.classList.add("animated");
            } else {
                // Faqat 20% dan kam qismi qolgandagina (ekrandan deyarli chiqib ketganda) o'chadi
                section.classList.remove("animated");
            }
        });
    }, observerOptions);

    if (section) {
        observer.observe(section);
    }
});

// ====== /SECTION_11 ======



// ====== SECTION_12 ======

document.addEventListener("DOMContentLoaded", () => {
    const section12 = document.querySelector(".section_12");

    const observerOptions = {
        root: null,
        threshold: [0.2, 0.8] // 20% ko'rinsa kiradi, ekrandan deyarli chiqib ketguncha o'chmaydi
    };

    const observer12 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Seksiyaning kamida 20% qismi ekranda tursa klass saqlanadi
            if (entry.intersectionRatio >= 0.2) {
                section12.classList.add("animated");
            } else {
                // Ekrandan deyarli chiqib ketganda (pastga yoki tepaga skrol bo'lganda) o'chadi
                section12.classList.remove("animated");
            }
        });
    }, observerOptions);

    if (section12) {
        observer12.observe(section12);
    }
});

// ====== /SECTION_12 ======



// ====== SECTION_13 ======

document.addEventListener("DOMContentLoaded", () => {
    // 1. AKORDEON TUGMASI (SILLIQ VA SAKRASHLARSIZ OCHILISHI)
    const faqItems = document.querySelectorAll(".section_13 .faq_item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq_question");
        const answer = item.querySelector(".faq_answer");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Boshqa ochiq akordeonlarni silliq yopish
            faqItems.forEach(el => {
                el.classList.remove("active");
                el.querySelector(".faq_answer").style.height = "0px";
            });

            // Agar yopiq bo'lsa, aniq balandligini o'lchab ochamiz
            if (!isActive) {
                item.classList.add("active");
                // scrollHeight elementning ichidagi matni bilan birga haqiqiy balandligini beradi
                answer.style.height = answer.scrollHeight + "px";
            }
        });
    });

    // 2. SKROL ANIMATSIYASI (TEPAGA VA PASTGA QAYTGANDA HAM ISHLAYDI)
    const section13 = document.querySelector(".section_13");

    const observerOptions = {
        root: null,
        threshold: [0.1, 0.85] // 10% ekranda ko'rinsa ochiladi, 85% chiqib ketsa yopiladi
    };

    const observer13 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.1) {
                section13.classList.add("animated");
            } else {
                // Skrol tepaga yoki juda pastga ketganda animatsiya qayta tiklanadi
                section13.classList.remove("animated");
            }
        });
    }, observerOptions);

    if (section13) {
        observer13.observe(section13);
    }
});
// ====== /SECTION_13 ====== 



// ====== SECTION_MAP ======

// --- YANDEX XARITASI QISMI ---
if (typeof ymaps !== 'undefined') {
    ymaps.ready(initYandexMap);
}

function initYandexMap() {
    var myMap = new ymaps.Map("map", {
        center: [55.751244, 37.618423],
        zoom: 12,
        controls: ['zoomControl']
    });

    var points = [
        { coords: [55.760205, 37.577038], text: "м. Краснопресненская / Баррикадная / ул. 1905 года" },
        { coords: [55.757388, 37.658212], text: "м. Курская / Чкаловская" },
        { coords: [55.729574, 37.610587], text: "м. Октябрьская" }
    ];

    points.forEach(function (point) {
        var placemark = new ymaps.Placemark(point.coords, {
            balloonContent: `
                <div class="map-balloon-content">
                    <h4>${point.text}</h4>
                    <a href="https://yandex.ru/maps" target="_blank">Как проехать</a>
                </div>
            `
        }, {
            preset: 'islands#orangeDotIcon',
            iconColor: '#E96D43',
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -40]
        });

        myMap.geoObjects.add(placemark);
    });

    myMap.behaviors.disable('scrollZoom');
}

// --- XAVFSIZ SKROL ANIMATSIYASI ---
document.addEventListener("DOMContentLoaded", () => {
    const mapSection = document.querySelector(".section_map");

    if (mapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Blok ekranga kirganda animatsiya bilan ochiladi
                    mapSection.classList.add("animate-in");
                } else {
                    // Blok ekrandan chiqqandagina animatsiyaga tayyorlanadi va yashiriladi.
                    // Bu usul sahifa ilk bor ochilganda H2 ko'rinmasdan qolishini oldini oladi.
                    mapSection.classList.add("ready-for-anim");
                    mapSection.classList.remove("animate-in");
                }
            });
        }, {
            threshold: 0.1 // Bo'limning 10% qismi ko'rinsa animatsiya ishlaydi
        });

        observer.observe(mapSection);
    }
});

// ====== /SECTION_MAP ====== 



// ====== FOOTER ======

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".main-footer");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Footer ekranga kirganda (pastdan tepaga yoki tepadan pastga)
                footer.classList.add("animate-in");
            } else {
                // Footer ekrandan chiqib ketganda animatsiyani qayta tiklash
                footer.classList.remove("animate-in");
            }
        });
    }, {
        // 0.1 yani footerning 10% qismi ekranda ko'rinsa ham animatsiya ishlaydi
        threshold: 0.3
    });

    observer.observe(footer);
});

// ====== /FOOTER ======



document.addEventListener('DOMContentLoaded', () => {

    // 1. TEPAGA CHIQISH (SCROLL TO TOP) TUGMASI
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            // Sahifa 300 pikseldan pastga tushganda tugmani ko'rsatish
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        // Tugma bosilganda tepaga silliq (smooth) chiqish
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 2. AKKORDEON MENYU (MOBIL QURILMALAR UCHUN ELEMENTLARNI OCHIB-YOPISH)
    const triggers = document.querySelectorAll('.toggle-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            // Faqat kichik ekranlarda ishlashi uchun (masalan, 768px dan kichik)
            if (window.innerWidth <= 768) {
                const content = this.nextElementSibling;
                const arrow = this.querySelector('.arrow-icon');

                // Element ochiq yoki yopiqligini tekshirish
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                } else {
                    // Boshqa ochiq elementlarni yopish (ixtiyoriy)
                    document.querySelectorAll('.accordion-content').forEach(el => el.style.maxHeight = null);
                    document.querySelectorAll('.arrow-icon').forEach(el => el.style.transform = 'rotate(0deg)');

                    // Tanlanganini ochish
                    content.style.maxHeight = content.scrollHeight + "px";
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Ekran o'lchami o'zgarganda akkordeon stillarini tozalash
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.accordion-content').forEach(el => el.style.maxHeight = null);
            document.querySelectorAll('.arrow-icon').forEach(el => el.style.transform = 'rotate(0deg)');
        }
    });

});