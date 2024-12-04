# JazzApp Setup and Usage Guide

Welcome to JazzApp!

---

## Magenta Environment

To set up the Magenta environment:

1. Follow the instructions provided in the official Magenta README:
   - [Magenta Setup Instructions](https://github.com/magenta/magenta/blob/main/README.md)

2. If the above instructions do not work, refer to these helpful troubleshooting steps:
   - [Magenta Issue 2047 - Valuable Troubleshooting Steps](https://github.com/magenta/magenta/issues/2047#issuecomment-1543717428)

---

## Python Environment

To set up and start the **FastAPI server**:

1. Navigate to the API directory:
   ```bash
   cd jazz-app/magenta-api

2.	Start the FastAPI server using uvicorn:
uvicorn main:app --reload
	•	The --reload flag enables automatic server reload when you make changes to the code.

3.	The server will be accessible at the URL mentioned in the terminal (e.g., http://127.0.0.1:8000).

## Web Environment

To set up the web environment:
1.	Ensure Node.js and npm are installed:
	•	Node.js Installation:
	    •   Download and install from Node.js Official Website.
	•	Confirm installation:
    ```bash
    node -v
    npm -v
2. Start the application:
    ```bash
    npm run dev
3.	Open your browser and navigate to the localhost address mentioned in the terminal (e.g., http://localhost:3000).

## Using the Application

To use the JazzApp:
1.	Connect Your MIDI Device:
	•	Plug your MIDI device into your computer.
2.	Open a Compatible Browser:
	•	Use a Chrome browser for the best experience.
	•	Do not use Safari, as it is not fully supported.
3.	Access the application through the web interface and start making music!