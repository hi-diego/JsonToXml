import fs from 'fs';
import path from 'path';
import { JsonToXml } from './main';
/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function ReadJsonFile(path: string): string {
    return fs.readFileSync(path, { encoding:'utf8', flag:'r' });
}
/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function FromJsonToXml(path: string, root: string = 'root'): string {
    var json = ReadJsonFile(path);
    var xmlString = JsonToXml(json, root);
    return xmlString;
}
/**
 * Parse the given Json string.
 *
 * Description.
 *
 * @throws {InvalidArgumentException}
 * @param {string} jsonString - The mode being performed (e.g. "add", "edit").
 * @returns {Object} The Object correspondent to the given JsonString.
 */
export function Transform(inPath: string, outPath: string|null = null): void {
    var xmlString = FromJsonToXml(inPath, path.basename(inPath).replace('.json', ''));
    fs.writeFileSync(outPath || inPath.replace('.json', '.xml'), xmlString, { encoding:'utf8' });
}
