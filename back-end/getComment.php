<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    try {
        $query = "SELECT comments.*, users.name FROM comments JOIN users ON comments.userID = users.userID WHERE id= :id";
        $statement = $db->prepare($query);
        $statement->bindValue(":id", $id);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(["error" => true, "message" => "No user Found"]);
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