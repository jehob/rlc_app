# Rlcapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


{% load static %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Rlcapp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
<script type="text/javascript" src="{% static 'dist/runtime.js' %}"></script>
  <script type="text/javascript" src="{% static 'dist/polyfills.js' %}"></script>
  <script type="text/javascript" src="{% static 'dist/styles.js' %}"></script>
  <script type="text/javascript" src="{% static 'dist/vendor.js' %}"></script>
  <script type="text/javascript" src="{% static 'dist/main.js' %}"></script>
</body>
</html>
