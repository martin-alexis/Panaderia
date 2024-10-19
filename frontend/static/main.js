/* DESPLAZAMINTO NAVBAR	*/

document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetHref = this.getAttribute('href');

        // Comprobar si el href es un ID o una URL completa
        if (targetHref && targetHref.startsWith('#')) {
            // Si es un ID (comienza con '#'), buscar el elemento por su ID
            const targetElement = document.querySelector(targetHref);

            if (targetElement) {
                const headerHeight = 70; // Altura del encabezado en píxeles
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Si es una URL completa, redirigir a esa URL
            window.location.href = targetHref;
        }
    });
});


/*	SCROLL */
window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("scroll", window.scrollY > 0);
});


/*	MODAL	*/
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-item")) {
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;
        const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
        myModal.show();
    }
})

/*--------------------------------------------------------*/

/*	CARDS DINAMICAS	*/

document.addEventListener("DOMContentLoaded", function () {
    function get_productos() {
        fetch('/api/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let cards = document.getElementById("cards-productos-panaderia");

            data.forEach(d => {
                cards.innerHTML += `
                    <div class="col">
                        <div class="card no-border rounded">
                            <img src="${d.imagen}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${d.nombre}</h5>
                                <p class="card-description">${d.descripcion}</p>
                                <p class="card-text">Disponibilidad: <i class="bi bi-check-circle-fill"></i></p>
                                <p class="precio">$ ${d.precio}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    get_productos();
});
