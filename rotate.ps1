Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Image]::FromFile('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Commercial\01.JPG')
$img1.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$img1.Save('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Commercial\01_rotated.JPG', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img1.Dispose()

$img2 = [System.Drawing.Image]::FromFile('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\01.JPG')
$img2.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$img2.Save('D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\01_rotated.JPG', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img2.Dispose()

Remove-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Commercial\01.JPG'
Rename-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Commercial\01_rotated.JPG' '01.JPG'

Remove-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\01.JPG'
Rename-Item 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\The Burnt Wall, Commercial\01_rotated.JPG' '01.JPG'

Write-Host "Rotated successfully."
