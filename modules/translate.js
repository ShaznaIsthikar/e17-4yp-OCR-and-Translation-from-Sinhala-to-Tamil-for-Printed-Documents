const translate = require('@iamtraction/google-translate');
const fs = require('fs-extra');

async function translateText(srcText) {
    return new Promise(async (resolve, reject) => {
        try {
            translate(srcText, { from: 'si', to: 'ta' })
                .then(res => {
                    const translationFilePath = '../tmp/translations/translation.txt';
                    fs.writeFileSync(translationFilePath, res.text, { encoding: 'utf8', flag: 'w' });
                    console.log('Text saved to translation.txt');
                    const sentences = srcText.split('. ');
                    const translatedSentences = res.text.split('. ');

                    // Create a CSV string with original sentences and translations
                    const csvData = [];
                    for (let i = 0; i < sentences.length; i++) {
                        // csvData.push(`"${sentences[i].trim()}", "${translatedSentences[i].trim()}"`);
                        const originalSentence = sentences[i] ? sentences[i].trim() : '';
                        const translatedSentence = translatedSentences[i] ? translatedSentences[i].trim() : '';
                        csvData.push(`"${originalSentence}", "${translatedSentence}"`);
                  
                    }
                    const csvContent = csvData.join('\n');

                    // Write the CSV data to a file
                    const csvtranslationFilePath = '../tmp/translations/translations_results_csv/translation.csv';
                    fs.writeFileSync(csvtranslationFilePath, csvContent, { encoding: 'utf8', flag: 'w' });
                    console.log('Text saved to translation.csv');
                resolve(res.text);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

module.exports = { translateText };
