// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Declare empty array of criteria that will be filled as questins are answered
var arrayOfCriteria = [];

// Declare arrays ofletters, numbers and special characters
var alphabetCharacters = "abcdefghijklmnopqrstuvwxyz".split("");
var numerics = "0123456789".split("");
var specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");

// Prompt for password and check for numbers only and between 8 and 128
var passwordLength = 0;
do {
  passwordLength = prompt("How long to you want the password? \n (Between 8 and 128 characters)");
  if (passwordLength < 8 || passwordLength > 128) {
    alert("Please choose length of password betwen 8 and 128 characters");
  }
  if (isNaN(passwordLength)) {
    alert("Please use numbers only");
  }
} while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength));

// Declare variable to make sure at least one criteria is selected
var criteriaMinimumSelected = false;

do {
  // For each of the questions, if "y" then add selected criteria to the array of criteria
  // Check that a valid input was typed (y or n), otherwise aalert and repeat
  var acceptableResponseLower = false;
  do {
    var lowerCase = prompt("Do you want to use lower case letters? \n Enter y or n");
    if (lowerCase.toLowerCase() === "y") {
      arrayOfCriteria.push("lower"); // add "lower" to arrayOfCriteria
    }
    if (lowerCase.toLowerCase() === "y" || lowerCase.toLowerCase() === "n") {
      acceptableResponseLower = true;
    }
    else {
      alert("Please enter a y or n")
    }
  } while (acceptableResponseLower === false);

  var acceptableResponseUpper = false;
  do {
    var upperCase = prompt("Do you want to use upper case letters? \n Enter y or n");
    if (upperCase.toLowerCase() === "y") {
      arrayOfCriteria.push("upper"); // add "upper" to arrayOfCriteria
    }
    if (upperCase.toLowerCase() === "y" || upperCase.toLowerCase() === "n") {
      acceptableResponseUpper = true;
    }
    else {
      alert("Please enter a y or n")
    }
  } while (acceptableResponseUpper === false);

  var acceptableResponseNumeric = false;
  do {
    var numeric = prompt("Do you want to use numbers? \n Enter y or n");
    if (numeric.toLowerCase() === "y") {
      arrayOfCriteria.push("numeric"); // add "numeric" to arrayOfCriteria
    }
    if (numeric.toLowerCase() === "y" || numeric.toLowerCase() === "n") {
      acceptableResponseNumeric = true;
    }
    else {
      alert("Please enter a y or n")
    }
  } while (acceptableResponseNumeric === false);

  var acceptableResponseSpecial = false;
  do {
    var specialChars = prompt("Do you want to use special characters? \n Enter y or n");
    if (specialChars.toLowerCase() === "y") {
      arrayOfCriteria.push("special"); // add "special" to arrayOfCriteria
    }
    if (specialChars.toLowerCase() === "y" || specialChars.toLowerCase() === "n") {
      acceptableResponseSpecial = true;
    }
    else {
      alert("Please enter a y or n")
    }
  } while (acceptableResponseSpecial === false);


  // Check to make sure at least one "y" has been entered. If user selects anything else, e.g. "n", "yy", "bob"; then only y's will count
  if (lowerCase.toLowerCase() === "y" || upperCase.toLowerCase() === "y" || numeric.toLowerCase() === "y" || specialChars.toLowerCase() === "y") {
    criteriaMinimumSelected = true;
  } else {
    alert("Please choose at least one criteria");
  }
} while (criteriaMinimumSelected === false); // If no reponses with "y" then repeat all questions loop until criteria is met


function generatePassword() {
  var generatedPassword = "";
  // Run through loop for number in length of password
  for (var i = 0; i < passwordLength; i++) {
    // Create a random number relating to number of citerias in array
    var num = Math.floor(Math.random() * arrayOfCriteria.length);
    // For each random created, check if it relates to criteria in array
    // If matchinmg a criteria type, then generate random number of character within that criteria's array
    // Then add that character to the generated password 
    if (arrayOfCriteria[num] === "lower") {
      var idOfLowerCaseArray = Math.floor(Math.random() * alphabetCharacters.length);
      generatedPassword += alphabetCharacters[idOfLowerCaseArray].toLowerCase();
    }
    else if (arrayOfCriteria[num] === "upper") {
      var idOfUpperCaseArray = Math.floor(Math.random() * alphabetCharacters.length);
      generatedPassword += alphabetCharacters[idOfUpperCaseArray].toUpperCase();
    }
    else if (arrayOfCriteria[num] === "numeric") {
      var idOfNumericArray = Math.floor(Math.random() * numerics.length);
      generatedPassword += numerics[idOfNumericArray];
    }
    else if (arrayOfCriteria[num] === "special") {
      var idOfSpecialCharArray = Math.floor(Math.random() * specialCharacters.length);
      generatedPassword += specialCharacters[idOfSpecialCharArray];
    };
  }
  return generatedPassword;
};