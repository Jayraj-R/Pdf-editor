# PDF Editor - Online PDF Editor for Interactive Fillable PDF Files

PDF Editor is a web application that empowers users to seamlessly edit interactive fillable PDF files directly within their browser. This project constitutes a full-stack application currently tailored for local development, with plans for a deployable version in the near future.

**Note**: The actual act of saving the updated PDF file after making changes is not implemented in this version. Interactive editing functionality requires [Pdf.js Express](https://pdfjs.express/pricing), which unfortunately demands a paid version. As a workaround for simulation purposes, the "Save" button will alter the file's name to a hardcoded phrase, serving demonstration objectives.

## Screenshots
[![pdf1.png](https://i.postimg.cc/rFvTYT2c/pdf1.png)](https://postimg.cc/TpqBpZPH)
[![pdf2.png](https://i.postimg.cc/dQgQgrGz/pdf2.png)](https://postimg.cc/s19RhB6c)

## Technologies Utilized

1. **Frontend**: ReactJS, TypeScript, Tailwind CSS
2. **Backend**: NestJS
3. **Database**: PostgreSQL

## Overview

1. The frontend presents a user-friendly dropdown menu featuring available PDF files stored within the associated database. Currently, a simplified approach involves simulating PDF file uploads via dummy API requests to a `/uploads` endpoint.

2. Upon selecting a specific PDF from the dropdown list, the browser renders an interactive view of the chosen PDF, enabling users to conveniently apply edits.

3. Following necessary modifications, users can conveniently click the **Save** button to seamlessly update the edited PDF within the database.

### Frontend Libraries Employed

1. [Axios](https://www.npmjs.com/package/axios): Facilitates HTTP requests between the frontend (ReactJS) and backend (NestJS).
2. [pdf-lib](https://www.npmjs.com/package/pdf-lib): Streamlines document metadata extraction, particularly form fields within the PDF.

### Backend APIs

| API           | Method    | Parameters/Body                     | Return Type           | Purpose                                                      |
|---------------|-----------|-------------------------------------|-----------------------|--------------------------------------------------------------|
| `/list`       | GET       | -                                   | `[ { id: number, name: string } ]` | Retrieves an array of filenames from the database, populating dropdown options. |
| `/:id`        | GET       | `{ id: number }`                   | `{ data: Blob }`      | Retrieves the file data of a specific PDF file.             |
| `/update`     | POST      | `{ id: number, fileData: Blob }: FormData` | -                   | Updates the file data of a specified file.                   |
| `/upload`     | POST      | -                                   | -                     | Simulates uploading a dummy file from the local server directory to the database. |

### Database Structure

| Column    | Data Type | Description                       |
|-----------|-----------|-----------------------------------|
| id        | number    | Auto-generated primary key.       |
| name      | string    | File name.                        |
| fileData  | bytea     | PDF file in binary string format. |

## Local Setup Instructions

1. Clone ths repo `git clone https://github.com/Jayraj-R/Pdf-editor.git`
2. Route to frontend directory `cd client`
    - `npm install`
    - `npm start`
3. Route back to the backend directory `cd ../server`
    - `npm install`
    - Update the `/src/app.module.ts` to reflect your personal postgresql database details
    - `npm start`

Please ensure to follow these steps meticulously to set up the application for local development.
