<?php
    require_once('../php/database_connect.php');
        
    session_start();

    $username = $_SESSION['username'];

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $database_connection->query($sql);
    $response['user'] = mysqli_fetch_assoc($result);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>