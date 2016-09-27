angular.module('App', ['werpu.bootstrap.picker'])
    .controller('AppController', function ($scope) {
        $scope.greeting = "Hello World";
        $scope.currentDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();
        $scope.currentDate2;

        $scope.minDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();
        $scope.maxDate = moment.tz(new Date(), "Europe/Zurich").endOf("day").add(3, "month").toDate();

        $scope.onDateSelection = function (picker, date) {
            console.debug("OnDateSelection called. Picker:", picker, " Date:",date);
        };
    });
