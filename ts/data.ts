/* exported data */
interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}



const localStorageDataKey = 'code-data';

const data = readData();

function readData(): Data {
  let data: Data;
  const localStorageData = localStorage.getItem(localStorageDataKey);

  if(localStorageData){
     data = JSON.parse(localStorageData) as Data;
  } else {
       data = {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };

  }
  return data;
}

function writeData(): void {
  const localDataJSON = JSON.stringify(data);
  localStorage.setItem(localStorageDataKey, localDataJSON);

}
