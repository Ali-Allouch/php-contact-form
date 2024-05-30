function sendMail(name, email, subject, message) {
  $.ajax({
    url: "./assets/apis/sendMail.php",
    method: "POST",
    crossDomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    dataType: "JSON",
    data: {
      name: name,
      email: email,
      subject: subject,
      message: message,
    },
    success: function (response) {
      $(".loading").removeClass("d-block");
      $(".btn-send").removeClass("d-none");
      if (response.data.success) {
        $(".sent-message").addClass("d-block");
        $("#name, #email, #subject, #message").val("");
      } else {
        $(".error-message").append(
          "We apologize for the inconvenience, but it seems that your message was not received. Please contact us directly via email or phone number, or try again later. We are committed to ensuring that your communication is received and addressed in a timely manner. Thank you for your patience and understanding."
        );
        $(".error-message").addClass("d-block");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $(".loading").removeClass("d-block");
      $(".error-message").append(
        "We apologize for the inconvenience, but it seems that your message was not received. Please contact us directly via email or phone number, or try again later. We are committed to ensuring that your communication is received and addressed in a timely manner. Thank you for your patience and understanding."
      );
      $(".error-message").addClass("d-block");
    },
  });
}

async function insertData(name, email, subject, message) {
  const data = {
    name,
    email,
    subject,
    message,
  };

  const response = await fetch("./assets/apis/insertData.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to insert contact data.");
  }
  return response.json();
}

$(() => {
  $("#mailForm").submit(async function (e) {
    e.preventDefault();

    $(".loading").addClass("d-block");
    $(".btn-send").addClass("d-none");
    $(".error-message").removeClass("d-block");
    $(".sent-message").removeClass("d-block");

    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var subject = $("#subject").val().trim();
    var message = $("#message").val().trim();

    try {
      await insertData(name, email, subject, message);
    } catch (error) {
      console.error(error);
      $(".error-message").append(
        "Something went wrong, please try again later."
      );
    }

    sendMail(name, email, subject, message);
  });
});
