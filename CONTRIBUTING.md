# Contributing to Homeware

First of all, thank you for thinking about contributing.

# Ways to help

## Reporting bugs or requesting a feature

If you find a bug you are welcome to report it using an issue. When you create a issue you will be asked for choose one of the following issue templates.

- **EN - Bug report**. It is used to report a bug in English.
- **EN - Feature request**. It is used to make a request for a new feature in English.
- **EN - Other**. It is used for others issues in English.
- **ES - Reporta un bug**. It is used to report a bug in Spanish.
- **ES - Petición de una característica**. It is used to make a request for a new feature in Spanish.
- **ES - Otros**. It is used for others issues in Spanish.

You must choose one of the issues templates and fill the data requested in the template if applicable.

Remember that it is important to give all the possible information in the simple possible way.

You will be asked for more information if needed. If you don't respond in 30 days, the issue will be closed as _wontfix_.

### Before submitting a report.

- Verify that there is no similar issues open. If there is another issue similar, used the open issue to submit your opinion or bug.

- Verify if you are using the last version of Homeware. The last one is ![GitHub release (latest by date)](https://img.shields.io/github/v/release/kikeelectronico/Homeware-LAN?style=flat-square).

### How to fill a good issue.

- Write a representative title.
- Write a clear description.
- Provide step by step guide on how to reproduce the problem.
- Describe the behavior you expected and why.
- Include data of your system: OS, web browser, Homeware version, hardware platform, etc..

## Asking a question or sharing your project

You can share anything related with Homeware or ask any question by opening a [Discussion](https://github.com/kikeelectronico/Homeware-LAN/discussions).

## Code contribution

If you want to code contributes you must fork the repository and work on you own fork.

The main resository is composed of 3 permanent branches: master, develop and alpha.

The project is separeted in two main directories: back and front.

### Backend

The backend is coded in Python 3.7 and it is available inside the `back` directory.

Read the back README in order to start working.

### Frontend

The frontend is coded in React js and it is available inside the `front` directory.

Read the front README in order to start working.

### Where to code

#### Develop new features

The developing must be done in a feature branch for each feature.

Any new feature must have an issue with the **label ToDo** in order to be implemented. If you want to implement something, you must create an issue first.

1. Assign yourself the issue.
1. Checkout _develop_ branch.
1. Pull from the main repository.
1. Create a feature branch called: `feature/<something>`. Where `<something>` describes in one or two words the feature.
1. Commit your changes in small packages. The commit must have a description in present tense.
1. Create a pull request to _develop_ branch at the main repo.

The pull request must containt the name of the feature and the issue id in the title and a clear description. Both the description and title must be in preset tense. For example: Implement power control - #108

#### Hotfixes

If you find an issue that must be hotfixed you must create a hotfix branch.

1. Checkout _master_ branch.
1. Pull from the main repository.
1. Create a feature branch called: `hotfix/<something>`. Where `<something>` describes in one or two words the hotfix.
1. Commit your changes in small packages. The commit must have a description in present tense.
1. Create a pull request to _master_ branch at the main repo.
