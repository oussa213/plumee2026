<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle GET request to fetch registrations
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';
    
    // Debug info
    error_log("CSV file path: " . $csvFile);
    error_log("File exists: " . (file_exists($csvFile) ? 'YES' : 'NO'));
    error_log("File size: " . (file_exists($csvFile) ? filesize($csvFile) : '0'));
    
    if (!file_exists($csvFile)) {
        echo json_encode(['status' => 'success', 'data' => []]);
        exit;
    }
    
    $registrations = [];
    $fp = fopen($csvFile, 'r');
    
    if ($fp) {
        // Read header row
        $headers = fgetcsv($fp);
        error_log("Headers: " . json_encode($headers));
        
        if ($headers) {
            $rowIndex = 0;
            while (($row = fgetcsv($fp)) !== false) {
                error_log("Row $rowIndex: " . json_encode($row));
                $registration = [];
                foreach ($headers as $index => $header) {
                    $registration[$header] = $row[$index] ?? '';
                }
                
                // Add row index as ID for frontend compatibility
                $registration['id'] = $registration['registration_id'] ?? 'REG-' . ($rowIndex + 1);
                $registration['rowIndex'] = $rowIndex;
                
                $registrations[] = $registration;
                $rowIndex++;
            }
            error_log("Total registrations parsed: " . count($registrations));
        }
        
        fclose($fp);
    }
    
    // Sort by submission date (newest first)
    usort($registrations, function($a, $b) {
        $dateA = strtotime($a['submitted_at'] ?? '0');
        $dateB = strtotime($b['submitted_at'] ?? '0');
        return $dateB - $dateA;
    });
    
    echo json_encode([
        'status' => 'success',
        'data' => $registrations,
        'total' => count($registrations)
    ]);
    exit;
}

// Handle POST request to update registration status
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['action'])) {
        echo json_encode(['status' => 'error', 'message' => 'No action specified']);
        exit;
    }
    
    switch ($input['action']) {
        case 'update_status':
            return updateRegistrationStatus($input);
        case 'delete_registration':
            return deleteRegistration($input);
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
            exit;
    }
}

function updateRegistrationStatus($input) {
    $registrationId = $input['registration_id'] ?? '';
    $newStatus = $input['status'] ?? '';
    
    if (empty($registrationId) || empty($newStatus)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing registration ID or status']);
        exit;
    }
    
    $csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';
    $tempFile = $csvFile . '.tmp';
    
    if (!file_exists($csvFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Registrations file not found']);
        exit;
    }
    
    $updated = false;
    $fpIn = fopen($csvFile, 'r');
    $fpOut = fopen($tempFile, 'w');
    
    if ($fpIn && $fpOut) {
        // Copy header
        $headers = fgetcsv($fpIn);
        fputcsv($fpOut, $headers);
        
        // Find and update the registration
        $statusIndex = array_search('status', $headers);
        $registrationIdIndex = array_search('registration_id', $headers);
        
        while (($row = fgetcsv($fpIn)) !== false) {
            if ($row[$registrationIdIndex] === $registrationId) {
                $row[$statusIndex] = $newStatus;
                $updated = true;
            }
            fputcsv($fpOut, $row);
        }
        
        fclose($fpIn);
        fclose($fpOut);
        
        if ($updated) {
            // Replace original file with temp file
            if (rename($tempFile, $csvFile)) {
                echo json_encode(['status' => 'success', 'message' => 'Registration status updated']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update file']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Registration not found']);
            unlink($tempFile);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to open files']);
        if ($fpIn) fclose($fpIn);
        if ($fpOut) fclose($fpOut);
        if (file_exists($tempFile)) unlink($tempFile);
    }
}

function deleteRegistration($input) {
    $registrationId = $input['registration_id'] ?? '';
    
    if (empty($registrationId)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing registration ID']);
        exit;
    }
    
    $csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';
    $tempFile = $csvFile . '.tmp';
    
    if (!file_exists($csvFile)) {
        echo json_encode(['status' => 'error', 'message' => 'Registrations file not found']);
        exit;
    }
    
    $deleted = false;
    $abstractToDelete = '';
    
    $fpIn = fopen($csvFile, 'r');
    $fpOut = fopen($tempFile, 'w');
    
    if ($fpIn && $fpOut) {
        // Copy header
        $headers = fgetcsv($fpIn);
        fputcsv($fpOut, $headers);
        
        $registrationIdIndex = array_search('registration_id', $headers);
        $abstractPathIndex = array_search('abstract_file_path', $headers);
        
        while (($row = fgetcsv($fpIn)) !== false) {
            if ($row[$registrationIdIndex] === $registrationId) {
                $deleted = true;
                $abstractToDelete = $row[$abstractPathIndex] ?? '';
                // Skip this row (don't write to temp file)
                continue;
            }
            fputcsv($fpOut, $row);
        }
        
        fclose($fpIn);
        fclose($fpOut);
        
        if ($deleted) {
            // Replace original file with temp file
            if (rename($tempFile, $csvFile)) {
                // Delete abstract file if it exists
                if (!empty($abstractToDelete) && file_exists($abstractToDelete)) {
                    unlink($abstractToDelete);
                }
                
                echo json_encode(['status' => 'success', 'message' => 'Registration deleted']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update file']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Registration not found']);
            unlink($tempFile);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to open files']);
        if ($fpIn) fclose($fpIn);
        if ($fpOut) fclose($fpOut);
        if (file_exists($tempFile)) unlink($tempFile);
    }
}

// Handle invalid request method
echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
?>
