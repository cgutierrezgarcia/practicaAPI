const CONTENEDOR = document.getElementById("contenedor");
const URL = "https://rickandmortyapi.com/api/character";

// recoge de la API los datos de los personajes
fetch(URL)
.then(respuesta => respuesta.json()
.then(datos => {
    // se ejecuta tantas veces como pjs se reciben de la API
    for (let dato in datos.results) {
      // datos principales de cada pj
      const ID     = datos.results[dato].id;
      const NOMBRE = datos.results[dato].name;
      const IMG    = datos.results[dato].image;

      // creación del div contenedor de la ficha de pj
      let divPersonaje = document.createElement("div");
      divPersonaje.setAttribute("id",    "id"+ID);
      divPersonaje.setAttribute("class", "contenedorPersonaje");

      // añade el HTML
      CONTENEDOR.appendChild(divPersonaje).innerHTML = `
        <div class="fichaPersonaje" onclick="datosAdicionales(${ID});">
          <div class="personaje">
            <div class="pjDatosBasicos">
              <div class="pjImagen">
                <img alt="Imagen de ${NOMBRE}" src="${IMG}" />
              </div>
              <div class="pjNombre">
                <h2>${NOMBRE}</h2>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  })
);

// método a ejecutar al activar el evento onclick
let datosAdicionales = id => {

  // elementos HTML del pj en concreto
  let fichaPersonaje = document.getElementById("id"+id);
  let personaje      = document.querySelector("#id"+id+" .personaje");
  
  // si no se ha hecho click anteriormente
  if (!(personaje.className === "personaje foco")) {
    // recoge de la API los datos del pj en concreto
    fetch(URL + "/" + id)
    .then(respuesta => respuesta.json() 
      .then(datos => {

        // datos adicionales del pj
        const ESPECIE   = datos.species;
        const GENERO    = datos.gender;
        const ORIGEN    = datos.origin.name;
        const UBICACION = datos.location.name;
        const ESTADO    = datos.status;

        // añade clases CSS
        fichaPersonaje.classList.add("pjFichaFoco");
        personaje.classList.add("foco");

        // creación del contenedor para los datos adicionales
        let divDatosAdicionales = document.createElement("div");
        divDatosAdicionales.setAttribute("id",    "idFoco" + id);
        divDatosAdicionales.setAttribute("class", "masDatos");

        // añade el HTML
        personaje.appendChild(divDatosAdicionales).innerHTML = `
          <div class="personajeDatos">
            <p>Especie:   ${ESPECIE}</p>
            <p>Género:    ${GENERO}</p>
            <p>Origen:    ${ORIGEN}</p>
            <p>Ubicación: ${UBICACION}</p>
            <p>Estado:    ${ESTADO}</p>
          </div>
        `;
      })
    );

  // si ya se ha hecho click anteriormente
  } else {
    // borra las clases CSS
    fichaPersonaje.classList.remove("pjFichaFoco");
    personaje.classList.remove("foco");

    // borra el HTML
    let datosAdicionalesHTML = document.getElementById("idFoco" + id);
    datosAdicionalesHTML.remove();
  }
}

