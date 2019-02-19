const Point = require('./pointModel'),
    Exception = require('../../lib/api-model/Exception'),
    randomstring = require('randomstring');


function addPoint (pointData) {
    pointData.pointLocation.coordinates =[pointData.latitute, pointData.longitude] 
        return Point.create(pointData);
}

/**
 * @param {number} latitute user's latitude
 * @param {number} longitude user's longitude
 * @returns Promise
 * @description Provides the nearest point according to user's location provided in latitude and longitude
 */
function getNearestPoint(latitute, longitude) {
    let aggPipe = []

    let geoNear = { 
        near: { type: "Point", coordinates: [ latitute , longitude ] },
        distanceField: "distance",
        spherical: true
    }

    aggPipe.push({'$geoNear' : geoNear})

    let sort = {
        distance: 1
    }

    aggPipe.push({'$sort': sort})


     return Point.aggregate(aggPipe)
}


module.exports = {
    addPoint,
    getNearestPoint
}