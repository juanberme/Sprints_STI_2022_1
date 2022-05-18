var tabla = document.querySelector(".bodyTable");
var body = document.querySelector("body");
var selectBody = document.querySelector(".selectBody");
var btn_OrdA = document.querySelector(".btn_Asc");
var btn_OrdB = document.querySelector(".btn_Des");
var bodyTable = document.querySelector(".bodyTable");
var user1 = document.getElementById("user1");
var user2 = document.getElementById("user2");
var btn_Com = document.querySelector(".btn_com");
var infoTabla;
var results = document.getElementById("results");

$.ajax({
    url: "/nueva_base_de_datos_STI.csv",
    dataType: "text"
}).done((data) => {
    infoTabla = crearTabla(data);

    MostrarTablas(infoTabla);
})

function crearTabla(data){
    var datosFila = data.split("\n" && "\r");
    var info = [];

    for(let index = 1; index < datosFila.length; index++){
        let dataLinea = datosFila[index];
        arregloLista = dataLinea.split(";");
        info.push({ nombre: arregloLista[0], columnaA: arregloLista[1], columnaB: arregloLista[2], columnaC: arregloLista[3], columnaD: arregloLista[4], columnaE: arregloLista[5] });
    }

    console.log(info);

    return info;
}

function MostrarTablas(data){

    tabla.innerHTML = "";
    fila = document.createElement("tr");

    tituloNombre = document.createElement("th");
    tituloNombre.innerHTML = "Nombre";

    columnaA = document.createElement("th");
    columnaA.innerHTML = "Gusto por DMI";

    columnaB = document.createElement("th");
    columnaB.innerHTML = "Gusto por la hamburguesa";

    columnaC = document.createElement("th");
    columnaC.innerHTML = "Gusto por el helado";

    columnaD = document.createElement("th");
    columnaD.innerHTML = "Gusto por los videojuegos";

    columnaE = document.createElement("th");
    columnaE.innerHTML = "Indice de felicidad";

    filaTitulo = document.createElement("tr");
    filaTitulo.appendChild(tituloNombre);
    filaTitulo.appendChild(columnaA);
    filaTitulo.appendChild(columnaB);
    filaTitulo.appendChild(columnaC);
    filaTitulo.appendChild(columnaD);
    filaTitulo.appendChild(columnaE);
    tabla.appendChild(filaTitulo);

    

    for(let index = 0; index<data.length; index++){
       
        let celdaInfo = data[index];
        const filaCelda = document.createElement("tr");

        celdaNombre = document.createElement("td");
        celdaColA = document.createElement("td");
        celdaColB = document.createElement("td");
        celdaColC = document.createElement("td");
        celdaColD = document.createElement("td");
        celdaColE = document.createElement("td");

        celdaNombre.innerHTML = celdaInfo.nombre;
        celdaColA.innerHTML = celdaInfo.columnaA;
        celdaColB.innerHTML = celdaInfo.columnaB;
        celdaColC.innerHTML = celdaInfo.columnaC;
        celdaColD.innerHTML = celdaInfo.columnaD;
        celdaColE.innerHTML = celdaInfo.columnaE;

        filaCelda.appendChild(celdaNombre);
        filaCelda.appendChild(celdaColA);
        filaCelda.appendChild(celdaColB);
        filaCelda.appendChild(celdaColC);
        filaCelda.appendChild(celdaColD);
        filaCelda.appendChild(celdaColE);
        tabla.appendChild(filaCelda);

        //Lista de usuarios
        var users1 = document.createElement("option");
        users1.textContent = celdaInfo.nombre;
        users1.value = celdaInfo.nombre;
        user1.appendChild(users1);

        var users2 = document.createElement("option");
        users2.textContent = celdaInfo.nombre;
        users2.value = celdaInfo.nombre;
        user2.appendChild(users2);
    }

    body.appendChild(tabla);
}

function ordenarA(){
    if(selectBody.value === "Gusto por DMI") {
        infoTabla.sort(function(valA, valB){
            return valA.columnaA - valB.columnaA;
        });

        MostrarTablas(infoTabla);

    } else if (selectBody.value === "Gusto por la hamburguesa"){
        infoTabla.sort(function(valA, valB){
            return valA.columnaB - valB.columnaB;
        });

        MostrarTablas(infoTabla);

    }
}

function ordenarB(){
    if(selectBody.value === "Gusto por DMI"){
        infoTabla.sort(function(valA, valB){
            return valB.columnaA - valA.columnaA;
        });

        MostrarTablas(infoTabla);

    }else if(selectBody.value === "Gusto por la hamburguesa"){
        infoTabla.sort(function(valA, valB){
            return valB.columnaB - valA.columnaB;
        });
    }

    MostrarTablas(infoTabla);
    console.log(bodyTable.value);
}

function firstUser(infoTabla){
    return infoTabla.nombre == user1.value;
}

function secondUser(infoTabla){
    return infoTabla.nombre == user2.value;
}

function comparar(){
    
   var userOne = infoTabla.find(firstUser);
   var userTwo = infoTabla.find(secondUser);

    var producto = ((userOne.columnaA*userTwo.columnaA)+(userOne.columnaB*userTwo.columnaB)+(userOne.columnaC*userTwo.columnaC)+(userOne.columnaD*userTwo.columnaD)+(userOne.columnaE*userTwo.columnaE));

    var magnitudA = (Math.sqrt(parseFloat((Math.pow(userOne.columnaA, 2))+(Math.pow(userOne.columnaB,2))+(Math.pow(userOne.columnaC,2))+(Math.pow(userOne.columnaD,2))+(Math.pow(userOne.columnaE,2)))));

    var magnitudB = (Math.sqrt(parseFloat((Math.pow(userTwo.columnaA,2))+(Math.pow(userTwo.columnaB,2))+(Math.pow(userTwo.columnaC,2))+(Math.pow(userTwo.columnaD,2))+(Math.pow(userTwo.columnaE,2)))));

    var total = magnitudA * magnitudB;

    var coseno = producto / total;

    console.log(coseno);

    var resultData = document.createElement("h2");
    resultData.textContent = coseno;
    resultData.value = coseno;
    results.innerHTML = coseno;

}

btn_OrdA.addEventListener('click', ordenarA);
btn_OrdB.addEventListener('click', ordenarB);
btn_Com.addEventListener('click', comparar);
