# Maritime / Sea Routes

<a alt="DA-DESK logo" href="https://yousry2.github.io/maritime" target="_blank" rel="noreferrer"><img src="https://yousry2.github.io/maritime/static/screenshot.jpg" width="800"></a>

## ✨ ** [Check Live Demo](https://yousry2.github.io/maritime/).✨ **

<br>

> [!CAUTION]
> Please note this demo is published on static github pages so in order to refresh the app please **Always** navigate back to the root page https://yousry2.github.io/maritime and **DON'T** use the homepage url https://yousry2.github.io/maritime/homepage/ **OR** the refresh button

<br>

## Tasks to be completed

1- E2E tests using playwright using several device sizes

2- Add Unit Testing for parsing functionlities

3- Add responsive design for mobile and tablet screens

4- [[Done]] ~~Add input signals to main components (Dashboard , routes chart , routes map , Summary)~~

5- Implement the new Signal Store

<br>

## Run Application locally

1- Make sure you have the latest npm installed in your machine [Download NPM ](https://nodejs.org/en/download).

2- Clone the application repository in your machine and using your operating system termminal navigate to the repository root file path

3- Install app libraries using npm

```
npm i
```

4- Run Sea Routes App

```
npm run start-sea-routes
```

<br>

## App Architecture

<img src="https://yousry2.github.io/maritime/static/graph.jpg" width="800">

Run the following command in repository root path and then navigate open your browser to http://127.0.0.1:4211/projects/all to check application dependencies and architecture

```
nx graph
```

The application consists of the following applications/libraries :

**1- Sea Routes** : Scaffold application which will import all libraries features along with their dependencies and integrate them

**2- Sea-Routes-Feature** : Feature library that contains all pages/components related to the the sea module

**3- Sea-Route-Data-Access** : Services Library will handle all domain models, api services

**4- Util-Common** : Utility library to handle all common services : Form Validations/Controls handling component cycle(onDestroy) etc

**5- Tailwind-Presets** : Contains all tailwild configurations, presets, themes and fonts

**6- Util-environments** : Utility library to contain environment configuration files for all projects

<br>

## Tests

### 1- E2E Testing (Playwright) :

Check the latest e2e report on this link https://yousry2.github.io/maritime/playwright-report.html

### 2- Unit Testing (Jest) :

```
npm run test-sea-routes
```

<br>

## Dependencies :

1- nx monorepo 17.1

2- angular 17.1

3- tailwindcss

4- Daisy UI

5- jest

6- playwright
