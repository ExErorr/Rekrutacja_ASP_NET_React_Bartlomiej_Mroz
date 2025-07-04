# backend/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything else from backend folder
COPY . .
RUN dotnet publish -c Release -o /src/publish

FROM base AS final
WORKDIR /app

COPY --from=build /src/publish .

ENTRYPOINT ["dotnet", "backend.dll"]
