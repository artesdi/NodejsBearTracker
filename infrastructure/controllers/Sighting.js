'use strict';

const utils = require('../utils/writer.js');
const sighting_service = require('../../application/service/sighting-service');

// TODO: Extract Exception Shield for handle business exceptions
// TODO: Inject request logging

module.exports.addSighting = function addSighting (request, result) {
  var sighting = request.swagger.params['body'].value;

  sighting_service.addSighting(sighting)
    .then(function (response) {
      utils.writeJsonResponse(result, response);
    })
    .catch(function (error) {
        handle_error(error, result);
    });
};

module.exports.findSightingsByFilter = function findSightingsByFilter (request, result) {
  // TODO: Add input validation

  var filter = {};
  filter.start_date = request.swagger.params['start_date'].value;
  filter.end_date = request.swagger.params['end_date'].value;
  filter.bear_type = request.swagger.params['bear_type'].value;
  filter.zip_code = request.swagger.params['zip_code'].value;
  filter.sort = request.swagger.params['sort'].value;

  sighting_service.findSightingsByFilter(filter)
    .then(function (response) {
      utils.writeJsonResponse(result, response);
    })
    .catch(function (error) {
        handle_error(error, result);
    });
};

module.exports.getSightingById = function getSightingById (request, result) {
  var sightingId = request.swagger.params['sightingId'].value;

  sighting_service.getSightingById(sightingId)
    .then(function (response) {
      utils.writeJsonResponse(result, response);
    })
    .catch(function (error) {
        handle_error(error, result);
    });
};

function handle_error(error, result) {
    console.log(error);
    utils.writeJsonResponse(result, {"result": "error"});
}