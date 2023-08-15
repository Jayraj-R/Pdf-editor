/* eslint-disable prettier/prettier */
export interface Pdf {
  id: number;
  name: string;
  email: string;
}

export interface CreatePdfDto {
  name: string;
  email: string;
}

export interface UpdatePdfDto extends CreatePdfDto {
  id: number;
}
