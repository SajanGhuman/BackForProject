<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = $data['email'];
    $pass = $data['password'];

    $result = '';

    if ($email !== "" and $pass !== "") {
        $query = "SELECT * FROM users WHERE email=:email";
        $statement = $db->prepare($query);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->execute();

        $row = $statement->fetch(PDO::FETCH_ASSOC);
        $error = false;

        if ($row) {
            if (!password_verify($pass, $row["password"])) {
                $result = "Invalid Password";
                $error = true;
                error_log("Entered password: " . $pass);
                error_log("Stored hashed password: " . $row["password"]);
                error_log("Password verification result: " . var_export(password_verify($pass, $row["password"]), true));
            } else {
                $result = "Logged in successfully! Redirecting...";
                $error = false;
            }
            $response[] = array("result" => $result, "error" => $error, "access" => $row["access"], "userID" => $row["userID"]);
        } else {
            $result = "Email does not exist";
            $error = true;
        }

    } else {
        $error = true;
    }
    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}

?>