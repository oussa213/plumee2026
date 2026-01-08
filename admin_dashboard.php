<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit;
}

$rows = [];
$csv = __DIR__ . DIRECTORY_SEPARATOR . 'registrations.csv';
$headers = [];
if (file_exists($csv)) {
    if (($handle = fopen($csv, 'r')) !== false) {
        $headers = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            $rows[] = $data;
        }
        fclose($handle);
    }
}

// Attempt to find index of abstract filename column
$abstractIdx = -1;
foreach ($headers as $i => $h) {
    $hh = strtolower(trim($h));
    if ($hh === 'abstract_filename' || $hh === 'abstract' || strpos($hh, 'file') !== false) {
        $abstractIdx = $i; break;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PLUMEE 2026 - Admin Dashboard</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif; background:#f3f6f4; margin:0; }
    .top { background:#ffffff; border-bottom:1px solid #e5e7eb; padding:16px 22px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:10; }
    .brand { color:#2E8B57; font-weight:900; letter-spacing:.2px; font-size:1.2rem; }
    .wrap { max-width:1400px; margin:22px auto; background:#fff; border-radius:18px; box-shadow:0 12px 30px rgba(0,0,0,.06); padding:22px; }
    .toolbar { display:flex; gap:10px; align-items:center; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; }
    .search { display:flex; gap:8px; align-items:center; }
    .search input { padding:10px 12px; border:1px solid #d1d5db; border-radius:10px; background:#f8fafc; min-width:260px; }
    .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:9999px; border:1px solid #d1d5db; background:#f7faf7; color:#2E8B57; font-weight:800; text-decoration:none; cursor:pointer; }
    .btn:hover { background:#e8f5e9; }
    .table-wrap { border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; }
    table { width:100%; border-collapse:separate; border-spacing:0; table-layout:fixed; }
    thead th { position:sticky; top:0; background:#f7faf7; color:#2E8B57; font-weight:800; text-transform:capitalize; box-shadow:0 2px 0 #e5e7eb; z-index:1; padding:12px 14px; text-align:left; }
    th, td { border-bottom:1px solid #eef1ef; padding:12px 14px; text-align:left; font-size:.95rem; vertical-align:top; }
    tbody tr:nth-child(even) td { background:#fcfdfc; }
    tbody tr:hover td { background:#f5fbf6; }
    td, th { word-break:break-word; white-space:normal; }
    .sticky-first { position:sticky; left:0; background:inherit; box-shadow:2px 0 0 #e5e7eb; z-index:2; }
    .pill { display:inline-block; padding:4px 10px; border-radius:9999px; background:#eaf6ea; color:#2E8B57; font-weight:700; font-size:.85rem; }
    .file-link { color:#0b5cab; text-decoration:none; font-weight:700; }
    .file-link:hover { text-decoration:underline; }
    .muted { color:#6b7280; }
    .empty { padding:16px; color:#6b7280; text-align:center; }
    .stats { display:flex; gap:20px; margin-bottom:20px; flex-wrap:wrap; }
    .stat-card { background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e5e7eb; min-width:150px; }
    .stat-number { font-size:2rem; font-weight:900; color:#2E8B57; }
    .stat-label { color:#6b7280; font-size:.9rem; }
    @media (max-width:768px) {
        .wrap { margin:10px; padding:15px; }
        .toolbar { flex-direction:column; align-items:stretch; }
        .search input { min-width:100%; }
        table { font-size:.85rem; }
        th, td { padding:8px 10px; }
    }
  </style>
</head>
<body>
  <div class="top">
    <div class="brand">PLUMEE 2026 • Admin Dashboard</div>
    <div class="actions">
      <a href="admin_logout.php">Logout (<?php echo htmlspecialchars($_SESSION['admin_username']); ?>)</a>
    </div>
  </div>
  <div class="wrap">
    <div class="stats">
      <div class="stat-card">
        <div class="stat-number"><?php echo count($rows); ?></div>
        <div class="stat-label">Total Registrations</div>
      </div>
      <div class="stat-card">
        <div class="stat-number"><?php 
            $abstractCount = 0;
            foreach ($rows as $row) {
                $abstractFile = $abstractIdx >= 0 ? ($row[$abstractIdx] ?? '') : '';
                if (!empty($abstractFile)) $abstractCount++;
            }
            echo $abstractCount; 
        ?></div>
        <div class="stat-label">Abstracts Submitted</div>
      </div>
      <div class="stat-card">
        <div class="stat-number"><?php 
            $studentCount = 0;
            $regTypeIdx = array_search('registration_type', $headers);
            if ($regTypeIdx !== false) {
                foreach ($rows as $row) {
                    if (strtolower($row[$regTypeIdx] ?? '') === 'student') $studentCount++;
                }
            }
            echo $studentCount; 
        ?></div>
        <div class="stat-label">Student Registrations</div>
      </div>
    </div>
    
    <div class="toolbar">
      <h2 style="margin:0;">Registrations (<?php echo count($rows); ?>)</h2>
      <div>
        <a class="btn" href="registrations.csv" download>📥 Download CSV</a>
        <a class="btn" href="registration.html">📝 Registration Form</a>
      </div>
    </div>
    
    <?php if (empty($rows)): ?>
      <div class="empty">No registrations yet.</div>
    <?php else: ?>
      <div style="overflow:auto; max-height:70vh;" class="table-wrap">
        <table>
          <thead>
            <tr>
              <?php foreach ($headers as $idx => $h): ?>
                <th class="<?php echo $idx===0 ? 'sticky-first' : ''; ?>"><?php echo htmlspecialchars(str_replace('_',' ', $h)); ?></th>
              <?php endforeach; ?>
              <?php if ($abstractIdx === -1): ?>
                <th class="<?php echo empty($headers) ? 'sticky-first' : ''; ?>">Abstract</th>
              <?php endif; ?>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($rows as $r): ?>
              <tr>
                <?php foreach ($r as $i => $c): ?>
                  <?php if ($i === $abstractIdx): ?>
                    <?php $fname = trim($c); $href = $fname ? ('abstracts/' . $fname) : ''; ?>
                    <td><?php echo $fname ? ('<a class="file-link" href="' . htmlspecialchars($href) . '" target="_blank" rel="noopener">' . htmlspecialchars($fname) . '</a>') : '<span class="muted">—</span>'; ?></td>
                  <?php else: ?>
                    <td class="<?php echo $i===0 ? 'sticky-first' : ''; ?>"><?php echo htmlspecialchars($c); ?></td>
                  <?php endif; ?>
                <?php endforeach; ?>
                <?php if ($abstractIdx === -1): ?>
                  <td><span class="muted">—</span></td>
                <?php endif; ?>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </div>
</body>
</html>
?>
