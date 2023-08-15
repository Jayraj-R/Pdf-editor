import React, { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { getFieldInfo } from '../utils/pdfUtil';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PdfViewerProps {
	pdfData: Blob | null;
	setPdfData: any;
}
const PdfViewer: React.FC<PdfViewerProps> = ({ setPdfData, pdfData }) => {
	useEffect(() => {
		const loadFieldsInfo = async () => {
			if (!pdfData) {
				return;
			}

			const pdfArrayBuffer = await pdfData.arrayBuffer();
			const pdfBytes = new Uint8Array(pdfArrayBuffer);
			const fieldsInfo = await getFieldInfo(pdfBytes);
			console.log(
				'🚀 ~ file: PdfViewer.tsx:43 ~ loadFieldsInfo ~ fieldsInfo:',
				fieldsInfo
			);
		};
		loadFieldsInfo();
	}, [pdfData]);

	return (
		<div className='hello h-full w-full drop-shadow-md border-2 '>
			{pdfData && (
				<iframe
					className='hello h-full w-full'
					title='Editable PDF Viewer'
					src={pdfData ? URL.createObjectURL(pdfData) : ''}
				/>
			)}
		</div>
	);
};

export default PdfViewer;
