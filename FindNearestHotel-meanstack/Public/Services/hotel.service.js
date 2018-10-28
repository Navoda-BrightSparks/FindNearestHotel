'use strict';

angular.module('HotelApp').factory('HotelService', ['$http',
    function ($http) {
        return {
            getPlaces: () => $http.get('/hotels/places').then(response => response.data),
            add: driver => $http.post('/hotels', driver).then(response => response.data),
            getById: id => $http.get('/hotels/' + id).then(response => response.data),

        };
    }]);




