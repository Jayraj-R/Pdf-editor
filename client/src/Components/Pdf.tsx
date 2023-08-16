import axios from 'axios';
import { useEffect, useState } from 'react';
import { SelectOptions } from '../utils/Types';
import { constants } from '../utils/constants';
import PdfSelector from './PdfSelector';
import PdfViewer from './PdfViewer';

const Pdf = () => {
	const [currentPdfName, setCurrentPdfName] = useState<SelectOptions | null>(
		null
	);
	const [fileData, setFileData] = useState<Blob | null>(null);

	useEffect(() => {
		currentPdfName
			? axios
					.get(`${constants.BACKEND_URI_LOCAL}/${currentPdfName.value}`, {
						responseType: 'arraybuffer',
					})
					.then((response) => {
						const fileData = new Blob([response.data], {
							type: 'application/pdf',
						});
						setFileData(fileData);
					})
					.catch((error) => {
						console.error(`Error fetching PDF ${currentPdfName}:`, error);
					})
			: setFileData(null);
	}, [currentPdfName]);

	const updatePdf = async () => {
		if (!currentPdfName || !fileData) return;

		const formData = new FormData();
		formData.append('name', currentPdfName.value);
		formData.append('fileData', fileData);

		try {
			const response = await axios.post(
				`${constants.BACKEND_URI_LOCAL}/update`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log(
				`Response from updating the ${currentPdfName.value}:`,
				response
			);
		} catch (error) {
			console.error(`Error updating the PDF ${currentPdfName.value}:`, error);
		}
	};

	return (
		<div className='flex justify-center items-center w-screen h-screen bg-blue-200 gap-5 p-10'>
			<PdfSelector
				currentPdfName={currentPdfName}
				setCurrentPdfName={setCurrentPdfName}
			/>
			{currentPdfName && (
				<div className='flex justify-center'>
					<button
						onClick={updatePdf}
						className='bg-blue-500 text-white cursor-pointer px-10 py-2 rounded-lg'
					>
						Save
					</button>
				</div>
			)}
			{fileData && <PdfViewer fileData={fileData} setFileData={setFileData} />}
		</div>
	);
};

export default Pdf;
