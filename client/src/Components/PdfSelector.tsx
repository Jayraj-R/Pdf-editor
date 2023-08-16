import axios from 'axios';
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface PdfSelectorProps {
	currentPdf: any;
	setCurrentPdf: any;
}

const PdfSelector: React.FC<PdfSelectorProps> = ({
	currentPdf,
	setCurrentPdf,
}) => {
	const [refreshOptions, setRefreshOptions] = useState<boolean>(true);

	const loadOptions = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/pdf/list`);
			const pdfNames = response.data;
			const options = pdfNames.map((pdfName: string) => ({
				value: pdfName,
				label: pdfName.split('.')[0],
			}));
			return options;
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const handleChange = async (selectedOption: any) => {
		selectedOption ? setCurrentPdf(selectedOption) : setCurrentPdf(null);
	};

	const uploadSampleViaBackend = async () => {
		try {
			const response = await axios.post('http://localhost:8000/pdf/upload');

			if (response.status === 200) {
				console.log(response.data.message);
				setRefreshOptions(!refreshOptions);
			} else {
				console.error('Upload failed');
			}
		} catch (error) {
			console.error('Error uploading PDF:', error);
		}
	};

	return (
		<div className='flex flex-col w-1/3 gap-4'>
			{!currentPdf && (
				<span className='text-center text-2xl'>
					Select the pdf that you would like to load...
				</span>
			)}
			<AsyncSelect
				key={`${refreshOptions}`}
				cacheOptions
				defaultOptions
				value={currentPdf}
				loadOptions={loadOptions}
				onChange={handleChange}
				isClearable={true}
				isSearchable={true}
			/>

			{/* Adding demo pdf to the database using nestjs server */}
			<button
				className='bg-blue-500 px-4 py-2 text-white'
				onClick={uploadSampleViaBackend}
			>
				Upload samples
			</button>
		</div>
	);
};

export default PdfSelector;
