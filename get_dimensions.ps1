Add-Type -AssemblyName System.Drawing
$dir = 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\ACHIEVEMENTS\PUBLICATIONS'
$files = Get-ChildItem -Path $dir -Filter *.jpg
foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    Write-Host "$($file.Name) - $($img.Width)x$($img.Height)"
    $img.Dispose()
}
