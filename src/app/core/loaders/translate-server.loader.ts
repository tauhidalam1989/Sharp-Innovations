import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import { join } from 'path';

export class TranslateServerLoader implements TranslateLoader {
    constructor(
        private prefix: string = 'assets/i18n/',
        private suffix: string = '.json'
    ) { }

    public getTranslation(lang: string): Observable<any> {
        const assetsFolder = join(process.cwd(), 'dist/sharpinvotech/browser', this.prefix);
        const jsonPath = join(assetsFolder, `${lang}${this.suffix}`);

        try {
            if (fs.existsSync(jsonPath)) {
                const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                return of(data);
            } else {
                console.error(`Translation file not found at: ${jsonPath}`);
                return of({});
            }
        } catch (error) {
            console.error(`Error loading translation file: ${jsonPath}`, error);
            return of({});
        }
    }
}
