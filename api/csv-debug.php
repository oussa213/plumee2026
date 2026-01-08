<?php
// Simple test to debug the CSV reading
$csvFile = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'registration.csv';

echo "<h2>CSV Debug Test</h2>";
echo "<p><strong>File path:</strong> " . htmlspecialchars($csvFile) . "</p>";
echo "<p><strong>File exists:</strong> " . (file_exists($csvFile) ? 'YES' : 'NO') . "</p>";

if (file_exists($csvFile)) {
    echo "<p><strong>File size:</strong> " . filesize($csvFile) . " bytes</p>";
    echo "<p><strong>Is readable:</strong> " . (is_readable($csvFile) ? 'YES' : 'NO') . "</p>";
    
    $fp = fopen($csvFile, 'r');
    if ($fp) {
        echo "<h3>CSV Content:</h3>";
        echo "<table border='1'>";
        
        $headers = fgetcsv($fp);
        if ($headers) {
            echo "<tr><th>#</th>";
            foreach ($headers as $header) {
                echo "<th>" . htmlspecialchars($header) . "</th>";
            }
            echo "</tr>";
            
            $rowNum = 1;
            while (($row = fgetcsv($fp)) !== false) {
                echo "<tr><td>$rowNum</td>";
                foreach ($row as $cell) {
                    echo "<td>" . htmlspecialchars($cell) . "</td>";
                }
                echo "</tr>";
                $rowNum++;
            }
        }
        
        echo "</table>";
        fclose($fp);
    } else {
        echo "<p style='color: red;'>Could not open file for reading</p>";
    }
} else {
    echo "<p style='color: red;'>File not found</p>";
}

// Test the API directly
echo "<h2>API Test:</h2>";
echo "<p><a href='registrations.php'>Click here to test the API</a></p>";
?>
