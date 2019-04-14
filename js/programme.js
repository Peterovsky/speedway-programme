var riders = [];  // Array with all 16 rider objects
var races = [];   // Array with all 15 race objects
var homeTeamPoints = []; // 15 elements array with amount of points earned by home team in each race
var awayTeamPoints = []; // 15 elements array with amount of points earned by away team in each race
var homeTeamName;
var awayTeamName;

for (i = 0; i < 16; i++) {  // Fills race informations table and table with team results with default values
  // numbers - 4-element array with numbers of riders in races
  // helmets - 4-element array with helmet colors of riders in races
  // swaps - 4-element array with information about rider swaps on each gate
  // results - 4-element array with information about rider results on each gate
  // isAdditional - additional races are races which don't have predifined riders set, riders are chosen by coach during the match
  races[i] = { raceNumber: i, numbers: [], helmets: [], swaps: [0,0,0,0], positions: ["","","",""], results: ["","","",""], isAdditional: false };
  homeTeamPoints[i] = 0;
  awayTeamPoints[i] = 0;
}

for (i = 0; i < 17; i++) {  // Fills riders table with default values
  riders[i] = { number: i, name: "", results: [] };
}

function setRider(number, name) {
  riders[number].name = name;
}

function setTeamName(team, name) {
  if (team == "home") {
    homeTeamName = name;
  } else {
    awayTeamName = name;
  }
}

// Function that creates race object with specified number and helmet of rider on each start gate
function createRace(raceNumber, numbers, helmets, isAdditional) {
  races[raceNumber].numbers = numbers;
  races[raceNumber].helmets = helmets;
  races[raceNumber].isAdditional = isAdditional;
}

function isNotNull(value) {
  if (value != null) {
    return true;
  } return false;
}

function isNumber(value) {
  if (typeof value == "number") {
    return true;
  } return false;
}

// Function that creates table with team results
function createTeamTable(team) {

  var element = document.getElementById(team);
  var table = document.createElement("table");
  element.innerHTML = "";  // Removes div content so if we refresh team tables we don't get duplicates

  var teamOffset = 0;
  if (team == "home") {
    teamOffset = 8;
  }

  // Team name
  var tr = table.insertRow();
  var tdTeamName = tr.insertCell();
  tdTeamName.setAttribute("colspan", 9);
  var textField = document.createElement("form");
  var input = document.createElement("input");
  input.type = "text";
  input.id = "standard-textfield";
  input.placeholder = "Enter team name";
  if (team == "home") {
    input.name = "home";
    if (homeTeamName != null) input.value = homeTeamName;
  } else {
    input.name = "away";
    if (awayTeamName != null)  input.value = awayTeamName;
  }
  input.setAttribute("oninput", "setTeamName(this.name, this.value)");
  tdTeamName.appendChild(textField.appendChild(input));;

  // Team result
  var tdTeamResult = tr.insertCell();
  if (team == "home") {
    tdTeamResult.appendChild(document.createTextNode(homeTeamPoints.reduce((a, b) => a + b, 0)));
  } else {
    tdTeamResult.appendChild(document.createTextNode(awayTeamPoints.reduce((a, b) => a + b, 0)));
  }

  // Column headers
  var tr = table.insertRow();
  tr.insertCell().appendChild(document.createTextNode("Nr"));
  tr.insertCell().appendChild(document.createTextNode("Name"));
  for (i = 1; i < 8; i++) {
    tr.insertCell().appendChild(document.createTextNode(i));
  }
  tr.insertCell().appendChild(document.createTextNode("Sum"));

  // Table content
  for (i = (1 + teamOffset); i < (9 + teamOffset); i++) {
    var tr = table.insertRow();
    // Rider number
    var tdNumber = tr.insertCell();
    tdNumber.appendChild(document.createTextNode(i));
    tdNumber.id = "td-number";
    // Rider name
    var tdRiderName = tr.insertCell();
    var textField = document.createElement("form");
    var input = document.createElement("input");
    input.type = "text";
    input.id = "rider-name-textfield";
    input.name = i;
    input.value = riders[i].name;
    input.setAttribute("oninput", "setRider(this.name, this.value); createAllRaceTables()");
    tdRiderName.appendChild(textField.appendChild(input));;
    tdRiderName.id = "td-rider-name";
    // Results of rider races
    for (j = 0; j < 7; j++) {
      var temp = riders[i].results.filter(isNotNull)[j];
      if (temp == null) temp = "";
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(temp));
      td.id = "td-point";
    }
    // Sum of an array with rider results
    var tdSum = tr.insertCell();
    tdSum.appendChild(document.createTextNode(riders[i].results.filter(isNumber).reduce((a, b) => a + b, 0)));
    tdSum.id = "td-sum";
  }
  element.appendChild(table);
}

