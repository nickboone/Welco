import * as t from './actionTypes';
import * as api from './api';
const uuidv4 = require('uuid/v4');

// Add Patient - CREATE (C)
export function addPatient(patient, successCB, errorCB) {
    return (dispatch) => {
        api.addPatient(patient, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Patients - READ (R)
export function getPatients(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_PATIENTS});
        api.getPatients(function (success, data, error) {
            if (success) dispatch({type: t.PATIENTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update Patient - UPDATE (U)
export function updatePatient(patient, successCB, errorCB) {
    return (dispatch) => {
        api.updatePatient(patient, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Patient - DELETE (D)
export function deletePatient(patient, errorCB) {
    return (dispatch) => {
        api.deletePatient(patient, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Add TaskItem - CREATE (C)
export function addTaskItem(TaskItem, successCB, errorCB) {
    return (dispatch) => {
        api.addTaskItem(TaskItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get TaskItems - READ (R)
export function getTaskItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_TASKS});
        api.getTaskItems(function (success, data, error) {
            if (success) dispatch({type: t.TASKS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update TaskItem - UPDATE (U)
export function updateTaskItem(TaskItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateTaskItem(TaskItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete TaskItem - DELETE (D)
export function deleteTaskItem(TaskItem, errorCB) {
    return (dispatch) => {
        api.deleteTaskItem(TaskItem, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Complete

export function TaskComplete(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_TASKS});
        api.TaskComplete(data, function (success, data, error) {
            if (error) errorCB(error)
        });
        if (data.data.typeTask === 0){
            let TaskDate = new Date(data.data.date);
            TaskDate.setDate(TaskDate.getDate() + 1);
            data.data.date = TaskDate;
            data.complete = false;
            data.id = uuidv4();
            api.addTaskItem(data.data, function (success, data, error) {
                if (success) return true;
                else if (error) errorCB(error)
            });
        }
    };
}







//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Add CalendarItem - CREATE (C)
export function addCalendarItem(CalendarItem, successCB, errorCB) {
    return (dispatch) => {
        api.addCalendarItem(CalendarItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get CalendarItems - READ (R)
export function getCalendarItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_CALENDARITEMS});
        api.getCalendarItems(function (success, data, error) {
            if (success) dispatch({type: t.CALENDARITEMS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update CalendarItem - UPDATE (U)
export function updateCalendarItem(CalendarItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateCalendarItem(CalendarItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete CalendarItem - DELETE (D)
export function deleteCalendarItem(CalendarItem, errorCB) {
    return (dispatch) => {
        api.deleteCalendarItem(CalendarItem, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Add SuccessionItem - CREATE (C)
export function addSuccessionItem(SuccessionItem, successCB, errorCB) {
    return (dispatch) => {
        api.addSuccessionItem(SuccessionItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}


// Get SuccessionItems - READ (R)
export function getSuccessionItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_SUCCESSIONITEMS});
        api.getSuccessionItems(function (success, data, error) {
            if (success) dispatch({type: t.SUCCESSIONITEMS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update SuccessionItem - UPDATE (U)
export function updateSuccessionItem(SuccessionItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateSuccessionItem(SuccessionItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete SuccessionItem - DELETE (D)
export function deleteSuccessionItem(SuccessionItem, errorCB) {
    return (dispatch) => {
        api.deleteSuccessionItem(SuccessionItem, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}


// Complete
export function SuccessionComplete(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_SUCCESSIONITEMS});
        api.SuccessionComplete(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// updateHistoryItem - UPDATE (U)
export function updateHistoryItem(SuccessionItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateHistoryItem(SuccessionItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}


// Get SuccessionItems - READ (R)
export function getHistoryItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_HISTORYITEMS});
        api.getHistoryItems(function (success, data, error) {
            if (success) dispatch({type: t.HISTORYITEMS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Add ProfileItem - CREATE (C)
export function addProfileItem(ProfileItem, successCB, errorCB) {
    return (dispatch) => {
        api.addProfileItem(ProfileItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get ProfileItems - READ (R)
export function getProfileItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_PROFILEITEMS});
        api.getProfileItems(function (success, data, error) {
            if (success) dispatch({type: t.PROFILEITEMS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update ProfileItem - UPDATE (U)
export function updateProfileItem(ProfileItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateProfileItem(ProfileItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete ProfileItem - DELETE (D)
export function deleteProfileItem(ProfileItem, errorCB) {
    return (dispatch) => {
        api.deleteProfileItem(ProfileItem, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




// Add MedicationItem - CREATE (C)
export function addMedicationItem(MedicationItem, successCB, errorCB) {
    return (dispatch) => {
        api.addMedicationItem(MedicationItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}


// Get MedicationItems - READ (R)
export function getMedicationItems(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_MEDICATIONITEMS});
        api.getMedicationItems(function (success, data, error) {
            if (success) dispatch({type: t.MEDICATIONITEMS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update MedicationItem - UPDATE (U)
export function updateMedicationItem(MedicationItem, successCB, errorCB) {
    return (dispatch) => {
        api.updateMedicationItem(MedicationItem, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete MedicationItem - DELETE (D)
export function deleteMedicationItem(MedicationItem, errorCB) {
    return (dispatch) => {
        api.deleteMedicationItem(MedicationItem, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}


// Complete

export function MedicationComplete(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_MEDICATIONITEMS});
        api.MedicationComplete(data, function (success, data, error) {
            if (error) errorCB(error)
        });
        if (data.data.type === 0){
            let medicationDate = new Date(data.data.date);
            medicationDate.setDate(medicationDate.getDate() + 1);
            data.data.date = medicationDate;
            data.complete = false;
            data.id = uuidv4();
            api.addMedicationItem(data.data, function (success, data, error) {
                if (success) return true;
                else if (error) errorCB(error)
            });
        }
    };
}