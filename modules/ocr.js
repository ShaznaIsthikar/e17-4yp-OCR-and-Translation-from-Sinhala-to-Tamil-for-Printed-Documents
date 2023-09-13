// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs');

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:/Users/Shazna/Downloads/sinhala2tamiloct-0b7424a9290d.json'

async function ocr_extract(srcfile) {
    return new Promise(async(resolve,reject)=>{
    try {
        
        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs text detection on the local file
        const [result] = await client.textDetection(srcfile);
        const detections = result.textAnnotations;
        const [ text, ...others ] = detections
        // console.log(`Text: ${ text.description }`);

        // Extract text description
        const textDescription = text.description;

         // Extract text description and split sentences at full stops
         const sentences = text.description.split('. ');
        // Create a CSV string with each sentence in a separate row
        const csvData = sentences.map(sentence => `"${sentence.trim()}"`).join('\n');
        fs.writeFileSync('../tmp/ocr_results_csv/output.csv', csvData, 'utf-8');
        console.log('Text saved to output.csv');
         // Write the text to a text file
         fs.writeFileSync('../tmp/ocr_results/ocr.txt', textDescription, 'utf-8');
         console.log('Text saved to output.txt');
         resolve(textDescription)
        
    } catch (error) {
        console.log(error)
        reject(error)
    }
});
}

// quickstart()
module.exports = { ocr_extract };
// const vision = require('@google-cloud/vision');
// const CREDENTIALS = JSON.parse(JSON.stringify({
//     "type": "service_account",
//     "project_id": "sinhala2tamiloct",
//     "private_key_id": "0b7424a9290d0e8815c9cec96172a0f3a0861e16",
//     "private_key": "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBSMcLiWqLGwuj\ne7ZZaf1jgplEbjHNXJM6NKJh91euc4bwsZHe+gbE2unn4FNoL3GNkPwzhL3GfqLH\n8EK89hWdnIeUGgZPJTqWutG2K1axfQ2QArxc5hWzXj9eH7TjQnb9bGwDPvaKR4fb\n56yNulDow+8Ok4lS7pVfVFfwax11F0GEvNIBOiLIBmcaMCz21RB+ifhEM1iqL+pg\nBT2ZmiBDQFPI82lXWCOU9cwFKoEMDw2eckrJKwrs0IU1UMAGyy6OWbIEzGt6Y3vZ\n5q/fuv7cepMzfJxzBXbY43hN8QUwU6YP93XejssRYLVGj9VtWUCjJDWhmrQpxJml\noYVU6jIhAgMBAAECggEAPEYKtCFNFUYA0iFhEu8HcoGmc/19EFJfIxaI0M4GDMO/\n/80P9R25AKhXqtR8jg/FdGUTEKnDWGPjNUBKP4zp3rWSXe/jqcitRZXKkelf5odd\ntFv2C25AtCee0SZIDVqLqqml4TlAPozh5ASR/bxtQLjhEoWVnEQEVq8BoVp13C4y\nGhGwdttvacVKaH0kwh8doWY4Oyis4uzbuNBIE5u9p0z1YdmLiWJfoYP+gC/rBSYZ\nsKp8itCguloWPbzQ7Ge3ibouzjjPuqlWmSK+6LB+azzreXAoVGbPlbRBbnwT7x3S\nviLVrMbLefWGPK36Bs+FrR/ZIiuMjZ9ROVqRwwae1QKBgQDzLJfuzcY/W9aRgXub\n6LoWbEhL6lQb6UIgI/sZgLHWF+kvzNSqg/xSqK0mkGusik4NYPFHcVooLdfJuhzU\ncqKLsUUS+ZugJCDybiJhJHyg3LJDLRdyrDaaJDZY/jpFFyJg5Oono991w0Q0L6n7\nev/+snCtB/Zc/eQO9JY/oULvJwKBgQDLeo5z1dhLuf3NVPf+GxJZbXZgQvZsRVj7\nYRraOygVOFj5L1QaRLw+TdSteHkX9cvJwPcbwMWOHllj7+jd7BxCyzi3I6WQqGgT\nKrA6MgNRHOoWTJ9JwwLFc1Qb1RMzpq4YtnzN9vykcwnzSgcMuyA4H8GMG3fwMMbK\nJDNuHd8hdwKBgADOH/6pbcOd8TrwG9GrVppmZ2Lg9sBU6GQk2lr+Qxh7YclHu1iJ\nMVewuUoMZl7e4l1G+eWLqYnChRlk5V2Kt6EQyDLE4tAH7pf+51w8+7CoqmpwhshZ\na6DdB9UJmnXKGtIJUAErmLzSFbK6iayMfraALsFT6mvqZ0vpYWn6hbc3AoGAC+XG\nno9KbmMZq//j4D/E+uWjnk1MC1iis1AiOdBrr5Hz4d4alM6gEySJ4vrAWd5NZCac\nTEshQgYUQ/urKg68OEuZrVuwOp0eOMCuPTjfaMbACT3BspZsew8bQ+VZkhOU6m0B\nLynZ6+OuGUOi1eO7Joz0zDRu9uRjOz6So0Wr3lECgYBoEjpqz7y7PyilMtBkdIrl\no0LjGvP6GajjOvCzdesgkQQRGhNL0J8m/jrEiUUqfMPfGvCEgRN4dDL7cPknQRjg\nQBtAhkX005SkIUrS6fkhA3Be+tRqWmpCTy/lehqiBUMH5BKjgwArxoYdeqMrwZHG\nMNWjylWggu7kyPpeeBbI6A==",
//     "client_email": "google-api-ai-test@sinhala2tamiloct.iam.gserviceaccount.com",
//     "client_id": "109727093601340710589",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-api-ai-test%40sinhala2tamiloct.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// }));
// const CONFIG ={
//     Credentials: {
//         private_key: CREDENTIALS.private_key,
//         client_email: CREDENTIALS.client_email
//     }
// };
// const client = new vision.ImageAnnotatorClient(CONFIG);

// const detectText = async (file_path) => {
//     let [result] = await client.textDetection(file_path);
//     console.log(result);
// };

// detectText('sinhala-img2.jpg');

// const { createWorker } =require('tesseract.js')
// const languages =['eng','sin','tam']

// async function ocr_extract(srcfile){
//     return new Promise(async(resolve,reject)=>{
//         try {
//             const worker = await createWorker(
//                 {logger: m => console.log(m)}
//             );
    
//             await worker.loadLanguage(languages.join('+'));
//             await worker.initialize(languages.join('+'));
//             await worker.setParameters({
//                 tessedit_ocr_engine_mode:2,
//                 tessedit_pageseg_mode:6,
                
//             })
//             await worker.recognize(
//                 // 'tmp/preprocess_results/'+srcfile.file.filename,
//                 srcfile,
//             ).then(({data:{text}})=>{
//                 try {
//                     fs.writeFileSync('../tmp/ocr_results/'+'ocr'+".txt",text,{flag:'w'});
//                 //    fs.writeFileSync('tmp/ocr_results/'+srcfile.file.filename.split(".")[0]+".txt",text,{flag:'w'});
//                 //    translate_mod.translateText(srcfile.file.filename.split(".")[0]+".txt")
//                 } catch (error) {
//                     console.log(error);
//                 }
//                 resolve(text)
//             })
//             await worker.terminate();
//         } catch (error) {
//             console.error(error);
//             reject(error);
//         }
//     });
// }

// module.exports = { ocr_extract };