// Function that creates headers above race tables
function createRaceTableHeader(idName) {
  var element = document.getElementById(idName);
  var table = document.createElement("table");
  var tr = table.insertRow();
  // Race number
  td = tr.insertCell();
  td.id = "race-header";
  td.appendChild(document.createTextNode("Heat"));
  td.width = "40px";
  // Rider numbers
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Nr"));
  td.width = "20px";
  // Rider names
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Name"));
  td.width = "170px";
  // Swap rider names
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Swap"));
  td.width = "170px";
  // Positions
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Pos"));
  td.width = "20px";
  // Results
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Pts"));
  td.width = "20px";
  // Home team points
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Home"));
  td.width = "40px";
  // Away team points
  td = tr.insertCell()
  td.id = "race-header";
  td.appendChild(document.createTextNode("Away"));
  td.width = "40px";

  element.appendChild(table);
}

// Function that creates table for race object passed as an argument
function createRaceTable(race) {
  var element = document.getElementById("race-" + race.raceNumber);
  element.innerHTML = "";  // Removes race div content so if we refresh race tables we don't get duplicates
  var table = document.createElement("table");
  var tr0 = table.insertRow();
  var tr1 = table.insertRow();
  var tr2 = table.insertRow();
  var tr3 = table.insertRow();

  // Race number cell
  var tdRaceNumber = tr0.insertCell();
  tdRaceNumber.appendChild(document.createTextNode(race.raceNumber));
  tdRaceNumber.setAttribute("rowspan", 3);
  tdRaceNumber.id = "td-race-number";

  // Winner time cell
  var tdRaceTime = tr3.insertCell();
  var textField = document.createElement("form");
  var input = document.createElement("input");
  input.type = "text";
  input.id = "winner-time-textfield";
  tdRaceTime.appendChild(textField.appendChild(input));

  for (i = 0; i < 4; i++) {
    // Riders numbers
    var tdRiderNumber = eval("tr" + i).insertCell();
    var temp = race.numbers[i];
    if (temp == 0) temp = "";
    tdRiderNumber.appendChild(document.createTextNode(temp));
    tdRiderNumber.className = "td-" + race.helmets[i];
    tdRiderNumber.width = "20px";

    // Riders names
    if (race.isAdditional == false) { // Numbers are set to 0 in race in which we choose riders
      var tdRiderName = eval("tr" + i).insertCell();
      var temp = riders[race.numbers[i]].name;
      if (temp == null) temp = "";
      tdRiderName.appendChild(document.createTextNode(temp));
      tdRiderName.className = "td-" + race.helmets[i];
      tdRiderName.id = "td-rider-name";
      if (races[race.raceNumber].swaps[i] != "") {
        tdRiderName.id = "td-swapped-rider-name";
      }
    } else {
      var tdRiderName = eval("tr" + i).insertCell();
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
          var option = document.createElement("option");
          if (j == races[race.raceNumber].numbers[i]) {
            option.selected = "selected";
          }
          var temp = riders[j].name;
          if (temp != "") {   // Adds option only if rider with "j" number is created
            option.value = [race.raceNumber, i, j];
            option.className = "td-" + race.helmets[i];
            option.appendChild(document.createTextNode(temp));
            select.appendChild(option);
          }
      }
      if (races[race.raceNumber].swaps[i] != "") {
        select.id = "select-swapped";
      }
      select.setAttribute("onchange", "setRiderInRace(this)");
      tdRiderName.appendChild(select);
      tdRiderName.className = "td-" + race.helmets[i];
      tdRiderName.width = "170px";
    }

    // Slots for rider change
    var tdSwapRiderName = eval("tr" + i).insertCell();
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
      if (race.numbers[i] != j) { // This if is created to avoid changing rider by himself or empty team slot
        var option = document.createElement("option");
        if (j == races[race.raceNumber].swaps[i]) {
          option.selected = "selected";
        }
        var temp = riders[j].name;
        if (temp != "") {   // Adds option only if rider with "j" number is created
          option.value = [race.raceNumber, i, j];
          option.className = "td-" + race.helmets[i];
          option.appendChild(document.createTextNode(temp));
          select.appendChild(option);
        }
      }
    }
    select.setAttribute("onchange", "swap(this)");
    tdSwapRiderName.appendChild(select);
    tdSwapRiderName.className = "td-" + race.helmets[i];
    tdSwapRiderName.width = "170px";

    // Rider position
    var tdRiderPosition = eval("tr" + i).insertCell();
    var textField = document.createElement("form");
    var input = document.createElement("input");
    input.type = "text";
    input.id = "standard-textfield";
    input.name = [race.raceNumber, i];
    input.value = race.positions[i];
    input.setAttribute("oninput", "calculateResults(this)");
    tdRiderPosition.appendChild(textField.appendChild(input));
    tdRiderPosition.className = "td-" + race.helmets[i];
    tdRiderPosition.width = "20px";

    // Rider result
    var tdRiderResult = eval("tr" + i).insertCell();
    tdRiderResult.className = "td-" + race.helmets[i];
    tdRiderResult.width = "20px";
    tdRiderResult.appendChild(document.createTextNode(race.results[i]));
  }

  // Race and match results
  var tdRaceResultHome = tr0.insertCell();
  tdRaceResultHome.setAttribute("rowspan", 2);
  tdRaceResultHome.width = "40px";

  var tdRaceResultAway = tr0.insertCell();
  tdRaceResultAway.setAttribute("rowspan", 2);
  tdRaceResultAway.width = "40px";

  var tdMatchResultHome = tr2.insertCell();
  tdMatchResultHome.setAttribute("rowspan", 2);
  tdMatchResultHome.setAttribute("bgcolor", "#e6e6e6");
  tdMatchResultHome.width = "40px";

  var tdMatchResultAway = tr2.insertCell();
  tdMatchResultAway.setAttribute("rowspan", 2);
  tdMatchResultAway.setAttribute("bgcolor", "#e6e6e6");
  tdMatchResultAway.width = "40px";

  // Appears match results in race table if all riders results are set
  if (races[race.raceNumber].results.includes("") == false) {
    tdRaceResultHome.appendChild(document.createTextNode(homeTeamPoints[race.raceNumber]));
    tdRaceResultAway.appendChild(document.createTextNode(awayTeamPoints[race.raceNumber]));
    tdMatchResultHome.appendChild(document.createTextNode(homeTeamPoints.slice(0,race.raceNumber+1).reduce((a, b) => a + b, 0)));
    tdMatchResultAway.appendChild(document.createTextNode(awayTeamPoints.slice(0,race.raceNumber+1).reduce((a, b) => a + b, 0)));
  }

  element.appendChild(table);
}

