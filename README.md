# FoodApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.3.

# versions

node: v12.16.3 npm 6.14.4

## Description

This is a basic recipe search app which also allows you to make a shopping list with ingridients

## Instalation

```
git clone git@github.com:rinaam/recipe-app.git
cd repo
npm ci
npm start
```

# How to use

- ### Home page
- Press on the red button and speak fluently, for best results just say one word because api is not very good :D
- you must press again to stop the recording
- and ofcourse allow the recording in chrome (for best experience :D )
- I am using IBM watson speech to text api [Link](https://cloud.ibm.com/apidocs/speech-to-text)
- don't abuse this api since I am using my personal license, but it is free

- ### Search results
- type something in the search bar and press enter. It will use recipe api to give you a list of recipes
- each recipe can be shared on facebook
- you can also show nutritional facts
- you can also expand the ingridients and add them to a shopping list
- shopping list is persistant between refresh, we are storing all data in local storage
