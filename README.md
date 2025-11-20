Sir, to align text and set fixed width for each column in Streamlit using an HTML table, you must apply custom CSS.

Below is a fully working solution that gives you:

✔ Left/center alignment
✔ Fixed width for the “Client & Broker” column
✔ Auto-wrap text inside the cell
✔ Clean HTML table rendering inside Streamlit


---

✅ Final Code With Alignment + Width Control

import streamlit as st
import pandas as pd

df = pd.read_excel("output.xlsx")

# Build labeled multi-line HTML
df["Client & Broker"] = (
    "<div class='cb-cell'>"
    "<b>Client:</b> " + df["client_name"].astype(str) +
    "<br><b>Broker:</b> " + df["broker_name"].astype(str) +
    "</div>"
)

# Drop original columns
df = df.drop(columns=["client_name", "broker_name"])

# Insert as 2nd column
cols = list(df.columns)
cols.remove("Client & Broker")
cols.insert(1, "Client & Broker")
df = df[cols]

# ---------- CSS for alignment + width + wrap ----------
table_css = """
<style>
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: left;
    vertical-align: top;
    padding: 8px;
    border: 1px solid #ccc;
    word-wrap: break-word;
}

/* Set width for specific column (2nd column here) */
td:nth-child(2), 
th:nth-child(2) {
    width: 200px;       /* Change width as needed */
    max-width: 200px;
    white-space: normal;
}

/* Style for Client & Broker cell */
.cb-cell {
    line-height: 1.3;
}
</style>
"""

# HTML rendering
st.markdown(table_css, unsafe_allow_html=True)
st.markdown(df.to_html(escape=False), unsafe_allow_html=True)


---

✅ What This Gives You

✔ Perfectly aligned table

All columns are left-aligned automatically.

✔ Client & Broker column fixed width

You can change it:

width: 200px;
max-width: 200px;

Set anything like 150px, 250px, 300px…

✔ Text wraps inside the cell

Long text will automatically wrap cleanly.

✔ Two-line labeled formatting

Client: XYZ
Broker: ABC

✔ No overflow or uneven columns


---

🎯 Want center-aligned or right-aligned?

Just change in CSS:

Center alignment

th, td { text-align: center; }

Right alignment

th, td { text-align: right; }


---

If you want me to style it exactly like Excel (colors, thick borders, header background), tell me Sir — I will design it fully.
