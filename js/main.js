"use strict";
/* global data */
const imagePlaceholder = 'images/placeholder-image-square.jpg';
const $input = document.getElementById('URL');
if (!$input)
    throw new Error('$input does not exist');
const $photoUrl = document.getElementById('placeholder-image-square');
if (!$photoUrl)
    throw new Error('$url does not exist');
const $submit = document.querySelector('#contact-form');
if (!$submit)
    throw new Error('$submit does not exist');
const $entryList = document.querySelector('.entry-list');
if (!$entryList)
    throw new Error('$entryList does not exist');
const $allEntries = document.querySelector('.all-entries');
if (!$allEntries)
    throw new Error('$allEntries does not exist');
const $noEntries = document.querySelector('.no-entries');
if (!$noEntries)
    throw new Error('$noEntries does not exist');
const $entriesForm = document.querySelector('.entries-form');
if (!$entriesForm)
    throw new Error('$entries does not exist');
const $navBar = document.querySelector('.navbar');
if (!$navBar)
    throw new Error('$navBar does not exist');
const $newButton = document.querySelector('.new-button');
if (!$newButton)
    throw new Error('$newButton does not exist');
function inputFunction() {
    const values = $input.value;
    if ($photoUrl) {
        $photoUrl.src = values;
    }
    $input.src = values;
}
$input.addEventListener('input', inputFunction);
function submitFunction(event) {
    event.preventDefault();
    const $formElements = $submit.elements;
    const objectForm = {
        entryId: data.nextEntryId,
        title: $formElements.title.value,
        photo: $formElements.photo.value,
        notes: $formElements.notes.value,
    };
    data.nextEntryId++;
    data.entries.unshift(objectForm);
    $photoUrl.src = 'images/placeholder-image-square.jpg';
    $entryList?.prepend(renderEntry(objectForm));
    writeData();
    resetForm();
    toggleNoEntries();
    viewSwap('entries');
}
$submit.addEventListener('submit', submitFunction);
//console.log($submit.addEventListener('submit', submitFunction));
function resetForm() {
    $photoUrl.src = 'images/placeholder-image-square.jpg';
    $submit.reset();
}
function renderEntry(entry) {
    const $entry = document.createElement('li');
    $entry.setAttribute('data-entry-id', entry.entryId.toString());
    const $row = document.createElement('div');
    $row.className = 'row';
    const $columnHalfLeft = document.createElement('div');
    $columnHalfLeft.className = 'column-half';
    const $imageWrapper = document.createElement('div');
    $imageWrapper.className = ('image-wrapper');
    const $image = document.createElement('img');
    $image.setAttribute('src', entry.photo);
    const $columnHalfRight = document.createElement('div');
    $columnHalfRight.className = 'column-half';
    const $hTag = document.createElement('h2');
    $hTag.textContent = entry.title;
    const $notesEntry = document.createElement('p');
    $notesEntry.textContent = entry.notes;
    $entry.append($row);
    $row.append($columnHalfLeft, $columnHalfRight);
    $columnHalfLeft.append($imageWrapper);
    $imageWrapper.append($image);
    $columnHalfRight.append($hTag, $notesEntry);
    return $entry;
}
function domContentLoaded() {
    if (!$entryList) {
        throw new Error('$entryList is null');
    }
    for (let i = 0; i < data.entries.length; i++) {
        const entry = data.entries[i];
        $entryList.append(renderEntry(entry));
    }
    console.log(data.view);
    const currentView = data.view;
    viewSwap(currentView);
    toggleNoEntries();
}
document.addEventListener('DOMContentLoaded', domContentLoaded);
//console.log(document.addEventListener('DOMContentLoaded', domContentLoaded));
function toggleNoEntries() {
    if (!$noEntries) {
        throw new Error('$noEntries does not exist');
    }
    if (data.entries.length) {
        $noEntries.classList.add('hidden');
    }
    else {
        $noEntries.classList.remove('hidden');
    }
}
function viewSwap(viewName) {
    if (viewName === 'entries') {
        $entriesForm?.classList.add('hidden');
        $allEntries?.classList.remove('hidden');
    }
    else if (viewName === 'entry-form') {
        $entriesForm?.classList.remove('hidden');
        $allEntries?.classList.add('hidden');
    }
    data.view = viewName;
}
function navBarFunction(event) {
    const $eventTarget = event.target;
    const viewName = $eventTarget.dataset.view;
    if (viewName === 'entries' || viewName === 'entry-form') {
        viewSwap(viewName);
    }
}
$navBar.addEventListener('click', navBarFunction);
function newButtonFunction(event) {
    const $eventTarget = event.target;
    const viewName = $eventTarget.dataset.view;
    if (viewName === 'entries' || viewName === 'entry-form') {
        console.log('test');
        resetForm();
        viewSwap(viewName);
    }
}
$newButton.addEventListener('click', newButtonFunction);
