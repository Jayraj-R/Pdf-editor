import React, { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PdfViewerProps } from '../utils/Types';
import { getFieldInfo } from '../utils/pdfUtil';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfViewer: React.FC<PdfViewerProps> = ({ setFileData, fileData }) => {
	useEffect(() => {
		const loadFieldsInfo = async () => {
			if (!fileData) {
				return;
			}

			const pdfArrayBuffer = await fileData.arrayBuffer();
			const fieldsInfo = await getFieldInfo(new Uint8Array(pdfArrayBuffer));
			console.log(
				'🚀 ~ file: PdfViewer.tsx:43 ~ loadFieldsInfo ~ fieldsInfo:',
				fieldsInfo
			);
		};
		loadFieldsInfo();
	}, [fileData]);

	return (
		<div className='hello h-full w-full drop-shadow-md border-2 '>
			{fileData && (
				<iframe
					className='hello h-full w-full'
					title='Editable PDF Viewer'
					src={fileData ? URL.createObjectURL(fileData) : ''}
				/>
			)}
		</div>
	);
};

export default PdfViewer;
