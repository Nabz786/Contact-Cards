import { Contact } from "./contact.model";

export class ServiceResponse {
    success: boolean;
    error: string;
    returnPayload: Contact[];
}