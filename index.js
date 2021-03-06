// import & require modules
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// import modules (local files)
const generateMarkdown = require('./utils/generateMarkdown');
const api = require('./utils/api');

// array of questions for user

const questions = [
	{
		// Github username
		type: 'input',
        message: "What is your GitHub username?",
        name: 'username',
        default: 'johnsmith',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
	},
	{
		// Repo Name 
		type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'my-repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
	{
        // Project Name
		type: 'input',
		message: 'Enter the project name',
		name: 'projectName',
		default: 'Project Name',
		validate: function(answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
	{
		// Description
		type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
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
		}
	},
	{
        type: 'input',
		message: "Describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "Provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];
    

// function to write README file

function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
		}
		console.log ("Success! Your README.md file has been created")
	});
}

const writeFileAsync = util.promisify(writeToFile);

// function to initialize program

async function init() {
    
    try {
        // Prompt questions from Inquirer
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // api for user info - Calling GitHub 
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        console.log(userResponses);
        const markdown = generateMarkdown(userResponses);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// function call to initialize program

init();
