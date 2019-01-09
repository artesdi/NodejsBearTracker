'use strict';

var sightings_id_sequence = 0;
var sightings = [];

exports.add = function(sighting) {
    sightings_id_sequence++;

    sighting.id = sightings_id_sequence;
    sightings.push(sighting);

    return sighting.id;
}

exports.get = function(sightingId) {
    console.log(sightingId)

    var sighting = sightings.find(s => s.id === sightingId);
    console.log(sighting);

    return sighting;
}

exports.get_all = function() {
    console.log(sightings);

    return sightings;
}