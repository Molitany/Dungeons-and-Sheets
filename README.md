# Dungeons and Sheets

# For first time setup

# Installation
Install MySql server and MySql Workbench.
Create a database and name is something appropriate

# Initialize project
dotnet restore
change the connection string in the appsettings.Development.json to fit with the dev database you have set up in MySql Workbench.

dotnet ef database update


and everything should work :)