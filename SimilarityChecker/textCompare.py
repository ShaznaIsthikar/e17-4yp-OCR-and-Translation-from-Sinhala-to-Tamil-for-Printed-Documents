# Import the SequenceMatcher from difflib for comparing text similarity
from difflib import SequenceMatcher
import nltk
nltk.download('punkt')
import nltk.data
import csv

# Open the input files
with open('../tmp/originals/8.txt', 'r', encoding='utf-8') as f1:
    f1_data = f1.read()

with open('../tmp/ocr_results/ocr.txt', 'r', encoding='utf-8') as f2:
    f2_data = f2.read()

with open('../tmp/ocr_results/visionOcr.txt', 'r', encoding='utf-8') as f3:
    f3_data = f3.read()
    
# Initialize the sentence tokenizer
tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')

# Tokenize the text into sentences
f1_sentences = tokenizer.tokenize(f1_data)
f2_sentences = tokenizer.tokenize(f2_data)
f3_sentences = tokenizer.tokenize(f3_data)

# Create a list to store comparison results
comparison_results = []

# Iterate through the sentences
for i, (sentence1, sentence2, sentence3) in enumerate(zip(f1_sentences, f2_sentences, f3_sentences), start=1):
    # Remove leading and trailing whitespace
    sentence1 = sentence1.strip()
    sentence2 = sentence2.strip()
    sentence3 = sentence3.strip()

    # Calculate the Jaccard similarity between sentence1 and sentence2
    similarity12 = SequenceMatcher(None, sentence1, sentence2).ratio()

    # Calculate the Jaccard similarity between sentence1 and sentence3
    similarity13 = SequenceMatcher(None, sentence1, sentence3).ratio()

    # Store the comparison results as tuples
    result = (sentence1, sentence2, sentence3, round(similarity12 * 100, 2), round(similarity13 * 100, 2))

    # Append the result to the comparison_results list
    comparison_results.append(result)

# Open a new CSV file for writing
#with open('comparison_output1.csv', 'w', newline='', encoding='utf-8') as csvfile:
with open('comparison_output.csv', 'a', newline='', encoding='utf-8') as csvfile:
    # Define the CSV writer
    csvwriter = csv.writer(csvfile)

    # Write the header row
    csvwriter.writerow(['original', 'ocr', 'visionOcr', 'Tessaract%', 'Vision%'])

    # Write the comparison results
    csvwriter.writerows(comparison_results)

# # Close the input and output files
f1.close()
f2.close()
f3.close()



# # Open a new file for writing the output
# output_file = open('comparison_output.txt', 'w', encoding='utf-8')

# # Iterate through the sentences
# for i, (sentence1, sentence2) in enumerate(zip(f1_sentences, f2_sentences), start=1):
#     # Remove leading and trailing whitespace
#     sentence1 = sentence1.strip()
#     sentence2 = sentence2.strip()

#     # Calculate the Jaccard similarity
#     similarity = SequenceMatcher(None, sentence1, sentence2).ratio()

#     # Matching sentences
#     if sentence1 == sentence2:
#         output_file.write(f"Sentence {i}: IDENTICAL (Similarity: 100%)\n")
#         output_file.write(f"\tFile 1 Sentence: {sentence1}\n")
#         output_file.write(f"\tFile 2 Sentence: {sentence2}\n")
#     else:
#         similarity_percentage = round(similarity * 100, 2)
#         output_file.write(f"Sentence {i} (Similarity: {similarity_percentage}%):\n")
#         output_file.write(f"\tFile 1: {sentence1}\n")
#         output_file.write(f"\tFile 2: {sentence2}\n")

# # Close the input and output files
# f1.close()
# f2.close()
# output_file.close()

# # reading files
# f1 = open("C:/Users/Shazna/Downloads/New folder/ocr1.txt", "r") 
# f2 = open("C:/Users/Shazna/Downloads/New folder/ocr2.txt", "r") 
# with open('C:/Users/Shazna/Downloads/New folder/ocr1.txt', 'r', encoding='utf-8') as f1:
#     f1_data = f1.readlines()
# with open('C:/Users/Shazna/Downloads/New folder/ocr2.txt', 'r', encoding='utf-8') as f2:
#     f2_data = f2.readlines()
# #f1_data = f1.readlines()
# #f2_data = f2.readlines()
 
# # Open a new file for writing the output
# output_file = open('comparison_output.txt', 'w', encoding='utf-8')

# i = 0

# for line1, line2 in zip(f1_data, f2_data):
#     i += 1
    
#     # Calculate the Jaccard similarity
#     similarity = SequenceMatcher(None, line1, line2).ratio()

#     # Matching line1 from both files
#     if line1 == line2:
#         # Write "IDENTICAL" to the output file if similar
#         output_file.write(f"Line {i}: IDENTICAL (Similarity: 100%)\n")
#     else:
#         # Calculate the similarity percentage
#         similarity_percentage = round(similarity * 100, 2)
#         output_file.write(f"Line {i} (Similarity: {similarity_percentage}%):\n")
        
#         # Write the lines from both files to the output file
#         output_file.write(f"\tFile 1: {line1}")
#         output_file.write(f"\tFile 2: {line2}")

# # Close the input and output files
# f1.close()
# f2.close()
# output_file.close()