import streamlit as st
import pandas as pd

# Set the page configuration for a wider layout
st.set_page_config(layout="wide")

st.title("Claim Tracker Dashboard Example")

# --- 1. Prepare the Data (Example DataFrame) ---
# We'll create a DataFrame with the structure you need.
# Note: For simplicity, we'll put the "Financial Breakdown" on one row in the DataFrame.
data = {
    'Claim ID': ['CLM-2024-845'],
    'Client & Broker': ['Central London Properties\nMarsh Ltd'],
    'Address': ['250 Oxford Street, London W1D 1AA'],
    'Event Details': ['Fire\nEvent: 2024-03-15\nUploaded: 2024-03-15'],
    'Loss': ['£450,000'],
    'Paid': ['£270,000'],
    'RI Recov': ['£0'],
    'Category': ['Large'],
    'Status': ['Pending'],
    'Date': ['2024-03-15']
}
df = pd.DataFrame(data)

# --- 2. Custom Function to Render the Data (Including Tags) ---
# We'll display each claim in its own styled container to mimic the image's design.

def display_claim_card(row):
    # Function to create the styled HTML tags
    def create_tag(text, tag_type):
        if tag_type == 'Category':
            # Orange background for 'Large' category (similar to the image)
            style = 'background-color: #ff9900; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold;'
        elif tag_type == 'Status':
            # Lighter orange/yellow background for 'Pending' status
            style = 'background-color: #ffd8a1; color: #404040; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold;'
        else:
            style = '' # Default style
        return f'<span style="{style}">{text}</span>'

    # The main container for the claim card, using flexbox for layout
    html_card = f"""
    <div style="
        border: 1px solid #e6e6e6;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.05);
        display: flex;
        justify-content: space-between;
        background-color: white;
    ">
        <div style="flex: 0.5; font-size: 1.1em; font-weight: bold; color: #333;">
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Claim ID</p>
            {row['Claim ID']}
        </div>

        <div style="flex: 1.5; padding-right: 20px;">
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Client & Broker</p>
            <p style="margin: 0; white-space: pre-wrap;">
                <span style="font-weight: bold;">{row['Client & Broker'].split('\n')[0]}</span><br>
                {row['Client & Broker'].split('\n')[1]}<br>
                <span style="font-size: 0.9em; color: #666;">{row['Address']}</span>
            </p>
        </div>

        <div style="flex: 1; padding-right: 20px; font-size: 0.9em;">
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Event Details</p>
            <p style="margin: 0; white-space: pre-wrap;">{row['Event Details']}</p>
        </div>

        <div style="flex: 1.5; padding-right: 20px; border-right: 1px solid #f0f0f0;">
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Financial Breakdown</p>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-size: 0.9em;">Loss:</span>
                <span style="font-weight: bold; color: #d9534f;">{row['Loss']}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-size: 0.9em;">Paid:</span>
                <span style="font-weight: bold; color: #5cb85c;">{row['Paid']}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 0.9em;">RI Recov:</span>
                <span style="font-weight: bold; color: #337ab7;">{row['RI Recov']}</span>
            </div>
        </div>
        
        <div style="flex: 0.5; padding-left: 20px;">
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Category</p>
            <p style="margin: 0 0 15px 0;">{create_tag(row['Category'], 'Category')}</p>
            
            <p style="margin: 0; padding-bottom: 5px; font-size: 0.75em; color: #888;">Status</p>
            <p style="margin: 0;">{create_tag(row['Status'], 'Status')}</p>
            <p style="margin: 0; font-size: 0.9em; color: #666;">{row['Date']}</p>
        </div>
    </div>
    """
    st.markdown(html_card, unsafe_allow_html=True)

# --- 3. Display the Table/Cards ---
# Iterate over your DataFrame rows and call the custom display function
for index, row in df.iterrows():
    display_claim_card(row)

# Optional: Add a simple st.dataframe for comparison
st.subheader("Raw Data (for reference)")
st.dataframe(df)
