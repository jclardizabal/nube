/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                              *
  ***************************************************************************/

  '/': {
    view: 'login'
  },
  '/registro': {
    view: 'register'
  },
  '/inicio': {
    controller: 'UserController',
    action: 'probar'
  },
  '/historial': {
    view: 'historial'
  },
  '/Alarm':{
    controller: 'UserController',
    action: 'Alarm'
  },
  '/getRegister':{
    controller: 'UserController',
    action: 'Register'
  },
  '/getLogin':{
    controller: 'UserController',
    action: 'Login'
  },
  '/Estados':{
    controller: 'UserController',
    action: 'probar'
  },
  '/OnFoco':{
    controller: 'UserController',
    action: 'OnFoco'
  },
  '/OffFoco':{
    controller: 'UserController',
    action: 'OffFoco'
  },
  '/OnCorriente':{
    controller: 'UserController',
    action: 'OnCorriente'
  },
  '/OffCorriente':{
    controller: 'UserController',
    action: 'OffCorriente'
  },
  '/OnAlarma':{
    controller: 'UserController',
    action: 'OnAlarma'
  },
  '/OffAlarma':{
    controller: 'UserController',
    action: 'OffAlarma'
  },
  '/OnAgua':{
    controller: 'UserController',
    action: 'OnAgua'
  },
  '/OffAgua':{
    controller: 'UserController',
    action: 'OffAgua'
  },

  '/OnFoco1':{
    controller: 'UserController',
    action: 'OnFoco1'
  },
  '/OffFoco1':{
    controller: 'UserController',
    action: 'OffFoco1'
  },
  '/OnCorriente1':{
    controller: 'UserController',
    action: 'OnCorriente1'
  },
  '/OffCorriente1':{
    controller: 'UserController',
    action: 'OffCorriente1'
  },
  '/OnAlarma1':{
    controller: 'UserController',
    action: 'OnAlarma1'
  },
  '/OffAlarma1':{
    controller: 'UserController',
    action: 'OffAlarma1'
  },
  '/ej':{
    view: 'ej'
  },
  '/OnAgua1':{
    controller: 'UserController',
    action: 'OnAgua1'
  },
  '/OffAgua1':{
    controller: 'UserController',
    action: 'OffAgua1'
  },

  '/readHistory':{
    controller: 'UserController',
    action: 'LeerHistorial'
  },
  '/CreateAlarm':{
    view: 'CrearAlarma'
  },
  '/readAlarm':{
    controller: 'UserController',
    action: 'LeerAlarma'
  },
  '/Alarma':{
    controller: 'UserController',
    action: 'Alarma'
  },
  '/logout':{
    controller: 'UserController',
    action: 'logout'
  },
  '/refresh':{
    view:'inicio'
  }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
