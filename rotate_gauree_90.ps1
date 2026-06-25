Add-Type -AssemblyName System.Drawing

$imgPath = 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Retail\01.JPG'
$imgRotatedPath = 'D:\Hostbolt\clients\Lines & thoughts (Haridwar)\testing 2\optimized-assets\Gauree, Retail\01_rotated.JPG'

$img = [System.Drawing.Image]::FromFile($imgPath)
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$img.Save($imgRotatedPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()

Remove-Item $imgPath
Rename-Item $imgRotatedPath '01.JPG'

Write-Host "Rotated Gauree Retail successfully."
