/* DESPLAZAMINTO NAVBAR	*/

document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
window.addEventListener("scroll", function(){
	var navbar = document.getElementById("navbar");
	navbar.classList.toggle("scroll", window.scrollY > 0);
  });


 /*	MODAL	*/
 document.addEventListener("click",function (e){
   if(e.target.classList.contains("gallery-item")){
   	  const src = e.target.getAttribute("src");
   	  document.querySelector(".modal-img").src = src;
   	  const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
   	  myModal.show();
   }
 })