// Function that realizes rider swap
function swap(object) {
  var swapDetails = object.value.split(",")  // [0] - race number, [1] - gate on which swap was made, [2] - number of rider chosen to swap
  races[swapDetails[0]].swaps[swapDetails[1]] = swapDetails[2];
  createRaceTable(races[swapDetails[0]]);  // Refreshes race table after swap
  updateTeamTable(races[swapDetails[0]]);
}

// Function that set rider in additional race.
function setRiderInRace(object) {
  var setDetails = object.value.split(",")  // [0] - race number, [1] - gate on which set was made, [2] - number of rider chosen to set
  races[setDetails[0]].numbers[setDetails[1]] = setDetails[2];
  createRaceTable(races[setDetails[0]]);  // Refreshes race table after swap
  updateTeamTable(races[setDetails[0]]);
}

// Function that calculates results based on positions entered by user
function calculateResults(object) {
  var resultsDetails = object.name.split(",");
  var raceNumber = resultsDetails[0];
  var gate = resultsDetails[1];
  // Matching points with position
  var pointsEarned = "";
  if (object.value == 1) pointsEarned = 3;
  if (object.value == 2) pointsEarned = 2;
  if (object.value == 3) pointsEarned = 1;
  if (object.value == 4) pointsEarned = 0;
  if (object.value == "w") pointsEarned = "w";
  if (object.value == "t") pointsEarned = "t";
  if (object.value == "u") pointsEarned = "u"
  if (object.value == "") pointsEarned = "";
  // Adding position and result to race object
  races[raceNumber].positions[gate] = object.value;
  races[raceNumber].results[gate] = pointsEarned;
  // Refreshing race table after all results are set
  if (races[raceNumber].results.includes("") == false) {
    // Adding results to team results table
    homeTeamPoints[raceNumber] = 0;
    awayTeamPoints[raceNumber] = 0;
    for (var i = 0; i < 4; i++) {
      if (races[raceNumber].helmets[i] == "red" || races[raceNumber].helmets[i] == "blue") {
        if (typeof races[raceNumber].results[i] == "number") homeTeamPoints[raceNumber] += races[raceNumber].results[i];
      } else {
        if (typeof races[raceNumber].results[i] == "number") awayTeamPoints[raceNumber] += races[raceNumber].results[i];
      }
    }
    createRaceTable(races[raceNumber]);
    updateTeamTable(races[raceNumber]);
  }
}

// Function that update team tables after all positions in race are set.
function updateTeamTable(race) {
  // Clear race results in case results have already been set.
  for (var i = 0; i < 17; i++) {
    riders[i].results[race.raceNumber] = null;
  }
  for (var i = 0; i < 4; i++) {
    if (race.swaps[i] == "0") {
      riders[race.numbers[i]].results[race.raceNumber] = race.results[i];
    } else {
      riders[race.numbers[i]].results[race.raceNumber] = "-";
      riders[race.swaps[i]].results[race.raceNumber] = race.results[i];
    }
  }
  createTeamTable("home");
  createTeamTable("away");
}

// Function that creates all 15 race tables
function createAllRaceTables() {
    for (var i = 1; i < 16; i++) {
      createRaceTable(races[i]);
    }
}
