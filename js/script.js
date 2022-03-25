var statesNameList = [],
  statesNewCasesList = [],
  filteredLatestData = [];

$(function () {
  $(".exit-button").on("click", function () {
    Swal.fire({
      title: "Are you sure to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "You have logged out successfully",
            "Always wear mask and sanitize your hand, take care!",
            "success"
          );
        }
      })
      .then(function () {
        setTimeout(function () {
          window.location.href = "login.html";
        }, 1500);
      });
  });

  populateCovidData = (data) => {
    let totalCases = 0,
      totalRecoveredCases = 0;

    $.each(data, function (_index, item) {
      totalCases = Number(totalCases) + Number(item.cases_new);
      totalRecoveredCases =
        Number(totalRecoveredCases) + Number(item.cases_recovered);

      let name = item.state.replace(/\.\s|\.|\s+/g, "-").toLowerCase(),
        container = `.ct-${name}`;
      $(`${container} .new-cases .value`).html(item.cases_new);
      $(`${container} .recovered-cases .value`).html(item.cases_recovered);
    });

    let headerNewCases = `.ct-new-cases`,
      headerRecoveredCases = ".ct-recovered-cases";

    $(`${headerNewCases} .value h1`).html(totalCases);
    $(`${headerRecoveredCases} .value h1`).html(totalRecoveredCases);
    let date = getYesterdayDate();
    $(`.ct-today-date`).html(date);
  };

  populateChart = () => {
    var backgroundColor = [
        "#F40000",
        "#D12181",
        "#BF55C8",
        "#9C3ECC",
        "#B768E6",
        "#7E93E3",
        "#0079CD",
        "#92D1F5",
        "#76D4D3",
        "#25CFA6",
        "#1AA22D",
        "#4FCF25",
        "#CEEA0B",
        "#F5E301",
        "#F5A800",
        "#F56F00",
      ],
      dataConfig = {
        labels: statesNameList,
        datasets: [
          {
            label: "New Daily Covid Cases by States",
            data: statesNewCasesList,
            backgroundColor: backgroundColor,
            hoverBorderWidth: 2,
          },
        ],
      };

    const myBarChart = $("#ct-chart");
    const myPieChart = $("#ct-chart2");

    const ctChart = new Chart(myBarChart, {
      type: "bar",
      data: dataConfig,
      options: {
        plugins: {
          legend: {
            display: false,
            position: "right",
          },
        },
      },
    });
    const ctChart2 = new Chart(myPieChart, {
      type: "pie",
      data: dataConfig,
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
        },
      },
    });
  };

  $(".ct-slider-button input").on("change", function () {
    $(".chart").toggleClass("hidden");
  });

  getCSV = () => {
    $.ajax({
      url: "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv",
      type: "get",
      dataType: "text",
      beforeSend: function () {
        $(".ajax-loader").css("visibility", "visible");
      },
      success: function (data) {
        filteredLatestData = getLatestData(data);

        $.each(filteredLatestData, function (_index, value) {
          statesNameList.push(value.state);
          statesNewCasesList.push(value.cases_new);
        });
      },
      complete: function () {
        $(".ajax-loader").css("visibility", "hidden");
      },
      error: function (_jqXHR, textStatus, _errorThrow) {
        console.log(textStatus);
      },
    });
  };

  getLatestData = (data) => {
    let lines = data.split("\n"),
      fields = lines[0].split(","),
      yesterday = getYesterdayDate(),
      latestData = [];

    for (let i = 1; i < lines.length; i++) {
      let current = lines[i].split(",");
      let doc = {};
      if (current[0] == yesterday) {
        for (let j = 0; j < fields.length; j++) {
          doc[fields[j]] = current[j];
        }
        latestData.push(doc);
      }
    }

    return latestData;
  };

  getYesterdayDate = () => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
  };

  getCSV();
  populateCovidData(filteredLatestData);
  populateChart();
});

getCSV = () => {
  $.ajax({
    url: "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv",
    type: "get",
    dataType: "text",
    success: function (data) {
      filteredLatestData = getLatestData(data);

      $.each(filteredLatestData, function (_index, value) {
        statesNameList.push(value.state);
        statesNewCasesList.push(value.cases_new);
      });
    },
    error: function (_jqXHR, textStatus, _errorThrow) {
      console.log(textStatus);
    },
  });
};

getLatestData = (data) => {
  let lines = data.split("\n"),
    fields = lines[0].split(","),
    yesterday = getYesterdayDate(),
    latestData = [];

  for (let i = 1; i < lines.length; i++) {
    let current = lines[i].split(",");
    let doc = {};
    if (current[0] == yesterday) {
      for (let j = 0; j < fields.length; j++) {
        doc[fields[j]] = current[j];
      }
      latestData.push(doc);
    }
  }

  return latestData;
};

getYesterdayDate = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

getCSV();
