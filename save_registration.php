<?php
// Simple PHP handler like ICM - no APIs, direct file handling
header('Content-Type: application/json');

// Handle PLUMEE form fields
$title = trim($_POST['title'] ?? '');
$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$country = trim($_POST['country'] ?? '');
$affiliation = trim($_POST['affiliation'] ?? '');
$position = trim($_POST['position'] ?? '');
$registrationType = trim($_POST['registrationType'] ?? '');
$presentationType = trim($_POST['presentationType'] ?? '');
$abstractTitle = trim($_POST['abstractTitle'] ?? '');
$topic = trim($_POST['topic'] ?? '');

// Create full name
$fullname = trim($title . ' ' . $firstName . ' ' . $lastName);

// Map presentation type to participation type
$participation_type = 'Attendee';
switch ($presentationType) {
    case 'oral':
        $participation_type = 'Oral Presentation';
        break;
    case 'poster':
        $participation_type = 'Poster Presentation';
        break;
    case 'none':
    default:
        $participation_type = 'Attendee';
        break;
}

// Required fields validation
$required = ['title', 'firstName', 'lastName', 'email', 'phone', 'country', 'affiliation', 'registrationType'];
foreach ($required as $field) {
    if (empty($$field)) {
        echo json_encode(['status'=>'error','message'=>'Missing required field: ' . $field]);
        exit;
    }
}

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status'=>'error','message'=>'Invalid email address']);
    exit;
}

// Handle abstract file upload
$abstractFilename = '';

if ($participation_type !== 'Attendee') {
    // Abstract is required for presentation types
    if (!isset($_FILES['abstractFile']) || $_FILES['abstractFile']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['status'=>'error','message'=>'Abstract upload is required for presentation types']);
        exit;
    }
    
    if (empty($abstractTitle)) {
        echo json_encode(['status'=>'error','message'=>'Abstract title is required for presentation types']);
        exit;
    }
    
    $allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!in_array($_FILES['abstractFile']['type'], $allowed)) {
        echo json_encode(['status'=>'error','message'=>'Invalid file type. Only PDF, DOC, and DOCX files are allowed']);
        exit;
    }
    
    // Check file size (5MB max)
    $maxSize = 5 * 1024 * 1024;
    if ($_FILES['abstractFile']['size'] > $maxSize) {
        echo json_encode(['status'=>'error','message'=>'File size exceeds 5MB limit']);
        exit;
    }
    
    // Create abstracts directory if it doesn't exist
    $abstractsDir = __DIR__ . DIRECTORY_SEPARATOR . 'abstracts';
    if (!is_dir($abstractsDir)) {
        mkdir($abstractsDir, 0755, true);
    }
    
    // Generate unique filename
    $fileInfo = pathinfo($_FILES['abstractFile']['name']);
    $baseName = preg_replace('/[^a-zA-Z0-9_-]+/', '_', $fileInfo['filename']);
    $extension = strtolower($fileInfo['extension']);
    $timestamp = date('Ymd_His');
    
    $abstractFilename = $baseName . '_' . $timestamp . '.' . $extension;
    $dest = $abstractsDir . DIRECTORY_SEPARATOR . $abstractFilename;
    
    if (!move_uploaded_file($_FILES['abstractFile']['tmp_name'], $dest)) {
        echo json_encode(['status'=>'error','message'=>'Failed to save abstract file']);
        exit;
    }
} else {
    // Abstract is optional for attendees, but if provided, validate it
    if (isset($_FILES['abstractFile']) && $_FILES['abstractFile']['error'] === UPLOAD_ERR_OK) {
        $allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (!in_array($_FILES['abstractFile']['type'], $allowed)) {
            echo json_encode(['status'=>'error','message'=>'Invalid file type. Only PDF, DOC, and DOCX files are allowed']);
            exit;
        }
        
        $maxSize = 5 * 1024 * 1024;
        if ($_FILES['abstractFile']['size'] > $maxSize) {
            echo json_encode(['status'=>'error','message'=>'File size exceeds 5MB limit']);
            exit;
        }
        
        $abstractsDir = __DIR__ . DIRECTORY_SEPARATOR . 'abstracts';
        if (!is_dir($abstractsDir)) {
            mkdir($abstractsDir, 0755, true);
        }
        
        $fileInfo = pathinfo($_FILES['abstractFile']['name']);
        $baseName = preg_replace('/[^a-zA-Z0-9_-]+/', '_', $fileInfo['filename']);
        $extension = strtolower($fileInfo['extension']);
        $timestamp = date('Ymd_His');
        
        $abstractFilename = $baseName . '_' . $timestamp . '.' . $extension;
        $dest = $abstractsDir . DIRECTORY_SEPARATOR . $abstractFilename;
        
        if (!move_uploaded_file($_FILES['abstractFile']['tmp_name'], $dest)) {
            echo json_encode(['status'=>'error','message'=>'Failed to save abstract file']);
            exit;
        }
    }
}

// Save to CSV file (ICM style)
$csv = __DIR__ . DIRECTORY_SEPARATOR . 'registrations.csv';
$isNew = !file_exists($csv);

// Prepare CSV row with all PLUMEE fields
$row = [
    'submitted_at'       => date('Y-m-d H:i:s'),
    'registration_id'    => 'PLUMEE-' . time() . '-' . strtoupper(uniqid()),
    'title'             => $title,
    'first_name'        => $firstName,
    'last_name'         => $lastName,
    'full_name'         => $fullname,
    'email'             => $email,
    'phone'             => $phone,
    'country'           => $country,
    'affiliation'       => $affiliation,
    'position'          => $position,
    'registration_type' => $registrationType,
    'presentation_type' => $presentationType,
    'participation_type'=> $participation_type,
    'abstract_title'    => $abstractTitle,
    'topic'             => $topic,
    'abstract_filename' => $abstractFilename,
    'status'            => 'pending'
];

// Write to CSV file
$fp = @fopen($csv, 'a');
if (!$fp) { 
    echo json_encode(['status'=>'error','message'=>'Cannot open registration file']); 
    exit; 
}

if (flock($fp, LOCK_EX)) {
    if ($isNew) { 
        fputcsv($fp, array_keys($row)); 
    }
    fputcsv($fp, array_values($row));
    fflush($fp); 
    flock($fp, LOCK_UN);
}
fclose($fp);

// Return success response
echo json_encode([
    'status' => 'success', 
    'registrationId' => $row['registration_id'],
    'message' => 'Registration submitted successfully!'
]);
?>
