let riders = [];  // Array with all 16 rider objects
let races = [];   // Array with all 15 race objects
let homeTeamPoints = []; // 15 elements array with amount of points earned by home team in each race
let awayTeamPoints = []; // 15 elements array with amount of points earned by away team in each race
let homeTeamName;
let awayTeamName;

for (let i = 0; i < 16; i++) {  // Fills race informations table and table with team results with default values
  // numbers - 4-element array with numbers of riders in races
  // helmets - 4-element array with helmet colors of riders in races
  // swaps - 4-element array with information about rider swaps on each gate
  // results - 4-element array with information about rider results on each gate
  // isAdditional - additional races are races which don't have predifined riders set, riders are chosen by coach during the match
  races[i] = { raceNumber: i, numbers: [], helmets: [], swaps: [0, 0, 0, 0], positions: ["", "", "", ""], results: ["", "", "", ""], isAdditional: false };
  homeTeamPoints[i] = 0;
  awayTeamPoints[i] = 0;
}

for (let i = 0; i < 17; i++) {  // Fills riders table with default values
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
  return value !== null;
}

function isNumber(value) {
  return typeof value === "number";
}

// Function that creates table with team results
function createTeamTable(team) {
  const element = document.getElementById(team);
  const table = document.createElement("table");
  element.innerHTML = "";  // Removes div content so if we refresh team tables we don't get duplicates

  let teamOffset = 0;
  if (team === "home") {
    teamOffset = 8;
  }

  // Team name
  let tr = table.insertRow();
  const tdTeamName = tr.insertCell();
  tdTeamName.setAttribute("colspan", 9);
  const textField = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.id = "standard-textfield";
  input.placeholder = "Enter team name";
  if (team === "home") {
    input.name = "home";
    if (homeTeamName) input.value = homeTeamName;
  } else {
    input.name = "away";
    if (awayTeamName) input.value = awayTeamName;
  }
  input.setAttribute("oninput", "setTeamName(this.name, this.value)");
  tdTeamName.appendChild(textField.appendChild(input));;

  // Team result
  const tdTeamResult = tr.insertCell();
  if (team === "home") {
    tdTeamResult.appendChild(document.createTextNode(homeTeamPoints.reduce((a, b) => a + b, 0)));
  } else {
    tdTeamResult.appendChild(document.createTextNode(awayTeamPoints.reduce((a, b) => a + b, 0)));
  }

  // Column headers
  tr = table.insertRow();
  tr.insertCell().appendChild(document.createTextNode("Nr"));
  tr.insertCell().appendChild(document.createTextNode("Name"));
  for (let i = 1; i < 8; i++) {
    tr.insertCell().appendChild(document.createTextNode(i));
  }
  tr.insertCell().appendChild(document.createTextNode("Sum"));

  // Table content
  for (let i = (1 + teamOffset); i < (9 + teamOffset); i++) {
    const tr = table.insertRow();

    // Rider number
    const tdNumber = tr.insertCell();
    tdNumber.appendChild(document.createTextNode(i));
    tdNumber.id = "td-number";

    // Rider name
    const tdRiderName = tr.insertCell();
    const textField = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.id = "rider-name-textfield";
    input.name = i;
    input.value = riders[i].name;
    input.setAttribute("oninput", "setRider(this.name, this.value); createAllRaceTables()");
    tdRiderName.appendChild(textField.appendChild(input));;
    tdRiderName.id = "td-rider-name";

    // Results of rider races
    for (let j = 0; j < 7; j++) {
      let temp = riders[i].results.filter(isNotNull)[j];
      if (temp == null) temp = "";
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(temp));
      td.id = "td-point";
    }

    // Sum of an array with rider results
    const tdSum = tr.insertCell();
    tdSum.appendChild(document.createTextNode(riders[i].results.filter(isNumber).reduce((a, b) => a + b, 0)));
    tdSum.id = "td-sum";

  }
  element.appendChild(table);
}

