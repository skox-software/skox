"""Recalculate the public menu snapshot and illustrative scenarios, using cents.

Source and inclusion rules: menu-analysis.md. No external dependencies.
"""
import csv
from collections import defaultdict
from decimal import Decimal, ROUND_CEILING, ROUND_HALF_UP
from pathlib import Path
from statistics import median

D = Decimal


def money(value):
    return f"${value.quantize(D('0.01'), rounding=ROUND_HALF_UP):,.2f}"


rows = list(csv.DictReader(Path(__file__).with_name('menu-prices.csv').open()))
groups = defaultdict(list)
items = {}
for row in rows:
    price = D(row['price_usd'])
    groups[row['category']].append(price)
    items[row['item']] = price
prices = [D(row['price_usd']) for row in rows]
print(f"Listings: {len(prices)}; sum: {money(sum(prices))}")
print(f"Mean: {money(sum(prices) / len(prices))}; median: {money(median(prices))}")
for category, values in groups.items():
    print(f"{category}: n={len(values)}, mean={money(sum(values) / len(values))}")

print('\nAssumptions: 26 days/month; 40% contribution; $249 monthly care.')
basket = items['Latte'] + items['Breakfast Egg Arepa']
for daily in (3, 5, 8):
    revenue = basket * daily * 26
    contribution = revenue * D('.40')
    print(f"{daily}/day: sales={money(revenue)}, contribution={money(contribution)}, "
          f"after care={money(contribution - 249)}")
budget = D(2500) / 12 + 249
for margin in (D('.30'), D('.40'), D('.50')):
    orders = (budget / (basket * margin)).to_integral_value(rounding=ROUND_CEILING)
    print(f"Build allocated over 12 months + care, margin {margin}: {orders} added baskets/month")
fee_difference = basket * D('.06') - (basket * D('.029') + D('.30'))
print(f"Illustrative pickup fee difference, unrounded: {fee_difference}; "
      f"300 orders: {money(fee_difference * 300)}")
