angular.module('App', ['bootstrap.picker'])
    .controller('AppController', function($scope) {
        $scope.greeting = "Hello World";
        $scope.currentDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();

        $scope.minDate = new Date();
        $scope.maxDate = moment.tz(new Date(), "Europe/Zurich").add("month", 3).toDate();
    });
