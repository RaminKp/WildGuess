//Example trait list
const traitList = ['wings', 'teeth', 'fur'];
//Array containing all traitBoxInput's in triatBox
const selectBoxArr = new Array(6);
//Map containing all options not currently selected
const optionSet = new Set();
//Map containing all options currently selected
const selectedOptionsSet = new Set();

//Initalizes all traitBoxInput's
function onPageLoad(){

    const traitBox = document.getElementById('traitBox');

    //Creates options and adds them to optionSet
    for(let i=0; i<traitList.length; i++){
        optionSet.add(traitList[i]);
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

//Adds options from an option set to a select box
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
        if(optionSet.has(traitList[i])){
            var option = document.createElement('option');
            option.value = traitList[i];
            option.classList = 'optionBox';
            option.textContent = traitList[i];
            selectBox.appendChild(option);
        }
    }
    return
}

//Updates both option sets as well as all traitBoxInput's
function updateOptions(){

    //Checks each traitBoxInput selection and updates option sets accordingly
    for(let i = 0; i<selectBoxArr.length; i++){
        //Checks the value of each select box
        if(selectBoxArr[i].value!='' && optionSet.has(selectBoxArr[i].value)){
            //Moves a selected option to selectedOptionsSet and deletes it from optionMap
            selectedOptionsSet.add(selectBoxArr[i].value);
            optionSet.delete(selectBoxArr[i].value);
        }
    }
    
    for(let i = 0; i<traitList.length; i++){
        if(optionSet.has(traitList[i])){
            
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
            currOption.selected = true;
            selectBoxArr[i].appendChild(currOption);
        }
    }
}