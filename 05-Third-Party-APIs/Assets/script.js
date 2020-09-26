
function addScheduleRow(times) {
    const row = $("<div>");

    row.attr("class", "row");
    //  row.attr("id", times);

    const timeCol = $("<a>");
    timeCol.attr("class", "col-sm-2 time-block hour");
    const timeToDisplay = moment(times, "ha");
    const timeToDisplayHa = timeToDisplay.format("ha");
    timeCol.text(timeToDisplayHa);
    row.append(timeCol);

    const textCol = $("<textarea>");
    textCol.attr("class", "col-sm-9");
    textCol.attr("id", "text-" + times)
    textCol.text(localStorage.getItem(times));
    const timenow = moment().format("HH");
    const timeMoment = moment(times, "HH");
    const timeMomentHa = timeMoment.format("HH");
    if (timenow > timeMomentHa) {
        textCol.addClass("past");
    } else if (timenow == timeMomentHa) {
        textCol.addClass("present");
    } else if (timenow < timeMomentHa) {
        textCol.addClass("future");
    } else {
        console.log("error");
    }

    console.log("text-" + times)
    row.append(textCol);

    const buttonCol = $("<button>");
    buttonCol.attr("class", "col-sm-1 saveBtn");
    buttonCol.attr("id", times);

    const button = $("<i>");
    button.attr("class", "fas fa-save fa-lg");
    //   button.css("padding", "20px");
    //  button.attr("id", "buttonSave" + times);
    buttonCol.append(button);
    row.append(buttonCol);
    $(".container").append(row);

}

$(document).ready(function () {
    const times = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    const timenow = moment();
    for (let index = 0; index < times.length; index++) {
        addScheduleRow(times[index]);
    }

    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var buttonClicked = $(this).attr("id");
        console.log("Click " + buttonClicked);
        var textToSave = $("#text-" + buttonClicked).val();
        console.log("textToSave " + textToSave);
        localStorage.setItem(buttonClicked, textToSave);
    })


});

