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
		<div>
			<AsyncSelect
				cacheOptions
				defaultOptions
				value={currentPdf}
				loadOptions={loadOptions}
				onChange={handleChange}
				isClearable={true}
				isSearchable={true}
			/>
		</div>
	);
};

export default PdfSelector;
