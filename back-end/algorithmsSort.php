<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $type = strtolower($data['type']);
    $error = false;

    try {
        if ($type === '') {
            $query = "SELECT * FROM algorithms";
            $statement = $db->prepare($query);
            $statement->execute();
        } else if ($type === "oll") {
            $query = "SELECT * FROM algorithms WHERE type = :type";
            $statement = $db->prepare($query);
            $statement->bindParam(':type', $type, PDO::PARAM_STR);
            $statement->execute();
        } else if ($type === "pll") {
            $query = "SELECT * FROM algorithms WHERE type = :type";
            $statement = $db->prepare($query);
            $statement->bindParam(':type', $type, PDO::PARAM_STR);
            $statement->execute();
        }

        $row = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($row)) {
            $response = json_encode(['error' => 'No data found']);
        } else {
            $response = json_encode(['row' => $row, 'error' => $error]);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }

    echo $response;
}

?>