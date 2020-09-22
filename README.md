# NODE VERSION
V12.18.3
# Instructions for running local instance of API server
Sequelize database info
1. username - root
2. password - password
3. database - schoolmanagement

## Steps
1. **npm i** to install all the dependencies
2. **npm i sequelize-cli** 
3. Ensure that database **'schoolmanagement'** is created
4. enter **sequelize db:migrate;** 
5. **npm run start:dev** to start the server

**note** ensure that the server is running before running **npm run test** for unit test
