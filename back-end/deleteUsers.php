<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    try {
        $userID = filter_var($data['userID'], FILTER_VALIDATE_INT);

        if ($userID !== false && $userID !== null) {
            $query = "DELETE FROM users WHERE userID = :userID";
            $statement = $db->prepare($query);
            $statement->bindParam(':userID', $userID, PDO::PARAM_INT);
            $statement->execute();
            $rowCount = $statement->rowCount();

            if ($rowCount > 0) {
                $response = json_encode(['success' => 'Row deleted successfully']);
            } else {
                $response = json_encode(['error' => 'No rows deleted. Check if user exists.']);
            }
        } else {
            $response = json_encode(['error' => 'Invalid or missing userID']);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
}
echo $response;
?>