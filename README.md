# Survival Ants

### Simulation Demo
![simulation](docs/simulation.gif)


## Features of a great production README:

- Survival Ants is a evolutionary simulation where evolving streeing agents to effectively eat food and avoid poison. The concept is base on [Steering Behaviors For Autonomous Characters](http://www.red3d.com/cwr/steer/) by Craig Reynolds, and its implementation is part of the genetic algorithms and intelligence learning.

- [Survial Ants Live](https://survival-ants.herokuapp.com/)

## Technologies Used
- Vallina JavaScript
- HTML5 Canvas and CSS
- P5 JS
- JQuery

Feature & Implementation
- `Ants`:
  - `Attributes`:
    - Each of the ant has a ability to look for food base on their `streeing behaviors` and their food range `perception`.
    - The ant `seek` the closest food in their food range `perception`.
    - The ant has a positive health point, which they need to main inorder to survive
    - The ant has a `current velocity(vector)` depend and their `acceleration` (vector), and it's limited by the `maximum speed` (number).
    - The ant has a `desired` velocity:
      - desire velocity = food location - the ant's location
    - The `steering behaviors` determined how they rotate and approach the food, and it's limited by the `maximum force` (number):
      - `streeing` = `desired` - `current velocity`
  - Death:
    - The ant will die if they hit the poison
    - The ant will die if their health is negative
    - The ant turns into food if they're death
  - `Clone`:
    - The ant has a its own `DNA` which is the unit that determine their `food acctraction`
    - There is 0.1% chance that they will `clone` themself. The `new clone's` `DNA` is slightly different than the original.

- `Food` and `Poison`:
  - `Food` is randomly gennerated by 10% chance of every draw frame
  - `Poison` is randomly gennerated by 1% chance of every draw frame
  - The ant's health point increase after they eat food
  - The `ant` will die if they hit the poison.



- User's interaction/ Mouse funtionality
  - `User` has a ability to pick a `food` and feed the `ants` by clicking on the `food` and press or drag on the image.

- `Debug Mode`:
  - The triangle represents the ant.
  - The triangle color represents the ant's health between green and red
    - green means the ant is in a good state
    - red means the ant is in bad condition, and will soon die
  - The `green cricle` is the ant's food range `perception`.
  - The `green line` is the ant's desired `magnitute`.

- Auto-Restart:
  - The app is automaticly restarted if number of ants is zero.
