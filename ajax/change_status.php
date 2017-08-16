<?php
    require_once('../php/database_connect.php');

    if(isset($_POST["username"])) $name = $_POST['username'];   

    $sql = "UPDATE enterprises SET status='completed' WHERE username= '$name' ";
    $result = $database_connection->query($sql);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>