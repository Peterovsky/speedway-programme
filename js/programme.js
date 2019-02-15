var riders = [];
var races = [];
var homeTeamPoints = []; // 15 elements array with amount of points earned by team in each race
var awayTeamPoints = [];

for (i = 0; i < 16; i++) {  // Fills race informations table and table with team results with default values
  // numbers - 4-element array with numbers of riders in races
  // helmets - 4-element array with helmet colors of riders in races
  // swaps - 4-element array with information about rider swaps on each gate
  // results - 4-element array with information about rider results on each gate
  races[i] = { raceNumber: i, numbers: [], helmets: [], swaps: [0,0,0,0], positions: ["","","",""], results: ["","","",""] };
  homeTeamPoints[i] = 0;
  awayTeamPoints[i] = 0;
}

for (i = 0; i < 17; i++) {  // Fills riders table with default values
  riders[i] = { number: i, name: "", results: [] };
}

function setRider(number, name) {
  riders[number].name = name;
}

// Function that creates table with team results
function createTeamTable(team) {

  var teamOffset = 0;
  if (team == "home") {
    teamOffset = 8;
  }

  var team = document.getElementById(team);
  var table = document.createElement("table");

  // Column headers
  var tr = table.insertRow();
  tr.insertCell().appendChild(document.createTextNode("Nr"));
  tr.insertCell().appendChild(document.createTextNode("Nazwa zawodnika"));
  for (i = 1; i < 8; i++) {
    tr.insertCell().appendChild(document.createTextNode(i));
  }
  tr.insertCell().appendChild(document.createTextNode("Suma"));

  // Table content
  for (i = (1 + teamOffset); i < (9 + teamOffset); i++) {
    var tr = table.insertRow();
    // Rider number
    var td_number = tr.insertCell();
    td_number.appendChild(document.createTextNode(i));
    td_number.id = "td-number";
    // Rider name
    var temp = riders[i].name;
    if (temp == null) temp = "";
    var td_rider_name = tr.insertCell();
    td_rider_name.appendChild(document.createTextNode(temp));
    td_rider_name.id = "td-rider-name";
    // Results of rider races
    for (j = 0; j < 7; j++) {
      var temp = riders[i].results[j];
      if (temp == null) temp = "";
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(temp));
      td.id = "td-point";
    }
    // Sum of an array with rider results
    var td_sum = tr.insertCell();
    td_sum.appendChild(document.createTextNode(riders[i].results.reduce((a, b) => a + b, 0)));
    td_sum.id = "td-sum";
  }
  team.appendChild(table);
}

function createRace(raceNumber, numbers, helmets) {
  races[raceNumber].numbers = numbers;
  races[raceNumber].helmets = helmets;
}

