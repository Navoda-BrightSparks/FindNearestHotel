'use strict';

angular.module('HotelApp').controller('MainController', ['$scope', 'HotelService',
    function ($scope, HotelService) {
        $scope.places = [];
        $scope.location = {};
        $scope.location = "Galle";
        $scope.Hotel = {};
        $scope.Name ="Jungle Beach by Uga Escapes";
        $scope.Amount ="Jungle Beach by Uga Escapes";
        $scope.HotelDetail = {}

        $scope.Hotel.Names = [];
        function getHotels() {

            HotelService.getHotels().then(hotels => {
                console.log("hotes"+hotels)
                $scope.Hotel.Names = hotels;
                $scope.Hotel.Amounts = hotels;
            })
        }
        $scope.loadMap = function() {

            console.log("f")
        }
        $scope.change = function() {
          $scope.HotelName = $scope.Name
            getHotelByName($scope.Name)
        }
        $scope.AmountChange = function() {
            getHotelByName($scope.Amount)
        }

        function getHotelByName(name) {

            HotelService.getByName(name).then(hotel => {

                $scope.HotelDetail = hotel[0];

                    $scope.map = {
                        center: { latitude: hotel[0].Latitude, longitude:hotel[0].Longitude },
                        zoom: 11
                    };

                    $scope.marker = {
                        coords: {latitude: hotel[0].Latitude, longitude:hotel[0].Longitude },
                        id: $scope.HotelDetail.Name,
                        window: { title: "" }
                    };
                });

        }

        function getHotelByLocation(location) {

            HotelService.getByLocation(location).then(hotels => {

                $scope.Hotel.Names  = hotels;
                $scope.Name =hotels[0].Name;

            })
        }
        function getHotelsByAmount(amount) {

            HotelService.getByAmount(amount).then(hotels => {

                $scope.Hotel.Amounts  = hotels;
                if(hotels.length != 0) {
                    $scope.Amount = hotels[0].Name;
                }

            })
        }
        function getHotelsByBoth(amount,location) {

            HotelService.getByAmountAndLocation(amount,location).then(hotels => {

                $scope.Hotel.Amounts  = hotels;
                $scope.Hotel.Names  = hotels;
                if(hotels.length != 0) {
                    $scope.Amount = hotels[0].Name;
                    $scope.Name =hotels[0].Name;
                }

            })
        }
        $scope.changeByBoth = function() {
            getHotelsByBoth($scope.price,$scope.location)
        }

        $scope.changeLocation = function() {

            getHotelByLocation($scope.location)
        }
        $scope.changeByAmount = function() {
            console.log($scope.price)
            getHotelsByAmount($scope.price)
        }
        function getPlaces() {

            HotelService.getPlaces().then(places => {
                console.log(places)
             $scope.places = places;
            })
        }
        $scope.place = {};
        $scope.loadMap = function() {

            getPlaces();
            getHotels();

            $scope.HotelDetail = {

            Name: "Jungle Beach by Uga Escapes",

                Amount: 39517,
                Contact: 112847594,
                Email: "junglesbeach@gmail.com",
            }
            $scope.map = {
                center: { latitude:8.7733, longitude:81.1354 },
                zoom: 11
            };

            $scope.marker = {
                coords: { latitude:8.7733, longitude:81.1354 },
                id: $scope.HotelDetail.Name ,
                window: { title: "" }
            };
            console.log("load")
        }

//console.log($scope.places)
    }]);