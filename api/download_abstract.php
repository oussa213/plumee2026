<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.0 405 Method Not Allowed');
    exit;
}

$registrationId = $_GET['registration_id'] ?? '';

if (empty($registrationId)) {
    header('HTTP/1.0 400 Bad Request');
    echo json_encode(['error' => 'Missing registration ID']);
    exit;
}

// Read registrations to find the abstract file
$csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registrations.csv';

if (!file_exists($csvFile)) {
    header('HTTP/1.0 404 Not Found');
    echo json_encode(['error' => 'Registrations file not found']);
    exit;
}

$abstractFilePath = '';
$abstractFilename = '';

$fp = fopen($csvFile, 'r');
if ($fp) {
    $headers = fgetcsv($fp);
    $registrationIdIndex = array_search('registration_id', $headers);
    $abstractPathIndex = array_search('abstract_file_path', $headers);
    $abstractNameIndex = array_search('abstract_filename', $headers);
    
    while (($row = fgetcsv($fp)) !== false) {
        if ($row[$registrationIdIndex] === $registrationId) {
            $abstractFilePath = $row[$abstractPathIndex] ?? '';
            $abstractFilename = $row[$abstractNameIndex] ?? '';
            break;
        }
    }
    fclose($fp);
}

if (empty($abstractFilePath) || !file_exists($abstractFilePath)) {
    header('HTTP/1.0 404 Not Found');
    echo json_encode(['error' => 'Abstract file not found']);
    exit;
}

// Determine MIME type
$extension = strtolower(pathinfo($abstractFilePath, PATHINFO_EXTENSION));
$mimeType = 'application/octet-stream';

switch ($extension) {
    case 'pdf':
        $mimeType = 'application/pdf';
        break;
    case 'doc':
        $mimeType = 'application/msword';
        break;
    case 'docx':
        $mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
}

// Set headers for file download
header('Content-Type: ' . $mimeType);
header('Content-Disposition: attachment; filename="' . ($abstractFilename ?: 'abstract.' . $extension) . '"');
header('Content-Length: ' . filesize($abstractFilePath));
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Output file content
readfile($abstractFilePath);
exit;
?>
