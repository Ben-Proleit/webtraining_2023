// #region class

class Mission {

  #id
  constructor(id = null) {
    this.#id = (id === null) ? crypto.randomUUID() : id;
    this.name = "";
    this.description = "";
    this.enddate = null;
    this.completed = false;
  }

  getId() {
    return this.#id;
  }
}

class MissionListSerializer {
  constructor() {
    throw Error("MissionListSerializer is a static class");
  }

  static toJSON(missionList) {
    // Prepare
    let anonymClassList = [];
    missionList.forEach(element => {
      anonymClassList.push({
        "id": element.getId(),
        "name":element.name,
        "description":element.description,
        "enddate": (element.enddate != null) ? element.enddate.toJSON() : null,
        "completed":element.completed
      })
    }); 

    return JSON.stringify(anonymClassList);
  }

  static fromJSON(jsonString) {
    let result = [];
    let jsonArray = JSON.parse(jsonString);

    Array.from(jsonArray).forEach(x =>
    {
      let mission = new Mission( x.id);
      mission.name = x.name;
      mission.description = x.description;
      mission.completed = x.completed;
      mission.enddate = x.enddate != null ? new Date(x.enddate) : null;
      result.push(mission);
    });

    return result;

  }

  static save(missions) {
    localStorage.setItem("missions", MissionListSerializer.toJSON(missions));
  }

  static load() {
    return MissionListSerializer.fromJSON(localStorage.getItem("missions"));
  }
}

// #endregion class

// #region Global vars

var missions = MissionListSerializer.load();
if(missions === null)
  missions = [];

// #endregion Global vars


// #region Global Functions

function createOrGetMission(id) {
  let mission = missions.find((x) => x.getId().toLowerCase() === id.toLowerCase());
  // Create mission if not exists
  if (mission === null || mission === undefined) {
    mission = new Mission();
  }

  return mission;
}

function showDetailedMissionScreen(mission) {
  if(mission === null || mission === undefined) {
    // Empty Texts
    document.getElementById("detailed-mission-id").value = "[NEWMISSION]";
    document.getElementById("detailed-mission-name").value = "";
    document.getElementById("detailed-mission-description").value = "";
    document.getElementById("detailed-mission-enddate").value = "";
  }
  else {
    document.getElementById("detailed-mission-id").value = mission.getId();
    document.getElementById("detailed-mission-name").value = mission.name;
    document.getElementById("detailed-mission-description").value = mission.description;
    document.getElementById("detailed-mission-enddate").value = (mission.enddate != null) 
                                                                ? mission.enddate.toISOString()
                                                                .substring(0, mission.enddate.toISOString().indexOf("T"))
                                                                : null;
  }


  // Show screen
  document.getElementById("detailed-mission-view").style.display = "";
}

function addOrEditMission() {
  // Create new Entry
  let mission = createOrGetMission(document.getElementById("detailed-mission-id").value);
  mission.name = document.getElementById("detailed-mission-name").value;
  mission.description = document.getElementById("detailed-mission-description").value;
  let enddateTimestamp = Date.parse(document.getElementById("detailed-mission-enddate").value);
  mission.enddate = (!Number.isNaN(enddateTimestamp)) ? new Date(enddateTimestamp) : null;

  // Add entry to List, if it not already exists
  if(!missions.find((x) => x.getId().toLowerCase() === mission.getId().toLowerCase()))
    missions.push(mission);

  // Add / update mission to DOM
  updateMissionDisplay(mission);

  // hide popup
  document.getElementById("detailed-mission-view").style.display = "none";

  // Save
  MissionListSerializer.save(missions);
}

function onEditButtonClick(e) {
  let mission = createOrGetMission(e.srcElement.parentElement.id);
  showDetailedMissionScreen(mission);
}

function onDeleteButtonClick(e) {

  let confirm = window.confirm("Möchten sie dieses To-Do wirklich löschen?");

  if(!confirm)
    return;
  
  // Get missiondiv
  let missionDiv = e.srcElement.parentElement;

  // Delete from List
  missions.splice(missions.findIndex(x => x.getId().toLowerCase() === missionDiv.id.toLowerCase()), 1);

  // Remove div
  missionDiv.remove();

  // Save
  MissionListSerializer.save(missions);
}

function onCancelButtonClick() {
  document.getElementById("detailed-mission-view").style.display = "none";
}

function onDetailedViewClick(e) {
  // if(e.target.id === "detailed-mission-view")
  //   onCancelButtonClick();
}

function onCompletedCheckboxChanged(e) {
  // Select mission
  let mission = createOrGetMission(e.srcElement.parentElement.id);
  mission.completed = e.srcElement.checked;
  updateMissionDisplay(mission);

  // Save
  MissionListSerializer.save(missions);
}

function updateMissionDisplay(mission) {
  let missionDiv = document.getElementById(mission.getId());

  if(missionDiv === null || missionDiv === undefined) {
    missionDiv = createMissionDiv(mission.getId());
  }

  //Update parent child (if nesseccasy)
  let targetParentId = (mission.completed) ? "completed-list" : "mission-list";
  if(missionDiv.parentElement.id !== targetParentId)
  {
    missionDiv.remove();
    document.getElementById(targetParentId).appendChild(missionDiv);
  }

  // Set values
  missionDiv.querySelector(".mission-completed").checked = mission.completed;
  missionDiv.querySelector(".mission-name").innerText = mission.name;
  missionDiv.querySelector(".mission-description").innerText = mission.description;
  missionDiv.querySelector(".mission-enddate").innerText = (mission.enddate != null) ? mission.enddate.toLocaleDateString() : "";

  // Update Expireing color
  missionDiv.querySelector(".mission-enddate").classList.remove("overdue");
  if(Date.now() >= mission.enddate?.getTime() && missionDiv.parentElement.id == "mission-list")
    missionDiv.querySelector(".mission-enddate").classList.add("overdue");
}

function createMissionDiv(id) {
  if(id === null || id === undefined)
    throw Error("Parameter ID is null or undefined");

  let missionDiv = document.getElementById("mission-list").appendChild(document.createElement("div"));
  missionDiv.id = id;

  // Checkbox
  let newElement = missionDiv.appendChild(document.createElement("input"));
  newElement.type = "checkbox";
  newElement.classList.add("mission-completed");
  newElement.onchange = onCompletedCheckboxChanged;

  missionDiv.appendChild(document.createElement("span")).classList.add("mission-name");
  missionDiv.appendChild(document.createElement("span")).classList.add("mission-description");
  missionDiv.appendChild(document.createElement("span")).classList.add("mission-enddate");

  // Buttons
  let buttonEdit = missionDiv.appendChild(document.createElement("button"));
  buttonEdit.classList.add("mission-edit-button");
  buttonEdit.onclick = onEditButtonClick;

  let buttonDelete = missionDiv.appendChild(document.createElement("button"));
  buttonDelete.classList.add("mission-delete-button");
  buttonDelete.onclick = onDeleteButtonClick;

  return missionDiv;
}


// #endregion Global Functions

// Register Events
document.getElementById("detailed-mission-view").onclick = onDetailedViewClick;

// Display loaded missions
for (let x in missions) {
  updateMissionDisplay(missions[x]);
}