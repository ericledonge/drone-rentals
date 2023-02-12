# From Eric

to start the server: `npm dev`

to test: `npm test`

# Front-end test

Please read and understand the following situation and then represent it by a small _React_ based application. You have one week to deliver your project including source code, npm scripts, and documentation explaining the procedure to compile and execute the application as well as your tests.

We are aware that this project will have to be done alongside your regular activities. Allocate proper time and effort without going overboard. A full day (8 hours) should be enough to deliver a good quality project. Don't spend too much time on over-engineering or future-proofing.

The goal of this assignment is to create a _React_ based application that will simulate a scenario set in the WATCH_DOGS universe:

_Since the drone accident at O'Hare Airport that killed 65 passengers back in 2017, drone acquisition and ownership has been made illegal. However, you can now rent them from ctOS drone-sharing stations for short periods of time, and use them according to a severe End User License Agreement..._

## Getting Started

Given that you will be creating a React application we recommend using Create React App to get started (for instructions on creating an application please refer to their documentation found [here](https://github.com/facebook/create-react-app#creating-an-app)).

While we recommend using Create React App if you have another preferred way for building React applications feel free to use it.

## Submission

Feel free to commit and push to this repository as often as you like. Once you have finished developing your application and made your final push please notify your recruiter so that we can review your work.

**Note:** Once you have told the recruiter you have finished with your test your access to the project will be changed and you'll no longer be able to push or pull from the project.

## Scope

- To limit the scope of this simulation we will not require a user registration system. Assume that users can rent a drone without registering, or just have a single default user.
- To further limit the scope of this simulation, only one drone rental is allowed at once.

## Functional Requirements

**Note:** There is no set solution for this task, simply the evaluation criteria listed below. e.g. If you feel the need to make other jsons to simulate the result of an api, feel free to do so.

- Get the drones list from `quads.json` and populate the charging stations.
- There are 3 charging stations and each can accomodate up to 10 drones.
- The charging stations are well scattered around town and will not be moved once installed.
- Once the rental is started, a countdown begins for that drone. The rental maximum for each drone depends on its maximum amount of flight time.
- The drone is assumed to be flying from the moment it leaves the charging station until the moment it is returned or it's countdown finishes.
- Once a drone has been rented, then the slot that the drone occupied in the charging station becomes a free slot.
- A rented drone can be returned to any free slot on any charging station.
- Returns can only be made to free slots in charging stations. Once returned:
  - The countdown is cancelled.
- If the drone has not been returned (is still flying) at the end of the countdown, it will **crash**.
  - Simulate an automatic return to a free slot in a charging station,

## Bonus Function if you have time

Drones have a battery that can be modelled as well:

- Each drone has an initial battery charge set in the data.
- Each drone recharges over time while at the charging station. The application should simulate this recharging.
- A drone cannot be rented from a charging station if it has a charge of 10% or less.
- Once the rental is started, a countdown begins for that drone. The rental maximum for each drone depends on its level of charge when it is rented combined with the maximum amount of flight time that the drone can achieve. e.g. for a drone with 30 minutes maximum flight time, then 100% charge means it can fly for 30 minutes, but a 50% charge means that the drone can only fly for 15 minutes.
- Once returned, the drone charge is listed as the charge remaining following the flight. e.g. 30 minutes maximum flight time and 6 minutes flight time remaining means the charge is set to 20%.
- If the drone is returned following a **crash** then its charge is set to 0%. It then recharges as normal.

## Non-functional requirements

- You must use React, and TypeScript is strongly encouraged.
- You can use any other library or tool e.g. Webpack, Babel, Styled Components, react-router etc...
- Do not build your own server, just use the contents of `quads.json` as mock data.
- Of course we will not consider any solution that uses code from an existing repository.
- Your source code should be available in Gitlab with all necessary instructions to install/run your App.

## Evaluation Criteria

- Reliability of your solution; does it meet the requirements, does it cover edge cases.
- Code clarity.
- Architecture. Consider documenting your choices and thought process from a high level perspective.
- Dependency choices and reasoning/motivation behind them.
- The application should be responsive and the UX should be intuitive.
- Documentation explaining the procedure to compile, test and execute the application.
- Tests running on your application. (unit tests and/or functional tests and/or a set of e2e tests etc.)
- Good version control usage is a plus.
