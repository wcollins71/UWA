
function addScheduleRow(times) {
    const row = $("<div>");

    row.attr("class", "row");
    row.attr("id", times);

    // in the row
    // has 3 cols

    // first col we should insert time

    const timeCol = $("<a>");
    timeCol.attr("class", "col-sm-2 time-block hour");
    timeCol.text(times);
    row.append(timeCol);

    const textCol = $("<textarea>");
    textCol.attr("class", "col-sm-9");

    //   const timenow = 1600927200000;
    const timenow = moment();
    const timeNowHa = timenow.format("ha");

    const timeMoment = moment(times, "ha");
    const timeMomentHa = timeMoment.format("ha");

    console.log("timenow " + timeNowHa);
    console.log("timeMoment " + timeMomentHa);

    if (timeMoment < timenow) {
        console.log("Past");
        textCol.addClass("past");
    }
    else if (timeMoment === timenow) {
        console.log("present");
        textCol.addClass("present");
    } else {
        console.log("future");
        textCol.addClass("future");
    }
    row.attr("id", timeMomentHa)
    row.append(textCol);

    const buttonCol = $("<div>");
    buttonCol.attr("class", "col-sm-1 saveBtn");
    row.append(buttonCol);

    const button = $("<i>");
    button.attr("class", "fas fa-save");
    buttonCol.append(button);

    $(".container").append(row);

}

$(document).ready(function () {
    const times = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    const timenow = moment();
    for (let index = 0; index < times.length; index++) {

        addScheduleRow(times[index]);

    }

});
