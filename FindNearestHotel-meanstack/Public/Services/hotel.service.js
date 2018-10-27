'use strict';

angular.module('HotelApp').factory('HotelService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/hotels').then(response => response.data),
            add: driver => $http.post('/hotels', driver).then(response => response.data),
            getById: id => $http.get('/hotels/' + id).then(response => response.data),

        };
    }]);