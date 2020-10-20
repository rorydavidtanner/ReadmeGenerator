// function to generate markdown for README
function generateMarkdown(data) {
    return `# ${data.projectName}

## Description
${data.description}

## Username 
${data.username}

## Table of Contents

* [Installation] (#Installation)
* [Usage] (#Usage)
* [Tests] (#Tests)
* [Contributing] (#Contributing)
* [License] (#License)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Licence
${data.license}
    
    
    
    
    
    
    
    
    `;
  
  }
  
  module.exports = generateMarkdown;