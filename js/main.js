// Función para cambiar entre modo claro y oscuro
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Verificar preferencia guardada
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    // Event listener para el toggle de tema
    themeToggle.addEventListener('change', toggleDarkMode);
    
    // Animación de contador
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animación cuando el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Submenu en móvil
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = item.querySelector('.submenu');
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});
document.querySelector('.comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    // Mostrar el comentario en la consola como prueba
    console.log('Nuevo comentario:', name, email, comment);

    // Opcional: Agregar el comentario a la página dinámicamente
    const commentsContainer = document.querySelector('.comments-container');
    const newComment = `
        <div class="comment">
            <div class="comment-avatar">
                <div class="avatar-placeholder" data-initials="${name.slice(0, 2).toUpperCase()}"></div>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <h4>${name}</h4>
                    <span class="comment-date">Justo ahora</span>
                </div>
                <p>${comment}</p>
                <div class="comment-actions">
                    <a href="#" class="comment-reply">Responder</a>
                    <a href="#" class="comment-like"><i class="fas fa-heart"></i> 0</a>
                </div>
            </div>
        </div>
    `;
    commentsContainer.insertAdjacentHTML('beforeend', newComment);

    // Limpiar el formulario
    this.reset();
});
const filters = document.querySelectorAll('.filter-options input[type="radio"]');
const posts = document.querySelectorAll('.blog-post, .featured-main, .featured-secondary');

filters.forEach(filter => {
    filter.addEventListener('change', function() {
        const category = this.value;
        posts.forEach(post => {
            if (category === 'all' || post.classList.contains(category)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecutar al cargar la página
document.querySelectorAll('.avatar-placeholder').forEach(avatar => {
    const initials = avatar.getAttribute('data-initials');
    avatar.textContent = initials;
});
