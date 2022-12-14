import { saveAs } from 'file-saver';
import { apiUrl } from "@/services/constants";

export const dwnClaim = (svhcode:string) => {
  saveAs(apiUrl + '/claim/'+ svhcode +'/claim.docx', "output.docx");
}
