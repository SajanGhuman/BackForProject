<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $algID = filter_var($data['algID'], FILTER_VALIDATE_INT);

    // if($data['type'] === "F2L"){
    //     $categoryID = 1;
    // }
    // if($data['type'] === "OLL"){
    //     $categoryID = 2;
    // }
    // if($data['type'] === "PLL"){
    //     $categoryID = 3;
    // }
    // if($data['type'] === "COLL"){
    //     $categoryID = 4;
    // }

    if ($algID !== false && $algID !== null) {
        $result = "";
        $error = false;
        try {
            $query = "UPDATE algorithms SET name = :name, notation = :notation, type = :type WHERE algID = :algID";

            $statement = $db->prepare($query);
            $statement->bindValue(":name", $data['name']);
            $statement->bindValue(":notation", $data['notation']);
            $statement->bindValue(":type", $data['type']);
            $statement->bindValue(":algID", $algID, PDO::PARAM_INT);
            $statement->execute();

            $result = "Algorithm Updated Successfully";
        } catch (PDOException $e) {
            $error = true;
            $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        }
        $response = json_encode(["result" => $result, "error" => $error]);
        echo $response;
    } else {
        $response = json_encode(["error" => true, "message" => "Invalid or missing algID"]);
        echo $response;
    }
}
?>