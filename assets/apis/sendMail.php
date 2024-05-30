<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = "This is email has sent from aliallouche.me.\n\nName: $name\n" . "Email: $email\n\n" . $_POST['message'];
    $to = "ali.hallouch@gmail.com";

    // Mail Headers
    $headers = "Organization: AliAllouche\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";
    $headers .= "From: ".$email . "\r\n";
    $headers .= "Reply-To: ".$to."\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

    if(mail($to, $subject, $message, $headers)) {
        $response = (object)[
            'success' => true
        ];
    } else {
        $response = (object)[
            'success' => false
        ];
    }

    $jsonres = array (
        'data' => $response
    );

    echo json_encode($jsonres, JSON_PRETTY_PRINT);
?>