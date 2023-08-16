export type SelectOptions = {
	value: string;
	label: string;
};

export interface PdfSelectorProps {
	currentPdfName: SelectOptions | null;
	setCurrentPdfName: React.Dispatch<React.SetStateAction<SelectOptions | null>>;
}
export interface PdfViewerProps {
	fileData: Blob | null;
	setFileData: React.Dispatch<React.SetStateAction<Blob | null>>;
}

export interface FormFieldInfo {
	name: string;
	type: string;
	value: string | boolean | undefined;
	options?: string[];
}
