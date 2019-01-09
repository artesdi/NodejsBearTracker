'use strict';

const repository = require('../../data/redis-sighting-repository');
const composite_filter = require('../../application/service/sightings-filter');

/**
 * Add a new sighting with bears to the area
 *
 * body Sighting sighting object that needs to be added
 * returns inline_response_200
 **/
exports.addSighting = function (sighting) {
    return new Promise(function (resolve, reject) {
        sighting.date = new Date().toISOString();
        repository.add(sighting)
            .then(function (id){
                var sighting_id = {"id": id};
                resolve_promise_safe(sighting_id, resolve);
            }).catch(function (error) {
                handle_error(error);
        });
    });
}

/**
 * Return a single sighting object queried by its ID
 *
 * sightingId Integer ID of sighting to return
 * returns Sighting
 **/
exports.getSightingById = function (sightingId) {
    return new Promise(function (resolve, reject) {
        repository.get(sightingId)
            .then(function (sighting ){
                resolve_promise_safe(sighting, resolve);
            })
            .catch(function (error) {
                handle_error(error);
        });
    });
}

/**
 * Finds sightings by filter
 * Return an array of sightings
 **/
exports.findSightingsByFilter = function (filter) {
    return new Promise(function (resolve, reject) {
        repository.get_all()
            .then(function (sightings){
                sightings = composite_filter.apply(sightings, filter);
                resolve_promise_safe(sightings, resolve);
            })
            .catch(function (error) {
                handle_error(error);
            });
    });
}

function resolve_promise_safe(obj, resolve) {
    if (Object.keys(obj).length > 0) {
        resolve(obj);
    }
    else {
        resolve();
    }
}

function handle_error(error) {
    console.log(error);
}