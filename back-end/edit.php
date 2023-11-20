<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($_GET['algID'])) {
        $response = json_encode(["error" => true, "message" => "AlgID is empty"]);
        echo $response;
        return;
    }

    $algID = $_GET['algID'];

    try {
        $query = "SELECT * FROM algorithms WHERE algID = :algID";

        $statement = $db->prepare($query);
        $statement->bindValue(":algID", $algID);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(["error" => true, "message" => "Algorithm not found"]);
        } else {
            $response = json_encode(["result" => $result, "error" => false]);
        }   

        echo $response;
    } catch (PDOException $e) {
        $response = json_encode(["error" => true, "message" => "Database error: " . $e->getMessage()]);
        echo $response;
    }
}
?>
