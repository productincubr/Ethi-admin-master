import "./App.css";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Dieplan from "./Dieplan";

function DoctorDietPlanPdf() {
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = async () => {
    let generatedPdfData = "";

    const pdfWidth = 520; // A4 page width in pixels
    const pdfHeight = 600; // A4 page height in pixels

    const pdf = new jsPDF({
      unit: "px",
      format: [pdfWidth, pdfHeight],
    });

    // Fetch the background image
    const backgroundImageUrl =
      "https://content.wepik.com/media/bg-remover/remove-bg-bg6.png";
    const response = await fetch(backgroundImageUrl);
    const imageBlob = await response.blob();

    // Convert the blob to a data URL
    const imageObjectURL = URL.createObjectURL(imageBlob);

    // Get the HTML content inside the specified divs
    const pdfContent1 = document.getElementById("pdfContent-1");
    const pdfContent2 = document.getElementById("pdfContent-2");
    const pdfContent3 = document.getElementById("pdfContent-3");

    // Function to add content to PDF from a given HTML element
    const addContentToPdf = async (element) => {
      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imageObjectURL, "png", 0, 0, pdfWidth, pdfHeight);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.addPage(); // Add a new page for the next container
    };

    // Add content from each container to the PDF
    await addContentToPdf(pdfContent1);
    await addContentToPdf(pdfContent2);
    await addContentToPdf(pdfContent3);
    generatedPdfData = pdf.output("blob");
    console.log(generatedPdfData);

    // Save the PDF
    pdf.save("generated_pdf.pdf");
    window.open(generatedPdfData, "_blank");
    return generatedPdfData;
  };

  return (
    <div>
      <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
      <div ref={reportTemplateRef}>
        <Dieplan />
      </div>
    </div>
  );
}

export default DoctorDietPlanPdf;