// Function that creates headers above race tables
function createRaceTableHeader(idName) {
  const element = document.getElementById(idName);
  const table = document.createElement("table");
  const tr = table.insertRow();

  // Race number
  const tdRaceNumber = tr.insertCell();
  tdRaceNumber.id = "race-header";
  tdRaceNumber.appendChild(document.createTextNode("Heat"));
  tdRaceNumber.width = "40px";

  // Riders numbers
  const tdRidersNumbers = tr.insertCell();
  tdRidersNumbers.id = "race-header";
  tdRidersNumbers.appendChild(document.createTextNode("Nr"));
  tdRidersNumbers.width = "20px";

  // Riders names
  const tdRidersNames = tr.insertCell();
  tdRidersNames.id = "race-header";
  tdRidersNames.appendChild(document.createTextNode("Name"));
  tdRidersNames.width = "170px";

  // Swap riders names
  const tdSwapRidersNames = tr.insertCell();
  tdSwapRidersNames.id = "race-header";
  tdSwapRidersNames.appendChild(document.createTextNode("Swap"));
  tdSwapRidersNames.width = "170px";

  // Positions
  const tdPositions = tr.insertCell();
  tdPositions.id = "race-header";
  tdPositions.appendChild(document.createTextNode("Pos"));
  tdPositions.width = "20px";

  // Results
  const tdResults = tr.insertCell();
  tdResults.id = "race-header";
  tdResults.appendChild(document.createTextNode("Pts"));
  tdResults.width = "20px";

  // Home team points
  const tdHomeTeamPoints = tr.insertCell();
  tdHomeTeamPoints.id = "race-header";
  tdHomeTeamPoints.appendChild(document.createTextNode("Home"));
  tdHomeTeamPoints.width = "40px";

  // Away team points
  const tdAwayTeamPoints = tr.insertCell();
  tdAwayTeamPoints.id = "race-header";
  tdAwayTeamPoints.appendChild(document.createTextNode("Away"));
  tdAwayTeamPoints.width = "40px";

  element.appendChild(table);
}

