<?php

// Confirm MySQL query
function confirm($result) {
  global $connection;
  if (!$result) {
    die("QUERY FAILED" . mysqli_error($connection));
  }
}

// Redirect to specified location
function redirect($location)
{
  return header("Location: {$location}");
  exit;
}

// Add Bookmark to Database
function bmAdd() {
    global $connection;
    $bmName = $_POST['name'];
    
    $bmURL = $_POST['url'];
    echo "{$bmName}: {$bmURL} ";

    $query = "INSERT INTO bookmarks (name, url) ";
    $query .= "VALUES ('{$bmName}', '{$bmURL}')";

    $bmAdd = mysqli_query($connection, $query) . ' ' . mysqli_errno($connection);

    confirm($bmAdd);
    redirect("/");
  }


?>