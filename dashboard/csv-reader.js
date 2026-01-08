// CSV Reader utility
function readCSVFile(filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(csvText => {
            const lines = csvText.split('\n').filter(line => line.trim());
            if (lines.length === 0) return [];
            
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const data = [];
            
            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                const registration = {};
                
                headers.forEach((header, index) => {
                    registration[header] = values[index] || '';
                });
                
                // Add ID for frontend compatibility
                registration.id = registration.registration_id || `REG-${i}`;
                
                data.push(registration);
            }
            
            return data;
        });
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim().replace(/"/g, ''));
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim().replace(/"/g, ''));
    return result;
}
