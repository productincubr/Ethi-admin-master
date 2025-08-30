import {  useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


function App() {

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = async () => {
    const pdfWidth = 520; // A4 page width in pixels
    const pdfHeight = 600; // A4 page height in pixels
  
    const pdf = new jsPDF({
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });
  
    // Fetch the background image
    const backgroundImageUrl = 'https://content.wepik.com/media/bg-remover/remove-bg-bg6.png';
    const response = await fetch(backgroundImageUrl);
    const imageBlob = await response.blob();
  
    // Convert the blob to a data URL
    const imageObjectURL = URL.createObjectURL(imageBlob);
  
    // Get the HTML content inside the specified div
    const pdfContent = document.getElementById('pdfContent');
  
    html2canvas(pdfContent, { useCORS: true }).then((canvas) => {
      // Draw the background image with dimensions matching the PDF page
      pdf.addImage(imageObjectURL, 'png', 0, 0, pdfWidth, pdfHeight);
  
      // Draw the HTML content on top of the background image
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      pdf.save('document.pdf');
    });
  };
  return (

    <div>
    <button className="button" onClick={handleGeneratePdf}>
      Generate PDF
    </button>
    <div ref={reportTemplateRef}>
      <ReportTemplate />
    </div>
  </div>
  )
}

export default App;