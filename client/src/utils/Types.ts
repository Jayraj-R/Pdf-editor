export type SelectOptions = {
	value: string;
	label: string;
};

export interface PdfSelectorProps {
	currentPdf: SelectOptions | null;
	setCurrentPdf: React.Dispatch<React.SetStateAction<SelectOptions | null>>;
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
