import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PdfSelector from './PdfSelector';
import PdfViewer from './PdfViewer';

type PdfOption = {
	value: string;
	label: string;
};

const Pdf = () => {
	const [currentPdf, setCurrentPdf] = useState<PdfOption | null>(null);
	const [pdfData, setPdfData] = useState<Blob | null>(null);
	const [pdfUrl, setPdfUrl] = useState<String | null>(null);

	useEffect(() => {
		currentPdf
			? axios
					.get(`http://localhost:8000/pdf/${currentPdf.value}`, {
						responseType: 'arraybuffer',
					})
					.then((response) => {
						const pdfData = new Blob([response.data], {
							type: 'application/pdf',
						});
						setPdfData(pdfData);
					})
					.catch((error) => {
						console.error(error);
					})
			: setPdfData(null);
	}, [currentPdf]);

	console.log(currentPdf);
	return (
		<div>
			<PdfSelector currentPdf={currentPdf} setCurrentPdf={setCurrentPdf} />
			<PdfViewer pdfData={pdfData} setPdfData={setPdfData} pdfUrl={pdfUrl} />
		</div>
	);
};

export default Pdf;
