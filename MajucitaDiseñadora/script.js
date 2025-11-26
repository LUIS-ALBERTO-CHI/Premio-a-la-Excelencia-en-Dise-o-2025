// --- 1. Confeti Automático al Iniciar ---
// Lanza un poco de confeti suave cuando se carga la página
window.onload = function() {
    launchConfetti(1500);
};


// --- 2. Lógica del Botón "Reclamar Premio" ---
const claimBtn = document.getElementById('claim-button');
const trophyElement = document.getElementById('trophy-element');

claimBtn.addEventListener('click', function() {
    // a) Cambiar el texto y estilo del botón
    this.innerText = "¡Premio Aceptado, Te amo!! 🎉";
    this.classList.add('accepted');
    
    // b) Hacer que el trofeo vibre de emoción
    trophyElement.classList.add('celebrating');
    setTimeout(() => {
        trophyElement.classList.remove('celebrating');
    }, 1000); // Deja de vibrar después de 1 segundo

    // c) Lanzar la GRAN explosión de confeti
    explosiveConfetti();
});


// --- 3. Efecto 3D Interactivo (Sigue al ratón) ---
// Solo se activa en pantallas grandes (no móviles) para evitar problemas
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
        const trophyArea = document.getElementById('trophy-area');
        const trophy = document.getElementById('trophy-element');
        
        // Obtener las dimensiones y posición del área del trofeo
        let rect = trophyArea.getBoundingClientRect();
        // Calcular el centro del área
        let centerX = rect.left + rect.width / 2;
        let centerY = rect.top + rect.height / 2;
        
        // Calcular la distancia del ratón al centro
        let mouseX = e.clientX - centerX;
        let mouseY = e.clientY - centerY;
        
        // Calcular los grados de rotación (máximo 15 grados para que sea sutil)
        let rotateX = (mouseY / rect.height / 2) * -15; // Invertido para que se incline correctamente
        let rotateY = (mouseX / rect.width / 2) * 15;

        // Aplicar la transformación
        trophy.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reiniciar la posición cuando el ratón sale de la ventana
    document.addEventListener('mouseleave', function() {
        const trophy = document.getElementById('trophy-element');
        trophy.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}


// --- 4. El Mensaje Secreto (Easter Egg) ---
const secretBtn = document.getElementById('secret-btn');
const secretMsg = document.getElementById('secret-msg');

secretBtn.addEventListener('click', function() {
    secretMsg.classList.toggle('hidden');
    // Lanza un poquito de confeti de corazones si lo encuentras
    confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        shapes: ['heart'],
        colors: ['#ff6b81', '#ff4757']
    });
});


// --- Funciones de Utilidad para el Confeti ---

// Función para confeti suave (al inicio)
function launchConfetti(duration) {
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { return clearInterval(interval); }
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ffb6c1', '#ffd700', '#ffffff'] }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffb6c1', '#ffd700', '#ffffff'] }));
    }, 250);
}

// Función para explosión grande (al hacer clic)
function explosiveConfetti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        colors: ['#ffb6c1', '#ffd700', '#ffffff', '#ff69b4'] // Añadido un rosa más fuerte
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}