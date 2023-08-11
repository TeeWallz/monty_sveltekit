import json
import os

# read in nested_chumps.json
with open('nested_chumps.json', 'r') as f:
    nested_chumps = json.load(f)

# flatten the nested_chumps
flattened_chumps = []
for j, day in enumerate(nested_chumps):
    for i, chump in enumerate(day['chumps']):
        print(chump['name'])
        num = i
        if chump['name'] == 'Van being a smooth criminal and leaning into a 3rd day in a row':
            num = 2

        new_chump = {
            "id": f"{day['date']}_{num + 1}",
            "date": day['date'],
            "date_bout": num + 1,
            "date_aus_string": day['date_aus_string'],
            "date_year": int(day['date_year']),
            "date_month": int(day['date'].split('-')[1].lstrip('0')),
            "date_day": int(day['date'].split('-')[2].lstrip('0')),
            "date_year_week": int(day['date_week']),
            "name": chump['name'],
            "streak": day['streak'],
            "thanks": "" if day['thanks'] is None else day['thanks'],
            "image": day['image'],
            "thumb": day['thumb'],
            "url": chump['url'],
        }

        # Oops
        
        

        flattened_chumps.append(new_chump)


# write out flattened_chumps.json
with open('/home/tom/git/sveltekit_intro/my-app/src/lib/data/chumps.json', 'w') as f:
    json.dump(flattened_chumps, f, indent=4)

