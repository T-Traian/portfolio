function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Enhanced Intersection Observer for Repeating Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for skills articles
                if (entry.target.classList.contains('article-container')) {
                    const articles = entry.target.querySelectorAll('article');
                    articles.forEach((article, index) => {
                        setTimeout(() => {
                            article.classList.add('slide-in-up');
                        }, index * 50); 
                    });
                }
            } else {
                // Remove animation classes when element leaves viewport
                // This allows animations to replay when scrolling back
                entry.target.classList.remove('animate-in');
                
                if (entry.target.classList.contains('article-container')) {
                    const articles = entry.target.querySelectorAll('article');
                    articles.forEach((article) => {
                        article.classList.remove('slide-in-up');
                    });
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    });

    // Observe sections and key elements
    const elementsToObserve = [
        '#about .section-container',
        '.article-container',
        '.about-containers',
        '.details-container',
        '.position-list'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });
};

// Download CV function
function downloadCV() {
    const link = document.createElement('a');
    link.href = './Assets/CV.pdf';
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});
