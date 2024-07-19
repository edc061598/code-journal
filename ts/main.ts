/* global data */
const  imagePlaceholder = 'images/placeholder-image-square.jpg';
const $input = document.getElementById('URL') as HTMLInputElement;
if(!$input) throw new Error('$input does not exist');

const $photoUrl = document.getElementById('placeholder-image-square') as HTMLImageElement;
if(!$photoUrl) throw new Error('$url does not exist');

const $submit = document.querySelector('#contact-form') as HTMLFormElement;
if(!$submit) throw new Error('$submit does not exist');

function inputFunction():void {
  const values = $input.value;
  if($photoUrl){
    $photoUrl.src = values;

  }
  $input.src = values;

}


$input.addEventListener('input', inputFunction);

interface FormElement extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  title: string,
  photo: string,
  notes: string,
  entryId: number;
}
function submitFunction(event:Event):void{

  event.preventDefault();
  const $formElements = $submit.elements as FormElement;
  const objectForm: Entry = {
     entryId : data.nextEntryId,
     title : $formElements.title.value,
     photo : $formElements.photo.value,
     notes : $formElements.notes.value,
  };
      data.nextEntryId++;
    data.entries.unshift(objectForm);
   writeData();
    $photoUrl.src = 'images/placeholder-image-square.jpg';
    $submit.reset();


}

$submit.addEventListener('submit', submitFunction);

function resetForm(){
  $photoUrl.src = '.images/placeholder-image-square.jpg';
  $submit.reset();
}
