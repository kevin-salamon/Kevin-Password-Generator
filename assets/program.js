// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
    alert("Please confirm the types of characters to be included in the password.");

    let lowercaseConfirm = confirm("Would you like to include lowercase letters in the password?");
    let uppercaseConfirm = confirm("Would you like to include uppercase letters in the password?");
    let numberConfirm = confirm("Would you like to include numbers in the password?");
    let specialConfirm = confirm("Would you like to include special characters ($, !, etc.) in the password?");
    if (lowercaseConfirm == false && uppercaseConfirm == false && numberConfirm == false && specialConfirm == false) {
        alert("You must select at least one character type to include in the password");
    }

    let characterCount;

    do {
        characterCount = +prompt("How many characters would you like to include within the password. Please select a number between 8 and 128.");
        if (characterCount < 8 || characterCount > 128) {
            alert("Character count must be between 8 and 128");
        }
    } while (characterCount < 8 || characterCount > 128);
    alert(`Your password will be ${characterCount} characters long.`)
    
    let passArray = []; // ultimately used on line 89 //
    let selectionArray = [];
    let lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let numbercase = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let specialcase = ["!", "@", "#", "$", "%", "&", "*"];

    if (lowercaseConfirm == true) {
        selectionArray.push(lowercase);
    }
    if (uppercaseConfirm == true) {
        selectionArray.push(uppercase);
    }
    if (numberConfirm == true) {
        selectionArray.push(numbercase);
    }
    if (specialConfirm == true) {
        selectionArray.push(specialcase);
    }


    for (i = 0; i < characterCount; i++) {
        let typeSelect;
        let selector = Math.random();
        if (selectionArray.length == 4) {
            if (selector < 0.25) {
                typeSelect = selectionArray[0];
            } else if (selector >= 0.25 && selector < 0.50) {
                typeSelect = selectionArray[1];
            } else if (selector >= 0.50 && selector < 0.75) {
                typeSelect = selectionArray[2];
            } else {
                typeSelect = selectionArray[3];
            }
        } else if (selectionArray.length == 3) {
            if (selector < 0.33) {
                typeSelect = selectionArray[0];
            } else if (selector >= 0.33 && selector < 0.66) {
                typeSelect = selectionArray[1];
            } else {
                typeSelect = selectionArray[2];
            }
        } else if (selectionArray.length == 2) {
            if (selector < 0.50) {
                typeSelect = selectionArray[0];
            } else {
                typeSelect = selectionArray[1];
            }
        } else if (selectionArray.length == 1) { //was receiving errors when the typeSelect simply equaled selectionArray[0] here, not sure why. As such, I simply equaled typeSelect to the exact character arrays. //
            if (lowercaseConfirm == true) {
                typeSelect = lowercase;
            }
            else if (uppercaseConfirm == true) {
                typeSelect = uppercase;
            }
            else if (numberConfirm == true) {
                typeSelect = numbercase;
            }
            else if (specialConfirm == true) {
                typeSelect = specialcase;
            }
        }

        let innerSelector = Math.round(Math.random() * typeSelect.length);
        passArray.push(typeSelect[innerSelector]);  // rather than += characters into an empty string, I used an array and joined the elements at the end. This prevented a bug that added multiple "undefined" to the final password. //
    }

    let password = passArray.join("");
    alert(password);

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/* GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page */