import { database } from "../../config/firebase";
import firebase from 'firebase';
import moment from 'moment'; 
export function addPatient(patient, callback) {
    const { userId } = patient;
    const PatientRef = database.ref().child('patients').push();
    const PatientKey = PatientRef.key;

    patient.id = PatientKey;

    // Write the new patient data simultaneously in the patients list and the user's patients list.
    let updates = {};
    updates['/patients/' + PatientKey] = patient;

    database.ref().update(updates)
        .then(() => callback(true, patient, null))
        .catch((error) => callback(false, null, error));
}


export function getPatients(callback) {
    const { currentUser } = firebase.auth();
    const patientsRef = database.ref(`patients`);

    //start listening for new data
    patientsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updatePatient(patient, callback) {
    const { id, userId } = patient;

    let updates = {};
    updates['patients/' + id] = patient;

    database.ref().update(updates)
        .then(() => callback(true, patient, null))
        .catch((error) => callback(false, null, error));
}

export function deletePatient(patient, callback) {
    const { id, userId } = patient;

    let updates = {};
    updates['patients/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, patient, null))
        .catch((error) => callback(false, null, error));
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



export function addTaskItem(TaskItem, callback) {
    const { userId } = TaskItem;
    const TaskItemRef = database.ref().child(`Tasks`).push();
    const TaskItemKey = TaskItemRef.key;

    TaskItem.id = TaskItemKey;

    // Write the new TaskItem data simultaneously in the TaskItems list and the user's TaskItems list.
    let updates = {};
    updates['/Tasks/' + TaskItemKey] = TaskItem;

    database.ref().update(updates)
        .then(() => callback(true, TaskItem, null))
        .catch((error) => callback(false, null, error));
}


export function getTaskItems(callback) {
    const { currentUser } = firebase.auth();
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    if(month <= 9)
        month = '0'+month;
    let day= myDate.getDate() - 3;
    let tomorrowday= myDate.getDate() + 3;
    if(day <= 9)
        day = '0'+day;

    if(tomorrowday <= 9)
    tomorrowday = '0'+tomorrowday;
    let NowDate = year +'-'+ month +'-'+ day;
    let TomorrowDate = year +'-'+ month +'-'+ tomorrowday;
    const TaskItemsRef = database.ref(`Tasks`).orderByChild('date')
    .startAt(NowDate)
    .endAt(TomorrowDate);

    //start listening for new data
    TaskItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateTaskItem(TaskItem, callback) {
    const { id, userId } = TaskItem;

    let updates = {};
    updates['Tasks/' + id] = TaskItem;

    database.ref().update(updates)
        .then(() => callback(true, TaskItem, null))
        .catch((error) => callback(false, null, error));
}

export function deleteTaskItem(TaskItem, callback) {
    const { id, userId } = TaskItem;

    let updates = {};
    updates['Tasks/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, TaskItem, null))
        .catch((error) => callback(false, null, error));
}

export function TaskComplete(data, callback) {
    const { uid } = data;
    const TaskItemRef = database.ref('Tasks/' + data.data.id);

    TaskItemRef.transaction(function(TaskItem) {
        if (TaskItem) {
            if (TaskItem.CompleteTasks && TaskItem.CompleteTasks[uid]) {
                TaskItem.CompleteTask = false;
                TaskItem.CompleteTasks[uid] = null;
                TaskItem.CompleteTasks[TaskItem.familyId] = null;
            } else {
                TaskItem.CompleteTask = true;
                if (!TaskItem.CompleteTasks) TaskItem.CompleteTasks = {};
                TaskItem.CompleteTasks[uid] = true;
                TaskItem.CompleteTasks[TaskItem.familyId] = true;
                TaskItem.CompleteTaskDate = moment().format('YYYY-MM-DD')
            }
        }

        return TaskItem;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export function addCalendarItem(CalendarItem, callback) {
    const { userId } = CalendarItem;
    const CalendarItemRef = database.ref().child(`Calendar`).push();
    const CalendarItemKey = CalendarItemRef.key;

    CalendarItem.id = CalendarItemKey;

    // Write the new CalendarItem data simultaneously in the CalendarItems list and the user's CalendarItems list.
    let updates = {};
    updates['/Calendar/' + CalendarItemKey] = CalendarItem;

    database.ref().update(updates)
        .then(() => callback(true, CalendarItem, null))
        .catch((error) => callback(false, null, error));
}

export function getCalendarItems(callback) {
    const { currentUser } = firebase.auth();
    const CalendarItemsRef = database.ref(`Calendar`);

    //start listening for new data
    CalendarItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateCalendarItem(CalendarItem, callback) {
    const { id, userId } = CalendarItem;

    let updates = {};
    updates['Calendar/' + id] = CalendarItem;

    database.ref().update(updates)
        .then(() => callback(true, CalendarItem, null))
        .catch((error) => callback(false, null, error));
}

export function deleteCalendarItem(CalendarItem, callback) {
    const { id, userId } = CalendarItem;

    let updates = {};
    updates['Calendar/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, CalendarItem, null))
        .catch((error) => callback(false, null, error));
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



export function addSuccessionItem(SuccessionItem, callback) {
    const { userId } = SuccessionItem;
    const SuccessionItemRef = database.ref().child(`Succession`).push();
    const SuccessionItemKey = SuccessionItemRef.key;

    SuccessionItem.id = SuccessionItemKey;

    // Write the new SuccessionItem data simultaneously in the SuccessionItems list and the user's CalendarItems list.
    let updates = {};
    updates['/Succession/' + SuccessionItemKey] = SuccessionItem;

    database.ref().update(updates)
        .then(() => callback(true, SuccessionItem, null))
        .catch((error) => callback(false, null, error));
}

export function getSuccessionItems(callback) {
    const { currentUser } = firebase.auth();
    const SuccessionItemsRef = database.ref(`Succession`);

    //start listening for new data
    SuccessionItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateSuccessionItem(SuccessionItem, callback) {
    const { id, userId } = SuccessionItem;

    let updates = {};
    updates['Succession/' + id] = SuccessionItem;

    database.ref().update(updates)
        .then(() => callback(true, SuccessionItem, null))
        .catch((error) => callback(false, null, error));
}

export function deleteSuccessionItem(SuccessionItem, callback) {
    const { id, userId } = SuccessionItem;

    let updates = {};
    updates['Succession/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, SuccessionItem, null))
        .catch((error) => callback(false, null, error));
}


export function SuccessionComplete(data, callback) {
    const { SuccessionItem, uid } = data;
    const SuccessionItemRef = database.ref('Succession/' + SuccessionItem.id);

    SuccessionItemRef.transaction(function(SuccessionItem) {
        if (SuccessionItem) {
            if (SuccessionItem.CompleteSuccessions && SuccessionItem.CompleteSuccessions[uid]) {
                SuccessionItem.CompleteSuccession = false;
                SuccessionItem.CompleteSuccessions[uid] = null;
                SuccessionItem.CompleteSuccessions[SuccessionItem.familyId] = null;
            } else {
                SuccessionItem.CompleteSuccession = true;
                if (!SuccessionItem.CompleteSuccessions) SuccessionItem.CompleteSuccessions = {};
                SuccessionItem.CompleteSuccessions[uid] = true;
                SuccessionItem.CompleteSuccessions[SuccessionItem.familyId] = true;
                SuccessionItem.CompleteSuccessionDate = moment().format('YYYY-MM-DD')
            }
        }

        return SuccessionItem;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}



//============+++++++++++++++++++++++++++++++++++++=====


export function updateHistoryItem(SuccessionItem, callback) {
    const { id, userId } = SuccessionItem;

    let updates = {};
    updates['History/' + id] = SuccessionItem;

    database.ref().update(updates)
        .then(() => callback(true, SuccessionItem, null))
        .catch((error) => callback(false, null, error));
}

export function getHistoryItems(callback) {
    const { currentUser } = firebase.auth();
    const HistoryItemsRef = database.ref(`History`);

    //start listening for new data
    HistoryItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export function addProfileItem(ProfileItem, callback) {
    const { userId } = ProfileItem;
    const ProfileItemRef = database.ref().child(`ProfileItems`).push();
    const ProfileItemKey = ProfileItemRef.key;

    ProfileItem.id = ProfileItemKey;

    // Write the new ProfileItem data simultaneously in the ProfileItems list and the user's ProfileItems list.
    let updates = {};
    updates['/ProfileItems/' + ProfileItemKey] = ProfileItem;

    database.ref().update(updates)
        .then(() => callback(true, ProfileItem, null))
        .catch((error) => callback(false, null, error));
}

export function getProfileItems(callback) {
    const { currentUser } = firebase.auth();
    const ProfileItemsRef = database.ref(`ProfileItems`);

    //start listening for new data
    ProfileItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateProfileItem(ProfileItem, callback) {
    const { id, userId } = ProfileItem;

    let updates = {};
    updates['ProfileItems/' + id] = ProfileItem;

    database.ref().update(updates)
        .then(() => callback(true, ProfileItem, null))
        .catch((error) => callback(false, null, error));
}

export function deleteProfileItem(ProfileItem, callback) {
    const { id, userId } = ProfileItem;

    let updates = {};
    updates['ProfileItems/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, ProfileItem, null))
        .catch((error) => callback(false, null, error));
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



export function addMedicationItem(MedicationItem, callback) {
    const { userId } = MedicationItem;
    const MedicationItemRef = database.ref().child(`Medication`).push();
    const MedicationItemKey = MedicationItemRef.key;

    MedicationItem.id = MedicationItemKey;

    // Write the new MedicationItem data simultaneously in the MedicationItems list and the user's CalendarItems list.
    let updates = {};
    updates['/Medication/' + MedicationItemKey] = MedicationItem;

    database.ref().update(updates)
        .then(() => callback(true, MedicationItem, null))
        .catch((error) => callback(false, null, error));
}

export function getMedicationItems(callback) {
    const { currentUser } = firebase.auth();
    const MedicationItemsRef = database.ref(`Medication`).orderByChild('date');

    //start listening for new data
    MedicationItemsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateMedicationItem(MedicationItem, callback) {
    const { id, userId } = MedicationItem;

    let updates = {};
    updates['Medication/' + id] = MedicationItem;

    database.ref().update(updates)
        .then(() => callback(true, MedicationItem, null))
        .catch((error) => callback(false, null, error));
}

export function deleteMedicationItem(MedicationItem, callback) {
    const { id, userId } = MedicationItem;

    let updates = {};
    updates['Medication/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, MedicationItem, null))
        .catch((error) => callback(false, null, error));
}


export function MedicationComplete(data, callback) {
    const {familyId,id,date} = data.data;
    const MedicationItemRef = database.ref('Medication/' + data.data.id);

    MedicationItemRef.transaction(function(MedicationItem) {
        if (MedicationItem) {
            if (MedicationItem.CompleteMedications && MedicationItem.CompleteMedications[id]) {
                MedicationItem.CompleteMedication = false;
                MedicationItem.CompleteMedications[id] = null;
                MedicationItem.CompleteMedications[familyId] = null;
            } else {
                MedicationItem.CompleteMedication = true;
                if (!MedicationItem.CompleteMedications) MedicationItem.CompleteMedications = {};
                MedicationItem.CompleteMedications[id] = true;
                MedicationItem.CompleteMedications[familyId] = true;
                MedicationItem.CompleteMedicationDate = moment().format('YYYY-MM-DD')
            }
        }

        return MedicationItem;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}
