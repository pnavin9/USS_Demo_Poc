const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = function(app) {
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
};
