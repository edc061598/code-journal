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
    writeData();
    $photoUrl.src = 'images/placeholder-image-square.jpg';
    $submit.reset();
}
$submit.addEventListener('submit', submitFunction);
function resetForm() {
    $photoUrl.src = '.images/placeholder-image-square.jpg';
    $submit.reset();
}
