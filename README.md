# HTP-Analyzer
___
## moist ![MADE IN REACT](https://img.shields.io/badge/MADE_IN_REACT-black?style=for-the-badge&logo=react)
___
This is our project for a product called HTP-analyzer (Humidity, Temperature, Pressure) for measuring
temperature, pressure and humidity. In our project we will use an ESP32 connected with a BME280 sensor
that can detect temperature, humidity and pressure. The ESP32 will be connected to the cloud using
Wi-Fi. This product will be able to measure the local temperature, humidity and pressure data which can be
beneficial in places such as a green house. The user will have access to these three values easily, compared
to something such as a thermometer which only measures temperature. The user will also be able to view
the data on a website and will be able to retrieve feedback from the data. With a wireless socket - it can
connect to a humidifier and turn on and off based on the users given maximum and minimum humidity
values.

## Project setup
[![REQUIRES - NodeJS](https://img.shields.io/static/v1?label=REQUIRES&message=NodeJS&color=%23339933&style=for-the-badge&logo=Node.js)](https://nodejs.org/en/)

1. Download and install [node](https://nodejs.org/en/) if you haven't already.
2. Clone the repository to your local machine using `git clone`
```bash
git clone https://github.com/sebgro98/HTP-Analyzer.git
```
3. Navigate to the directory where you cloned this repo your terminal and `cd` into the local repo.
4. Install the required dependencies using
```bash
npm install
```
5. After dependencies have installed, start a development server.
```bash
npm start
```
6. Open your `localhost` URL indicated by your terminal and start app!
