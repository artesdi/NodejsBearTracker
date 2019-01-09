'use strict';

const redis = require('redis');
const client = redis.createClient();

client.on('error', function(err){
    console.log('Something went wrong with Redis connection', err)
});

// TODO: Refactor to modern async/await to avoid promises

exports.add = function(sighting) {
    return new Promise(function(resolve, reject) {
        client.incr("sighting_id_seq", function(error, id) {
        sighting.id = id;

        client.set(id, JSON.stringify(sighting), redis.print);

        if (error) {
            reject(error);
        } else {
            resolve(sighting.id);
        }});
    });
}

exports.get = function(sightingId) {
    return new Promise(function(resolve, reject) {
        client.get(sightingId, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(result));
            }
        });
    });
}


exports.get_all = function() {
    return new Promise(function(resolve, reject) {
        client.keys("*", function(error, keys){
            var sightings = [];
            keys.forEach(function (key) {
                client.get(key, function (e, value) {
                    sightings.push(JSON.parse(value));

                    if (error) {
                        reject(error);
                    } else {
                        resolve(sightings);
                    };
                });
            });
        });
    });
}