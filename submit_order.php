
<?php
// DB config
$host = "localhost";
$dbname = "brew_bean";
$username = "root";
$password = "system";

// Connect
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Fetch form data
$name      = $conn->real_escape_string($_POST['name']);
$email     = $conn->real_escape_string($_POST['email']);
$phone     = $conn->real_escape_string($_POST['phone']);
$address   = $conn->real_escape_string($_POST['address']);
$cart_data = $conn->real_escape_string($_POST['cart_data']);

// Insert into DB
$sql = "INSERT INTO orders (name, email, phone, address, order_details)
        VALUES ('$name', '$email', '$phone', '$address', '$cart_data')";

if ($conn->query($sql) === TRUE) {
  echo "<script>
    alert('Order placed successfully!');
    window.location.href = 'index.html';
  </script>";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>