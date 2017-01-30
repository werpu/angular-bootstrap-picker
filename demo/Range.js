angular.module('App', ['werpu.bootstrap.picker'])
    .controller('AppController', function ($scope, datePickerService) {
        $scope.greeting = "Hello World";
        var TIME_ZONE = "Europe/Zurich";

        $scope.minDate = moment.tz(new Date(), TIME_ZONE).startOf("day").add("days", 3).toDate();
        $scope.maxDate = moment.tz(new Date(), TIME_ZONE).endOf("day").add(3, "month").toDate();

        //lets generated some for our page events
        var events = [];
        for(var cnt = 0; cnt < 10; cnt++) {
            events.push(datePickerService.createEventModelValue(cnt+10, "HIGH",moment.tz(new Date(), TIME_ZONE).add("days", cnt), "data"+cnt));
        }


        $scope.eventData = datePickerService.createEventEventModel(events);
        $scope.currentDate = moment.tz(new Date(), TIME_ZONE).startOf("day").toDate();


        $scope.$watch("currentDate", function(newValue, oldValue) {
            if(newValue) {
                console.debug("new event date was selected");
            }
        });

    });
