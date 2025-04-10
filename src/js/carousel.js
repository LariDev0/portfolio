document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = cards[0].offsetWidth + 30; // Largura do card + gap
    let currentPosition = 0;
    let maxPosition = 0;
    let autoScrollInterval;
    const scrollIntervalTime = 5000; // segundos

    function updateCarousel() {
        const visibleCards = window.innerWidth >= 992 ? 3 : 
                         window.innerWidth >= 768 ? 2 : 1;
        maxPosition = -((cards.length - visibleCards) * cardWidth);
        
        if (currentPosition < maxPosition) currentPosition = maxPosition;
        if (currentPosition > 0) currentPosition = 0;
        
        track.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    function updateButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition <= maxPosition;
    }

    function nextSlide() {
        if (currentPosition > maxPosition) {
            currentPosition -= cardWidth;
        } else {
            // Volta para o primeiro slide
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    function prevSlide() {
        if (currentPosition < 0) {
            currentPosition += cardWidth;
        } else {
            // Vai para o último slide
            currentPosition = maxPosition;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, scrollIntervalTime);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoScroll();
        // Reinicia após 10 segundos sem interação
        setTimeout(startAutoScroll, 10000);
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoScroll();
        setTimeout(startAutoScroll, 10000);
    });

    // Pausa quando o mouse está sobre o carrossel
    document.querySelector('.projects-carousel').addEventListener('mouseenter', stopAutoScroll);
    document.querySelector('.projects-carousel').addEventListener('mouseleave', startAutoScroll);

    // Atualizar ao redimensionar
    window.addEventListener('resize', function() {
        updateCarousel();
    });

    // Inicializar
    updateCarousel();
    startAutoScroll();
});