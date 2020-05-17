# NFR #1 - Persistent Storage

---

The filesystem in a Docker container has the same lifetime as the container. 

If you write data in your app and then replace the container - for an application or OS update - you'll lose all your data.

Next you'll learn how to keep data outside of a container using a [Docker volume](https://docs.docker.com/engine/admin/volumes/volumes/), which has a separate lifecycle to the container.

---

## Docker volumes for log files

As a simple example, create a new IIS container with a volume mount which maps the log directory in the container to a directory on the host:

```
mkdir C:\iis-logs; `

docker container run --detach --name iis --publish-all `
 --volume "C:\iis-logs:C:\inetpub\logs" `
 mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2019
```

> When the container reads or writes data at `C:\inetpub\logs` Docker is actually redirecting it to `C:\iis-logs` on the server.

---

## Generate some log entries

When you browse to IIS on the container, it will write log entries - and you will see the files on the server.

_This script makes a few web requests and then checks the logs:_

```
$port = $(docker container port iis 80).Replace('0.0.0.0:', '')

for ($i=0; $i -le 10; $i++) { Invoke-WebRequest "http://localhost:$port" -UseBasicParsing | Out-Null}

ls C:\iis-logs\LogFiles\W3SVC1
```

> IIS running inside the container has created a log file in the `LogFiles` directory, which is actually mounted from the host. 

---

## Volumes for SQL Server data files

You can do the same with SQL Server to store the data and log files on the host.

> It's slightly more complicated with SQL Server because the container image already has a folder containing data files for the system databases. If you mount a volume to the same location, it hides any existing files, so SQL Server wouldn't start.

You can't override the existing SQL Server data directory, so instead we'll make a custom SQL Server image.

---

## Build the custom SQL image

The [Dockerfile](./docker/nfr-storage/signup-db/Dockerfile) adds a volume and an [initialization script](part-5/db/Initialize-Database.ps1) which creates the SignUp database in the volume directory.

_Build the image:_

```
docker image build --tag dak4dotnet/signup-db `
  -f ./docker/nfr-storage/signup-db/Dockerfile .
```

---

## Run the database with a volume

Try running the database container on its own. Because the **image** has a volume defined, Docker will create a volume for the **container**.

_Run the container with no extra configuration:_

```
docker container run -d --name db-1 dak4dotnet/signup-db
```

> Docker provisions a volume, creates the container and connects it to the volume.

---

## Check the container output

The startup script in the SQL container writes logs as it sets up the database, and then it creates the data files in the volume directory.

_Check the container logs:_

```
docker container logs db-1
```

> You'll see log entries saying the data files have been created at `C:\data`.

---

## Check the data in the volume

Docker creates the volume with a generated ID. You can get details about volumes attached to the container by inspecting it.

_This shows details about the SQL container's volume:_

```
docker container inspect --format '{{ json .Mounts }}' db-1 | ConvertFrom-Json
```

> The `Source` field is the physical path of the volume, starting `C:\ProgramData\Docker...`. List the contents and you'll see the database files.

---

## Run the database with a mapped volume

Volumes are useful for ensuring data gets saved, but you can override the volume path when you run a container, specifying a host path to mount.

_Create the data folder and run the container:_

```
mkdir C:\mssql; `

docker container run -d -v C:\mssql:C:\data `
  --name db-2 dak4dotnet/signup-db
```

> This is great for high-availability, you can mount RAID storage or a network share.

---

## Check the container output

The startup script in the SQL container writes logs as it sets up the database, and then it creates the data files in the volume directory.

_Check the container logs and the host directory:_

```
docker container logs db-2; `

ls /mssql
```

> You'll see log entries saying the data files have been created at `C:\data`, and you'll also see the files really live at `C:\mssql` on the server.

---

## Remove the database containers

Now we've seen how volumes work, we'll remove the database containers and use volumes for the full app.

```
@('db-1', 'db-2') | foreach { docker container rm -f $_}
```

> More fancy PowerShell, forcibly removing the containers by name
---

## Run the app with volumes for storage

The [v7 manifest](./app/v7.yml) includes the `volume` specifications - using `C:\mssql` on the host for SQL Server data files, `C:\prom` for Prometheus data and `C:\es` for Elasticsearch.

_Create the new directories and run the app:_

```
mkdir C:\prom; mkdir C:\es; `

docker-compose -f .\app\v7.yml up -d
```

> Most of the containers will get recreated because of the dependencies.

---

## Try out the app

The underlying storage has changed for the three stateful containers - but it's all transparent to the apps, and everything works in the same way.

_Browse to the site via the reverse proxy:_

```
firefox http://localhost:8020
```

> Add a new prospect, and the databases will all write to the mounted folders.

---

## Check the data files

When the message handlers have processed the event and the metrics have been scraped, there will be data from SQL Server, Elasticsearch and Prometheus.

_Check the data files on the server:_


```
ls C:\mssql; ls C:\es; ls C:\prom
```

> Now if you remove all your containers and start the app again, all your old data will be available to the new containers.

---

## Storage beyond single-node environments

You can map volumes to host directories, which is fine for dev and single-node test environments. You can also map volumes from different storage providers for production.

Docker volumes have a plug-in architecture, so with a production cluster you could map container volumes to storage units in the data center, or to storage services in the cloud.