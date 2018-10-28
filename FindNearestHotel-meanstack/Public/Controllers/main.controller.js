'use strict';

angular.module('HotelApp').controller('MainController', ['$scope', 'HotelService',
    function ($scope, HotelService) {
        $scope.places = [];
        $scope.location = {};
        $scope.location = "Galle";
        function getPlaces() {

            HotelService.getPlaces().then(places => {
                console.log(places)
             $scope.places = places;
            })
        }
        $scope.place = {};
        $scope.map = {
            center: { latitude:  7.074, longitude: 79.9929 },
            zoom: 11
        };

        $scope.marker = {
            coords: { latitude: 7.074, longitude: 79.9929 },
            id: 4 ,
            window: { title: "Manhattan New York, NY" }
        };
        getPlaces();
//console.log($scope.places)
    }]);