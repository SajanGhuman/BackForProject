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
    $commentName = $data['commentName'];
    $content = $data['content'];

    $result = "";
    $error = false;
    try {
        if ($id !== '') {
            $query = "UPDATE comments SET commentName = :commentName, content = :content WHERE id = :id";

            $statement = $db->prepare($query);
            $statement->bindValue(":commentName", $commentName);
            $statement->bindValue(":content", $content);
            $statement->bindValue(":id", $id);
            $statement->execute();

            $result = "Comment Updated Successfully";
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