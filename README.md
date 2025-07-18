Ah! Got it — you want this:

> Keep the column names from mapped_columns (i.e., new names), but keep the data from the matching columns in df.




---

✅ Example:

Suppose:

df.columns: ['Name', 'Age', 'Gender', 'Address']

file_columns: ['Name', 'Age', 'Gender']
mapped_columns = {
    'Full Name': 'Name',
    'Years': 'Age',
    'Sex': 'Gender'
}

You want to extract the data from df['Name'], df['Age'], df['Gender'] but rename them to 'Full Name', 'Years', 'Sex' in the result.


---

✅ Solution:

# Step 1: Only keep mappings where df has that column
valid_mappings = {new: old for new, old in mapped_columns.items() if old in df.columns}

# Step 2: Extract the data and rename columns
mapped_column = df[[old for old in valid_mappings.values()]].rename(columns={v: k for k, v in valid_mappings.items()})

print(mapped_column)


---

🧠 Explanation:

valid_mappings filters out any mappings where df does not have the old column.

Then we subset df by those columns.

Finally, rename changes the column names to the desired ones.



---

✅ Output:

If:

df = pd.DataFrame({
    'Name': ['Ajay', 'Ravi'],
    'Age': [25, 30],
    'Gender': ['M', 'M'],
    'Address': ['Delhi', 'Mumbai']
})
mapped_columns = {
    'Full Name': 'Name',
    'Years': 'Age',
    'Sex': 'Gender',
    'City': 'Location'  # Invalid column not in df
}

Then mapped_column becomes:

Full Name  Years Sex
0      Ajay     25   M
1      Ravi     30   M

Let me know if you want to export it to Excel or JSON next.

