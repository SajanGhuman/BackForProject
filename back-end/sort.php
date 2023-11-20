<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = $data['name'];
    $date = $data['date'];
    $modified = $data['modified'];

    $result = "";
    $error = false;
    try {

        if ($name !== '') {
            $query = "SELECT * FROM algorithms WHERE name LIKE :name";
            if ($name === 'a-z') {
                $namePattern = '%[0-9][0-9]-[A-Z][A-Z][A-Z]%';
            }

            $statement = $db->prepare($query);
            $statement->bindParam(':name', $namePattern);
        }
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $error = true;
            $response = json_encode(["error" => $error]);
            echo $response;
            exit();
        } else {
            $response = json_encode(["result" => $result, "error" => $error]);
            echo $response;
            exit();
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        echo $response;
    }
}
$response = json_encode(["result" => "Something was emtpy, fix php"]);
echo $response;
?>

<!-- 

if ($name !== '' && $date !== '' && $modified !== '') {
            $query = "SELECT * FROM algorithms WHERE name LIKE :name AND date = :date AND modified = :modified";

            $statement = $db->prepare($query);
            $statement->bindParam(":name", $name);
            $statement->bindParam(":date", $date);
            $statement->bindParam(":modified", $modified);
        }

        if ($name !== '' && $date === '' && $modified === '') {
            $query = "SELECT * FROM algorithms WHERE name = :name";
            $statement = $db->prepare($query);
            $statement->bindParam(":name", $name);
        }

        if ($name === '' && $date !== '' && $modified === '') {
            $query = "SELECT * FROM algorithms WHERE date = :date";
            $statement = $db->prepare($query);
            $statement->bindParam(":date", $date);
        }

        if ($name === '' && $date === '' && $modified !== '') {
            $query = "SELECT * FROM algorithms WHERE modified = :modified";
            $statement = $db->prepare($query);
            $statement->bindParam(":modified", $modified);
        }

        if ($name === '' && $date !== '' && $modified !== '') {
            $query = "SELECT * FROM algorithms WHERE date = :date AND modified = :modified";
            $statement = $db->prepare($query);
            $statement->bindParam(":date", $date);
            $statement->bindParam(":modified", $modified);
        }

        if ($name !== '' && $date === '' && $modified === '') {
            $query = "SELECT * FROM algorithms WHERE name = :name AND modified = :modified";
            $statement = $db->prepare($query);
            $statement->bindParam(":name", $name);
            $statement->bindParam(":modified", $modified);
        }

        if ($name === '' && $date === '' && $modified !== '') {
            $query = "SELECT * FROM algorithms WHERE name = :name AND date = :date";
            $statement = $db->prepare($query);
            $statement->bindParam(":date", $date);
            $statement->bindParam(":modified", $modified);
        }

        if ($name === '' && $date === '' && $modified === '') {
            $response = json_encode(["response" => "everything is empty bruh"]);
            exit();
        } -->