angular.module('App', ['werpu.bootstrap.picker'])
    .controller('AppController', function ($scope, datePickerService) {
        $scope.greeting = "Hello World";
        var TIME_ZONE = "Europe/Zurich";

        $scope.minDate = moment.tz(new Date(), TIME_ZONE).startOf("day").add("days", 3).toDate();
        $scope.maxDate = moment.tz(new Date(), TIME_ZONE).endOf("day").add(3, "month").toDate();

        //lets generated some for our page events
        var events = [];
        for(var cnt = 6; cnt < 15; cnt++) {
            events.push(datePickerService.createEventModelValue(cnt+10, "HIGH",moment.tz(new Date(), TIME_ZONE).add("days", cnt).startOf("day").toDate(), "data"+cnt));
        }


        $scope.eventData = datePickerService.createEventEventModel(events);

        $scope.selectionResult = "";

        $scope.eventSelected = function(selectedEvent) {
            var res = [];
            res.push("event was selected. Details:")  ;
            res.push("Number of events at that day "+selectedEvent.numberOfEvents);
            res.push("Importance "+selectedEvent.importance);
            res.push("Date "+selectedEvent.day);
            res.push("data "+selectedEvent.data.toString());
            $scope.selectionResult = res.join("\n");
        };

        $scope.$watch("currentDate", function(newValue, oldValue) {
            if(newValue) {
                console.debug("new event date was selected");
            }
        });

    });
