Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\A7407411.JPG')
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$img.Save('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\A7407411_rotated.JPG', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Remove-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\A7407411.JPG'
Rename-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\A7407411_rotated.JPG' 'A7407411.JPG'

Write-Host "Rotated successfully."
