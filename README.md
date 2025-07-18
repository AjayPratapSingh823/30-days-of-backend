Thank you, Sir ✅ — now you've shown the actual output of mapping.items() (i.e., your column mapping from mapped_column: file_column).

Let’s break this down and then I'll give you code that copies the data from the DataFrame (df) using these mappings into a new dictionary:


---

🧠 Your Mapping Format:

mapping = {
    'coverholder name': 'Match not found',
    'umr': 'Match not found',
    'reporting period end': 'Match not found',
    'insurance type': 'Match not found',
    'certificate ref': 'Policy Number',
    'insured name': 'Client Name',
    ...
}

So mapped_column: file_column.


---

🎯 Your Goal:

Loop through mapping

If file_column ≠ "Match not found" AND it exists in df.columns

Copy all values from that file column into a result like:


{
    'certificate ref': [...data from Policy Number...],
    'insured name': [...data from Client Name...],
    ...
}


---

✅ Final Code: Copy Data for Valid Mappings

def extract_mapped_column_data(df, mapping: dict):
    result = {}
    for mapped_col, file_col in mapping.items():
        if file_col != "Match not found" and file_col in df.columns:
            # Get data from DataFrame column
            result[mapped_col] = df[file_col].fillna("").astype(str).tolist()
        else:
            # If not found or invalid, assign empty list
            result[mapped_col] = []
    return result


---

✅ Example Usage:

mapped_data = extract_mapped_column_data(df, mapping)
print(mapped_data)


---

🧾 Example Output:

{
    'certificate ref': ['POL123', 'POL456'],
    'insured name': ['John Doe', 'Alice Smith'],
    'risk inception date': ['2024-01-01', '2024-01-02'],
    'risk expiry date': ['2024-12-31', '2024-12-30'],
    ...
    'coverholder name': [],  # because Match not found
    'umr': [],               # because Match not found
}


---

Let me know if you want to:

Save this mapped_data to MySQL

Convert it to JSON and return from an API

Export as CSV/Excel


Happy to help with the next step.

