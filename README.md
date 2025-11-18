
final_list = []

for item in result:
    insured = item['insured_name']
    loss_date = item['loss_date']

    # fuzzy match
    from rapidfuzz import fuzz
    df['score'] = df['insured_name'].apply(lambda x: fuzz.token_sort_ratio(x, insured))
    filtered = df[df['score'] >= 80]

    if filtered.empty:
        print("No match found for:", insured)
        continue

    # safe extraction
    row = filtered.iloc[0]

    final_list.append({
        'client_name': row.get('client_name'),
        'loss_date': loss_date,
        'claim_id': row.get('claim_id'),
        'insured_location': row.get('insured_location'),
        'notified_date': row.get('notified_date'),
        'broker_name': row.get('broker_name'),
        'claim_type': row.get('claim_type'),
        'loss_summary': row.get('loss_summary'),
        'loss_category': row.get('loss_category'),
        'loss_amount': row.get('loss_amount'),
        'approved_loss_amount': row.get('approved_loss_amount')
    })
