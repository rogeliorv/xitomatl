# xitomatl

Xitomatl is the codename for my personal productivity tool.
Main features include:

1) Boards to organize your tasks. (In a similar fashion to Trello)
2) prioritization, deadlines and scheduling for every task.
3) Time tracking for every task using the Pomodoro technique (https://en.wikipedia.org/wiki/Pomodoro_Technique)
4) Daily planning (Get the pending items for the day)
5) Task labeling. (Useful to know in what type of tasks you spend your time on)
6) Historic data. See what you worked on in a given time frame.
7) Dashboards. See what type of tasks you have invested your time on.

Future plans:

1) Integration with facebook and telegram chatbots to let you know your agenda for the day and week.
2) Adding, tracking and organizing tasks through the chatbot
3) Get your daily agenda using the chatbot

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/rogeliorv/xitomatl.git` this repository
* `cd xitomatl`
* `npm install`
* `bower install`

## Firebase

Follow the instruction to setup firebase at https://firebase.google.com/docs/cli/

npm install -g firebase-tools

Set the firebase configuration in config/environment.js

Under the ENV object add:

firebase: {
    apiKey: '(YOUR API KEY)',
    authDomain: '(YOUR AUTH DOMAIN)',
    databaseURL: '(YOUR DATABASE URL)',
    storageBucket: '(YOR STORAGE BUCKET)',
    messagingSenderId: '(YOUR MESSAGING SENDER ID)'
}

These settings can be found in the firebase console for your application: https://console.firebase.google.com/


## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Setup your firebase cli and login to your project. (https://firebase.google.com/docs/cli/)

Run the firebase deploy command:

firebase deploy --only hosting
