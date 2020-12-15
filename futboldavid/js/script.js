import { setCookie, getCookie } from "./cookies.js";
import { Model } from './model.js';

(() => {
    "use strict";

    window.addEventListener("load", () => {
        console.log(getCookie("username"));
        if (getCookie("username"))
            inicio();
        else {
            login();
        }
        document.getElementById("home").addEventListener("click", () => {
            inicio();
        })

    });



    /* FUNCIÓN PARA VALIDAR USUARIO Y PODER ENTRAR A LA PAGINA */
    async function validacion() {
       
        let user = document.getElementById("username").value;
        localStorage.setItem("username", "david");
        let password = document.getElementById("password").value;


        if (user == 'david' && password == '123') {
            await loading();
            setCookie("username", user, 365);
            inicio();

        } else {
            alert('Usuario o contraseña incorrectos');
            alert( "username = " + localStorage.getItem("username"));
        }
    }

    // FUNCION QUE ELIMINA LAS COOKIES DEL USUARIO LOGUEADO PARA CERRAR SESIÓN
    function logout() {

        setCookie("username", 'user', -1);
        console.log(getCookie("username"));
        login();
    }


    // FUNCION CON PROMESA PARA CARGAR UN LOADING DURANTE X TIEMPO UNA VEZ LE DAS AL BOTÓN DE LOGIN
    function loading() {
        return new Promise((resolve) => {
            document.getElementById("content").innerHTML = `<div class="loader">
            <div class="loader-inner">
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                  
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
            </div>
        </div>`;

            setTimeout(() => { document.getElementsByClassName('loader')[0].remove(); resolve() }, 2000)
        })

    }

    //FUNCION QUE CARGA EL FORMULARIO DEL REGISTRO, OBVIAMENTE NO ES UN REGISTRO VALIDO YA QUE NO HAY SERVIDOR
    function register() {
        document.getElementById("content").innerHTML = "";
        
        document.getElementById("content").innerHTML = `<div class="divregister">
                <form class="register">
                <h1 class="h1register">Registro</h1>
                <input class="inputregister" placeholder="Nombre de usuario">
                <input class="inputregister" type="email" placeholder="Email">
                <input class="inputregister" type="password" placeholder="Contraseña">
                <button class="buttonregister">Registrarse</button>
            </form>
            </div>
  `;
        let botonregister = document.getElementsByClassName("buttonregister")[0];
        botonregister.addEventListener('click', inicio);
    }

    // FUNCIÓN QUE SE INICIA AL CARGAR LA PÁGINA
    function login() {



        document.getElementById("content").innerHTML = `<section class="section2">
       <div class="box">
           <div class="form">
               <h3>Login</h3>
               <form>
                   <div class="inputBx">
                       <input type="text" placeholder="Usuario" id="username">
                       <img  src="./img/login/user.png" class="imglogin">
                   </div>
                   <div class="inputBx">
                       <input type="password"
                       placeholder="Contraseña" id="password">
                       <img src="./img/login/lock.png" class="imglogin">
                   </div>
                   <label class="remember"><input type="checkbox">Recuerda mis datos</label>

                   <div class="inputBx">
                       <input id="botonl" type="submit" value="Login">
                   </div>
               </form>
               <p class="plogin">¿Olvidaste <a class="alogin"  href="#">la contraseña?</a></p>
               <p class="plogin"> <a class="register" href="#">Registrarse</a></p>
           </div>
       </div>


   </section>`;



        // BOTÓN "Login" funcional, que nos carga la página
        let botonlogin = document.getElementById("botonl");
        botonlogin.addEventListener('click', validacion);

        // BOTÓN PARA IR AL FORMULARIO DE REGISTRO
        let botonregister = document.getElementsByClassName("register")[0];
        botonregister.addEventListener('click', register);

    }




    // PAGINA PRINCIPAL DONDE PODRÁS DIRIGIRTE A CUALQUIER PARTE DE LA PÁGINA MEDIANTE LOS BOTONES(NAVBAR)
    function inicio() {
        document.getElementById("content").innerHTML = `<div id="switch">
                           
         
                                </div>

                                <section>
                                    <div class="heading">
                                        <h1> CHAMPIONS  <b> LEAGUE </b></h1>
                                        <p>El torneo de fútbol más importante del año</p>
                                        <a id="register" href="#" class="btn-primary">Suscríbete para no perderte <b> ningún partido</b></a>
                                    </div>
                                </section>
                                `;



        // BOTÓN PARA IR AL LOGIN
        let botonregister = document.querySelector("#register");
        botonregister.addEventListener('click', () => register());
        


        // BOTÓN PARA CERRAR SESIÓN
        let botonlogout = document.querySelector("#logout");
        botonlogout.addEventListener('click', () => logout());


        // BOTÓN PARA IR A LA PÁGINA DE PARTIDOS
        let botonpartidos = document.querySelector("#partidos");
        botonpartidos.addEventListener('click', () => partidos());

        // BOTÓN PARA IR A LA PÁGINA DE EQUIPOS
        let botonequipos = document.querySelector("#teams");
        botonequipos.addEventListener('click', () => teams());

        // BOTÓN PARA IR A LA PÁGINA DE CLASIFICACIÓN
        let botonclasi = document.querySelector("#clasi");
        botonclasi.addEventListener('click', () => clasificacion());


        // BOTÓN PARA IR A LA PÁGINA DE TOP JUGADORES
        let botontop = document.querySelector("#toplayers");
        botontop.addEventListener('click', () => topjugadores());

        // BOTÓN PARA IR A LA PÁGINA DE TORNEO
        let botontorneo = document.querySelector("#torneo");
        botontorneo.addEventListener('click', () => torneo());



    }


    //FUNCIÓN CON ARRAY PARA QUE NO REPITA EL MISMO EQUIPO VARIAS VECES
    function repetido(array, numero) {
        for (let i = 0; i < array.length; i++) {
            if (numero == array[i]) {
                return false;
            }
        }
        return true;
    }

    /* FUNCIÓN PARA LA PÁGINA DE PARTIDOS, GENERA TODOS LOS EQUIPOS DEL 
       MATCHES.JSON Y LOS EMPAREJA UNOS CONTRA OTROS.
    */
    async function partidos() {

        var matchmaking =
            function (datos) {
                let array = [];
                let contador = 0;

                while (array.length < datos) {
                    let num = Math.floor(Math.random() * (datos - 0) + 0);

                    if (repetido(array, num)) {
                        array[contador] = num;
                        contador++;
                    }
                }

                return array;
            }

        document.getElementById("content").innerHTML = "";

        await fetch('/json/matches.json')
            .then(response => response.json())
            .then(data => {
                let partidos = matchmaking(data.length);
                let teamsxd = ``;
                teamsxd += `<div class="containermatches">`;
                for (let index = 0; index < partidos.length; index++) {

                    const element = data[partidos[index]];
                    const element2 = data[partidos[index + 1]];

                    teamsxd += `
                <div class="match">
                <div class="match-header">
                    <div class="match-status">Live</div>
                </div>
                <div class="match-content">
                    <div class="column">
                        <div class="team team--home">
                            <div class="team-logo">
                                <img src="`+ element.photo + `" width="100px" />
                            </div>
                            <h2 class="team-name">`+ element.name + `</h2>
                        </div>
                    </div>
                    <div class="column">
                        <div class="match-details">
                            <div class="match-date">
                                12 Aug at <strong>19:00</strong>
                            </div>
                            <div class="match-score">
                                <span class="leading">`+ element.goals + `</span>
                                <span class="match-score-divider">:</span>
                                <span class="match-score-number">`+ element2.goals + `</span>
                            </div>
                            <div class="match-time-lapsed">
                                90'
                            </div>
                            <div class="match-referee">
                                Estadio: <strong>`+ element.field + `</strong>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="team team--away">
                            <div class="team-logo">
                                <img src="`+ element2.photo + `" width="100px" />
                            </div>
                            <h2 class="team-name">`+ element2.name + `</h2>
                        </div>
                    </div>
                </div>
            </div>
            `
                    index++;
                }
                teamsxd += `</div>`
                document.getElementById("content").innerHTML = teamsxd;
                let boton = document.querySelector("#home");
                boton.addEventListener('click', () => inicio());

            });


    }


    class Equipo extends Model {
        constructor(id, name, field, league, photo, wins, loses, ties) {
            super(`/json/teams.json`, id)
            this.id = id;
            this.name = name;
            this.field = field;
            this.league = league;
            this.photo = photo;
            this.wins = wins;
            this.loses = loses;
            this.ties = ties;

        }
    }

    //FUNCION QUE MUESTRA TODOS LOS EQUIPOS: SU NOMBRE, LA LIGA EN LA QUE JUEGAN, LOS PARTIDOS GANADOS, PERDIDOS Y EMPATADOS
    async function teams() {
        document.getElementById("content").innerHTML = "";


        await fetch('/json/teams.json')
            .then(response => response.json())
            .then(data => {

                let teamspage = "<div class=\"bodyteams\"><div class=\"cards-wrapper\">";
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let team = new Equipo(index, element.name, element.field, element.league, element.photo, element.wins, element.loses, element.ties);
                    teamspage += `
            <div class="card-wrapper">
              <div class="card-1 card-object card-object-hf">
              <a class="face front" href="#">

                    <div class="imgteam">
                    <img src="`+ team.photo + `">
                    </div>
                  <div class="title-wrapper">
                

                    <div class="title">`+ team.name + `</div>
                    
                    
                    <div class="subtitle">Campo: `+ team.field + `</div>
                    <div class="subtitle">`+ team.league + `</div>
                    <div class="subtitle">Wins: `+ team.wins + `</div>
                    <div class="subtitle">Loses: `+ team.loses + `</div>
                    <div class="subtitle">Ties: `+ team.ties + `</div>
                 
                  </div>
            </a>

                  <a class="face back" href="#">
                  <div class="img-wrapper">
                    
                  </div>
                  <div class="info-wrapper">
                
                   
                  </div>
                  </a>
                  </div>
                  </div>
            
            `;
                }
                teamspage += "</div></div>";
                document.getElementById("content").innerHTML = teamspage;
            })
    }


    class Jugador extends Model {
        constructor(id, name, team, photo, goals) {
            super(`/json/playertop.json`, id)
            this.id = id;
            this.name = name;
            this.team = team;
            this.photo = photo;
            this.goals = goals;

        }
    }


    /* FUNCIÓN PARA LA PÁGINA DE TOP JUGADORES DONDE ME CARGARÁ LA LISTA DE 
        JUGADORES QUE SE ENCUENTRA EN PLAYERTOP.JSON
    */
    async function topjugadores() {
        document.getElementById("content").innerHTML = "";


        await fetch('/json/playertop.json')
            .then(response => response.json())
            .then(data => {


                let tops = "<div class=\"bodytop\">";
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let player = new Jugador(index, element.name, element.team, element.photo, element.goals);
                    console.log(player);
                    tops += `
              
                <div class="box2">
                <div class="play"></div>
                <div class="play1"></div>
                    <div class="imgBox">
                        <img src="`+ player.photo + `">
                    </div>
                    <div class="contentplayerstop">
                        <h2 class="names">`+ player.name + `<br><span>` + player.team + `</span><br><span>Goles: ` + player.goals + `</span></h2>
                    </div>
                </div>
                `;

                }
                tops += "</div>";
                document.getElementById("content").innerHTML = tops;
            })


    }

    /* FUNCIÓN USANDO XMLhttpRequest PARA CARGAR UNA TABLA DE CLASIFICACIÓN DE LOS EQUIPOS
        DATOS CARGADOS DEL FICHERO clas.json
    */

    function clasificacion() {
        document.getElementById("content").innerHTML = "";
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', '/json/clasi.json', true);

        xhttp.send();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText);
                let datos = JSON.parse(this.responseText);
                //console.log(datos);
                let containerclasi = document.querySelector('#content');

                let allclasi = ` 
            <table class="containerclasi">
	        <thead class="theadclasi">
		    <tr class="tr clasi">
            <th class="thclasi"><h1 class="h1clasi">Equipo</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Liga</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos jugados</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos ganados</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos perdidos</h1></th>

        </tr>
        </thead>
            `;

                for (let element of datos) {
                    //console.log(element);
                    allclasi += `
              
       
        
                <tbody class="tbodyclasi">
                <tr class="tr clasi">
                    <td class="tdclasi">${element.name}</td>
                    <td class="tdclasi">${element.league}</td>
                    <td class="tdclasi">${element.games}</td>
                    <td class="tdclasi">${element.wins}</td>
                    <td class="tdclasi">${element.lose}</td>
                </tr>
                </tbody>
    
        
                
                `;


                } allclasi += `</table>`;
                containerclasi.innerHTML = allclasi;
            }
        }
    }

    class Torneo extends Model {
        constructor(id, name) {
            super(`/json/torneo.json`, id)
            this.id = id;
            this.name = name;
        }
    }

    //MÉTODO PARA USAR EL MATH.FLOOR Y MATH.RANDOM DONDE PLAZCA
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //MÉTODO PARA DETECTAR VALORES NULL O UNDEFINEDS
    function isNullOrUndefined(val) {
        return val === null || val === undefined;
    }

    //MÉTODO PARA SELECCIONAR EQUIPOS ALEATORIOS 
    function selectRandomTeam(teams, blacklist) {
        let selectedTeam = null;

        do {
            const teamsLength = teams.length;
            const randomTeam = getRandomInt(0, teamsLength);
            if (blacklist.length <= 0 || isNullOrUndefined(blacklist.find(blacklistedTeam => blacklistedTeam.id === teams[randomTeam].id)))
                selectedTeam = teams[randomTeam];
        } while (selectedTeam === null);

        return selectedTeam;
    }


    //FUNCIÓN PARA SACAR LOS CUARTOS, SEMIFINALES Y FINAL DEL TORNEO DE FORMA ALEATORIA
    //LOS EQUIPOS SE MOSTRARÁN EMPAREJADOS ALEATORIAMENTE CON OTRO EQUIPO DIFERENTE
    //LA CANTIDAD DE GOLES NO SUPERARÁ LA CIFRA DE 5 Y SERÁ IMPOSIBLE QUE SE QUEDE EMPATE
    //SIEMPRE HABRÁ GANADOR Y PERDEDOR SIN OCASIÓN DE EMPATE
    async function torneo() {
        document.getElementById("content").innerHTML = "";
        await loading();

        await fetch('json/torneo.json')
            .then(response => response.json())
            .then(data => {

                const teamsLength = data.length;
                //ARRAYS
                let teamBlacklist = [];
                const quarters = [];
                let quartersFlat = [];
                const semifinals = [];
                const semifinalsFlat = [];
                let final = [];

                for (let i = 0; i < teamsLength / 2; i++) {
                    let result = getRandomInt(0, 2);
                    //DESTRUCTURING DEL PRIMER EQUIPO
                    const firstTeam = { ...selectRandomTeam(data, teamBlacklist) };
                    teamBlacklist.push(firstTeam);
                    //DESTRUCTURING DEL SEGUNDO EQUIPO
                    const secondTeam = { ...selectRandomTeam(data, teamBlacklist) };
                    teamBlacklist.push(secondTeam);

                    if (result == 0) {
                        firstTeam.goals = getRandomInt(1, 6);
                        firstTeam.hasWon = true;
                        secondTeam.goals = getRandomInt(0, firstTeam.goals);
                        secondTeam.hasWon = false;
                    } else {
                        secondTeam.goals = getRandomInt(1, 6);
                        secondTeam.hasWon = true;
                        firstTeam.goals = getRandomInt(0, secondTeam.goals);
                        firstTeam.hasWon = false;
                    }

                    quarters.push([
                        firstTeam,
                        secondTeam
                    ])
                    quartersFlat.push(firstTeam, secondTeam);
                }
                //LIMPIAR EL ARRAY DE LISTA NEGRA
                teamBlacklist = [];
                quartersFlat = quartersFlat.filter(team => team.hasWon);

                for (let i = 0; i < quartersFlat.length / 2; i++) {
                    let result = getRandomInt(0, 2);
                    const firstTeam = { ...selectRandomTeam(quartersFlat, teamBlacklist) };
                    teamBlacklist.push(firstTeam);
                    const secondTeam = { ...selectRandomTeam(quartersFlat, teamBlacklist) };
                    teamBlacklist.push(secondTeam);

                    if (result == 0) {
                        firstTeam.goals = getRandomInt(1, 6);
                        firstTeam.hasWon = true;
                        secondTeam.goals = getRandomInt(0, firstTeam.goals);
                        secondTeam.hasWon = false;
                    } else {
                        secondTeam.goals = getRandomInt(1, 6);
                        secondTeam.hasWon = true;
                        firstTeam.goals = getRandomInt(0, secondTeam.goals);
                        firstTeam.hasWon = false;
                    }

                    semifinals.push([
                        firstTeam,
                        secondTeam
                    ])
                    semifinalsFlat.push(firstTeam, secondTeam);
                }

                final = semifinalsFlat.filter(team => team.hasWon);

                final = final.map(team => { return { ...team } });

                let result = getRandomInt(0, 2);

                if (result == 0) {
                    final[0].goals = getRandomInt(1, 6);
                    final[0].hasWon = true;
                    final[1].goals = getRandomInt(0, final[0].goals);
                    final[1].hasWon = false;
                } else {
                    final[1].goals = getRandomInt(1, 6);
                    final[1].hasWon = true;
                    final[0].goals = getRandomInt(0, final[1].goals);
                    final[0].hasWon = false;
                }

                //MUESTRA DE QUE SE LEEN TODOS LOS DATOS CORRECTAMENTE EN LA CONSOLA
                console.log(quarters, semifinals, final);

                //IMPRIMIR LOS DATOS DE LOS CUARTOS DE FINAL, SEMIFINALES Y FINAL EN PANTALLA
                let cuartos = `
                    <section class="round quarterfinals">
                    `;

                let matchCounter = 0;

                quarters.forEach(match => {
                    if (matchCounter == 0) {
                        cuartos += `<div class="winners">
                            <div class="matchups">`;
                    }

                    cuartos += `
                            <div class="matchup">
                                <div class="participants">`;

                    match.forEach(team => {
                        cuartos += `
                            <div class="participant ${team.hasWon ? 'winner' : ''}"><span>${team.name}: ${team.goals}</span></div>`;
                    });

                    cuartos += `</div></div>`;

                    matchCounter++;
                    if (matchCounter >= 2) {
                        cuartos += `
                            </div><div class="connector">
                                <div class="merger"></div>
                                <div class="line"></div>
                            </div></div>
                            `;
                        matchCounter = 0;
                    }
                });

                cuartos += '</section><section class="round semifinals">';

                semifinals.forEach(match => {
                    if (matchCounter == 0) {
                        cuartos += `<div class="winners">
                            <div class="matchups">`;
                    }

                    cuartos += `
                            <div class="matchup">
                                <div class="participants">`;

                    match.forEach(team => {
                        cuartos += `
                            <div class="participant ${team.hasWon ? 'winner' : ''}"><span>${team.name}: ${team.goals}</span></div>`;
                    });

                    cuartos += `</div></div>`;

                    matchCounter++;
                    if (matchCounter >= 2) {
                        cuartos += `
                            </div><div class="connector">
                                <div class="merger"></div>
                                <div class="line"></div>
                            </div></div>
                            `;
                        matchCounter = 0;
                    }
                });

                cuartos += '</section><section class="round finals">';

                cuartos += `
                        <div class="winners">
                            <div class="matchups">
                            <div class="matchup">
                                <div class="participants">`;

                final.forEach(team => {
                    cuartos += `
                            <div class="participant ${team.hasWon ? 'winner' : ''}"><span>${team.name}: ${team.goals}</span></div>`;
                });
                cuartos += `</div></div></div></div></section>`;

                document.getElementById("content").innerHTML = `
                    <div class="bracket">
                        ${cuartos}
                    </div>
                    `;


            })
    }



})();
