# Commands to Download/Export Project

## Option 1: Create a ZIP Archive (Windows PowerShell)
```powershell
# Navigate to parent directory
cd "C:\Users\Asus\Downloads"

# Create a ZIP file of the project
Compress-Archive -Path "mit-adt-3d-academic-portal-main" -DestinationPath "mit-adt-3d-academic-portal-main.zip" -Force
```

## Option 2: Create a ZIP Archive (Command Prompt)
```cmd
cd C:\Users\Asus\Downloads
powershell Compress-Archive -Path "mit-adt-3d-academic-portal-main" -DestinationPath "mit-adt-3d-academic-portal-main.zip" -Force
```

## Option 3: Using 7-Zip (if installed)
```bash
7z a -tzip mit-adt-3d-academic-portal-main.zip "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main"
```

## Option 4: Download Dependencies Only (if you have the code)
```bash
cd "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main\mit-adt-3d-academic-portal-main"
npm install --legacy-peer-deps
```

## Option 5: Initialize Git Repository (to push to GitHub)
```bash
cd "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main\mit-adt-3d-academic-portal-main"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

## Option 6: Copy Project to Another Location
```powershell
# Copy entire project folder
Copy-Item -Path "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main" -Destination "D:\Projects\mit-adt-3d-academic-portal-main" -Recurse
```

## Quick Export Script (PowerShell)
Save this as `export-project.ps1`:
```powershell
$sourcePath = "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main"
$zipPath = "C:\Users\Asus\Downloads\mit-adt-3d-academic-portal-main-export.zip"

# Exclude node_modules and .next folders
$excludePaths = @("node_modules", ".next", ".git")

Get-ChildItem -Path $sourcePath -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git" } |
    Compress-Archive -DestinationPath $zipPath -Force

Write-Host "Project exported to: $zipPath"
```

