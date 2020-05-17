function RedirectConfigFile {
    param([string] $sourcePath, [string] $targetPath)

    if ($sourcePath -And (Test-Path $sourcePath)) {
    
        Remove-Item -Force -Path $targetPath
            
        New-Item -Path $targetPath `
                -ItemType SymbolicLink `
                -Value $sourcePath

        Write-Output "STARTUP: Redirected $targetPath config to read from $sourcePath"
    }
}

Write-Output 'STARTUP: Loading config files'
RedirectConfigFile $env:LOG4NET_CONFIG_PATH "$env:APP_ROOT\log4net.config"
RedirectConfigFile $env:CONNECTIONSTRINGS_CONFIG_PATH "$env:APP_ROOT\connectionStrings.config"

Write-Output 'STARTUP: Starting IIS'
Start-Service w3svc

Write-Output 'STARTUP: Running metrics exporter'
Invoke-WebRequest http://localhost/app -UseBasicParsing | Out-Null
Start-Process -NoNewWindow C:\aspnet-exporter\aspnet-exporter.exe

Write-Output 'STARTUP: Tailing log'
Get-Content -Path "$env:APP_LOGS\SignUp.log" -Tail 1 -Wait