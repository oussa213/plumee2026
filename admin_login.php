<?php
session_start();

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: admin_dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $credsPath = __DIR__ . DIRECTORY_SEPARATOR . 'admin_credentials.json';
    if (!file_exists($credsPath)) {
        $error = 'Credentials file not found.';
    } else {
        $data = json_decode(file_get_contents($credsPath), true);
        $okUser = isset($data['username']) && hash_equals($data['username'], $username);
        $salt = isset($data['salt']) ? $data['salt'] : '';
        $hash = hash('sha256', $salt . $password);
        $okPass = isset($data['hashed_password']) && hash_equals($data['hashed_password'], $hash);
        if ($okUser && $okPass) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            header('Location: admin_dashboard.php');
            exit;
        } else {
            $error = 'Invalid credentials.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PLUMEE 2026 - Admin Login</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif; background:#f3f6f4; margin:0; }
    .wrap { max-width:420px; margin:8vh auto; background:#fff; border-radius:14px; box-shadow:0 10px 28px rgba(0,0,0,.08); padding:28px; }
    h1 { margin:0 0 16px; color:#2E8B57; font-size:1.5rem; text-align:center; }
    .logo { text-align:center; margin-bottom:20px; color:#2E8B57; font-weight:900; font-size:1.2rem; }
    label { display:block; font-weight:600; margin:12px 0 6px; color:#374151; }
    input[type=text], input[type=password] { width:100%; padding:12px; border:1px solid #d1d5db; border-radius:10px; background:#f8fafc; box-sizing:border-box; }
    .btn { margin-top:16px; width:100%; padding:12px; background:#2E8B57; color:#fff; font-weight:700; border:0; border-radius:9999px; cursor:pointer; font-size:1rem; }
    .btn:hover { background:#1e5c3a; }
    .error { color:#b91c1c; font-weight:600; margin-top:8px; text-align:center; }
    .foot { margin-top:18px; font-size:.9rem; color:#374151; text-align:center; }
    a { color:#2E8B57; text-decoration:none; font-weight:600; }
    a:hover { text-decoration:underline; }
  </style>
  </head>
<body>
  <div class="wrap">
    <div class="logo">PLUMEE 2026</div>
    <h1>Admin Login</h1>
    <?php if ($error): ?><div class="error"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
    <form method="POST" action="admin_login.php" autocomplete="off">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required>
      
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required>
      
      <button class="btn" type="submit">Sign in</button>
    </form>
    <div class="foot">
      <a href="registration.html">← Back to Registration</a>
    </div>
  </div>
</body>
</html>
?>
