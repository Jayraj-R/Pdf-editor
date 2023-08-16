import axios from 'axios';
import { useEffect, useState } from 'react';
import PdfSelector from './PdfSelector';
import PdfViewer from './PdfViewer';

type PdfOption = {
	value: string;
	label: string;
};

const Pdf = () => {
	const [currentPdf, setCurrentPdf] = useState<PdfOption | null>(null);
	const [pdfData, setPdfData] = useState<Blob | null>(null);

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

	const updatePdf = async () => {
		if (!currentPdf || !pdfData) {
			alert('No pdf file is selected');
			return;
		}

		const formData = new FormData();
		formData.append('name', currentPdf.value);
		formData.append('fileData', pdfData);

		try {
			const response = await axios.post(
				'http://localhost:8000/pdf/update',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('Response:', response);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='flex justify-center items-center w-screen h-screen bg-blue-200 gap-5 p-10'>
			<PdfSelector currentPdf={currentPdf} setCurrentPdf={setCurrentPdf} />
			{currentPdf && (
				<div className='flex justify-center'>
					<button
						onClick={updatePdf}
						className='bg-blue-500 text-white cursor-pointer px-10 py-2 rounded-lg'
					>
						Save
					</button>
				</div>
			)}
			{pdfData && <PdfViewer pdfData={pdfData} setPdfData={setPdfData} />}
		</div>
	);
};

export default Pdf;
