<?php
    $cn = mysqli_connect('localhost','root','') or die("server connecting err");
    mysqli_select_db($cn,'php-contact-form') or die("wrong selecting db");

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $email = $data['email'];
    $subject = $data['subject'];
    $message = $data['message'];

    $query = "insert into messages(name, email, subject, message) values('$name','$email','$subject','$message')";
    
    if(mysqli_query($cn, $query)) {
        $response = (object)[
            'success' => true
        ];

        $jsonres = array (
            'data' => $response
        );
        
        echo json_encode($jsonres, JSON_PRETTY_PRINT);
    } else 
        http_response_code(500);
?>