<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $userID = $data['userID'];
    $title = $data['title'];
    $content = $data['content'];

    $result = "";
    $error = false;
    try {
        if ($title != "" && $content != "") {
            $query = "INSERT INTO comments (userID,title, content) VALUES (:userID,:title, :content)";

            $statement = $db->prepare($query);
            $statement->bindValue(":userID", $userID);
            $statement->bindValue(":title", $title);
            $statement->bindValue(":content", $content);
            $statement->execute();

            $result = "Comment Added Succesfully";
        } else {
            $result = "Failed To Add Comment. Please Try Again";
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