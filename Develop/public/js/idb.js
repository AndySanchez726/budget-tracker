// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget_tracker and set it to version 1
const request = indexedDB.open('budget-tracker', 1);

// this event will emit if the database version changes(nonexistant to version 1, v1 to v2, etc.
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object strore (table) called 'new_entry', set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_entry', { autoIncrement: true });
};

// upon a success
request.onsuccess = function(event) {
    // when db is successfully created its object store (from onupgradeneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadEntries() function to send all local db data to api
    if (navigator.online) {
        // not created yet
        // uploadEntries();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new entry and there's no interent connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_entry'], 'readwrite');

    // access the object store for 'new_entry'
    const entryObjectStore = transaction.objectStore('new_entry');

    // add record to your store with add methode
    entryObjectStore.add(record);
}