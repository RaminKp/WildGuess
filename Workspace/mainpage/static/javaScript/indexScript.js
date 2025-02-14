//Example trait list
const traitList = ['wings', 'teeth', 'fur'];
//Array containing all traitBoxInput's in triatBox
const selectBoxArr = new Array(6);
//Map containing all options not currently selected
const optionSet = new Set();
//Map containing all options currently selected
const selectedOptionsSet = new Set();

// const coloredCircles = ['🔴','🟢']
// let colorChosen = ''

//Ensures that options update is not called recursivly
var updateOptionsEnabled = true;


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
        var space =  document.createElement('br')
        selectBoxArr[i].classList = 'traitBoxInput';
        selectBoxArr[i].value = '';
        selectBoxArr[i].id = 'SelectBox#' + i;
        traitBox.appendChild(selectBoxArr[i]);
        traitBox.appendChild(space);
        addOptions(selectBoxArr[i]);
    }

    //Adds EventListener
    updateOptionsEnabled = false;
    for(let i = 0; i<selectBoxArr.length; i++){
        selectBoxArr[i].addEventListener('change', updateOptions);
    }
    updateOptionsEnabled = true;
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

    //Checks if updateOptions is enabled
    if(!updateOptionsEnabled){
        return;
    }

    updateOptionsEnabled = false;

    //Removes eventListeners so that updateOptions is not called when the selectBoxes are updated
    for(let i; i<selectBoxArr.length; i++){
        selectBoxArr[i].removeEventListener('change', updateOptions);
    }

    //Checks each traitBoxInput selection and updates option sets accordingly
    for(let i = 0; i<selectBoxArr.length; i++){
        //Checks the value of each select box
        if(selectBoxArr[i].value!='' && optionSet.has(selectBoxArr[i].value)){
            //Moves a selected option to selectedOptionsSet and deletes it from optionMap
            selectedOptionsSet.add(selectBoxArr[i].value);
            optionSet.delete(selectBoxArr[i].value);
        }
    }
    
    //Ensures that each element in the selectedOptionsSet is still selected
    for(let i = 0; i<traitList.length; i++){
        if(selectedOptionsSet.has(traitList[i])){
            var traitExists = false;
            for(let j = 0; j<selectBoxArr.length; j++){
                if(selectBoxArr[j].value == traitList[i]){
                    traitExists = true;
                }
            }

            //Removes non selected element from selectedOptionsSet
            if(!traitExists){
                selectedOptionsSet.delete(traitList[i]);
                optionSet.add(traitList[i]);
            }
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

    //Re-adds eventListeners
    for(let i; i<selectBoxArr.length; i++){
        selectBoxArr[i].addEventListener('change', updateOptions);
    }

    updateOptionsEnabled = true;
}