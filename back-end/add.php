<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $notation = filter_var($data['notation'], FILTER_SANITIZE_STRING);
    $type = strtolower(filter_var($data['type'], FILTER_SANITIZE_STRING));
    if (strtolower($type) === 'f2l') {
        $categoryID = 1;
    }
    if (strtolower($type) === 'oll') {
        $categoryID = 2;
    }
    if (strtolower($type) === 'pll') {
        $categoryID = 3;
    }
    if (strtolower($type) === 'coll') {
        $categoryID = 4;
    }

    $result = "";
    $error = false;
    try {
        if ($name != "" && $notation != "" && $type != "") {
            $query = "INSERT INTO algorithms (name, notation, type, categoryID) VALUES (:name, :notation, :type, :categoryID)";

            $statement = $db->prepare($query);
            $statement->bindValue(":name", $name);
            $statement->bindValue(":notation", $notation);
            $statement->bindValue(":type", $type);
            $statement->bindValue(":categoryID", $categoryID);
            $statement->execute();

            $result = "Algorithm Added Successfully";
        } else {
            $result = "Failed To Add Algorithm. Please Try Again";
            $error = true;
        }
    } catch (PDOException $e) {
        $error = true;
        $result = "Database Access: " . $e->getMessage();
    }

    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>