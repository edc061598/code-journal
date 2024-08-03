"use strict";
/* global data */
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
const $deleteButton = document.querySelector('.delete-button');
if (!$deleteButton)
    throw new Error('$deleteButton does not exist');
const $confirmButton = document.querySelector('.confirm');
if (!$confirmButton)
    throw new Error('$confirmButton does not exist');
const $dialog = document.querySelector('dialog');
if (!$dialog)
    throw new Error('$dialog does not exist');
const $inputTitle = document.getElementById('title');
if (!$inputTitle)
    throw new Error('$inputTitle does not exist');
const $notes = document.getElementById('notes');
if (!$notes)
    throw new Error('$notes does not exist');
const $h2Element = document.getElementById('new-entry');
if (!$h2Element)
    throw new Error('$h2Element does not exist');
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
    if (data.editing === null) {
        data.nextEntryId++;
        data.entries.unshift(objectForm);
        $photoUrl.src = 'images/placeholder-image-square.jpg';
        $entryList?.prepend(renderEntry(objectForm));
    }
    else if (data.editing !== null) {
        objectForm.entryId = data.editing.entryId;
        updateEntries(objectForm);
        data.entries.unshift();
        const $newLi = liEntriesFunction(data.editing.entryId);
        $newLi.replaceWith(renderEntry(objectForm));
        data.editing = null;
    }
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
    const $pencilIcon = document.createElement('i');
    $pencilIcon.className = 'fa-solid fa-pencil';
    $pencilIcon.setAttribute('data-entry-id', entry.entryId.toString());
    $entry.append($row);
    $row.append($columnHalfLeft, $columnHalfRight);
    $columnHalfLeft.append($imageWrapper);
    $imageWrapper.append($image);
    $columnHalfRight.append($hTag, $notesEntry);
    $hTag.append($pencilIcon);
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
    if ($h2Element != null) {
        $h2Element.textContent = 'New Entry';
    }
    if (viewName === 'entries' || viewName === 'entry-form') {
        console.log('test');
        resetForm();
        viewSwap(viewName);
    }
}
$newButton.addEventListener('click', newButtonFunction);
function ulFunction(event) {
    const $eventTarget = event.target;
    const $pencilIcon = $eventTarget.getAttribute('data-entry-id');
    if ($h2Element != null) {
        $h2Element.textContent = 'Edit Entry';
    }
    if ($eventTarget.className === 'fa-solid fa-pencil') {
        if ($pencilIcon) {
            for (let i = 0; i < data.entries.length; i++) {
                if (data.entries[i].entryId.toString() === $pencilIcon) {
                    data.editing = data.entries[i];
                }
            }
            if (data.editing) {
                $input.value = data.editing.photo;
                $inputTitle.value = data.editing.title;
                $notes.value = data.editing.notes;
                $photoUrl.setAttribute('src', $input.value);
                viewSwap('entry-form');
            }
        }
    }
}
$entryList.addEventListener('click', ulFunction);
function updateEntries(formEntry) {
    const newEntries = data.entries.map((objectForm) => {
        if (objectForm.entryId === formEntry.entryId) {
            return formEntry;
        }
        else {
            return objectForm;
        }
    });
    data.entries = newEntries;
}
function liEntriesFunction(entryId) {
    const $li = document.querySelectorAll('li');
    for (const li of $li) {
        if (Number(li.getAttribute('data-entry-id')) === entryId) {
            return li;
        }
    }
}
function confirmationModalFunction() {
    const $dialog = document.querySelector('dialog');
    $dialog?.showModal();
}
function cancelModalFunction() {
    const $dialog = document.querySelector('dialog');
    $dialog?.close();
}
