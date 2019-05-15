import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    patients: [],
    CalendarItems: [],
    SuccessionItems: [],
    HistoryItems: [],
    ProfileItems: [],
    MedicationItems:[],
    TaskItems:[]
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_PATIENTS: {
            const patients = state.patients;

            //show loading signal
            if (patients.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.PATIENTS_AVAILABLE: {
            let { data } = action;
            let patients = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                patients.push(item);
            });

            patients.reverse();

            return {...state, patients, isLoading: false};
        }

        case t.LOADING_CALENDARITEMS: {
            const CalendarItems = state.CalendarItems;

            //show loading signal
            if (CalendarItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.CALENDARITEMS_AVAILABLE: {
            let { data } = action;
            let CalendarItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                CalendarItems.push(item);
            });

            CalendarItems.reverse();

            return {...state, CalendarItems, isLoading: false};
        }

        case t.LOADING_SUCCESSIONITEMS: {
            const SuccessionItems = state.SuccessionItems;

            //show loading signal
            if (SuccessionItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.SUCCESSIONITEMS_AVAILABLE: {
            let { data } = action;
            let SuccessionItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                SuccessionItems.push(item);
            });

            SuccessionItems.reverse();

            return {...state, SuccessionItems, isLoading: false};
        }

        case t.LOADING_HISTORYITEMS: {
            const HistoryItems = state.HistoryItems;

            //show loading signal
            if (HistoryItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.HISTORYITEMS_AVAILABLE: {
            let { data } = action;
            let HistoryItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                HistoryItems.push(item);
            });

            HistoryItems.reverse();

            return {...state, HistoryItems, isLoading: false};
        }


        case t.LOADING_PROFILEITEMS: {
            const ProfileItems = state.ProfileItems;

            //show loading signal
            if (ProfileItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.PROFILEITEMS_AVAILABLE: {
            let { data } = action;
            let ProfileItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                ProfileItems.push(item);
            });

            ProfileItems.reverse();

            return {...state, ProfileItems, isLoading: false};
        }

        case t.LOADING_MEDICATIONITEMS: {
            const MedicationItems = state.MedicationItems;

            //show loading signal
            if (MedicationItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.MEDICATIONITEMS_AVAILABLE: {
            let { data } = action;
            let MedicationItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                MedicationItems.push(item);
            });

            MedicationItems.reverse();

            return {...state, MedicationItems, isLoading: false};
        }

        case t.LOADING_TASKS: {
            const TaskItems = state.TaskItems;

            //show loading signal
            if (TaskItems.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.TASKS_AVAILABLE: {
            let { data } = action;
            let TaskItems = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                TaskItems.push(item);
            });

            TaskItems.reverse();

            return {...state, TaskItems, isLoading: false};
        }

        case t.LOGGED_OUT: {
            return {...state, patients: [], CalendarItems: [], SuccessionItems:[],HistoryItems:[],ProfileItems:[],MedicationItems:[],TaskItems:[]};
        }

        default:
            return state;
    }
};

export default homeReducer;
