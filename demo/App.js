angular.module('App', ['werpu.bootstrap.picker'])
    .controller('AppController', function($scope) {
        $scope.greeting = "Hello World";
        $scope.currentDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();

        $scope.minDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();
        $scope.maxDate = moment.tz(new Date(), "Europe/Zurich").endOf("day").add("month", 3).toDate();
    });
