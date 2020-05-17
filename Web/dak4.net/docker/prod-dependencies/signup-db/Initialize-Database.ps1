# Adapted from Microsoft's SQL Server Express sample:
# https://github.com/Microsoft/mssql-docker/blob/master/windows/mssql-server-windows-express/start.ps1

param(
    [string] $sa_password = $env:sa_password,
    [string] $data_path = $env:data_path
)

# start the service
Write-Host 'Starting SQL Server'
start-service MSSQL`$SQLEXPRESS

if ($sa_password -ne "_") {
	Write-Host 'Changing SA login credentials'
    $sqlcmd = "ALTER LOGIN sa with password='$sa_password'; ALTER LOGIN sa ENABLE;"
    Invoke-Sqlcmd -Query $sqlcmd -ServerInstance ".\SQLEXPRESS" 
}

$mdfPath = "$data_path\SignUp_Data.mdf"
$ldfPath = "$data_path\SignUp_Log.ldf"

# attach database if files exist: 
if ((Test-Path $mdfPath) -eq $true) {
    $sqlcmd = "IF DB_ID('SignUp') IS NULL BEGIN CREATE DATABASE SignUp ON (FILENAME = N'$mdfPath')"       
    if ((Test-Path $mdfPath) -eq $true) {
        $sqlcmd =  "$sqlcmd, (FILENAME = N'$ldfPath')"
    }
    $sqlcmd = "$sqlcmd FOR ATTACH; END"
    Write-Host 'Data files exist - will create and attach database'
}
else {
    # create database using the volume location:
    $sqlcmd = 
    "IF NOT EXISTS(SELECT 1 FROM sys.databases WHERE Name = 'SignUp') 
      CREATE DATABASE SignUp ON 
       PRIMARY ( NAME = N'SignUp_Data', FILENAME = N'$mdfPath') 
       LOG ON ( NAME = N'SignUp_Log', FILENAME = N'$ldfPath' )"    
    Write-Host 'Data files do not exist - will create new database'
}

Invoke-Sqlcmd -Query $sqlcmd -ServerInstance ".\SQLEXPRESS"
Write-Host "Created SignUp database, data files at: $data_path"

Write-Host "Started SQL Server."

$lastCheck = (Get-Date).AddSeconds(-2) 
while ($true) { 
    Get-EventLog -LogName Application -Source "MSSQL*" -After $lastCheck | Select-Object TimeGenerated, EntryType, Message	 
    $lastCheck = Get-Date 
    Start-Sleep -Seconds 2 
}