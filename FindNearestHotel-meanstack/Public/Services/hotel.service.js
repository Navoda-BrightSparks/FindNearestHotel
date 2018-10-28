'use strict';

angular.module('HotelApp').factory('HotelService', ['$http',
    function ($http) {
        return {
            getPlaces: () => $http.get('/hotels/places').then(response => response.data),
            getHotels: () => $http.get('/hotels/names').then(response => response.data),
            add: driver => $http.post('/hotels', driver).then(response => response.data),
            getByName:name => $http.get('/hotels/names?name=' + name).then(response => response.data),
            getByLocation:location => $http.get('/hotels/names?location=' + location).then(response => response.data),
            getByAmount:amount => $http.get('/hotels/names?amount=' + amount).then(response => response.data),
            getByAmountAndLocation:(amount,location) => $http.get('/hotels/both?amount=' + amount+'&location='+location).then(response => response.data),
        };
    }]);




