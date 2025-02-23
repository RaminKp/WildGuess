const traitList = [
  'long neck',                    
  'spotted coat',                 
  'herbivore',       
  'no teeth',                     
  'cold-blooded',                 
  'thick fur for winter',  
  'has small horn-like structures',  
  'can run fast',                 
  'uses tongue to grab food',     
  'webbed feet',        
  'lives underground',            
  'active at night',                   
];

// Correct traits array
const correctTraitList = [
  'long neck',                    
  'spotted coat',                 
  'herbivore',                    
  'has small horn-like structures',  
  'can run fast',                 
  'uses tongue to grab food'      
];
//Array containing all traitBoxInput's in triatBox
const selectBoxArr = new Array(6);
//Map containing all options not currently selected
const optionSet = new Set();
//Map containing all options currently selected
const selectedOptionsSet = new Set();
//Records the score
const score = [0];

const coloredCircles = ['🔴','🟢'];
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


  // Add event listener to the submit button with the class submitBtn

  const submitButton = document.getElementById('submitBtn');

  submitButton.addEventListener('click', function() {
    for (let i = 0; i < selectBoxArr.length; i++) {
        if(selectBoxArr[i].options[selectBoxArr[i].selectedIndex].value == ''){
            return;
        }
    }

    for (let i = 0; i < selectBoxArr.length; i++) {
        checkSelection(i);
    }

    showImage();
    });

  let penguinImg = document.getElementById("penguinImg");
  let hoverText = document.getElementById("hoverText");

  penguinImg.addEventListener("mouseenter", function() {
      hoverText.style.display = "block"; // Show text when hovered
  });

  penguinImg.addEventListener("mouseleave", function() {
      hoverText.style.display = "none"; // Hide text when not hovered
  });
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
  for(let i = 0; i<selectBoxArr.length; i++){
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
  for(let i = 0; i<selectBoxArr.length; i++){
      selectBoxArr[i].addEventListener('change', updateOptions);
  }

  updateOptionsEnabled = true;
}



// Function to check selection and update circle for a specific select box
function checkSelection(index) {
  const selectBox = selectBoxArr[index];
  let circle = document.getElementById('circle' + index);
  if (!circle) {
      circle = document.createElement('p');
      circle.id = 'circle' + index;
      circle.classList = 'circle';
      selectBox.parentNode.insertBefore(circle, selectBox.nextSibling);
  }
  // Remove existing color classes
  circle.classList.remove("greenClass", "redClass");
  
  // Add the appropriate class based on the selection
  if (selectBox.value === '') {
      circle.style.display = 'none'; // Hide the circle if the select box is empty
  } else {
      circle.style.display = 'inline-block'; // Show the circle if the select box is not empty
      if (correctTraitList.includes(selectBox.value)) {
          circle.classList.add("greenClass");
          score[0]++;
      } else {
          circle.classList.add("redClass");
      }
  }
}

// function to show the image and the next game button after submission
function showImage() {
  let penguinImage = document.getElementById('penguinImg'); // Selects penguin image
  let questionImage = document.getElementById('questionImg'); // Selects question image
  let nextGameButton = document.getElementById('nextBtn'); // Selects next game button
  let submitButton = document.getElementById('submitBtn');
  let scoreMessage = document.getElementById('scoreMessage');

  if (penguinImage) {
      penguinImage.style.display = 'inline-block'; // Show the penguin image
  }
  
  if (questionImage) { 
      questionImage.style.display = 'none'; // Hide the question mark
  }

  if (nextGameButton) {
      nextGameButton.style.display = 'inline-block'; // Show next button
  }

  if(submitButton) {
      submitButton.style.display = 'none'; // Hide submit button
  }

  if(scoreMessage) {
      scoreMessage.style.display = 'inline-block' // Show score message display
      scoreMessage.textContent = 'Your Score is ' + score[0] + '!'
  }
}