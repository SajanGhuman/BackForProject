<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = $data['name'];
    $date = $data['date'];
    $modified = $data['modified'];

    $result = "";
    $error = false;
    try {
        if ($name != '' && $date !== '' && $modified !== '' ) {
                $query = "SELECT FROM algorithms (name, date, modified) VALUES (:name,:date, :modified)";

                $statement = $db->prepare($query);
                $statement->bindValue(":name", $name);
                $statement->bindValue(":date", $date);
                $statement->bindValue(":modified", $modified);
                $statement->bindValue(":access", $access);
                $statement->execute();

                $result = "User Added Succesfully";
            }
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>