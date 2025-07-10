import React, { useState, useRef } from 'react';

export default function PDFLoginAndList() {
  const [email, setEmail] = useState('asanduja+uss+demo+us@adobetest.com');
  const [password, setPassword] = useState('USS_Demo');
  const [token, setToken] = useState('');
  const [pdfs, setPdfs] = useState([]); // [{name, assetUri}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const viewerDiv = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPdfs([]);
    setToken('');
    setSelectedPDF(null);
    try {
      const resp = await fetch('/api/adobe/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Login failed');
      setToken(data.access_token);

      // Fetch PDF list (with assetUri)
      const pdfResp = await fetch(`/api/adobe/pdfs?token=${encodeURIComponent(data.access_token)}`);
      const pdfData = await pdfResp.json();
      if (!pdfResp.ok) throw new Error(pdfData.error || 'Failed to fetch PDFs');
      // Support both [{name, assetUri}] and [name]
      setPdfs(pdfData.pdfs || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handlePDFClick = async (pdf) => {
    setSelectedPDF(null);
    setError('');
    if (!pdf.assetUri) {
      setError('No assetUri for this PDF.');
      return;
    }
    try {
      // 1. Get download URI
      const uriResp = await fetch(`/api/adobe/pdf-download-uri?assetUri=${encodeURIComponent(pdf.assetUri)}&token=${encodeURIComponent(token)}`);
      const uriData = await uriResp.json();
      if (!uriResp.ok) throw new Error(uriData.error || 'Failed to get download URI');
      // 2. Fetch PDF as blob
      const blobResp = await fetch(uriData.uri);
      if (!blobResp.ok) throw new Error('Failed to fetch PDF blob');
      const blob = await blobResp.blob();
      // 3. Create object URL
      const blobUrl = URL.createObjectURL(blob);
      setSelectedPDF(blobUrl);
      // 4. Display with Adobe Embed API
      setTimeout(() => {
        if (window.AdobeDC && viewerDiv.current) {
          const adobeDCView = new window.AdobeDC.View({ clientId: "d9e6e5e0e0b84b6b8e6b0b6b0e0b6b0e", divId: viewerDiv.current.id });
          adobeDCView.previewFile({
            content: { location: { url: blobUrl } },
            metaData: { fileName: pdf.name }
          }, { embedMode: "SIZED_CONTAINER" });
        }
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Adobe PDF Login & List</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 8 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Logging in...' : 'Login & List PDFs'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {pdfs.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>PDF Files (click to view):</h3>
          <ul>
            {pdfs.map(pdf => (
              <li key={pdf.name || pdf} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handlePDFClick(pdf)}>
                {pdf.name || pdf}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedPDF && (
        <div style={{ marginTop: 30 }}>
          <h3>PDF Viewer</h3>
          <div id="adobe-dc-view" ref={viewerDiv} style={{ height: 600, width: '100%', border: '1px solid #aaa' }}></div>
        </div>
      )}
    </div>
  );
} 