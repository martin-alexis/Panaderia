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


/*	CARDS	*/
document.addEventListener('DOMContentLoaded', function () {
    const busqueda = document.getElementById('busqueda');
    const cardsContainer = document.getElementById('cards-productos');
    const disponibleCheck = document.getElementById('disponibleCheck');
    const agotadoCheck = document.getElementById('agotadoCheck');
    const categoria = cardsContainer.getAttribute('data-categoria');
    let timeoutId;

    function getFilters() {
        const precioMin = document.getElementById('precioMin').value || '';
        const precioMax = document.getElementById('precioMax').value || '';

        return {
            precioMin,
            precioMax,
            disponibleCheck: disponibleCheck.checked,
            agotadoCheck: agotadoCheck.checked,
        };
    }

    function renderProducts(data, container) {
        container.innerHTML = ''; // Limpiar resultados anteriores
        let html = ''; // HTML acumulado

        data.forEach(d => {
            const icono = d.disponibilidad === "AGOTADO"
                ? "bi bi-x-circle-fill text-danger"
                : "bi bi-check-circle-fill text-success";

            html += `
                <div class="col">
                    <div class="card product-card">
                        <img src="${d.imagen}" class="card-img-top" alt="${d.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${d.nombre}</h5>
                            <p class="card-text unidad">${d.unidad}</p>
                            <div class="d-flex align-items-center">
                                <i class="${icono} me-2"></i>
                                <span>${d.disponibilidad}</span>
                            </div>
                            <p class="precio">$ ${d.precio.toLocaleString()}</p>
                        </div>
                    </div>
                </div>`;
        });

        container.innerHTML = html; // Insertar HTML acumulado
    }

    function buscarProductos(searchTerm = '') {
        const { precioMin, precioMax, disponibleCheck, agotadoCheck } = getFilters();

        // Construir los parámetros de la consulta
        const params = new URLSearchParams({
            termino: searchTerm,
            precio_min: precioMin,
            precio_max: precioMax,
            disponible: disponibleCheck,
            agotado: agotadoCheck,
            categoria // Añadir categoría a los parámetros
        });

        // Realizar la petición al backend
        fetch(`/api/productos/categoria?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al buscar productos');
                return response.json();
            })
            .then(data => {
                renderProducts(data, cardsContainer); // Llamar a la función de renderizado
            })
            .catch(error => {
                console.error('Error:', error);
                cardsContainer.innerHTML = `
                    <div class="container-fluid descripcion d-flex justify-content-center align-items-center" >
                        <div class="text-center mt-5" role="alert">
                            No se encontraron productos
                        </div>
                    </div>
                `;
            });
    }

    // Asegurar que los *checkboxes* sean mutuamente excluyentes
    disponibleCheck.addEventListener('change', function () {
        if (disponibleCheck.checked) agotadoCheck.checked = false;
        buscarProductos(busqueda.value);
    });

    agotadoCheck.addEventListener('change', function () {
        if (agotadoCheck.checked) disponibleCheck.checked = false;
        buscarProductos(busqueda.value);
    });

    // Ejecutar búsqueda inicial para mostrar todos los productos
    buscarProductos();

    // Agregar eventos para los filtros en tiempo real
    busqueda.addEventListener('input', function (e) {
        clearTimeout(timeoutId);
        const searchTerm = e.target.value.trim();

        timeoutId = setTimeout(() => buscarProductos(searchTerm), 300);
    });

    document.getElementById('precioMin').addEventListener('input', () => buscarProductos(busqueda.value));
    document.getElementById('precioMax').addEventListener('input', () => buscarProductos(busqueda.value));
});

