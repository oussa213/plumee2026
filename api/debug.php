<?php
// Debug script to test file reading
header('Content-Type: application/json');

$csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';

$debug = [
    'file_path' => $csvFile,
    'file_exists' => file_exists($csvFile),
    'is_readable' => is_readable($csvFile),
    'file_size' => file_exists($csvFile) ? filesize($csvFile) : 0,
    'current_dir' => __DIR__,
    'parent_dir' => dirname(__DIR__)
];

if (file_exists($csvFile)) {
    $content = file_get_contents($csvFile);
    $lines = explode("\n", $content);
    $debug['line_count'] = count($lines);
    $debug['first_line'] = $lines[0] ?? '';
    $debug['content_preview'] = substr($content, 0, 200);
} else {
    $debug['error'] = 'File not found';
}

echo json_encode($debug, JSON_PRETTY_PRINT);
?>
