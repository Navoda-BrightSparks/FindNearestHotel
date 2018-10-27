'use strict';

angular.module('HotelApp').controller('MainController', ['$scope', 'HotelService',
    function ($scope, HotelService) {

        function getDrivers() {

            HotelService.get().then(drivers => {
                $scope.drivers = drivers;
            })
        }

        getDrivers();

        $scope.addDriver = (driver) => {
            HotelService.add(driver).then(() => {
                getDrivers();
                driver = {};
            });
        };
    }]);