// Function that creates table for race object passed as an argument
function createRaceTable(race) {
  const element = document.getElementById("race-" + race.raceNumber);
  element.innerHTML = "";  // Removes race div content so if we refresh race tables we don't get duplicates
  const table = document.createElement("table");
  const tr0 = table.insertRow();
  const tr1 = table.insertRow();
  const tr2 = table.insertRow();
  const tr3 = table.insertRow();

  // Race number cell
  const tdRaceNumber = tr0.insertCell();
  tdRaceNumber.appendChild(document.createTextNode(race.raceNumber));
  tdRaceNumber.setAttribute("rowspan", 3);
  tdRaceNumber.id = "td-race-number";

  // Winner time cell
  const tdRaceTime = tr3.insertCell();
  const textField = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.id = "winner-time-textfield";
  tdRaceTime.appendChild(textField.appendChild(input));

  for (let i = 0; i < 4; i++) {

    // Riders numbers
    const tdRiderNumber = eval("tr" + i).insertCell();
    let temp = race.numbers[i];
    if (temp === 0) temp = "";
    tdRiderNumber.appendChild(document.createTextNode(temp));
    tdRiderNumber.className = "td-" + race.helmets[i];
    tdRiderNumber.width = "20px";

    // Riders names
    if (!race.isAdditional) { // Numbers are set to 0 in race in which we choose riders
      const tdRiderName = eval("tr" + i).insertCell();
      let temp = riders[race.numbers[i]].name;
      if (!temp) temp = "";
      tdRiderName.appendChild(document.createTextNode(temp));
      tdRiderName.className = "td-" + race.helmets[i];
      tdRiderName.id = "td-rider-name";
      if (races[race.raceNumber].swaps[i] != "") {
        tdRiderName.id = "td-swapped-rider-name";
      }
    } else {
      const tdRiderName = eval("tr" + i).insertCell();
      const select = document.createElement("select");
      let teamOffset = 0;
      if (race.helmets[i] === "red" || race.helmets[i] === "blue") {
        teamOffset = 8;
      }

      // Default empty option
      const option = document.createElement("option");
      option.className = "td-" + race.helmets[i];
      option.value = [race.raceNumber, i, ""];
      option.appendChild(document.createTextNode(""));
      select.appendChild(option);

      // Riders options
      for (let j = (1 + teamOffset); j < (9 + teamOffset); j++) {
        const option = document.createElement("option");
        if (j == races[race.raceNumber].numbers[i]) {
          option.selected = "selected";
        }
        let temp = riders[j].name;
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
    const tdSwapRiderName = eval("tr" + i).insertCell();
    const select = document.createElement("select");
    let teamOffset = 0;
    if (race.helmets[i] === "red" || race.helmets[i] === "blue") {
      teamOffset = 8;
    }

    // Default empty option
    const option = document.createElement("option");
    option.className = "td-" + race.helmets[i];
    option.value = [race.raceNumber, i, ""];
    option.appendChild(document.createTextNode(""));
    select.appendChild(option);

    // Riders options
    for (let j = (1 + teamOffset); j < (9 + teamOffset); j++) {
      if (race.numbers[i] !== j) { // This if is created to avoid changing rider by himself or empty team slot
        let option = document.createElement("option");
        if (j == races[race.raceNumber].swaps[i]) {
          option.selected = "selected";
        }
        let temp = riders[j].name;
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
    const tdRiderPosition = eval("tr" + i).insertCell();
    const textField = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.id = "standard-textfield";
    input.name = [race.raceNumber, i];
    input.value = race.positions[i];
    input.setAttribute("oninput", "calculateResults(this)");
    tdRiderPosition.appendChild(textField.appendChild(input));
    tdRiderPosition.className = "td-" + race.helmets[i];
    tdRiderPosition.width = "20px";

    // Rider result
    const tdRiderResult = eval("tr" + i).insertCell();
    tdRiderResult.className = "td-" + race.helmets[i];
    tdRiderResult.width = "20px";
    tdRiderResult.appendChild(document.createTextNode(race.results[i]));
  }

  // Race and match results
  const tdRaceResultHome = tr0.insertCell();
  tdRaceResultHome.setAttribute("rowspan", 2);
  tdRaceResultHome.width = "40px";

  const tdRaceResultAway = tr0.insertCell();
  tdRaceResultAway.setAttribute("rowspan", 2);
  tdRaceResultAway.width = "40px";

  const tdMatchResultHome = tr2.insertCell();
  tdMatchResultHome.setAttribute("rowspan", 2);
  tdMatchResultHome.setAttribute("bgcolor", "#e6e6e6");
  tdMatchResultHome.width = "40px";

  const tdMatchResultAway = tr2.insertCell();
  tdMatchResultAway.setAttribute("rowspan", 2);
  tdMatchResultAway.setAttribute("bgcolor", "#e6e6e6");
  tdMatchResultAway.width = "40px";

  // Appears match results in race table if all riders results are set
  if (!races[race.raceNumber].results.includes("")) {
    tdRaceResultHome.appendChild(document.createTextNode(homeTeamPoints[race.raceNumber]));
    tdRaceResultAway.appendChild(document.createTextNode(awayTeamPoints[race.raceNumber]));
    tdMatchResultHome.appendChild(document.createTextNode(homeTeamPoints.slice(0, race.raceNumber + 1).reduce((a, b) => a + b, 0)));
    tdMatchResultAway.appendChild(document.createTextNode(awayTeamPoints.slice(0, race.raceNumber + 1).reduce((a, b) => a + b, 0)));
  }

  element.appendChild(table);
}

// Function that realizes rider swap
function swap(object) {
  const swapDetails = object.value.split(",");  // [0] - race number, [1] - gate on which swap was made, [2] - number of rider chosen to swap
  races[swapDetails[0]].swaps[swapDetails[1]] = swapDetails[2];
  createRaceTable(races[swapDetails[0]]);  // Refreshes race table after swap
  updateTeamTable(races[swapDetails[0]]);
}

// Function that set rider in additional race.
function setRiderInRace(object) {
  const setDetails = object.value.split(",");  // [0] - race number, [1] - gate on which set was made, [2] - number of rider chosen to set
  races[setDetails[0]].numbers[setDetails[1]] = setDetails[2];
  createRaceTable(races[setDetails[0]]);  // Refreshes race table after swap
  updateTeamTable(races[setDetails[0]]);
}

// Function that calculates results based on positions entered by user
function calculateResults(object) {
  const resultsDetails = object.name.split(",");
  const raceNumber = resultsDetails[0];
  const gate = resultsDetails[1];

  // Matching points with position
  let pointsEarned = "";
  if (object.value == 1) pointsEarned = 3;
  if (object.value == 2) pointsEarned = 2;
  if (object.value == 3) pointsEarned = 1;
  if (object.value == 4) pointsEarned = 0;
  if (object.value == "w") pointsEarned = "w";
  if (object.value == "t") pointsEarned = "t";
  if (object.value == "u") pointsEarned = "u";
  if (object.value == "d") pointsEarned = "d";
  if (object.value == "") pointsEarned = "";

  // Adding position and result to race object
  races[raceNumber].positions[gate] = object.value;
  races[raceNumber].results[gate] = pointsEarned;

  // Refreshing race table after all results are set
  if (!races[raceNumber].results.includes("")) {

    // Adding results to team results table
    homeTeamPoints[raceNumber] = 0;
    awayTeamPoints[raceNumber] = 0;
    for (let i = 0; i < 4; i++) {
      if (races[raceNumber].helmets[i] === "red" || races[raceNumber].helmets[i] === "blue") {
        if (typeof races[raceNumber].results[i] === "number") homeTeamPoints[raceNumber] += races[raceNumber].results[i];
      } else {
        if (typeof races[raceNumber].results[i] === "number") awayTeamPoints[raceNumber] += races[raceNumber].results[i];
      }
    }
    createRaceTable(races[raceNumber]);
    updateTeamTable(races[raceNumber]);
  }

}

// Function that update team tables after all positions in race are set.
function updateTeamTable(race) {
  // Clear race results in case results have already been set.
  for (let i = 0; i < 17; i++) {
    riders[i].results[race.raceNumber] = null;
  }
  for (let i = 0; i < 4; i++) {
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
  for (let i = 1; i < 16; i++) {
    createRaceTable(races[i]);
  }
}

window.onload = () => {
  createTeamTable("home");
  createTeamTable("away");
  createRaceTableHeader("header");
  createRaceTableHeader("header2");
  createRace(1, [1, 9, 2, 10], ["yellow", "red", "white", "blue"], false);
  createRace(2, [15, 6, 14, 7], ["blue", "yellow", "red", "white"], false);
  createRace(3, [11, 3, 12, 4], ["red", "yellow", "blue", "white"], false);
  createRace(4, [5, 15, 7, 13], ["yellow", "blue", "white", "red"], false);
  createRace(5, [12, 1, 11, 2], ["blue", "yellow", "red", "white"], false);
  createRace(6, [3, 13, 4, 14], ["yellow", "red", "white", "blue"], false);
  createRace(7, [9, 5, 10, 6], ["red", "yellow", "blue", "white"], false);
  createRace(8, [13, 2, 15, 1], ["red", "white", "blue", "yellow"], false);
  createRace(9, [4, 10, 3, 9], ["white", "blue", "yellow", "red"], false);
  createRace(10, [7, 11, 5, 12], ["white", "red", "yellow", "blue"], false);
  createRace(11, [10, 2, 13, 3], ["blue", "white", "red", "yellow"], false);
  createRace(12, [6, 14, 1, 11], ["white", "blue", "yellow", "red"], false);
  createRace(13, [12, 4, 9, 5], ["blue", "white", "red", "yellow"], false);
  createRace(14, [0, 0, 0, 0], ["red", "white", "blue", "yellow"], true);
  createRace(15, [0, 0, 0, 0], ["red", "white", "blue", "yellow"], true);
  createAllRaceTables();
}
