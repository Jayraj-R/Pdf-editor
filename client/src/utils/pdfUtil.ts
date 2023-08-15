import {
	PDFDocument,
	PDFTextField,
	PDFCheckBox,
	PDFRadioGroup,
	PDFDropdown,
} from 'pdf-lib';

interface FormFieldInfo {
	name: string;
	type: string;
    value: string | boolean | undefined;
	options?: string[];
}

export async function getFieldInfo(pdfData: Uint8Array) {
	const pdfDoc = await PDFDocument.load(pdfData);
	const form = pdfDoc.getForm();
	const fieldsInfo: FormFieldInfo[] = [];

	form.getFields().forEach((field) => {
		if (field instanceof PDFTextField) {
			fieldsInfo.push({ name: field.getName(), type: 'text', value: field.getText() });
		} else if (field instanceof PDFCheckBox) {
			fieldsInfo.push({ name: field.getName(), type: 'checkbox', value: field.isChecked()  });
		} else if (field instanceof PDFRadioGroup) {
			fieldsInfo.push({
				name: field.getName(),
				type: 'radio',
                value: field.getSelected(),
				options: field.getOptions(),
			});
		} else if (field instanceof PDFDropdown) {
			fieldsInfo.push({
				name: field.getName(),
				type: 'dropdown',
                value: field.getSelected().toString(),
				options: field.getOptions(),
			});
		}
	});

	return fieldsInfo;
}
