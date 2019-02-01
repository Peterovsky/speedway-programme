var riders = [];
var ridersResults = [];
for (i = 0; i < 17; i++) {
  ridersResults[i] = [];
}

function setRider(number, name) {
  riders[number] = name;
}

function getRider(number) {
  return riders[number];
}

function createTeamTable(team) {

  var teamOffset = 0;
  if (team == "away") {
    teamOffset = 8;
  }

  var team = document.getElementById(team);
  var table = document.createElement('table');

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
