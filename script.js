// cambian de color los botones
document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.getElementById("elemento");
  const navLinks = navbar.getElementsByClassName("nav-link");

  // Agregar evento de desplazamiento
  window.addEventListener("scroll", function() {
    const currentSection = getCurrentSection();

    // Restablecer el color de la fuente en todos los enlaces de navegación
    Array.from(navLinks).forEach(function(link) {
      link.style.color = "";
    });

    // Cambiar el color de la fuente del enlace de navegación correspondiente a la sección actual
    const activeLink = navbar.querySelector(`a[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.style.color = "#63BD47";
    }
  });

  // Función para obtener la sección actual en función de la posición de desplazamiento
  function getCurrentSection() {
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    Array.from(sections).forEach(function(section) {
      const sectionTop = section.offsetTop - navbar.offsetHeight;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
        currentSection = section.id;
      }
    });

    return currentSection;
  }
});

// rgb h1
document.addEventListener("DOMContentLoaded", function() {
  const headings = document.querySelectorAll("h1");

  Array.from(headings).forEach(function(heading) {
    let currentColor = [0, 0, 0]; // Color inicial (negro)

    setInterval(function() {
      currentColor = getNextColor(currentColor); // Obtener el siguiente color degradado
      heading.style.color = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    }, 100); // Cambia el color cada 100 milisegundos

    // Función para obtener el siguiente color degradado
    function getNextColor(color) {
      const increment = 5; // Incremento de cada componente RGB
      let [r, g, b] = color;

      if (r < 255 && g === 0 && b === 0) {
        r += increment; // Incrementar componente rojo
      } else if (r === 255 && g < 255 && b === 0) {
        g += increment; // Incrementar componente verde
      } else if (r > 0 && g === 255 && b === 0) {
        r -= increment; // Decrementar componente rojo
      } else if (r === 0 && g === 255 && b < 255) {
        b += increment; // Incrementar componente azul
      } else if (r === 0 && g > 0 && b === 255) {
        g -= increment; // Decrementar componente verde
      } else if (r < 255 && g === 0 && b === 255) {
        r += increment; // Incrementar componente rojo
      } else if (r === 255 && g === 0 && b > 0) {
        b -= increment; // Decrementar componente azul
      }

      return [r, g, b];
    }
  });
});

//  borde rgb
window.addEventListener("DOMContentLoaded", function() {
  let element = document.getElementById("elemento");
  let scrollColors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"]; // Colores para el borde

  window.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    let colorIndex = scrollPosition % scrollColors.length;
    let color = scrollColors[colorIndex];
    element.style.borderBottomColor = color;
  });

  element.addEventListener("mouseover", function() {
    element.style.borderBottomColor = getRandomRGBColor();
  });

  element.addEventListener("mouseout", function() {
    element.style.borderBottomColor = "rgb(0, 0, 0)";
  });
});

function getRandomRGBColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


//  rick and morty
 // Realiza una solicitud a la API de Rick and Morty
 fetch('https://rickandmortyapi.com/api/character/')
 .then(response => response.json())
 .then(data => {
   const characters = data.results;

   // Muestra los primeros 15 personajes
   const characterList = document.getElementById('character-list');

   for (let i = 0; i < 15; i++) {
     const character = characters[i];

     const characterCard = document.createElement('div');
     characterCard.classList.add('col-md-4');

     const card = document.createElement('div');
     card.classList.add('card', 'mb-4');

     const image = document.createElement('img');
     image.src = character.image;
     image.classList.add('card-img-top');

     const cardBody = document.createElement('div');
     cardBody.classList.add('card-body');

     const name = document.createElement('h5');
     name.classList.add('card-title');
     name.textContent = character.name;

     const status = document.createElement('p');
     status.classList.add('card-text');
     status.textContent = `Estado: ${character.status}`;

     const species = document.createElement('p');
     species.classList.add('card-text');
     species.textContent = `Especie: ${character.species}`;

     const gender = document.createElement('p');
     gender.classList.add('card-text');
     gender.textContent = `Género: ${character.gender}`;

     const origin = document.createElement('p');
     origin.classList.add('card-text');
     origin.textContent = `Origen: ${character.origin.name}`;

     const location = document.createElement('p');
     location.classList.add('card-text');
     location.textContent = `Ubicación: ${character.location.name}`;

     cardBody.appendChild(name);
     cardBody.appendChild(status);
     cardBody.appendChild(species);
     cardBody.appendChild(gender);
     cardBody.appendChild(origin);
     cardBody.appendChild(location);

     card.appendChild(image);
     card.appendChild(cardBody);

     characterCard.appendChild(card);
     characterList.appendChild(characterCard);
   }
 });

// Realiza una solicitud a la API de Rick and Morty de los episodios
fetch('http://localhost:8080/api/hoteles')
.then(response => response.json())
.then(data => {
    console.log(data);
    const episodes = data.results;

    // Crea las filas de la tabla con los episodios
    const tableBody = document.querySelector('#episode-table tbody');

    episodes.forEach(episode => { 
    const row = document.createElement('tr');

    const episodeNumber = document.createElement('td');
    episodeNumber.textContent = episode.episode;

    const episodeName = document.createElement('td');
    episodeName.textContent = episode.name;

    const releaseDate = document.createElement('td');
    releaseDate.textContent = episode.air_date;

    row.appendChild(episodeNumber);
    row.appendChild(episodeName);
    row.appendChild(releaseDate);

    tableBody.appendChild(row);
    });
});
  // Banco Central - inflacion mensual
  const fetchData = async () => {
    const apiUrl = "inflacion_mensual_oficial";
    const proxyUrl = "https://bcra-proxy-cors.vercel.app";
  
    try {
      const response = await fetch(`${proxyUrl}/${apiUrl}`, {
        headers: {
          Authorization:
          "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY5MDYwNjQsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqb2hhY29zYW5jaGV6QGdtYWlsLmNvbSJ9.WYv-EWlrsG7vBns6ILR7I_UL_qETol7RugVTvy3e6LZ5bwQmf7dKtFEi7YeqM8bgsTYnvgn3-i6UqM0VXJQ2pw",
        },
      });
  
      const data = await response.json();
      const dataBank = document.getElementById("dataBank");
  
      data.forEach((info) => {
        const row = document.createElement("tr");
        const monthCell = document.createElement("td");
        const inflationCell = document.createElement("td");
  
        monthCell.textContent = info.d;
        inflationCell.textContent = info.v;
  
        row.appendChild(monthCell);
        row.appendChild(inflationCell);
        dataBank.appendChild(row);
      });
  
      const searchInput = document.getElementById("searchInput");
  
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
  
        Array.from(dataBank.getElementsByTagName("tr")).forEach((row) => {
          const monthCell = row.getElementsByTagName("td")[0];
          const monthText = monthCell.textContent.toLowerCase();
  
          if (monthText.includes(searchTerm)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  fetchData();
  
  



