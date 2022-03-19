$(document).ready(function () {

    

    getCSV = () => {
        $.ajax({
            dataType: "text",
            url: 'https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_malaysia.csv',
            success: function (d) {
                console.log(JSON.stringify(d));
            }
        });
    }

    getCSV();
});