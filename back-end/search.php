<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $search = $data['search'];
    $searchBy = $data['searchBy'];
    $error = false;

    try {
        if ($searchBy === 'name') {
            $query = "SELECT * FROM algorithms WHERE name LIKE :search";

            $Fsearch = filter_var($data['search'], FILTER_SANITIZE_STRING) . '%';
            $statement = $db->prepare($query);
            $statement->bindValue(":search", $Fsearch);
            $statement->execute();
        }

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(['error' => 'No data found']);
        } else {
            $response = json_encode(['result' => $result, 'error' => $error]);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }

    echo $response;
}

?>