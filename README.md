# Personnel-Tracker

  ![inquirer](https://img.shields.io/npm/l/inquirer)
  ![Personnel-Tracker](https://img.shields.io/github/languages/top/skycode20/Personnel-Tracker)
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

  - by *Skyler Rencher*
  
  ## Description    

  The Personnel Tracker is a CLI application that allows the user to easily manage their employee database for their organization. The application is seamless and walks the user through each step of the process of viewing employees, adding/removing employees, adding/removing roles, and more. This is important for an organization that wants to be well aware of how many employees there are, who their employees are, and how much is being spent on salaries. As a result, the user can easily access and update the information that is necessary for him/her to efficiently manage the resources of the business.

  My inspiration behind this project was to provide an application that essentially does the thinking for the user. I believe that entering information into databases should be simple and intuitive. Especially for the user that doesn't have the luxury of time to learning new systems.

  One of the challenges I faced in this project was finding a way to add a new employee. When I completed that I wanted to find a way to program the addEmployee function to also add the department name to their entry while adding them into the database. Unfortunately I was running into a foreign key error that didn't enable me to complete that task. 

  In the future I would like to make this a standalone application that operates outside of the CLI. I can envision it working on mobile phones and tablets so that it could allow data entry from anywhere. 

  ## Table Of Contents    

  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation    

    Install the required npm packages such as inquirer, file system, path, and os. Also install Node.js as it is essential for running the CLI application. Then download all of the project's code from the repository. Once all of that has been completed, run ```node index.js``` to initiate the program.

  To install the **Personnel Tracker** please follow these steps:

  1. Download all of the project's source files `(clone the GitHub repository)`.
  2. Ensure your terminal is inside of the current folder that contains the source files.
  3. Install the following **NPMs** `(Node Package Managers)` in the system terminal:
        * Node.js
        * Inquirer (command: ```npm i inquirer```)
        * MySQL (command: ```npm i mysql```)
        * **Or just ```npm i``` that will install the packages within the `package.json` file. 

  ## Usage    

  The user does not need to have any expertise in programming. it is easy to use and intuitive. Just run `node app.js` in the integrated terminal to initiate the program. The application will run a series of prompts that request user choices and input to deliver the intended results into the database as desired. It is very stright-forward. Once each command is complete the information is stored (or deleted) into the database immediately.
  ## License    

  The inquirer is covered under the following license: ![inquirer](https://img.shields.io/npm/l/inquirer)

  ## Contributing     

  If you are interested in contributing to this project please adhere to the set of guidelines set forth by the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). If any questions about the contributor guidelines feel free to contact me at skyler.rencher@gmail.com.

  ## Tests    

  There were no tests run aside from trial and error. Also testing the code as I'm entering it in allowed me to ensure the code was running properly with each update.

  ## Questions    

  If you have any questions about the project feel free to reach out to me on via email: skyler.rencher@gmail.com or via Git Hub: https://github.com/skycode20.
  
  ## Links

  * [Personnel-Tracker Repository](https://github.com/skycode20/Personnel-Tracker)

  * [Personnel-Tracker Demo Video](https://drive.google.com/file/d/1VIkS9DLwCI_VlTR7jO6lh28Zsw_MMFkv/view?usp=sharing)
