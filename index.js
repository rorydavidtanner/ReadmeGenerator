// import & require modules and inquirer
const { prompt } = require('inquirer');
const { writeFile } = require('fs');
const { promisify } = require('util');

// array of questions for user

const questions = [
    {
        // Project Name
		type: 'input',
		message: 'Enter the project name',
		name: 'projectName',
		validate: function(name) {
			if (projectName) {
                return true;
            }
		},
    },
    {
        // Description
		type: 'input',
		message: 'What is your project description?',
		name: 'description',
		validate: function(description) {
			if (description) {
				return true;
			}

			return 'A professional README provides the project description.';
    },
    {
        //Check on Screenshots and/or Demo
		type: 'confirm',
		name: 'screenshots',
		message: 'Would you like to add screenshots or demo to README?',
		default: false,
    },
    {
       // Get image path and/or URL
		type: 'input',
		name: 'imageURL',
		message: 'Enter the image paths or urls of screenshots or demo. (* Use comma "," to separate each path or url)',
		when: function(answers) {
			return answers.screenshots !== false;
		},
		validate: function(imageURL) {
			if (imageURL) {
				return true;
			}

			return 'Provide the image paths or urls of screenshots or demo. '; 
    },
];

// function to write README file

function writeToFile(fileName, data) {
}

// function to initialize program

function init() {

}

// function call to initialize program

init();
