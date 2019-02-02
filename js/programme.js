var riders = [];
var ridersResults = [];
for (i = 0; i < 17; i++) {
  ridersResults[i] = [];
}
var homeTeamPoints = []; // 15 elements array with amount of points earned by team in each race
var awayTeamPoints = [];

function setRider(number, name) {
  riders[number] = name;
}

function getRider(number) {
  return riders[number];
}

// Function that creates table with team results
function createTeamTable(team) {

  var teamOffset = 0;
  if (team == "away") {
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
    let td_number = tr.insertCell();
    td_number.appendChild(document.createTextNode(i));
    td_number.id = "td_number";
    // Rider name
    let temp = riders[i];
    if (temp == null) temp = "";
    let td_rider_name = tr.insertCell();
    td_rider_name.appendChild(document.createTextNode(temp));
    td_rider_name.id = "td_rider_name";
    // Results of rider races
    for (j = 0; j < 7; j++) {
      let temp = ridersResults[i][j];
      if (temp == null) temp = "";
      let td = tr.insertCell();
      td.appendChild(document.createTextNode(temp));
      td.id = "td_point";
    }
    // Sum of an array with rider results
    let td_sum = tr.insertCell();
    td_sum.appendChild(document.createTextNode(ridersResults[i].reduce((a, b) => a + b, 0)));
    td_sum.id = "td_sum";
  }
  team.appendChild(table);
}

function createRaceTable(raceNumber, numbers, helmets) {
  // numbers - 4-element array with numbers of riders in races
  // helmets - 4-element array with helmet colors of riders in rac
  var race = document.getElementById("race_" + raceNumber);
  var table = document.createElement("table");
  var tr0 = table.insertRow();
  var tr1 = table.insertRow();
  var tr2 = table.insertRow();
  var tr3 = table.insertRow();

  // Race number cell
  let td_race_number = tr0.insertCell();
  td_race_number.appendChild(document.createTextNode(raceNumber));
  td_race_number.setAttribute("rowspan", 3);
  td_race_number.id = "td_race_number";

  // Winner time cell
  let td_race_time = tr3.insertCell();
  let text_field = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.id = "winner_time_textfield";
  td_race_time.appendChild(text_field.appendChild(input));

  // Riders numbers
  for (i = 0; i < 4; i++) {
    let td_rider_number = eval("tr" + i).insertCell();
    td_rider_number.appendChild(document.createTextNode(numbers[i]));
    td_rider_number.id = "td_" + helmets[i];
    td_rider_number.setAttribute("width", "20px");
  }

  // Riders names
  for (i = 0; i < 4; i++) {
    let td_rider_name = eval("tr" + i).insertCell();
    let temp = riders[numbers[i]];
    if (temp == null) temp = "";
    td_rider_name.appendChild(document.createTextNode(temp));
    td_rider_name.id = "td_" + helmets[i];
    td_rider_name.setAttribute("width", "170px");
  }

  // Slots for rider change
  for (i = 0; i < 4; i++) {
    let td_rider_name = eval("tr" + i).insertCell();
    // TO-DO: Drop-down list with riders names
    td_rider_name.id = "td_" + helmets[i];
    td_rider_name.setAttribute("width", "170px");
  }

  // Rider position
  for (i = 0; i < 4; i++) {
    let td_rider_position = eval("tr" + i).insertCell();
    // TO-DO: Drop-down list with rider position
    td_rider_position.id = "td_" + helmets[i];
    td_rider_position.setAttribute("width", "20px");
  }

  // rider result
  for (i = 0; i < 4; i++) {
    let td_rider_number = eval("tr" + i).insertCell();
    // TO-DO: Logic that will match earned points to the position
    td_rider_number.id = "td_" + helmets[i];
    td_rider_number.setAttribute("width", "20px");
  }

  // Race and match results
  let td_race_result_home = tr0.insertCell();
  // td_race_result_home.appendChild();
  td_race_result_home.setAttribute("rowspan", 2);
  td_race_result_home.setAttribute("width", "40px");

  let td_race_result_away = tr0.insertCell();
  // td_race_result_away.appendChild();
  td_race_result_away.setAttribute("rowspan", 2);
  td_race_result_away.setAttribute("width", "40px");

  let td_match_result_home = tr2.insertCell();
  //  td_match_result_home.appendChild();
  td_match_result_home.setAttribute("rowspan", 2);
  td_match_result_home.setAttribute("width", "40px");
  td_match_result_home.setAttribute("background-color", "#e6e6e6");

  let td_match_result_away = tr2.insertCell();
  // td_match_result_away.appendChild();
  td_match_result_away.setAttribute("rowspan", 2);
  td_match_result_away.setAttribute("width", "40px");
  td_match_result_away.setAttribute("background-color", "#e6e6e6");

  race.appendChild(table);

}
