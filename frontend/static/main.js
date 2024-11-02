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

// document.addEventListener("DOMContentLoaded", function () {
//     function get_productos() {
//         fetch('/api/productos_panaderia', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 let cards = document.getElementById("cards-productos-panaderia");
//
//                 data.forEach(d => {
//                     const icono =
//                         d.disponibilidad === "AGOTADO"
//                             ? "bi bi-x-circle-fill text-danger"
//                             : "bi bi-check-circle-fill text-success";
//                     cards.innerHTML += `
//
//
// <div class="col">
//     <div class="card product-card">
//         <img src="${d.imagen}" class="card-img-top" alt="${d.nombre}">
//         <div class="card-body">
//             <h5 class="card-title">${d.nombre}</h5>
//             <p class="card-text">${d.descripcion}</p>
//             <p class="card-text unidad">${d.unidad}</p>
//             <div class="${icono}">
//                 <span>${d.disponibilidad}</span>
//             </div>
//             <p class="precio">$ ${d.precio.toLocaleString()}</p>
//         </div>
//     </div>
// </div>
//                 `;
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error);
//             });
//     }
//
//     get_productos();
// });


// // script.js
// document.addEventListener('DOMContentLoaded', function () {
//     const busqueda = document.getElementById('busqueda');
//     const cardsPanaderia = document.getElementById('cards-productos-panaderia');
//     let timeoutId;
//
//     busqueda.addEventListener('input', function (e) {
//         // Limpiar el timeout anterior
//         clearTimeout(timeoutId);
//
//         // Establecer un nuevo timeout para evitar demasiadas peticiones
//         timeoutId = setTimeout(() => {
//             const searchTerm = e.target.value.trim();
//
//             // Si el término de búsqueda está vacío, limpiar resultados
//             if (searchTerm === '') {
//                 cardsPanaderia.innerHTML = '';
//                 return;
//             }
//
//             // Realizar la petición al backend
//             fetch(`/api/buscar?termino=${encodeURIComponent(searchTerm)}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     // Limpiar resultados anteriores
//                     cardsPanaderia.innerHTML = '';
//
//
//                     data.forEach(d => {
//                         const icono =
//                             d.disponibilidad === "AGOTADO"
//                                 ? "bi bi-x-circle-fill text-danger"
//                                 : "bi bi-check-circle-fill text-success";
//                         cardsPanaderia.innerHTML += `
//
//
//                         <div class="col">
//                             <div class="card product-card">
//                                 <img src="${d.imagen}" class="card-img-top" alt="${d.nombre}">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${d.nombre}</h5>
//                                     <p class="card-text">${d.descripcion}</p>
//                                     <p class="card-text unidad">${d.unidad}</p>
//                                     <div class="${icono}">
//                                         <span>${d.disponibilidad}</span>
//                                     </div>
//                                     <p class="precio">$ ${d.precio.toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         </div>
//                                         `;
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     cardsPanaderia.innerHTML = '<p>Error al buscar productos</p>';
//                 });
//         }, 300); // Esperar 300ms después de que el usuario deje de escribir
//     });
// });


// ESTO ANDA
// document.addEventListener('DOMContentLoaded', function () {
//     const busqueda = document.getElementById('busqueda');
//     const cardsPanaderia = document.getElementById('cards-productos-panaderia');
//
//     const precioMin = document.getElementById('precioMin').value;
//     const precioMax = document.getElementById('precioMax').value;
//
//     const disponibleCheck = document.getElementById('disponibleCheck').checked;
//     const agotadoCheck = document.getElementById('agotadoCheck').checked;
//     let timeoutId;
//
//     function buscarProductos(searchTerm = '') {
//         // Realizar la petición al backend
//         fetch(`/api/buscar?termino=${encodeURIComponent(searchTerm)}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error al buscar productos');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Limpiar resultados anteriores
//                 cardsPanaderia.innerHTML = '';
//
//                 // Crear HTML acumulado para optimizar manipulación del DOM
//                 let html = '';
//
//                 data.forEach(d => {
//                     const icono =
//                         d.disponibilidad === "AGOTADO"
//                             ? "bi bi-x-circle-fill text-danger"
//                             : "bi bi-check-circle-fill text-success";
//
//                     html += `
//                     <div class="col">
//                         <div class="card product-card">
//                             <img src="${d.imagen}" class="card-img-top" alt="${d.nombre}">
//                             <div class="card-body">
//                                 <h5 class="card-title">${d.nombre}</h5>
//                                 <p class="card-text">${d.descripcion}</p>
//                                 <p class="card-text unidad">${d.unidad}</p>
//                                 <div class="d-flex align-items-center">
//                                     <i class="${icono} me-2"></i>
//                                     <span>${d.disponibilidad}</span>
//                                 </div>
//                                 <p class="precio">$ ${d.precio.toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>`;
//                 });
//
//                 // Insertar el HTML acumulado
//                 cardsPanaderia.innerHTML = html;
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 cardsPanaderia.innerHTML = '<p>Error al buscar productos</p>';
//             });
//     }
//
//     // Ejecutar búsqueda al cargar la página para mostrar todos los productos
//     buscarProductos();
//
//     busqueda.addEventListener('input', function (e) {
//         clearTimeout(timeoutId);
//         const searchTerm = e.target.value.trim();
//
//         // Establecer un nuevo timeout para evitar demasiadas peticiones
//         timeoutId = setTimeout(() => {
//             buscarProductos(searchTerm);
//         }, 300); // Esperar 300ms después de que el usuario deje de escribir
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const busqueda = document.getElementById('busqueda');
    const cardsPanaderia = document.getElementById('cards-productos-panaderia');
    const disponibleCheck = document.getElementById('disponibleCheck');
    const agotadoCheck = document.getElementById('agotadoCheck');
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

    function buscarProductos(searchTerm = '') {
        const { precioMin, precioMax, disponibleCheck, agotadoCheck } = getFilters();

        // Construir los parámetros de la consulta
        const params = new URLSearchParams({
            termino: searchTerm,
            precio_min: precioMin,
            precio_max: precioMax,
            disponible: disponibleCheck,
            agotado: agotadoCheck,
        });

        // Realizar la petición al backend
        fetch(`/api/buscar?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al buscar productos');
                return response.json();
            })
            .then(data => {
                cardsPanaderia.innerHTML = ''; // Limpiar resultados anteriores

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
                                    <p class="card-text">${d.descripcion}</p>
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

                cardsPanaderia.innerHTML = html; // Insertar HTML acumulado
            })
            .catch(error => {
                console.error('Error:', error);
                console.error('Error:', error);
                cardsPanaderia.innerHTML = `
                    <div class="container-fluid descripcion d-flex justify-content-center  align-items-center" >
                        <div class="text-center" role="alert">
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

