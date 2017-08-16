<?php
    require_once('../php/database_connect.php');
        
    if(isset($_POST["vertical_category_selector"])) $vertical_category_selector = $_POST['vertical_category_selector'];
    if(isset($_POST["product_name"])) $product_name = $_POST['product_name'];
    if(isset($_POST["description"])) $description = $_POST['description'];
    if(isset($_POST["product_image"])) $product_image = $_POST['product_image'];

    $stmt = $database_connection->prepare("INSERT INTO products (name, type, description, image) "
            . "VALUES (?, ?, ?,?) ");
    
    $stmt->bind_param('ssss', $product_name, $vertical_category_selector, $description, $product_image);    
   
    $response['mysql_query_status'] = $stmt->execute();
    
    $response['id'] = mysqli_insert_id($database_connection);
    
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);
    
    $stmt->close();
    $database_connection->close();
    
?>