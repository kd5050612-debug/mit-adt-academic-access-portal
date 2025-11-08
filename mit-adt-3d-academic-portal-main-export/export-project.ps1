# Export Project Script
# Excludes node_modules, .next, and other build files

$sourcePath = "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main\mit-adt-3d-academic-portal-main"
$zipPath = "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main-export.zip"

Write-Host "Creating project archive..."
Write-Host "Source: $sourcePath"
Write-Host "Output: $zipPath"

# Get all files excluding node_modules, .next, and .git
$files = Get-ChildItem -Path $sourcePath -Recurse -File | 
    Where-Object { 
        $_.FullName -notmatch "\\node_modules\\" -and 
        $_.FullName -notmatch "\\.next\\" -and 
        $_.FullName -notmatch "\\.git\\" -and
        $_.FullName -notmatch "\\dist\\" -and
        $_.FullName -notmatch "\\.turbo\\"
    }

# Create temporary directory structure
$tempDir = Join-Path $env:TEMP "project-export-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy files maintaining directory structure
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($sourcePath.Length + 1)
    $destPath = Join-Path $tempDir $relativePath
    $destDir = Split-Path $destPath -Parent
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    Copy-Item $file.FullName -Destination $destPath -Force
}

# Create ZIP from temp directory
Write-Host "Compressing files..."
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Cleanup
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "`nProject exported successfully!"
Write-Host "Location: $zipPath"
Write-Host "`nNote: node_modules and .next folders were excluded."
Write-Host "Run 'npm install --legacy-peer-deps' after extracting."

