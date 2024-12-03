import Ajv from 'ajv';
import path from 'path';
import fs from 'fs';
import { expect } from '@playwright/test';

export async function validateContract(responseBody: object, schemaName: string) {
    const schemaPath = path.resolve(__dirname, `../schemas/${ schemaName }`);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const ajv = new Ajv()

    const validate = ajv.compile(schema)
    expect(validate(responseBody)).toBeTruthy
}