function createRaceTable(race) {
  var raceElement = document.getElementById("race-" + race.raceNumber);
  raceElement.innerHTML = "";  // Removes race div content so if we refresh race tables we don't get duplicates
  var table = document.createElement("table");
  var tr0 = table.insertRow();
  var tr1 = table.insertRow();
  var tr2 = table.insertRow();
  var tr3 = table.insertRow();

  // Race number cell
  var td_race_number = tr0.insertCell();
  td_race_number.appendChild(document.createTextNode(race.raceNumber));
  td_race_number.setAttribute("rowspan", 3);
  td_race_number.id = "td-race-number";

  // Winner time cell
  var td_race_time = tr3.insertCell();
  var text_field = document.createElement("form");
  var input = document.createElement("input");
  input.type = "text";
  input.id = "winner-time-textfield";
  td_race_time.appendChild(text_field.appendChild(input));

  for (i = 0; i < 4; i++) {
    // Riders numbers
    var td_rider_number = eval("tr" + i).insertCell();
    var temp = race.numbers[i];
    if (temp == 0) temp = "";
    td_rider_number.appendChild(document.createTextNode(temp));
    td_rider_number.className = "td-" + race.helmets[i];
    td_rider_number.width = "20px";

    // Riders names
    var td_rider_name = eval("tr" + i).insertCell();
    var temp = riders[race.numbers[i]].name;
    if (temp == null) temp = "";
    td_rider_name.appendChild(document.createTextNode(temp));
    td_rider_name.className = "td-" + race.helmets[i];
    td_rider_name.id = "td-rider-name";
    if (races[race.raceNumber].swaps[i] != "") {
      td_rider_name.id = "td-swapped-rider-name";
    }

    // Slots for rider change
    var td_swap_rider_name = eval("tr" + i).insertCell();
    var select = document.createElement("select");
    var teamOffset = 0;
    if (race.helmets[i] == "red" || race.helmets[i] == "blue") {
      teamOffset = 8;
    }
    // Default empty option
    var option = document.createElement("option");
    option.className = "td-" + race.helmets[i];
    option.value = [race.raceNumber, i, ""];
    option.appendChild(document.createTextNode(""));
    select.appendChild(option);
    // Riders options
    for (j = (1 + teamOffset); j < (9 + teamOffset); j++) {
      if (race.numbers[i] != j) { // This if is created to avoid changing rider by himself
        var option = document.createElement("option");
        if (j == races[race.raceNumber].swaps[i]) {
          option.selected = "selected";
        }
        var temp = riders[j].name;
        if (temp == null) temp = "";
        option.value = [race.raceNumber, i, j];
        option.className = "td-" + race.helmets[i];
        option.appendChild(document.createTextNode(temp));
        select.appendChild(option);
      }
    }
    select.setAttribute("onchange", "swap(this)");
    td_swap_rider_name.appendChild(select);
    td_swap_rider_name.className = "td-" + race.helmets[i];
    td_swap_rider_name.width = "170px";

    // Rider position
    var td_rider_position = eval("tr" + i).insertCell();
    var text_field = document.createElement("form");
    var input = document.createElement("input");
    input.type = "text";
    input.id = "position-textfield";
    input.name = [race.raceNumber, i];
    input.value = race.positions[i];
    input.setAttribute("onchange", "setResult(this)");
    td_rider_position.appendChild(text_field.appendChild(input));
    td_rider_position.className = "td-" + race.helmets[i];
    td_rider_position.width = "20px";

    // Rider result
    var td_rider_result = eval("tr" + i).insertCell();
    td_rider_result.className = "td-" + race.helmets[i];
    td_rider_result.width = "20px";
    td_rider_result.appendChild(document.createTextNode(race.results[i]));
  }

  // Race and match results
  var td_race_result_home = tr0.insertCell();
  td_race_result_home.setAttribute("rowspan", 2);
  td_race_result_home.width = "40px";

  var td_race_result_away = tr0.insertCell();
  td_race_result_away.setAttribute("rowspan", 2);
  td_race_result_away.width = "40px";

  var td_match_result_home = tr2.insertCell();
  td_match_result_home.setAttribute("rowspan", 2);
  td_match_result_home.setAttribute("bgcolor", "#e6e6e6");
  td_match_result_home.width = "40px";

  var td_match_result_away = tr2.insertCell();
  td_match_result_away.setAttribute("rowspan", 2);
  td_match_result_away.setAttribute("bgcolor", "#e6e6e6");
  td_match_result_away.width = "40px";

  // Appears match results in race table if all riders results are set
  if (races[race.raceNumber].results.includes("") == false) {
    td_race_result_home.appendChild(document.createTextNode(homeTeamPoints[race.raceNumber]));
    td_race_result_away.appendChild(document.createTextNode(awayTeamPoints[race.raceNumber]));
    td_match_result_home.appendChild(document.createTextNode(homeTeamPoints.slice(0,race.raceNumber+1).reduce((a, b) => a + b, 0)));
    td_match_result_away.appendChild(document.createTextNode(awayTeamPoints.slice(0,race.raceNumber+1).reduce((a, b) => a + b, 0)));
  }

  raceElement.appendChild(table);
}

function swap(object) {
  var swapDetails = object.value.split(",")  // [0] - race number, [1] - gate on which swap was made, [2] - rider chosen to swap
  races[swapDetails[0]].swaps[swapDetails[1]] = swapDetails[2];
  createRaceTable(races[swapDetails[0]]);  // Refreshes race table after swap
}

function setResult(object) {
  var resultsDetails = object.name.split(",");
  var raceNumber = resultsDetails[0];
  var gate = resultsDetails[1];
  // Matching points with position
  var pointsEarned = object.value;
  if (object.value == 1) pointsEarned = 3;
  if (object.value == 2) pointsEarned = 2;
  if (object.value == 3) pointsEarned = 1;
  if (object.value == 4) pointsEarned = 0;
  // Adding position and result to race object
  races[raceNumber].positions[gate] = object.value;
  races[raceNumber].results[gate] = pointsEarned;
  // Adding results to team results table
  if (races[raceNumber].helmets[gate] == "red" || races[raceNumber].helmets[gate] == "blue") {
    if (typeof pointsEarned == "number") homeTeamPoints[raceNumber] += pointsEarned;
  } else {
    if (typeof pointsEarned == "number") awayTeamPoints[raceNumber] += pointsEarned;
  }
  // Refreshing race table after all results are set
  if (races[raceNumber].results.includes("") == false) {
    createRaceTable(races[raceNumber]);
  }
}

function createAllRaceTables() {
    for (var i = 1; i < 16; i++) {
      createRaceTable(races[i]);
    }
}
