<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $algID = $data['algID'];
    $name = $data['name'];
    $notation = $data['notation'];
    $type = $data['type'];

    $result = "";
    $error = false;
    try {
        if ($algID !== '') {
            $query = "UPDATE algorithms SET name = :name, notation = :notation, type = :type WHERE algID = :algID";

            $statement = $db->prepare($query);
            $statement->bindValue(":name", $name);
            $statement->bindValue(":notation", $notation);
            $statement->bindValue(":type", $type);
            $statement->bindValue(":algID", $algID);
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