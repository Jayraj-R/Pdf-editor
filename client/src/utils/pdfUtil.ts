import {
	PDFDocument,
	PDFTextField,
	PDFCheckBox,
	PDFRadioGroup,
	PDFDropdown,
} from 'pdf-lib';
import { FormFieldInfo } from './Types';
import { constants } from './constants';

export async function getFieldInfo(pdfData: Uint8Array) {
	const pdfDoc = await PDFDocument.load(pdfData);
	const form = pdfDoc.getForm();
	const fieldsInfo: FormFieldInfo[] = [];

	form.getFields().forEach((field) => {
		if (field instanceof PDFTextField) {
			fieldsInfo.push({
				name: field.getName(),
				type: constants.TEXT,
				value: field.getText(),
			});
		} else if (field instanceof PDFCheckBox) {
			fieldsInfo.push({
				name: field.getName(),
				type: constants.CHECKBOX,
				value: field.isChecked(),
			});
		} else if (field instanceof PDFRadioGroup) {
			fieldsInfo.push({
				name: field.getName(),
				type: constants.RADIO,
				value: field.getSelected(),
				options: field.getOptions(),
			});
		} else if (field instanceof PDFDropdown) {
			fieldsInfo.push({
				name: field.getName(),
				type: constants.DROPDOWN,
				value: field.getSelected().toString(),
				options: field.getOptions(),
			});
		}
	});

	return fieldsInfo;
}
