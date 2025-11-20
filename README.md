import streamlit as st
import pandas as pd

# Set the page configuration for a wider layout
st.set_page_config(layout="wide")

st.title("Claim Processing Dashboard Example")

# --- 1. Prepare the Data ---
data = {
    'Claim Id': ['CLM-2020-1000', 'CLM-2021-1001'],
    'Client & Broker': ['AstraChem Industries\nMarsh', 'Shell PLC\nAon'],
    'Event Details': ['Cause: Fire\nEvent: 2024-08-14\nReported: 2024-08-15', 'Cause: Flood\nEvent: 2023-08-14\nReported: 2023-08-22'],
    'Loss Amount': ['54211.92', '60633.62'],
    'Loss Category': ['Catastrophic', 'Catastrophic'],
    'Incident Date': ['14 August 2024', ''], # Empty for the second claim in the image
    'Property': ['Multiple Manufacturing and Warehouse Facilities', ''], # Empty for the second claim in the image
    'Policy_period': ['01 July 2024 to 30 June 2025', ''], # Empty for the second claim in the image
    'Deductible': ['£400,000', ''] # Empty for the second claim in the image
}

df = pd.DataFrame(data)

# --- 2. Styling Function for the DataFrame ---

def style_claims_df(df):
    """Applies general styling (border, text color) to the DataFrame."""
    # This example focuses on general table aesthetics, 
    # as custom cell content like the colored tags is hard with st.dataframe.
    
    # We will use the Pandas Styler to bold the column headers
    return df.style.set_table_styles(
        [{'selector': 'th', 'props': [('font-weight', 'bold'), 
                                      ('background-color', '#f0f0f0'),
                                      ('color', '#333333')]},
         {'selector': 'td', 'props': [('vertical-align', 'top')]}
        ]
    )

# --- 3. Custom HTML for the "Process Claims" Button and Tags ---

# Create the "Process Claims" button using HTML/CSS
process_button_html = """
<button style="
    background-color: #f0f8ff; /* Light blue/grey background */
    color: #4682b4;           /* Steel blue text */
    border: 1px solid #4682b4;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;
">
    Process Claims
</button>
"""
# Display the button above the table
st.markdown(process_button_html, unsafe_allow_html=True)

# --- 4. Display the Table (using a container for better visual grouping) ---
with st.container(border=True):
    # Apply the styling and display the table
    st.dataframe(df, 
                 hide_index=True, 
                 column_config={
                     # Use st.column_config to make multiline text look better
                     "Client & Broker": st.column_config.Column(
                         "Client & Broker", help="Client and Broker details", width="medium"
                     ),
                     "Event Details": st.column_config.Column(
                         "Event Details", help="Cause and date details", width="medium"
                     ),
                     "Policy_period": st.column_config.Column(
                         "Policy_period", help="Policy start and end dates", width="medium"
                     )
                 },
                 use_container_width=True
    )

    # --- 5. Add the Colored Tags using HTML (This is the tricky part) ---
    # Since st.dataframe doesn't easily allow inserting custom HTML like this 
    # beneath cells, we have to cheat by styling the container *after* the table.
    
    # Define the HTML for the tags
    tag_html = """
    <style>
        .medium-tag {
            background-color: orange;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.7em;
            font-weight: bold;
        }
        .high-tag {
            background-color: red;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.7em;
            font-weight: bold;
        }
        .tag-container {
            display: flex;
            justify-content: space-around; /* Adjust as needed */
            margin-top: -30px; /* Pull it up to sit close to the table */
            padding-left: 20%; /* Manually align with the Event Details column */
            width: 50%;
        }
    </style>
    
    <div class="tag-container">
        <span class="medium-tag">Medium</span>
        
        <div style="width: 20%; min-width: 100px;"></div>
        
        <span class="high-tag">High</span>
    </div>
    """
    st.markdown(tag_html, unsafe_allow_html=True)

st.caption("Note: Aligning the tags precisely beneath the 'Event Details' column in Streamlit's native dataframe is difficult and requires manual HTML/CSS positioning (like the 'padding-left' and 'spacer' above).")
