// Load Wi-Fi library
#include <Arduino.h>
#include <analogWrite.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// Define Input Pins
#define PIN_LED   2 // GIOP02
#define PIN_DHT11    4 // GIOP04
#define PIN_BUZZER  23 // GIOP23

#define DHTTYPE DHT11 

DHT dht(PIN_DHT11, DHTTYPE);
// Replace with your network credentials
const char* ssid     = "RAVENCLAW";
const char* password = "0251#2660253";
const char* serverName = "http://192.168.0.5:8080/api/meteorlogs";

// Set web server port number to 80
WiFiServer server(80);
String deviceId = "1";
int cycleTime = 30;

void setup() {
  pinMode(PIN_LED, OUTPUT);
  pinMode (PIN_BUZZER, OUTPUT);
  dht.begin();
  Serial.begin(115200);

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
    
    // Specify content-type header
    http.addHeader("Content-Type", "application/json");
    
    // Prepare your HTTP POST request data
    String httpRequestData = "{\"deviceId\":\"" + deviceId + "\",\"temperature\":\"" + String(t) + "\",\"humidity\":\""+ String(h) + "\"}";
    Serial.print("httpRequestData: ");
    Serial.println(httpRequestData);
    
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);
    
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      digitalWrite(PIN_LED, HIGH);     
      digitalWrite(PIN_BUZZER, HIGH); 
      delay(2000);
      digitalWrite(PIN_LED, LOW);     
      digitalWrite(PIN_BUZZER, LOW); 
    }
    
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
  //Send an HTTP POST request every cycleTime minutes
  delay(cycleTime * 60000);  
}
