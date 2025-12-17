// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should fade in on scroll
document.querySelectorAll('section > div').forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
});

// Reset hero section opacity (it should be visible immediately)
const heroContent = document.querySelector('#hero > div');
if (heroContent) {
    heroContent.style.opacity = '1';
}

// Navbar background on scroll
const navbar = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
    } else {
        navbar.classList.remove('shadow-sm');
    }
    lastScrollY = window.scrollY;
});

// Gallery lightbox functionality (for future use when images are added)
const galleryItems = document.querySelectorAll('#gallery .grid > div');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Placeholder for lightbox functionality
        // Will be activated when real images are added
        console.log('Gallery item clicked - add your images to enable lightbox');
    });
});

// Gallery "See More" functionality with mock API
const loadMoreBtn = document.getElementById('load-more-gallery');
const galleryGrid = document.querySelector('#gallery .grid');
let galleryPage = 1;
const maxPages = 3; // Maximum number of times to load more

// Mock API function that simulates fetching more gallery items
async function fetchMoreGalleryItems() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock response - in production, this would be a real API call
    const mockItems = [
        { type: 'image', id: galleryPage * 4 + 1 },
        { type: 'image', id: galleryPage * 4 + 2 },
        { type: 'video', id: galleryPage * 4 + 3 },
        { type: 'image', id: galleryPage * 4 + 4 },
    ];

    return mockItems;
}

// Create gallery item HTML
function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'aspect-square bg-gray-200 rounded-xl overflow-hidden group cursor-pointer opacity-0 transition-opacity duration-500';

    const isVideo = item.type === 'video';
    const iconPath = isVideo
        ? 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        : 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';

    div.innerHTML = `
        <div class="w-full h-full flex items-center justify-center text-gray-400 group-hover:bg-gray-300 transition-colors">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${iconPath}"></path>
            </svg>
        </div>
    `;

    // Fade in after a short delay
    setTimeout(() => {
        div.classList.remove('opacity-0');
        div.classList.add('opacity-100');
    }, 50);

    return div;
}

if (loadMoreBtn && galleryGrid) {
    loadMoreBtn.addEventListener('click', async () => {
        // Show loading state
        const btnText = loadMoreBtn.querySelector('span');
        const originalText = btnText.textContent;
        btnText.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');

        try {
            // Fetch more items (mock API call)
            const newItems = await fetchMoreGalleryItems();

            // Add new items to gallery
            newItems.forEach((item, index) => {
                setTimeout(() => {
                    const element = createGalleryItem(item);
                    galleryGrid.appendChild(element);
                }, index * 100); // Stagger the additions
            });

            galleryPage++;

            // Hide button if we've reached max pages
            if (galleryPage >= maxPages) {
                loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading gallery items:', error);
        } finally {
            // Reset button state
            btnText.textContent = originalText;
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}
