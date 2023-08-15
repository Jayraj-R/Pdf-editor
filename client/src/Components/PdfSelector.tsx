import axios from 'axios';
import React from 'react';
import AsyncSelect from 'react-select/async';

interface PdfSelectorProps {
	currentPdf: any;
	setCurrentPdf: any;
}

const PdfSelector: React.FC<PdfSelectorProps> = ({
	currentPdf,
	setCurrentPdf,
}) => {
	const loadOptions = async (inputValue: string) => {
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

	return (
		<div className='flex flex-col w-1/3 gap-4'>
			{!currentPdf && (
				<span className='text-center text-2xl'>
					Select the pdf that you would like to load...
				</span>
			)}
			<AsyncSelect
				cacheOptions
				defaultOptions
				value={currentPdf}
				loadOptions={loadOptions}
				onChange={handleChange}
				isClearable={true}
				isSearchable={true}
			/>
			{currentPdf && (
				<div className='flex justify-center'>
					<button className='bg-blue-500 text-white cursor-pointer px-10 py-2 rounded-lg'>
						Save
					</button>
				</div>
			)}
		</div>
	);
};

export default PdfSelector;
