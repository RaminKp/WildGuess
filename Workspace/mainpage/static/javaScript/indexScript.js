//Example trait list
const traitList = ['wings', 'teeth', 'fur'];
//Array containing all traitBoxInput's in triatBox
const selectBoxArr = new Array(6);
//Map containing all options not currently selected
const optionMap = new Map();
//Map containing all options currently selected
const selectedOptionsMap = new Map();

//Initalizes all traitBoxInput's
function onPageLoad(){

    const traitBox = document.getElementById('traitBox');

    //Creates options and adds them to optionMap
    for(let i=0; i<traitList.length; i++){
        var newOption = document.createElement('option');
        newOption.value = traitList[i];
        newOption.textContent = traitList[i];
        newOption.classList = 'optionBox';
        optionMap.set(traitList[i], newOption);
    }

    //Adds selectBoxes
    for(let i = 0; i<selectBoxArr.length; i++){
        selectBoxArr[i] = document.createElement('select');
        selectBoxArr[i].classList = 'traitBoxInput';
        selectBoxArr[i].value = '';
        selectBoxArr[i].id = 'SelectBox#' + i;
        traitBox.appendChild(selectBoxArr[i]);
        addOptions(selectBoxArr[i]);
    }

    //Adds EventListener
    /*not working yet
    for(let i = 0; i<selectBoxArr.length; i++){
        selectBoxArr[i].addEventListener('click', updateOptions());
    }
    */
}

//Adds options from an option map to a select box
//(Not the greatest implementation might fix later)
function addOptions(selectBox){

    //Adds empty option
    var emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.classList = 'optionBox';
    emptyOption.textContent = '';
    emptyOption.selected = true;
    selectBox.appendChild(emptyOption);

    //Adds copys of each trait not currently selected
    for(let i = 0; i<traitList.length; i++){
        if(optionMap.has(traitList[i])){
            let option = optionMap.get(traitList[i]);
            var optionCopy = document.createElement('option');
            optionCopy.value = option.value;
            optionCopy.classList = 'optionBox';
            optionCopy.textContent = option.textContent;
            selectBox.appendChild(optionCopy);
        }
    }
    return
}

//Updates both option maps as well as all traitBoxInput's
function updateOptions(){

    //Checks each traitBoxInput selection and updates option maps accordingly
    for(let i = 0; i<selectBoxArr.length; i++){
        //Checks the value of each select box
        if(selectBoxArr[i].value!='' && optionMap.has(selectBoxArr[i].value)){
            //Moves a selected option to selectedOptionsMap and deletes it from optionMap
            selectedOptionsMap.set(selectBoxArr[i].value, optionMap.get(selectBoxArr[i].value));
            optionMap.delete(selectBoxArr[i].value);
        }
    }

    //Updates traitBoxInput's
    for(let i = 0; i<selectBoxArr.length; i++){
        //Saves current option
        var currOption = selectBoxArr[i].options[selectBoxArr[i].selectedIndex];
        //Removes all options
        selectBoxArr[i].replaceChildren();
        //Adds all non-selected options
        addOptions(selectBoxArr[i]);
        //Re-adds currently selected option
        if(currOption.value != ''){
            selectBoxArr[i].appendChild(currOption);
        }
    }
}