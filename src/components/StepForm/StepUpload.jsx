import React from 'react';
import '../../styles/stepform.css';

export default function StepUpload({ handleFileUpload, nextStep, prevStep, files = [] }) {
  return (
    <div className="step-form">
      <h2>Step 4: Upload Pictures (optional)</h2>
      <input type="file" multiple onChange={handleFileUpload} />
      <div style={{marginTop: 8, fontSize: 12, color: '#555'}}>
        {files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
      </div>

      <div className="step-buttons">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}
