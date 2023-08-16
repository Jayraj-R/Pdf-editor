import axios from 'axios';
import React from 'react';
import AsyncSelect from 'react-select/async';
import { PdfSelectorProps } from '../utils/Types';
import { constants } from '../utils/constants';

const PdfSelector: React.FC<PdfSelectorProps> = ({
	currentPdfName,
	setCurrentPdfName,
}) => {
	const loadOptions = async () => {
		try {
			const response = await axios.get(`${constants.BACKEND_URI_LOCAL}/list`);
			return response.data.map((pdfName: string) => ({
				value: pdfName,
				label: pdfName.split('.')[0],
			}));
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const handleChange = async (selectedOption: any) => {
		selectedOption
			? setCurrentPdfName(selectedOption)
			: setCurrentPdfName(null);
	};

	// const uploadSampleViaBackend = async () => {
	// 	try {
	// 		const { data, status } = await axios.post(
	// 			`${constants.BACKEND_URI_LOCAL}/upload`
	// 		);

	// 		if (status === 200) {
	// 			console.log(data.message);
	// 		} else {
	// 			console.error('Upload failed');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error uploading PDF:', error);
	// 	}
	// };

	return (
		<div className='flex flex-col w-1/3 gap-4'>
			{!currentPdfName && (
				<span className='text-center text-2xl'>
					Select the pdf that you would like to load...
				</span>
			)}
			<AsyncSelect
				cacheOptions
				defaultOptions
				value={currentPdfName}
				loadOptions={loadOptions}
				onChange={handleChange}
				isClearable={true}
				isSearchable={true}
			/>

			{/* Adding demo pdf to the database using NestJs server */}
			{/* <button
				className='bg-blue-500 px-4 py-2 text-white'
				onClick={uploadSampleViaBackend}
			>
				Upload samples
			</button> */}
		</div>
	);
};

export default PdfSelector;
