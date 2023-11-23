<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $algID = isset($data['algID']) ? filter_var($data['algID'], FILTER_SANITIZE_NUMBER_INT) : null;
    $name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : null;
    $notation = isset($data['notation']) ? filter_var($data['notation'], FILTER_SANITIZE_STRING) : null;
    $type = isset($data['type']) ? filter_var($data['type'], FILTER_SANITIZE_STRING) : null;

    $result = "";
    $error = false;

    try {
        if ($algID !== null) {
            $query = "UPDATE algorithms SET name = :name, notation = :notation, type = :type WHERE algID = :algID";

            $statement = $db->prepare($query);
            $statement->bindValue(":name", $name, PDO::PARAM_STR);
            $statement->bindValue(":notation", $notation, PDO::PARAM_STR);
            $statement->bindValue(":type", $type, PDO::PARAM_STR);
            $statement->bindValue(":algID", $algID, PDO::PARAM_INT);
            $statement->execute();

            $result = "Algorithm Updated Successfully";
        } else {
            $result = "Failed To Add Algorithm. Please Try Again";
            $error = true;
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>