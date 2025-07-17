const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- /api/sensei proxy route (from setupProxy.js) ---
app.post('/api/sensei', async (req, res) => {
  try {
    const myHeaders = {
      "Accept": "application/json, text/plain, */*",
      "x-api-key": "co-tools-apitest",
      "x-engine-variant": "stg11",
      "Accept-Language": "en-US,en;q=0.9",
      "Origin": "https://acrobat.adobe.com",
      "Referer": "https://acrobat.adobe.com/",
      "prefer": "respond-sync,wait=100",
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktYXQtMS5jZXIiLCJraWQiOiJpbXNfbmExLXN0ZzEta2V5LWF0LTEiLCJpdHQiOiJhdCJ9.eyJpZCI6IjE3NTIxNDE1NDY4NTlfZTM4MzM5ODAtZjQ2NS00YzQ2LWI3YTMtYWI0M2U5YTU4Yzk2X3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkYy1zdGFnZS12aXJnb3dlYiIsInVzZXJfaWQiOiJDM0Y5MTk4MzY2MzBDOURCMEE0OTQwMjNAYzYyZjI0Y2M1YjViN2UwZTBhNDk0MDA0IiwiYXMiOiJpbXMtbmExLXN0ZzEiLCJhYV9pZCI6IkMzRjkxOTgzNjYzMEM5REIwQTQ5NDAyM0BjNjJmMjRjYzViNWI3ZTBlMGE0OTQwMDQiLCJjdHAiOjAsImZnIjoiWlRMSlA2UjQ3WjJYQjREWjNHWk1BMklBVTQ9PT09PT0iLCJzaWQiOiIxNzUyMTI5MjY5NzM3X2I0OGI2MTlmLTRlYTktNDVhNS1hOThlLWJlODk5YTRiZGU4Yl91dzIiLCJtb2kiOiIxNzU0YTEzMyIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJBZG9iZUlELG9wZW5pZCxEQ0FQSSxhZGRpdGlvbmFsX2luZm8uYWNjb3VudF90eXBlLGFkZGl0aW9uYWxfaW5mby5vcHRpb25hbEFncmVlbWVudHMsYWdyZWVtZW50X3NpZ24sYWdyZWVtZW50X3NlbmQsc2lnbl9saWJyYXJ5X3dyaXRlLHNpZ25fdXNlcl9yZWFkLHNpZ25fdXNlcl93cml0ZSxhZ3JlZW1lbnRfcmVhZCxhZ3JlZW1lbnRfd3JpdGUsd2lkZ2V0X3JlYWQsd2lkZ2V0X3dyaXRlLHdvcmtmbG93X3JlYWQsd29ya2Zsb3dfd3JpdGUsc2lnbl9saWJyYXJ5X3JlYWQsc2lnbl91c2VyX2xvZ2luLHNhby5BQ09NX0VTSUdOX1RSSUFMLGVlLmRjd2ViLHRrX3BsYXRmb3JtLHRrX3BsYXRmb3JtX3N5bmMsYWIubWFuYWdlLGFkZGl0aW9uYWxfaW5mby5pbmNvbXBsZXRlLGFkZGl0aW9uYWxfaW5mby5jcmVhdGlvbl9zb3VyY2UsYWRkaXRpb25hbF9pbmZvLnJvbGVzLHBwcy5yZWFkLHJlYWRfb3JnYW5pemF0aW9ucyxhY2NvdW50X2NsdXN0ZXIucmVhZCx1cGRhdGVfcHJvZmlsZS5maXJzdF9uYW1lLHVwZGF0ZV9wcm9maWxlLmxhc3RfbmFtZSIsImNyZWF0ZWRfYXQiOiIxNzUyMTQxNTQ2ODU5In0.X5DMF_BhQQATd0COUoOTfrrlShvVZg4qygDrtuBXZB8ZEeZQe8mxZEdBUv4znZVKBmCrySk7f2QkzFadTj_zyxiimFAeXV-E_A6NbHZ7zp3v_VMxB1XKs0h3p4PgTzAo4IIeiOlsz_gi9deUtXcGbYjHruKrBdFkTKGqxbyDU95aVlpHvyXocKFXeCqS5qkK0jJqml7WziwI6EyyfJAzFY-bwKdSOVTKKAUicYt4VfH7D5XRda7Bb9T39djMR6feyrKMxf2qRdIzOq5XlRRkZSboeF8fqFBUpYPzphy9ia--sUqYDTdjyDGG3GTxFZkujTLf67O7fKTBu-jtGRZSSA"
    };

    const formdata = new FormData();
    formdata.append("contentAnalyzerRequests", "{\n  \"sensei:engines\": [\n    {\n      \"sensei:execution_info\": {\n        \"sensei:engine\": \"Classification:facecrop:Service-1a3f54e42e69418a92d0ecb7f33cc771\"\n      },\n      \"sensei:inputs\": {\n        \"params\": {\n          \"query\": \"mayur vihar\",\n          \"experience_id\": \"acrobat_studio_home_page\",\n          \"owner_id\": \"43F41DE7685E73D80A494013@AdobeID\",\n          \"intent\": \"SEARCH\"\n        }\n      },\n      \"sensei:params\": {},\n      \"sensei:outputs\": {\n        \"query_response_out\": {\n          \"sensei:multipart_field_name\": \"query_response_out\",\n          \"dc:format\": \"application/json\"\n        }\n      }\n    }\n  ]\n}");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const response = await fetch("https://senseicore-stage-ue1.adobe.io/services/v2/predict", requestOptions);
    const result = await response.text();
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Adobe IMS Authentication Endpoint ---
app.post('/api/adobe/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'co-tools-apitest');
    formData.append('client_secret', 'cbbb6767-7088-4475-ac99-e631ddc42fbf');
    formData.append('username', email);
    formData.append('password', password);
    formData.append('scope', 'AdobeID,openid,DCAPI');

    const response = await fetch('https://ims-na1-stg1.adobelogin.com/ims/token/v1', {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(401).json({ error: 'Adobe IMS authentication failed', details: errorText });
    }

    const tokenResponse = await response.json();
    if (!tokenResponse.access_token) {
      return res.status(500).json({ error: 'No access token received from Adobe IMS' });
    }
    res.json({ access_token: tokenResponse.access_token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Adobe PDF Listing Endpoint ---
app.get('/api/adobe/pdfs', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Missing token parameter' });
    }
    // For demo, use hardcoded userId as in original code
    const userId = '1752761880';
    const adobeBaseURL = 'https://dc-api-v2-stage.adobe.io';
    // 1. Get root folder info
    const rootResp = await fetch(`${adobeBaseURL}/${userId}/folders/root`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.adobe.dc+json;profile="https://dc-api-v2.adobe.io/schemas/root_v1.json"',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!rootResp.ok) {
      const errorText = await rootResp.text();
      return res.status(401).json({ error: 'Failed to fetch root folder', details: errorText });
    }
    const rootResult = await rootResp.json();
    if (!rootResult.root_uri) {
      return res.status(500).json({ error: 'No root_uri in Adobe API response' });
    }
    // 2. Get folder contents
    const contentsUrl = `${rootResult.root_uri}/contents?order_by=name&sort_order=ascending&page_size=100&metadata=basic`;
    const contentsResp = await fetch(contentsUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.adobe.dc+json;profile="https://dc-api-v2.adobe.io/schemas/folder_listing_v1.json"',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!contentsResp.ok) {
      const errorText = await contentsResp.text();
      return res.status(401).json({ error: 'Failed to fetch folder contents', details: errorText });
    }
    const folderContents = await contentsResp.json();
    // 3. Extract PDF filenames and assetUris
    const pdfs = (folderContents.members || [])
      .filter(m => m && m.object_type === 'file' && m.type === 'application/pdf' && m.name && m.asset_uri)
      .map(m => ({ name: m.name, assetUri: m.asset_uri }));
    res.json({ pdfs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Adobe PDF Download URI Endpoint ---
app.get('/api/adobe/pdf-download-uri', async (req, res) => {
  try {
    const { assetUri, token } = req.query;
    if (!assetUri || !token) {
      return res.status(400).json({ error: 'Missing assetUri or token parameter' });
    }
    const downloadUrl = `${assetUri}/uri/download?make_direct_storage_uri=true`;
    const response = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.adobe.dc+json;profile="https://dc-api-v2-stage.adobe.io/schemas/asset_uri_download_v1.json"',
        'Authorization': `Bearer ${token}`,
        'x-api-app-info': 'dc-web-app',
        'x-api-client-id': 'api_browser',
        'x-request-id': Math.random().toString(36).substring(2)
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(401).json({ error: 'Failed to fetch PDF download URI', details: errorText });
    }
    const downloadData = await response.json();
    res.json({ uri: downloadData.uri });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Serve React static files ---
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
