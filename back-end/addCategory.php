<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $id = $data['id'];
    $name = strtolower($data['categoryName']);

    $result = "";
    $error = false;
    try {
        if ($id !== "" && $name !== "") {
            $query = "INSERT INTO categories (categoryId, categoryName) VALUES (:id,:name)";

            $statement = $db->prepare($query);
            $statement->bindValue(":id", $id);
            $statement->bindValue(":name", $name);
            $statement->execute();

            $result = "Category Added Succesfully";
        } else {
            $result = "Failed To Add Category. Please Try Again";
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