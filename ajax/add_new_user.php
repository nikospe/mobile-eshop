<?php
    require_once('../php/database_connect.php');
        
    if(isset($_POST["firstname"])) $firstname = $_POST['firstname'];
    if(isset($_POST["lastname"])) $lastname = $_POST['lastname'];
    if(isset($_POST["email"])) $email = $_POST['email'];
    if(isset($_POST["username"])) $username = $_POST['username'];
    if(isset($_POST["password"])){
        $password = md5($_POST['password']);
    }
    $stmt = $database_connection->prepare("INSERT INTO users (firstname, lastname, email, username, password) "
            . "VALUES (?, ?, ?, ?, ?)");
    
    $stmt->bind_param('sssss',$firstname, $lastname, $email, $username, $password);    
    
    $response['mysql_query_status'] = $stmt->execute();
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);
    
    session_start();
    $_SESSION['username'] = $username;
    
    $stmt->close();
    $database_connection->close();
?>