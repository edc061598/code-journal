"use strict";
const localStorageDataKey = 'code-data';
const data = readData();
function readData() {
    let data;
    const localStorageData = localStorage.getItem(localStorageDataKey);
    if (!localStorageData) {
        data = {
            view: 'entry-form',
            entries: [],
            editing: null,
            nextEntryId: 1,
        };
    }
    else {
        data = JSON.parse(localStorageData);
    }
    return data;
}
function writeData() {
    const localDataJSON = JSON.stringify(data);
    localStorage.setItem(localStorageDataKey, localDataJSON);
}
