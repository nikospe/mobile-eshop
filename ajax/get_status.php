<?php
    require_once('../php/database_connect.php');

    $sql = "SELECT * FROM enterprises ";
    $result = $database_connection->query($sql);
    $response['status'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>