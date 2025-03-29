// Calculadora interactiva
document.addEventListener('DOMContentLoaded', function() {
    const loanAmountSlider = document.getElementById('loan-amount');
    const loanAmountInput = document.getElementById('loan-amount-input');
    const interestRateSlider = document.getElementById('interest-rate');
    const interestRateInput = document.getElementById('interest-rate-input');
    const loanTermSelect = document.getElementById('loan-term');
    
    // Sincronizar sliders con inputs
    loanAmountSlider.addEventListener('input', function() {
        loanAmountInput.value = this.value;
        calculatePayment();
    });
    
    loanAmountInput.addEventListener('input', function() {
        loanAmountSlider.value = this.value;
        calculatePayment();
    });
    
    interestRateSlider.addEventListener('input', function() {
        interestRateInput.value = this.value;
        calculatePayment();
    });
    
    interestRateInput.addEventListener('input', function() {
        interestRateSlider.value = this.value;
        calculatePayment();
    });
    
    loanTermSelect.addEventListener('change', calculatePayment);
    
    // Función para calcular el pago mensual
    function calculatePayment() {
        const principal = parseFloat(loanAmountInput.value);
        const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
        const loanTerm = parseInt(loanTermSelect.value) * 12;
        
        // Calcular pago mensual
        const x = Math.pow(1 + interestRate, loanTerm);
        const monthlyPayment = (principal * x * interestRate) / (x - 1);
        
        // Calcular totales
        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - principal;
        
        // Actualizar UI
        document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById('total-payment').textContent = '$' + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById('total-interest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Calcular inicialmente
    calculatePayment();
});



// Form submission handler
document.getElementById('mortgage-lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        propertyValue: document.getElementById('property-value').value,
        loanAmount: document.getElementById('loan-amount-desired').value,
        loanTerm: document.getElementById('loan-term-desired').value,
        bestTime: document.getElementById('best-time').value,
        privacyAgreement: document.getElementById('privacy-agreement').checked
    };
    
    // Here you would typically send the data to your server
    console.log('Form data:', formData);
    
    // Show success message (in a real scenario, you'd check the response first)
    alert('¡Gracias por tu solicitud! Un asesor hipotecario se pondrá en contacto contigo en menos de 24 horas.');
    
    // Reset form
    this.reset();
});


// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link (for single page navigation)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Scroll Animation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    // Función para verificar si un elemento está en el viewport
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };
    
    // Función para manejar las animaciones al hacer scroll
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el, 100)) {
                el.classList.add('scroll-animate');
            }
        });
    };
    
    // Ejecutar al cargar la página
    window.addEventListener('load', () => {
        handleScrollAnimation();
    });
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Opcional: Reiniciar animaciones al cambiar de tamaño de ventana
    window.addEventListener('resize', () => {
        scrollElements.forEach(el => {
            if (!elementInView(el, 100)) {
                el.classList.remove('scroll-animate');
            }
        });
        setTimeout(handleScrollAnimation, 300);
    });
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Mostrar después de 300px de scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll suave al hacer clic
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Opcional: Si ya tienes una función throttle, úsala aquí
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };
    
    // Usar throttle para el evento scroll
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));
});