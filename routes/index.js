'use strict';

/**
 * Module dependencies.
 */
var log                 = require('winston-wrapper')(module);
var config              = require('nconf');

var requireTree         = require('require-tree');
var controllers         = requireTree('../controllers');
var express             = require('express');

// End of dependencies.


module.exports = function () {

  // Get user credentials if exists, and provide some data to views.

  // Render index page
  this.get('/', controllers.render('index'));

  // Auth user by express.basicAuth. On success create field `req.user`.
  this.get('/login', controllers.auth.login(config.get('credentials')), controllers.redirect('/'));

  // logout
  this.get('/logout', controllers.auth.logout('/'));

  // editor for create or update posts.
  this.get('/posts/new', controllers.render('editor'));

  // editor for create or update posts.
  this.post('/posts', controllers.post.create(), controllers.redirect('/'));

  // Render post
  this.get('/posts/:post', controllers.render('post'));

  // Render editor for post
  this.get('/posts/:post/edit', controllers.render('editor'));

  // Update post
  this.post('/posts/:post/', controllers.post.update(), controllers.redirect('/'));

  // Remove post
  this.get('/posts/:post/remove', controllers.post.remove(), controllers.redirect('/'));





  // Return compiled stylus-file.
  this.get('/stylesheets/main.css', controllers.stylus('stylus/main.styl', ['nib']));

};