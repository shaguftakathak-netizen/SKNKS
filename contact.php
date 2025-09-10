<?php
// Database config
$servername = "localhost";   // usually "localhost"
$username   = "dbuser";      // your db username
$password   = "dbpass";      // your db password
$dbname     = "dance_school"; // your database name

// Email config
$to      = "shaguftakathak@gmail.com";  // change this to your email
$subject = "New Enquiry from Website";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Handle form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data safely
    $name     = $conn->real_escape_string($_POST['name']);
    $email    = $conn->real_escape_string($_POST['email']);
    $phone    = $conn->real_escape_string($_POST['phone']);
    $interest = $conn->real_escape_string($_POST['interest']);
    $message  = $conn->real_escape_string($_POST['message']);

    // Save into DB
    $sql = "INSERT INTO enquiries (name, email, phone, interest, message)
            VALUES ('$name', '$email', '$phone', '$interest', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        // Send email
        $body = "You have a new enquiry:\n\n"
              . "Name: $name\n"
              . "Email: $email\n"
              . "Phone: $phone\n"
              . "Interest: $interest\n"
              . "Message: $message\n";

        $headers = "From: no-reply@yourdomain.com";

        if (mail($to, $subject, $body, $headers)) {
            echo "Thank you! Your enquiry has been sent and saved.";
        } else {
            echo "Saved to database, but email could not be sent.";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
