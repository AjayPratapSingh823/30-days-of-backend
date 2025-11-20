import streamlit as st
import pandas as pd

# ----- PAGE CONFIG -----
st.set_page_config(layout="wide")

# ----- SIDEBAR FILTER UI -----
with st.sidebar:
    st.markdown("## 🔍 Filters")

    severity = st.multiselect(
        "Severity",
        ["High", "Medium", "Low"],
        default=["High", "Medium", "Low"]
    )

    loss_category = st.multiselect(
        "Loss Category",
        ["Catastrophic", "Major", "Standard"],
        default=["Catastrophic", "Major", "Standard"]
    )

# ----- MAIN PAGE -----
st.markdown("### 📄 Claims Table")

df = pd.read_excel("output.xlsx")

# ----- APPLY FILTERS -----
if severity:
    df = df[df["Severity"].isin(severity)]

if loss_category:
    df = df[df["Loss Category"].isin(loss_category)]

# ----- CENTER TABLE USING CSS -----
st.markdown(
    """
    <style>
    .center-table {
        display: flex;
        justify-content: center;
    }
    table {
        text-align: center !important;
    }
    thead th {
        text-align: left !important;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Show table
st.dataframe(df, use_container_width=True)
