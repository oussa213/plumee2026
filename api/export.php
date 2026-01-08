<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.0 405 Method Not Allowed');
    exit;
}

$format = $_GET['format'] ?? 'csv';

if (!in_array($format, ['csv', 'excel'])) {
    header('HTTP/1.0 400 Bad Request');
    echo json_encode(['error' => 'Invalid format. Use csv or excel']);
    exit;
}

// Read registrations from CSV
$csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';

if (!file_exists($csvFile)) {
    header('HTTP/1.0 404 Not Found');
    echo json_encode(['error' => 'No registrations found']);
    exit;
}

$registrations = [];
$fp = fopen($csvFile, 'r');

if ($fp) {
    $headers = fgetcsv($fp);
    
    if ($headers) {
        while (($row = fgetcsv($fp)) !== false) {
            $registration = [];
            foreach ($headers as $index => $header) {
                $registration[$header] = $row[$index] ?? '';
            }
            $registrations[] = $registration;
        }
    }
    
    fclose($fp);
}

if (empty($registrations)) {
    header('HTTP/1.0 404 Not Found');
    echo json_encode(['error' => 'No registrations found']);
    exit;
}

if ($format === 'csv') {
    // Export as CSV
    $filename = 'plumee_registrations_' . date('Y-m-d_H-i-s') . '.csv';
    
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    
    $output = fopen('php://output', 'w');
    
    // Add UTF-8 BOM for proper encoding in Excel
    fwrite($output, "\xEF\xBB\xBF");
    
    // Write headers
    fputcsv($output, $headers);
    
    // Write data
    foreach ($registrations as $registration) {
        fputcsv($output, $registration);
    }
    
    fclose($output);
    exit;
}

if ($format === 'excel') {
    // Export as Excel (using PHPExcel/PhpSpreadsheet if available, otherwise CSV with Excel headers)
    if (class_exists('PhpOffice\PhpSpreadsheet\Spreadsheet')) {
        // Use PhpSpreadsheet if available
        try {
            $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            
            // Set headers
            $col = 'A';
            foreach ($headers as $header) {
                $sheet->setCellValue($col . '1', $header);
                $col++;
            }
            
            // Set data
            $row = 2;
            foreach ($registrations as $registration) {
                $col = 'A';
                foreach ($headers as $header) {
                    $sheet->setCellValue($col . $row, $registration[$header] ?? '');
                    $col++;
                }
                $row++;
            }
            
            $filename = 'plumee_registrations_' . date('Y-m-d_H-i-s') . '.xlsx';
            
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            
            $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
            $writer->save('php://output');
            exit;
            
        } catch (Exception $e) {
            // Fallback to CSV if PhpSpreadsheet fails
            error_log('Excel export failed: ' . $e->getMessage());
        }
    }
    
    // Fallback: Export as CSV with Excel-compatible headers
    $filename = 'plumee_registrations_' . date('Y-m-d_H-i-s') . '.csv';
    
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    
    $output = fopen('php://output', 'w');
    
    // Add UTF-8 BOM for proper encoding in Excel
    fwrite($output, "\xEF\xBB\xBF");
    
    // Write headers
    fputcsv($output, $headers);
    
    // Write data
    foreach ($registrations as $registration) {
        fputcsv($output, $registration);
    }
    
    fclose($output);
    exit;
}
?>
