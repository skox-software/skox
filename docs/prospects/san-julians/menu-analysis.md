# San Julián’s published menu prices and value model

Prepared September 9, 2026. Source: [San Julián’s Uber Eats menu](https://www.ubereats.com/store/san-julians-coffee-bar/DWgSDzGPX5yh5H5sigTAWw), retrieved through public web search; the source was marked crawled last week. These are published marketplace base prices, not verified in-store/direct prices or a live checkout quote.

## Average menu price

**54 visible priced listings; $318.62 combined listing prices; $5.90 arithmetic mean; $5.06 median.** The lowest listed base price is $1.35 and the highest is $12.95. Mean and median are rounded to cents; the exact median is $5.055.

| Published category | Listings | Mean base price |
| --- | ---: | ---: |
| Hot Coffee | 11 | $4.44 |
| Cold Coffee | 5 | $6.09 |
| Filtered Coffee | 5 | $8.32 |
| Soft Drink and Tea | 8 | $3.27 |
| Fruit Juices | 8 | $5.76 |
| Breakfast Sandwich and Arepa | 5 | $9.94 |
| Antojos or Finger Food | 5 | $4.13 |
| Lunch Sandwiches and Arepa | 4 | $10.47 |
| Dessert | 3 | $4.43 |
| **All visible listings** | **54** | **$5.90** |

The five beverage categories contain 37 listings averaging **$5.22**; the four food categories contain 17 averaging **$7.38**. Categories follow the source, including hot chocolate under Hot Coffee. The six-piece snack combo counts as one priced listing, not six separate products. Each listed product counts once; distinct brewing methods and flavors are retained. No modifiers, taxes, tips, service/delivery fees or inferred sizes are added. No sales-volume weighting is possible.

The mean of a randomly/equally selected Hot Coffee-category item plus a similarly selected breakfast-category item is **$14.37**. This is a synthetic category-pair mean, not the café’s average ticket. Use a named basket in the pitch instead.

Raw price transcription: [menu-prices.csv](menu-prices.csv). Reproducible calculation: [calculate-menu.py](calculate-menu.py). Average = sum of included base prices divided by 54; median = midpoint of the sorted middle two values. This covers the visible priced listings, not a guarantee that every current product, size or modifier was exposed by the public page.

DoorDash exposed category headings but no usable item prices in the fetched page; its source was marked much older. Grubhub returned a JavaScript shell. Their data was not blended into the average. No current in-store menu or direct Toast menu was verified. Confirm direct/pickup prices with the owner before showing these as prices customers would pay on the new site.

## Named baskets using their listed items

| Example basket, not an existing advertised bundle | Price calculation | Published-price subtotal |
| --- | --- | ---: |
| Latte only | $4.70 | $4.70 |
| Latte + Empanadas Colombianas listing | $4.70 + $3.60 | $8.30 |
| Latte + Breakfast Egg Arepa | $4.70 + $10.95 | **$15.65** |
| Iced Latte + Croissant Egg Sandwich | $4.97 + $12.95 | $17.92 |

The source does not establish the portion count of the Empanadas Colombianas listing; do not promise a particular number. The baskets are illustrative selections, not verified best sellers, typical orders or offered discounts. [Menu source](https://www.ubereats.com/store/san-julians-coffee-bar/DWgSDzGPX5yh5H5sigTAWw).

## Store-specific price inputs, explicitly assumed operating inputs

Use the **$15.65 latte-and-arepa basket** as the main breakfast example. Assume 26 trading days/month and 40% contribution after ingredients, packaging, payment fees and incremental labor. The $15.65 price is sourced; days, margin and added order volume are assumptions. For this scenario only, assume the direct price equals the published marketplace subtotal. Actual direct prices may be lower or otherwise different.

| Truly additional breakfast baskets/day | Baskets/month | Additional monthly sales | At assumed 40% contribution | After $249 care |
| --- | ---: | ---: | ---: | ---: |
| 3 | 78 | $1,220.70 | $488.28 | $239.28 |
| 5 | 130 | $2,034.50 | $813.80 | $564.80 |
| 8 | 208 | $3,255.20 | $1,302.08 | $1,053.08 |

The final column excludes the $2,500 build and other incremental fixed costs such as hosting/provider subscriptions. It is not net profit. Orders that merely move from the counter or a marketplace to the website are not additional sales; assess their fee difference separately. These figures neither establish lost revenue nor predict what a website will generate.

### Basket mix changes the business case

At five truly additional orders per day, 26 trading days and the same assumed 40% contribution:

| Basket subtotal | Monthly sales | Contribution | After $249 care |
| --- | ---: | ---: | ---: |
| $4.70 latte | $611.00 | $244.40 | **-$4.60** |
| $8.30 latte + snack | $1,079.00 | $431.60 | $182.60 |
| $15.65 latte + breakfast | $2,034.50 | $813.80 | $564.80 |
| $17.92 iced latte + breakfast sandwich | $2,329.60 | $931.84 | $682.84 |

At the $15.65 subtotal, five additional baskets/day yield $610.35 contribution at 30%, $813.80 at 40%, or $1,017.25 at 50%. After care, those become $361.35, $564.80 or $768.25, before the build/other fixed costs. This sensitivity is not a claim about food-service margins; the actual product mix and costs must replace the assumptions.

**Planning threshold:** Spreading the $2,500 build over 12 months adds $208.33/month to $249 care, or $457.33/month before other costs. At $6.26 contribution per $15.65 breakfast basket, that requires **74 whole additional baskets/month**, about three per assumed trading day. At 30% contribution it requires 98/month; at 50%, 59/month. This is a budgeting allocation, not the payment schedule or a guarantee of demand.

If orders consist only of the $4.70 latte, the same 40% model instead requires **244 additional orders/month**, about 9.4 per trading day. Do not show the breakfast threshold as applying to every sale.

## Fee comparison using the same published-price basket

For illustration only, apply a 6% marketplace pickup rate and hypothetical direct processing of 2.9% + $0.30 to $15.65: the difference is $0.18515 per order before rounding, or approximately $0.19. At 300 shifted orders/month, the unrounded model gives **$55.55/month** before new fixed costs. Actual settlement rounding, taxes/tips, contracts and prices can change this. It does not cover the $249 care plan on fee savings alone.

This is a cross-provider scenario, not their verified DoorDash basket price or Toast processing quote. The earlier research links the advertised fee sources. The café’s own settlement statements must determine actual channel savings.

## Suggested wording for the meeting

“I used your published menu to make this concrete. A latte and breakfast egg arepa currently add up to $15.65 on Uber Eats. If we made ordering easier and that led to five extra breakfast orders per day across 26 days, that would be about $2,035 in monthly sales. At an illustrative 40% left after the costs of those orders, that’s about $814 before website costs. I’d like to check your in-store prices and actual margins so we can see what this would need to achieve.”

Then establish actual average ticket (sales divided by completed orders), channel-specific prices, product sales mix, contribution, trading days, order volume and pickup capacity. Industry percentages remain national research, not percentages of San Julián’s customers. The $5.90 mean is a menu statistic; it must never be presented as average customer spend.
