const user = "user";
const password = "user";

$(function () {
  $(".login-button").on("click", function () {
    let login_username = $("#username-field").val(),
      login_password = $("#password-field").val();

    if (login_username != user) {
      $(".invalid-username").removeClass("hidden");
    } else {
      if (login_password != password) {
        $(".invalid-username").addClass("hidden");
        $(".invalid-password").removeClass("hidden");
      } else {
        $(".invalid-field").addClass("hidden");
        window.location.href = "home.html";
      }
    }
  });
});
